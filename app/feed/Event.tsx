import Link from 'next/link'

interface Props {
    id: string,
    name: string,
    date: string,
    time: string
}

export default function Event({ id, name, date, time } : Props){
    return (
        <Link href={`/feed/event/${id}`}>
          
            <h2>{name}</h2>
            <p>{date}</p>
            <p>{time}</p>
      
        </Link>
    )
}