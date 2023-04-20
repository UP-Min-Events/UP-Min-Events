import Link from 'next/link'
import Details from './Details'
import { Suspense } from 'react' 

export default function Page({ 
    params,
 }:{
    params: { slug: string }
 }) {
    
    return (
        <div>
            <Link href="/">Home</Link>
            <Details id={params.slug}/>
        </div>
    )
}