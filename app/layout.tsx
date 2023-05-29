import Providers from '@/app/providers/Providers'

export default function RootLayout({children}: {children: React.ReactNode}){
    return (
        <html lang='en'>
            <Providers>
                <body>
                    {children}
                </body>
            </Providers>
        </html>
    )
}