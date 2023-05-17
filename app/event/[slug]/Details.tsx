'use client'

import styles from './page.module.css'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUserTypeContext } from '../../providers/UserTypeProvider'
import { db } from '../../../firebaseConfig'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'

import { Skeleton } from '@mui/material'
import EventNoteIcon from '@mui/icons-material/EventNote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Status from './Status'

const inter = Inter({ subsets: ['latin'] })

interface Props {
    id: string,
}

interface Data {
    id: string;
    name: string;
    desc: string;
    date: string;
    startTime: string;
    endTime: string;
    venue: string;
    host: string;
    visibility: string;
    attendees: string[];
}

export default function Details({ id }: Props) {

    const { userType } = useUserTypeContext()
    const router = useRouter()

    const [data, setData] = useState<Data>({
        id: "",
        name: "",
        desc: "",
        date: "",
        startTime: "",
        endTime: "",
        venue: "",
        host: "",
        visibility: "",
        attendees: [],
    })

    const [formattedDate, setFormattedDate] = useState<string>("");

    const getDetails = async () => {
        const docRef = doc(db, 'events', id)
        const docSnap = await getDoc(docRef)

        setData(docSnap.data() as Data);
    }

    const deleteEvent = async (): Promise<void> => {
        const eventRef = doc(db, 'events', id)
        await deleteDoc(eventRef)
        router.push("/")
    }

    // Format date to Month Day, Year; OPTIMIZE this soon
    const getDate = () => {
        // Format date to Month Day, Year
        const toFormatDate = new Date(data?.date)

        const dateOptions: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
        setFormattedDate(new Intl.DateTimeFormat("en-US", dateOptions).format(toFormatDate));
    }

    useEffect(() => {
        getDetails()
    }, [])

    useEffect(() => {
        if (data?.date !== "") {
            getDate();
        }
    }, [data]);

    // Format time to 12-hour format; OPTIMIZE this in the future
    const formatTime = (time: string) => {

        // Format time to 12-hour format
        const hourOptions: Intl.DateTimeFormatOptions = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };

        const date = new Date()
        date.setHours(Number(time.split(":")[0]));
        date.setMinutes(Number(time.split(":")[1]));

        return date.toLocaleTimeString("en-US", hourOptions);
    }

    return (
        <div className={`${inter.className} ${styles.container}`}>
            <div className={styles.nav}>
                <Link href="/">
                    <ArrowBackIcon sx={{ scale: '150%', color: '#a70000', p: '0' }} />
                </Link>
            </div>

            <div className={styles.header}>
                <div className={styles.eventNameContainer}>
                    {data?.name === '' ?
                        <Skeleton animation='wave' width={220} height={70} />
                        :
                        <>
                            <h1>{data?.name}</h1>
                        </>
                    }
                </div>
                <Status date={data?.date} startTime={data?.startTime} endTime={data?.endTime} />
                <div className={styles.divider}></div>
            </div>
            <div className={styles.schedule}>
                <h3> <EventNoteIcon /> Schedule </h3>
                <div className={styles.infoContainer}>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Date</p>
                        {data?.date === '' ?
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                <p>{formattedDate}</p>
                            </div>
                        }
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Start Time</p>
                        {data?.startTime === '' ?
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                <p>{formatTime(data?.startTime)}</p>
                            </div>
                        }
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>End Time</p>
                        {data?.endTime === '' ?
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                <p>{formatTime(data?.endTime)}</p>
                            </div>
                        }
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Venue</p>
                        {data?.venue === '' ?
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                <p>{data?.venue}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.schedule}>
                <h3> <InfoIcon /> About this Event </h3>
                <div className={styles.infoContainer}>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Hosted by</p>
                        {data?.host === '' ?
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                <p>{data?.host}</p>
                            </div>
                        }
                    </div>
                    <div>
                        <div className={styles.infoItem}>
                            <p className={styles.infoLabel}>Description</p>
                        </div>
                        {data?.desc === '' ?
                            <Skeleton animation='wave' width={220} height={300} />
                            :
                            <div>
                                <p>{data?.desc}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {userType === 'organizer' &&
                <div id={styles.stats}>
                    <h3> <QueryStatsIcon /> Statistics </h3>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoItem}>
                            <b>Attendees</b> {data?.attendees.length}
                        </div>
                        <div className={styles.infoItem}>
                            <p className={styles.infoLabel}>Visibility</p>
                            <div className={styles.infoData}>
                                <p>{data?.visibility}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {userType === 'organizer' &&
                <div>
                    <Link href={`/event/${id}/edit`}>Edit</Link>
                    <button onClick={deleteEvent}>Delete</button>
                </div>
            }
        </div>
    )
}