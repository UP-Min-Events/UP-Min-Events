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

const inter = Inter({ subsets: ['latin']})

interface Props {
    id: string,
}

interface Data {
    id: string;
    name: string;
    desc: string;
    date: string;
    time: string;
    venue: string;
    host: string;
    visibility: string;
    attendees: string[];
}

export default function Details({ id } : Props){

    const { userType } = useUserTypeContext()
    const router = useRouter()

    const [data, setData] = useState<Data>({ 
        id: "", 
        name: "", 
        desc: "", 
        date: "", 
        time: "", 
        venue: "", 
        host: "" , 
        visibility: "", 
        attendees: [], 
    })
    
    
    const getDetails = async () => {
        const docRef = doc(db, 'events', id)
        const docSnap = await getDoc(docRef)
        
        setData(docSnap.data() as Data)
    }

    const deleteEvent = async () : Promise<void> => {
        const eventRef = doc(db, 'events', id)
        await deleteDoc(eventRef)
        router.push("/")
    }

    useEffect(() => {
        getDetails()
    }, [])

    return (
        <div className={`${inter.className} ${styles.container}`}>    
            <div className={styles.nav}>
                <Link href="/">        
                    <ArrowBackIcon sx={{ scale: '150%', color: '#a70000', p: '0' }}/> 
                </Link>
            </div>
        
            <div className={styles.header}>
                <div className={styles.eventNameContainer}>
                    { data?.name === '' ?
                        <Skeleton animation='wave' width={220} height={70} />
                        :
                        <>
                            <h1>{data?.name}</h1>
                        </>
                    }
                </div>
                <p>Status: Status</p>
                <div className={styles.divider}></div>
            </div>
            <div className={styles.schedule}>
                <h3> <EventNoteIcon /> Schedule </h3>
                <div className={styles.infoContainer}>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Date</p>
                        { data?.date === '' ?
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                <p>{data?.date}</p>
                            </div>
                        }
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Time</p>
                        { data?.time === '' ? 
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                <p>{data?.time}</p>
                            </div>
                        }
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Venue</p>
                        { data?.venue === '' ?
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                <p>{data?.venue}</p>
                            </div>
                        }
                    </div>
                </div> 
            </div>
            <div className={styles.info}>
                <h3> <InfoIcon /> About this Event </h3>
                <div className={styles.infoContainer}>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Hosted by</p>
                        { data?.host === '' ?
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
                        { data?.desc === '' ?
                            <Skeleton animation='wave' width={220} height={300} />
                            :
                            <div>
                                <p>{data?.desc}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            { userType === 'organizer' && 
                <div id={styles.stats}>
                    <h3> <QueryStatsIcon /> Statistics </h3>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoItem}>
                            <b>Attendees</b> {data?.attendees.length}
                        </div>
                        <div className={styles.infoItem}>
                            <b>Time</b> {data?.time}
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
            { userType === 'organizer' && 
                <div>
                    <Link href={`/event/${id}/edit`}>Edit</Link>
                    <button onClick={deleteEvent}>Delete</button>
                </div>
            }
        </div>
    )
}