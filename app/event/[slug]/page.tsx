import EventClient from './EventClient'

export default function Page({ 
    params,
 }:{
    params: { slug: string }
 }) {
    
    return (
        <div>
            <EventClient id={params.slug} />
        </div>
    )
}