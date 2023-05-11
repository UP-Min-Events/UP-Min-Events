'use client'

import styles from './page.module.scss'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'

import { db } from '../../../../firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { Skeleton } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

interface Event {
    name: string;
    host: string;
    desc: string;
    date: string;
    time: string;
    venue: string;
    visibility: string;
}

export default function EditForm({ id } : { id : string }){

    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<Event>({
        name: '',
        host: '',
        desc: '',
        date: '',
        time: '',
        venue: '',
        visibility: ''
    })

    const getDetails = async () => {
        const docSnap = await getDoc(doc(db, 'events', id))
        setData(docSnap.data() as Event)
        setLoading(false)
    }

    const updateDetails = async () => {
        await updateDoc(doc(db, 'events', id), 
            {
                name: data.name,
                host: data.host,
                desc: data.desc,
                date: data.date,
                time: data.time,
                venue: data.venue,
                visibility: data.visibility
            }
        )
    }

    useEffect(() => {
        getDetails()
    }, [])

    return (
        <form 
            className={`${styles['form-wrapper']} ${inter.className}`}
            onSubmit={updateDetails}
        >
            <section className={styles.section}> 
                <div className={styles['item-wrapper']}>
                    <div className={styles.label}>
                        <p>Title</p>
                    </div>
                    <div className={styles.input}>
                        { loading ?  
                            <Skeleton variant='text' width='100%' height='100%' animation='wave' />
                            :
                            <input 
                                className={inter.className}
                                type="text" 
                                placeholder={data.name}
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })} 
                            />
                        }
                    </div>
                </div>
                <div className={styles['item-wrapper']}>
                    <div className={styles.label}>
                        <p>Host</p>
                    </div>
                    <div className={styles.input}>
                        { loading ? 
                            <Skeleton variant='text' width='100%' height='100%' animation='wave' />  
                            :
                            <input 
                                className={inter.className}
                                type="text" 
                                placeholder={data.host}
                                value={data.host} 
                                onChange={(e) => setData({ ...data, host: e.target.value })}
                            />
                        }
                    </div>
                </div>
                <div className={styles['desc-wrapper']}>
                    <div className={styles.label}>
                        <p>Description</p>
                    </div>
                    <div className={styles.input}>
                        { loading ? 
                            <Skeleton variant='rounded' width='100%' height='100%' animation='wave' />
                            :
                            <textarea 
                                className={inter.className}
                                placeholder={data.desc}
                                value={data.desc}
                                onChange={(e) => setData({ ...data, desc: e.target.value })}
                            />
                        }
                    </div>
                </div>
            </section>
            <section className={styles.section}> 
                <div className={styles['item-wrapper']}>
                    <div className={styles.label}>
                        <p>Date</p>
                    </div>
                    <div className={styles.input}>
                        { loading ? 
                            <Skeleton variant='text' width='100%' height='100%' animation='wave' />
                            :
                            <input 
                                className={inter.className}
                                type='date' 
                                value={data.date} 
                                onChange={(e) => setData({ ...data, date: e.target.value })} 
                            />
                        }
                    </div>
                </div>
                <div className={styles['item-wrapper']}>
                    <div className={styles.label}>
                        <p>Time</p>
                    </div>
                    <div className={styles.input}>
                        { loading ? 
                            <Skeleton variant='text' width='100%' height='100%' animation='wave' />
                            :
                            <input 
                                className={inter.className}
                                type='time' 
                                value={data.time}
                                onChange={(e) => setData({ ...data, time: e.target.value })} 
                            />
                        }
                    </div>
                </div>
                <div className={styles['item-wrapper']}>
                    <div className={styles.label}>
                        <p>Venue</p>
                    </div>
                    <div className={styles.input}>
                        { loading ? 
                            <Skeleton variant='text' width='100%' height='100%' animation='wave' />
                            :
                            <input 
                                className={inter.className}
                                type="text" 
                                placeholder={data.venue}
                                value={data.venue}
                                onChange={(e) => setData({ ...data, venue: e.target.value })} 
                            />
                        }
                    </div>
                </div>
                <div className={styles['item-wrapper']}>
                    <div className={styles.label}>
                        <p>Visibility</p>
                    </div>
                    <div className={styles.input}>
                        { loading ? 
                            <Skeleton variant='text' width='100%' height='100%' animation='wave' />
                            :
                            <select 
                                className={inter.className}
                                value={data.visibility}
                                onChange={(e) => setData({ ...data, visibility: e.target.value })}    
                            >
                                <option value="Public" selected>Public</option>
                                <option value="Private">Private</option>
                            </select>
                        }
                    </div>
                </div>
            </section>
            <div className={styles['save-wrapper']}>
                <button type='submit'>Save</button>
            </div>
        </form>
    )
}