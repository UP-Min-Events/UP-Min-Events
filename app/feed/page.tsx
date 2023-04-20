import Event from './Event'

import { db } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

export default async function Page(){

    const dbInstance = collection(db, 'events')
    const querySnapshot = await getDocs(dbInstance)

    return(
        <div>
            
            <h1>Live Events</h1>    
            {querySnapshot.docs.map((event) => (
                <Event 
                    key={event.id} 
                    id={event.id}
                    name={event.data().name} 
                    date={event.data().date} 
                    time={event.data().time} 
                />
            ))}
    
        </div>
    )
}