'use client'

import styles from './page.module.css'
import Link from 'next/link' 
import { Inter } from 'next/font/google'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUserTypeContext } from '../../UserTypeProvider'
import { db } from '../../../firebaseConfig'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'

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

interface Editing {
    name: boolean;
    desc: boolean;
    date: boolean;
    time: boolean;
    venue: boolean;
    host: boolean;
    visibility: boolean;
}

export default function Details({ id } : Props){

    const { userType } = useUserTypeContext()
    const router = useRouter()

    const [editing, setEditing] = useState<Editing>({
        name: false,
        desc: false,
        date: false,
        time: false,
        venue: false,
        host: false,
        visibility: false,
    });

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

    const updateEvent = async (field : string) => {
        const eventRef = doc(db, 'events', id);
      
        await updateDoc(eventRef, {
          [field]: data[field as keyof Data],
        });

        setEditing({...editing, [field]: false});
        getDetails();
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
                    { !editing.name ? 
                        <>
                            { data?.name === '' ?
                                <Skeleton animation='wave' width={220} height={70} />
                                :
                                <>
                                    <h1>{data?.name}</h1>
                                    { userType === 'organizer' &&
                                        <button onClick={() => {
                                            setEditing({...editing, name: true})
                                        }}>
                                            Edit Icon
                                        </button>
                                    }
                                </>
                            }
                        </>
                        : 
                        <>
                            <input 
                                type="text" 
                                value={data?.name} 
                                placeholder={data?.name}
                                onChange={(e) => {
                                    setData({...data, name: e.target.value})
                                }} 
                            />
                            <button onClick={() =>{
                                updateEvent('name')
                            }}>
                                Save Icon
                            </button>
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
                                { !editing.date ?
                                    <>
                                        <p>{data?.date}</p>
                                        { userType === 'organizer' && 
                                            <button onClick={() => {
                                                setEditing({...editing, date: true})
                                            }}>
                                                Edit Icon
                                            </button>
                                        }
                                    </>
                                    :
                                    <>
                                        <input
                                            type="date"
                                            value={data?.date}
                                            placeholder={data?.date}
                                            onChange={(e) => {
                                                setData({...data, date: e.target.value})
                                            }}
                                        />
                                        <button onClick={() =>{
                                            updateEvent('date')
                                        }}>
                                            Save Icon
                                        </button>
                                    </>
                                }
                            </div>
                        }
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Time</p>
                        { data?.time === '' ? 
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                { !editing.time ?
                                    <>
                                        <p>{data?.time}</p>
                                        { userType === 'organizer' && 
                                            <button onClick={() => {
                                                setEditing({...editing, time: true})
                                            }}>
                                                Edit Icon
                                            </button>
                                        }
                                    </>
                                    :
                                    <>
                                        <input
                                            type="time"
                                            value={data?.time}
                                            placeholder={data?.time}
                                            onChange={(e) => {
                                                setData({...data, time: e.target.value})
                                            }}
                                        />
                                        <button onClick={() =>{
                                            updateEvent('time')
                                        }}>
                                            Save Icon
                                        </button>
                                    </>
                                }
                            </div>
                        }
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Venue</p>
                        { data?.venue === '' ?
                            <Skeleton animation='wave' width={110} />
                            :
                            <div className={styles.infoData}>
                                { !editing.venue ?
                                    <>
                                        <p>{data?.venue}</p>
                                        { userType === 'organizer' && 
                                            <button onClick={() => {
                                                setEditing({...editing, venue: true})
                                            }}>
                                                Edit Icon
                                            </button>
                                        }
                                    </>
                                    :
                                    <>
                                        <input
                                            type="text"
                                            value={data?.venue}
                                            placeholder={data?.venue}
                                            onChange={(e) => {
                                                setData({...data, venue: e.target.value})
                                            }}
                                        />
                                        <button onClick={() =>{
                                            updateEvent('venue')
                                        }}>
                                            Save Icon
                                        </button>
                                    </>
                                }
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
                                { !editing.host ?
                                    <>
                                        <p>{data?.host}</p>
                                        { userType === 'organizer' && 
                                            <button onClick={() => {
                                                setEditing({...editing, host: true})
                                            }}>
                                                Edit Icon
                                            </button>
                                        }
                                    </>
                                    :
                                    <>
                                        <input
                                            type="text"
                                            value={data?.host}
                                            placeholder={data?.host}
                                            onChange={(e) => {
                                                setData({...data, host: e.target.value})
                                            }}
                                        />
                                        <button onClick={() =>{
                                            updateEvent('host')
                                        }}>
                                            Save Icon
                                        </button>
                                    </>
                                }
                            </div>
                        }
                    </div>
                    <div>
                        <div className={styles.infoItem}>
                            <p className={styles.infoLabel}>Description</p>
                            { !editing.desc ?
                                <>
                                    { userType === 'organizer' &&
                                        <button onClick={() =>  {
                                            setEditing({...editing, desc: true})
                                        }}>
                                            Edit Icon
                                        </button>
                                    }
                                </>
                                : 
                                <>
                                    <button onClick={() => {
                                        updateEvent('desc')
                                    }}>Save Icon</button>    
                                </>
                            }
                        </div>
                        { data?.desc === '' ?
                            <Skeleton animation='wave' width={220} height={300} />
                            :
                            <div>
                                { !editing.desc ?
                                    <>
                                        <p>{data?.desc}</p>
                                    </>
                                    :
                                    <>
                                        <textarea
                                            value={data?.desc}
                                            placeholder={data?.desc}
                                            onChange={(e) => {
                                                setData({...data, desc: e.target.value})
                                            }}
                                        />
                                    </>
                                }
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
                                { !editing.visibility ?
                                    <>
                                        <p>{data?.visibility}</p>
                                        <button onClick={() => {
                                            setEditing({...editing, visibility: true})
                                        }}>
                                            Edit Icon
                                        </button>
                                    </>
                                    :
                                    <>
                                        <select
                                            value={data?.visibility}
                                            onChange={(e) => {
                                                setData({...data, visibility: e.target.value})
                                            }}
                                        >
                                            <option value="Public">Public</option>
                                            <option value="Private">Private</option>
                                        </select>
                                        <button onClick={() =>{
                                            updateEvent('visibility')
                                        }}>
                                            Save Icon
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            { userType === 'organizer' && 
                <div>
                    <button onClick={deleteEvent}>Delete</button>
                </div>
            }
        </div>
    )
}