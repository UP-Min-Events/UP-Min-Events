import './globals.scss'
import { Inter } from 'next/font/google'
import { UserTypeProvider } from './UserTypeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UPMin Events',
  description: 'An event management system.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='app-wrapper'>
          <UserTypeProvider>
            {children}
          </UserTypeProvider>
        </div>
      </body>
    </html>
  )
}
