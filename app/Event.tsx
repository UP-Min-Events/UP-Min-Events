import Link from 'next/link'

export default function Event(props : Event){
    return (
        <Link href={`/`}>
            <h1>Title</h1>
        </Link>
    )
}