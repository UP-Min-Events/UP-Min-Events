import Ops from './ops'
import Link from 'next/link'

export default function Auth(){
    return (
        <div>
            <h1>Auth</h1>
            <Link href="/">Home</Link>
            <Ops />
        </div>
    )
}