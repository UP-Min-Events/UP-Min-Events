import { db } from '@/firebaseConfig'
import { doc, deleteDoc } from 'firebase/firestore'

export async function deleteEvent(id : string) {
    await deleteDoc(doc(db, 'events', id))
}