import { db } from '@/firebaseConfig'
import { doc, getDoc, getDocs, collection } from 'firebase/firestore'

export async function getEvents() {
    const docSnap = await getDocs(collection(db, 'events'))
    return docSnap.docs.map(doc => doc.data())
}

export async function getAttendees() {
    const docSnap = await getDocs(collection(db, 'attendees'))
    return docSnap.docs.map(doc => doc.data())
}

export async function getOrganizers() {
    const docSnap = await getDocs(collection(db, 'organizers'))
    return docSnap.docs.map(doc => doc.data())
}

export async function getEvent(id : string) {

    const event = doc(db, 'events', id)
    const docSnap = await getDoc(event)

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log('No such document!')
    }
} 

export async function getAttendee(id : string) {
    const attendees = doc(db, 'attendees', id)
    const docSnap = await getDoc(attendees)

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log('No such document!')
    }
}

export async function getOrganizer(id : string) {
    const organizers = doc(db, 'organizers', id)
    const docSnap = await getDoc(organizers)

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log('No such document!')
    }
}