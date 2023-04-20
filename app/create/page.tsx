import Ops from './ops'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Create() {
    return (
        <div>
            <Link href="/">
                Home
            </Link>
            <Ops />
        </div>
    )
}