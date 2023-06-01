'use client'

import styles from './page.module.css'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUserTypeContext } from '@/app/providers/UserTypeProvider'
import { db } from '../../../../firebaseConfig'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'

import { Skeleton } from '@mui/material'
import EventNoteIcon from '@mui/icons-material/EventNote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Status from './Status'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebaseConfig'

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

    const [user] = useAuthState(auth)
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
    const [formattedStartTime, setFormattedStartTime] = useState<string | undefined>("");
    const [formattedEndTime, setFormattedEndTime] = useState<string | undefined>("");
    const [isCoOwner, setIsCoOwner] = useState<boolean>(false);
    const [attendeeList, setAttendeeList] = useState<{ fullName: string, degreeProgram: string }[]>([]);

    const getDetails = async () => {
        const docRef = doc(db, 'events', id)
        const docSnap = await getDoc(docRef)

        setData(docSnap.data() as Data);

        if (docSnap.data()?.coOwners !== undefined) {
            if (docSnap.data()?.coOwners.includes(user?.email)) {
                setIsCoOwner(true);
            }
        }

    }

    const handleAttendeeList = async () => {
        for (const id of data.attendees) {
            const docSnap = await getDoc(doc(db, 'attendees', id));
            setAttendeeList((prev: { fullName: string, degreeProgram: string }[]) => [
                ...prev,
                {
                    fullName: `${docSnap.data()?.lastName}, ${docSnap.data()?.firstName}`,
                    degreeProgram: docSnap.data()?.program
                }
            ]);
            console.log(docSnap.data());
        }
    };


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

    // Format time to 12-hour format; OPTIMIZE this in the future
    const formatTime = (time: string) => {

        // Format time to 12-hour format
        const hourOptions: Intl.DateTimeFormatOptions = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };

        if (time && time !== "") {
            const date = new Date()
            date.setHours(Number(time.split(":")[0]));
            date.setMinutes(Number(time.split(":")[1]));

            return date.toLocaleTimeString("en-US", hourOptions);
        }
    }

    useEffect(() => {
        getDetails()
    }, [])

    useEffect(() => {
        if (data && data?.date !== "") {
            getDate();
        }

        if (data && data.startTime !== "") {
            setFormattedStartTime(formatTime(data.startTime));
        }

        if (data && data.endTime !== "") {
            setFormattedEndTime(formatTime(data.endTime));
        }

        handleAttendeeList();

    }, [data]);

    return (
        <div className={`${inter.className} ${styles.container}`}>
            <div className={styles.nav}>
                <Link href="/">
                    <ArrowBackIcon sx={{ scale: '150%', color: '#a70000', p: '0' }} />
                </Link>
            </div>

            <div className={styles.header}>
                <div className={styles['event-name']}>
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
            <div className={styles.section}>
                <div className={styles['section-label']}>
                    <EventNoteIcon sx={{ color: '#a70000', p: '0', scale: '0.8' }} /> Schedule
                </div>
                <div className={styles['info-section']}>
                    <div className={styles['info-item']}>
                        <p className={styles['info-label']}>Date</p>
                        {data?.date === '' ?
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                <p>{formattedDate}</p>
                            </div>
                        }
                    </div>
                    <div className={styles['info-item']}>
                        <p className={styles['info-label']}>Start Time</p>
                        {data?.startTime === '' ?
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                <p>{formattedStartTime}</p>
                            </div>
                        }
                    </div>
                    <div className={styles['info-item']}>
                        <p className={styles['info-label']}>End Time</p>
                        {data?.endTime === '' ?
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                <p>{formattedEndTime}</p>
                            </div>
                        }
                    </div>
                    <div className={styles['info-item']}>
                        <p className={styles['info-label']}>Venue</p>
                        {data?.venue === '' ?
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.InfoData}>
                                <p>{data?.venue}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles['section-label']}>
                    <InfoOutlinedIcon sx={{ color: '#a70000', p: '0', scale: '0.8' }} /> About This Event
                </div>
                <div className={styles['info-section']}>
                    <div className={styles['info-item']}>
                        <p className={styles['info-label']}>Hosted by</p>
                        {data?.host === '' ?
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                <p>{data?.host}</p>
                            </div>
                        }
                    </div>
                    <div className={styles['info-item']}>
                        <p className={styles['info-label']}>Description</p>
                    </div>
                    {data?.desc === '' ?
                        <Skeleton animation='wave' width={220} height={300} />
                        :
                        <div className={styles.InfoData}>
                            <p className={styles.desc}>{data?.desc}</p>
                        </div>
                    }
                </div>
            </div>
            {userType === 'organizer' &&
                <div className={styles.section}>
                    <div className={styles['section-label']}>
                        <QueryStatsIcon sx={{ color: '#a70000', p: '0', scale: '0.8' }} /> Event Statistics
                    </div>
                    <div className={styles['info-section']}>
                        <div className={styles['info-item']}>
                            <b>Visibility</b>                             
                            <div className={styles.infoData}>
                                <p>{data?.visibility}</p>
                            </div>
                        </div>

                        <div className={styles['info-item']}>
                            <b>Attendees</b> 
                            <div className={styles.infoData}>
                                <p>{data?.attendees.length}</p>
                            </div>
                        </div>

                        <div className={styles['info-item']}>
                        {/* Display of Attendee name and degree program */}
                            {attendeeList.map((attendee, index) => (
                                <div className={styles['attendee-list']} key={index}>
                                    <div className={styles['attendee-name']}>
                                        <p> {attendee.fullName} </p>
                                    </div>
                                    <div className={styles['attendee-course']}>
                                        <p> 
                                            {
                                                attendee.degreeProgram  === 'cs' ? 'BSCS'
                                                : attendee.degreeProgram  === 'amat' ? 'BSAM'
                                                : attendee.degreeProgram  === 'bio' ? 'BSB'
                                                : attendee.degreeProgram  === 'ft' ? 'BFT'
                                                : attendee.degreeProgram  === 'bae' ? 'BAE'
                                                : attendee.degreeProgram  === 'bacma' ? 'BACMA'
                                                : attendee.degreeProgram === 'anthro' ? 'BAA'
                                                : attendee.degreeProgram  === 'bsa' ? 'BSA'
                                                : attendee.degreeProgram  === 'bss' ? 'BSS'
                                                : attendee.degreeProgram  === 'abe' ? 'BSABE' 
                                                : 'Select your degree program'
                                            }
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
            {userType === 'organizer' &&
                <div className={styles['small-button-wrapper']}>
                    <Link className={styles.buttonM} href={`/event/${id}/edit`}>Edit</Link>
                    {
                        isCoOwner === false &&
                        <button className={styles.buttonM} onClick={deleteEvent}>Delete</button>
                    }

                </div>
            }
        </div>
    )
}