import Ops from './ops'
import Link from 'next/link'

export const metadata = {
    title: 'Auth',
}

export default function Auth(){
    return (
        <div>
            <h1>Log In</h1>
            <Ops />
        </div>
    )
}