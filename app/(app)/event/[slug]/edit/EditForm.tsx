'use client'

import styles from './page.module.scss'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { db, auth } from '@/firebaseConfig'
import { doc, getDoc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore'

import { Skeleton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';

import { useAuthState } from 'react-firebase-hooks/auth'

const inter = Inter({ subsets: ['latin'] })

interface Event {
    name: string;
    host: string;
    desc: string;
    date: string;
    startTime: string;
    endTime: string;
    venue: string;
    visibility: string;
    coOwners: string[];
}

export default function EditForm({ id }: { id: string }) {

    const [user] = useAuthState(auth);
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<Event>({
        name: '',
        host: '',
        desc: '',
        date: '',
        startTime: '',
        endTime: '',
        venue: '',
        visibility: '',
        coOwners: []
    })

    const [coOwners, setCoOwners] = useState<string[]>([]);
    const [coOwnerPlaceholder, setCoOwnerPlaceholder] = useState<string>('')

    const handleCoOwnerChange = (index: number, value: string) => {
        const updatedCoOwner = [...coOwners];
        updatedCoOwner[index] = value;
        setCoOwners(updatedCoOwner);
    };

    const handleDeleteCoOwner = (index: number) => {
        const updatedCoOwner = [...coOwners];
        updatedCoOwner.splice(index, 1);
        setCoOwners(updatedCoOwner);
    };

    const handleAddCoOwner = async () => {
        if (coOwnerPlaceholder.trim() === '') {
            alert("Please input an email address");
            return;
        }

        if (coOwnerPlaceholder === user?.email) {
            alert('You are already the owner of this event')
            return;
        }
        
        if (coOwnerPlaceholder.trim() !== '') {
            const q = query(collection(db, "organizers"), where("emailAddress", "==", coOwnerPlaceholder));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                alert('User does not exist')
                return;
            } 
            setCoOwners([...coOwners, coOwnerPlaceholder]);
            setCoOwnerPlaceholder('');
        }
    };

    const getDetails = async () => {
        const docSnap = await getDoc(doc(db, 'events', id));
        const eventData = docSnap.data() as Event;
        setData(eventData);
        setLoading(false);
        if (eventData && eventData.coOwners) {
            setCoOwners(eventData.coOwners);
        }
    };

    const updateDetails = async () => {
        await updateDoc(doc(db, 'events', id),
            {
                name: data.name,
                host: data.host,
                desc: data.desc,
                date: data.date,
                startTime: data.startTime,
                endTime: data.endTime,
                venue: data.venue,
                visibility: data.visibility,
                coOwners: coOwners
            }
        )
    }

    useEffect(() => {
        getDetails()
    }, [])

    useEffect(() => {
        if (data && data.coOwners) {
            setCoOwners(data.coOwners);
        }
    }, [data])

    return (
        <div className={`${styles['form-wrapper']} ${inter.className}`}>
            <section className={styles.section}>
                <div className={styles['item-wrapper']}>
                    <div className={styles.label}>
                        <p>Title</p>
                    </div>
                    <div className={styles.input}>
                        {loading ?
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
                        {loading ?
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
                        {loading ?
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
                        {loading ?
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
                        <p>Start Time</p>
                    </div>
                    <div className={styles.input}>
                        {loading ?
                            <Skeleton variant='text' width='100%' height='100%' animation='wave' />
                            :
                            <input
                                className={inter.className}
                                type='time'
                                value={data.startTime}
                                onChange={(e) => setData({ ...data, startTime: e.target.value })}
                            />
                        }
                    </div>
                </div>
                <div className={styles['item-wrapper']}>
                    <div className={styles.label}>
                        <p>End Time</p>
                    </div>
                    <div className={styles.input}>
                        {loading ?
                            <Skeleton variant='text' width='100%' height='100%' animation='wave' />
                            :
                            <input
                                className={inter.className}
                                type='time'
                                value={data.endTime}
                                onChange={(e) => setData({ ...data, endTime: e.target.value })}
                            />
                        }
                    </div>
                </div>
                <div className={styles['item-wrapper']}>
                    <div className={styles.label}>
                        <p>Venue</p>
                    </div>
                    <div className={styles.input}>
                        {loading ?
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
                        {loading ?
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
                <div className={styles['item-wrapper']}>
                    <div className={styles.label}>
                        <p>Co-Owner</p>
                    </div>
                    <div className={styles.input}>
                        {coOwners !== undefined && coOwners.map((coOwner, index) => (
                            <>
                                <input
                                    className={inter.className}
                                    type="text"
                                    placeholder={coOwner}
                                    value={coOwner}
                                    onChange={(e) => handleCoOwnerChange(index, e.target.value)}
                                />
                                <div className={styles['org-button']}>
                                    <button onClick={() => handleDeleteCoOwner(index)}>
                                        <RemoveIcon sx={{ scale: '0.75', color: '#a70000', p: '0' }} />
                                    </button>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <div className={styles['item-wrapper']}>
                    <div className={styles.label}>
                        <p>Add Co-Owner</p>
                    </div>
                    <div className={styles.input}>
                        <input
                            className={inter.className}
                            type="text"
                            value={coOwnerPlaceholder}
                            onChange={(e) => setCoOwnerPlaceholder(e.target.value)}
                        />
                        <div className={styles['org-button']}>
                            <button onClick={handleAddCoOwner}>
                                <AddIcon sx={{ scale: '0.75', color: '#a70000', p: '0' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className={styles['save-wrapper']}>
                <button onClick={() => {
                    updateDetails()
                    router.push(`/event/${id}`)
                }}>Save</button>
            </div>
        </div>
    )
}