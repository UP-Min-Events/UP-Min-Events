import Link from 'next/link'

import PersonIcon from '@mui/icons-material/Person'
import { Button, Skeleton } from '@mui/material'

export default function Header({ firstName, lastName} : { firstName: string, lastName: string }) {
    return (
        <Link href="/settings"> 
            <Button variant="text" startIcon={<PersonIcon sx = {{ color: '#a70000', scale: '150%' }}/>}
                sx={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '18px'
                }}> 
                { firstName === "" ? 
                    <Skeleton animation='wave' width={110} />
                    :
                    (lastName + ", " + firstName[0] + '.')
                }
                
            </Button> 
        </Link>
    )
}