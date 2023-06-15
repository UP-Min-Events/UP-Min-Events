'use client'

import styles from './page.module.css'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUserTypeContext } from '@/app/providers/UserTypeProvider'
import { db } from '@/firebaseConfig'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'

import Dialog from '@mui/material/Dialog';

import { Skeleton } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Collapse from '@mui/material/Collapse';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Status from './Status'
import QR from './QR'

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
    date: Date;
    startTime: string;
    endTime: string;
    venue: string;
    host: string;
    visibility: string;
    owner: string;
    attendees: { attendee: string; dateTime: string }[];
}

export default function Details({ id }: Props) {

    const [user] = useAuthState(auth)
    const { userType } = useUserTypeContext()
    const router = useRouter()
    const [showQR, setShowQR] = useState(false)
    const [confirmDelete, setDelete] = useState(false)
    const [showList, setShowList] = useState(false);
  
    const [data, setData] = useState<Data>({
        id: "",
        name: "",
        desc: "",
        date: new Date(),
        startTime: "",
        endTime: "",
        venue: "",
        host: "",
        visibility: "",
        owner: "",
        attendees: [],
    })

    const handleShowQR = () => {
        setShowQR(true)
    }

    const handleShowDetails = () => {
        setShowQR(false)
    }

    const handleDelete = () => {
        setDelete(true)
    }

    const handleCancelDelete = () => {
        setDelete(false)
    }

    const showAttendeeList = () => {
        setShowList((prev => !prev));
    };

    const [formattedStartTime, setFormattedStartTime] = useState<string | undefined>("");
    const [formattedEndTime, setFormattedEndTime] = useState<string | undefined>("");
    const [isCoOwner, setIsCoOwner] = useState<boolean>(false);
    const [attendeeList, setAttendeeList] = useState<{ fullName: string, degreeProgram: string, attendanceDetails: string }[]>([]);

    const date = data.date
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    const getDetails = async () => {
        const docRef = doc(db, 'events', id)
        const docSnap = await getDoc(docRef)

        setData(docSnap.data() as Data);

        if (docSnap.exists()) {
            setData({ 
                id: docSnap.id,
                name: docSnap.data().name,
                desc: docSnap.data().desc,
                date: docSnap.data().date.toDate(),
                startTime: docSnap.data().startTime,
                endTime: docSnap.data().endTime,
                venue: docSnap.data().venue,
                host: docSnap.data().host,
                visibility: docSnap.data().visibility,
                owner: docSnap.data().owner,
                attendees: docSnap.data().attendees,
            } as Data)
        }

        if (docSnap.data()?.coOwners !== undefined) {
            if (docSnap.data()?.coOwners.includes(user?.email)) {
                setIsCoOwner(true);
            }
        }

    }

    const handleAttendeeList = async () => {
        for (const attendee of data.attendees) {
            const docSnap = await getDoc(doc(db, 'attendees', attendee.attendee));
            setAttendeeList((prev: { fullName: string, degreeProgram: string, attendanceDetails: string }[]) => [
                ...prev,
                {
                    fullName: `${docSnap.data()?.lastName}, ${docSnap.data()?.firstName}`,
                    degreeProgram: docSnap.data()?.program,
                    attendanceDetails: attendee.dateTime
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
            { showQR ?
                <>
                    <div className={styles.nav}>
                        <ArrowBackIcon onClick={handleShowDetails} sx={{ color: '#a70000', scale: '150%' }} />
                    </div>
                    <QR 
                        id={id} 
                    /> 
                </>
                :
                <>
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
                                {data?.date === undefined ?
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
                                <Skeleton animation='wave' width={300} height={200} />
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
                                    <p className={styles['attendee-dropdown']}> Attendees <ArrowDropDownIcon sx={{ color: '#a70000' }} onClick={showAttendeeList} /> </p> 
                                    <div className={styles.infoData}>
                                        <p>{data?.attendees.length}</p>
                                    </div>
                                </div>

                                {/* Display of Attendee name and degree program */}
                                <Collapse in={showList}>
                                    {attendeeList.map((attendee, index) => (
                                        <div className={styles['attendee-list']} key={index}>
                                            <div className={styles['attendee-name']}>
                                                <p> 
                                                    {
                                                        attendee.fullName !== undefined ? attendee.fullName 
                                                        : 'Unknown Attendee'
                                                    }    
                                                </p>
                                            </div>
                                            <div className={styles['attendee-course']}>
                                                <p> 
                                                    {
                                                        attendee.degreeProgram  === 'cs' ? 'BSCS'
                                                        : attendee.degreeProgram  === 'amat' ? 'BSAM'
                                                        : attendee.degreeProgram  === 'bio' ? 'BSB'
                                                        : attendee.degreeProgram  === 'ft' ? 'BSFT'
                                                        : attendee.degreeProgram  === 'bae' ? 'BAE'
                                                        : attendee.degreeProgram  === 'bacma' ? 'BACMA'
                                                        : attendee.degreeProgram === 'anthro' ? 'BAA'
                                                        : attendee.degreeProgram  === 'bsa' ? 'BSA'
                                                        : attendee.degreeProgram  === 'bss' ? 'BSS'
                                                        : attendee.degreeProgram  === 'abe' ? 'BSABE' 
                                                        : '-'
                                                    } | {attendee.attendanceDetails}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </Collapse>
                            </div>
                        </div>
                    }
                    {
                        userType === 'organizer' &&
                        (data?.owner === user?.uid || isCoOwner === true) &&

                        <>
                            <div className={styles['small-button-wrapper']}>
                                <Link className={styles.buttonM} href={`/event/${id}/edit`}>Edit</Link>
                                {
                                    isCoOwner === false &&
                                    <button className={styles.buttonM} onClick={handleDelete}>Delete</button>
                                }
                                <Dialog className={styles['confirm-delete']} open={confirmDelete} onClose={handleCancelDelete}>
                                    <h2> Delete this event? </h2>
                                        <p> This event will be gone forever. </p>
                                    <div className={styles['dialog-button-wrapper']}>
                                        <button className={styles.cancel} onClick={handleCancelDelete}>Cancel</button>
                                        <button className={styles.delete} onClick={deleteEvent}>Delete</button>
                                    </div>
                                </Dialog>
                            </div>
                            <div className={styles['button-wrapper']}>
                                <button className={styles.buttonL} onClick={handleShowQR}>
                                    <QrCodeScannerIcon /> <h2> Show QR </h2>
                                </button> 
                            </div>
                        </>
                    }
                </>
            }
        </div>
    )
}