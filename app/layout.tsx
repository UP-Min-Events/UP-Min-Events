import Providers from '@/app/providers/Providers'
import Head from 'next/head'

export const metadata = {
    manifest: "/manifest.json",
    themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link
                    rel="icon"
                    href="/icon?<generated>"
                    type="image/<generated>"
                    sizes="<generated>"
                />
                <link
                    rel="apple-touch-icon"
                    href="/apple-icon?<generated>"
                    type="image/<generated>"
                    sizes="<generated>"
                />
            </Head>
            <Providers>
                <body>
                    {children}
                </body>
            </Providers>
        </html>
    )
}