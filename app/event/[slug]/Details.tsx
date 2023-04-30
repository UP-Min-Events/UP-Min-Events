'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUserTypeContext } from '../../UserTypeProvider'
import { db } from '../../../firebaseConfig'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'

const inter = Inter({ subsets: ['latin']})

interface EditedEvent {
    name: string;
    desc: string;
}

export default function Details({ id } : { id: string }){

    const { userType } = useUserTypeContext()
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState<unknown>(null)
    const [editedEvent, setEditedEvent] = useState<EditedEvent>({ name: "", desc: "" });
    const router = useRouter()
    
    const getDetails = async () => {
        const docRef = doc(db, 'events', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setData(docSnap.data())
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
        <div className={inter.className}>

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
                <div>
                    <h1>{data?.name}</h1>
                    <p>{data?.desc}</p>
                </div>
            )}
            
            <p>{data?.date}</p>
            <p>{data?.time}</p>
            <p>{data?.attendees}</p>
            <p>{data?.id}</p>
            <Image 
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${id}&size=200x200`} 
                alt={data?.name} 
                width="200" 
                height="200" 
                priority
            />

            { userType === 'organizer' && <div>
                {!editing ? (
                    <button type="button" onClick={() => setEditing(true)}>
                        Edit
                    </button>) : (
                    <button type="button" onClick={updateEvent}>
                        Save
                    </button>)
                }
                <button onClick={deleteEvent}>Delete</button>
            </div>}

        </div>
    )
}