import { db } from '@/firebaseConfig'
import { collection, doc, getDoc } from 'firebase/firestore'

const eventsCollection = collection(db, 'events')
const attendeesCollection = collection(db, 'attendees')
const organizersCollection = collection(db, 'organizers')

export async function getEvent(id : string) {

    const event = doc(eventsCollection, 'event', id)
    const docSnap = await getDoc(event)

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log('No such document!')
    }
} 

export async function getAttendee(id : string) {
    const attendees = doc(attendeesCollection, 'attendees', id)
    const docSnap = await getDoc(attendees)

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log('No such document!')
    }
}

export async function getOrganizer(id : string) {
    const organizers = doc(organizersCollection, 'organizers', id)
    const docSnap = await getDoc(organizers)

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log('No such document!')
    }
}