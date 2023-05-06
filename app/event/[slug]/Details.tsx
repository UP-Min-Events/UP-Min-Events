'use client'

import { Inter } from 'next/font/google'
import styles from './page.module.css'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUserTypeContext } from '../../UserTypeProvider'
import { db } from '../../../firebaseConfig'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'

import EventNoteIcon from '@mui/icons-material/EventNote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link' 

const inter = Inter({ subsets: ['latin']})

interface Props {
    id: string,
}

interface Data {
    name: string;
    desc: string;
    date: string;
    time: string;
    attendees: string[];
    id: string;
}

export default function Details({ id } : Props){

    const { userType } = useUserTypeContext()
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState<Data>({ name: "", desc: "", date: "", time: "", attendees: [], id: "" })
    const [editedEvent, setEditedEvent] = useState<Data>({ name: "", desc: "", date: "", time: "", attendees: [], id: "" });
    const router = useRouter()
    
    const getDetails = async () => {
        const docRef = doc(db, 'events', id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
            setData(docSnap.data() as Data)
        } else {
            window.alert('No such document!')
        }
    }

    const updateEvent = async () => {
        const eventRef = doc(db, 'events', id);
      
        await updateDoc(eventRef, {
          name: editedEvent.name,
          desc: editedEvent.desc
        });

        setEditing(false);
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
            <div id={styles.backButton}>
                <Link href="/">        
                    <ArrowBackIcon sx={{ scale: '125%', left: '0', color: '#a70000', fontWeight: 'bold', padding: '0', mb: '1em' }} /> 
                </Link>
            </div>
            
            { editing ? (
                <div>
                    <input
                        type="text"
                        value={editedEvent.name}
                        onChange={(e) =>
                            setEditedEvent({ ...editedEvent, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        value={editedEvent.desc}
                        onChange={(e) =>
                            setEditedEvent({ ...editedEvent, desc: e.target.value })
                        }
                    />
                </div>
            ) : (
                <div id={styles.header}>
                    <h1>{data?.name}</h1>
                    <p>Status: Status</p>
                    <div id={styles.divider}> </div>
                    <p>{data?.desc}</p>
                </div>
            )}
            <div id={styles.schedule}>
                <h3> <EventNoteIcon /> Schedule </h3>
                <div id={styles.container}>
                    <div className={styles.scheduleItem}>
                        <b>Date</b> {data?.date}
                    </div>
                    <div className={styles.scheduleItem}>
                        <b>Time</b> {data?.time}
                    </div>
                    <div className={styles.scheduleItem}>
                        <b>Venue</b> 
                    </div>
                    {/* <div className={styles.scheduleItem}>
                        <p>{data?.attendees}</p>
                    </div>
                    <div className={styles.scheduleItem}>
                        <p>{data?.id}</p>
                    </div> */}
                </div> 
            </div>
            <div id={styles.info}>
                <h3> <EventNoteIcon /> About this Event </h3>
                <div id={styles.container}>
                    <div className={styles.scheduleItem}>   
                        <b>Hosted by</b> Host
                    </div>
                    <p> {data.desc} </p>
                </div>
            </div>
            { userType === 'organizer' && 
                <div id={styles.stats}>
                    <h3> <InfoIcon /> Statistics </h3>
                    <div id={styles.container}>
                    </div>
                </div>
            }
            { userType === 'organizer' && 
                <div>
                    {!editing ? (
                        <button type="button" onClick={() => setEditing(true)}>
                            Edit
                        </button>) : (
                        <button type="button" onClick={updateEvent}>
                            Save
                        </button>)
                    }
                    <button onClick={deleteEvent}>Delete</button>
                </div>
            }

        </div>
    )
}