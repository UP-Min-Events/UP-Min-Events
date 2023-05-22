import LoginOps from './LoginOps'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin']})

export const metadata = {
    title: 'Login',
    description: 'Login using your UP Mail account.',
}

export default function Auth(){
    return (
        <LoginOps />
    )
}