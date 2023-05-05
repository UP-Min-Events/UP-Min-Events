import EventClient from './EventClient'

export default function Page({ 
    params,
 }:{
    params: { slug: string }
 }) {
    
    return <EventClient id={params.slug} />
}