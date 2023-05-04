import Link from 'next/link'
import Details from './Details'

export default function Page({ 
    params,
 }:{
    params: { slug: string }
 }) {
    
    return (
        <div>
            <Details id={params.slug}/>
        </div>
    )
}