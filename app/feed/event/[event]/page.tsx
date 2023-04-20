import Link from 'next/link'
import Image from 'next/image'

import { collection, getDoc, getDocs, doc } from 'firebase/firestore'
import { db } from '../../../../firebaseConfig'

export async function generateStaticParams(){
    const dbInstance = collection(db, 'events')
    const querySnapshot = await getDocs(dbInstance)

    return querySnapshot.docs.map((event) => ({
        event: event.id
    }))
}

export default async function Page({ params } : {
    params: { event: string }
}){

    const { event } = params
    const docRef = doc(db, 'events', event)
    const docSnap = await getDoc(docRef)
    const data = docSnap.data()
    
    return(
        <div>
            <Link href="/feed">Back to Feed</Link>
            <h1>{data?.name}</h1>
            <p>{data?.desc}</p>
            <p>{data?.date}</p>
            <p>{data?.time}</p>
            <p>{data?.attendees}</p>
            <p>{data?.id}</p>
            <Image src={`https://api.qrserver.com/v1/create-qr-code/?data=${event}&size=200x200`} alt="qr" width={200} height={200} />
        </div>
    )
}