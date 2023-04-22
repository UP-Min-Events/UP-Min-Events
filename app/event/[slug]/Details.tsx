'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { collection, doc, getDoc, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import Link from 'next/link'

interface EditedEvent {
    name: string;
    desc: string;
}

export default function Details({ id } : { id: string }){

    const [editing, setEditing] = useState(false);
    const [data, setData] = useState<any>(null)
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
        <div>

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
    )
}