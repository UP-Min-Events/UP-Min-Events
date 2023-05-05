'use client'

import Link from 'next/link'
import { Button } from '@mui/material'

export default function CreateButton() {
    return(
        <div>
            <Link href="/create">
                <Button variant="text" 
                        sx={{
                            backgroundColor: '#a70000',
                            display: 'flex',
                            position: 'fixed',
                            bottom: '3em',
                            width: '80%',
                            height: '3.5em',
                            borderRadius: '1.75em',
                            boxShadow: '0 0 5px 0 rgba(0,0,0,0.5)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            color: 'white',
                        }}
                    >
                        Create Event
                </Button> 
            </Link>
        </div>
    )
}