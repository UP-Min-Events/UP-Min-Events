import '../../globals.scss'
import styles from './page.module.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function ScanLayout(
    { children }: { children: React.ReactNode }
){
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles['page-wrapper']}>
          {children}
        </div>
      </body>
    </html>
  )
}