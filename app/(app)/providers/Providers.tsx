import { UserTypeProvider } from "./UserTypeProvider"
import { IsScanningProvider } from "./IsScanningProvider"

export default function Providers({ children } : { children: React.ReactNode}) {
    return (
        <UserTypeProvider>
            <IsScanningProvider>
                {children}
            </IsScanningProvider>
        </UserTypeProvider>       
    )
}