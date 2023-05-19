import EventClient from './EventClient'

import { db } from '@/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

export async function generateMetadata({ params } : { 
params: { slug: string } 
}) {
    const docSnap = await getDoc(doc(db, 'events', `${params.slug}`))
    const event = docSnap.data()

    return {
        title: event?.name || 'Event',
        description: event?.desc || 'Event Description',
    }
}

export default function Page({ 
    params,
}:{
    params: { slug: string }
}) {
    return <EventClient id={params.slug} />
}