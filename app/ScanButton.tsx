'use client'

import Link from 'next/link'

import CropFreeIcon from '@mui/icons-material/CropFree';
import { Box, Container, IconButton } from '@mui/material';

export default function ScanButton(){
    return(
        <Container sx={{ justifyContent: 'center', display: 'flex' }}>
            <Box
                sx={{
                    backgroundColor: '#a70000',
                    display: 'flex',
                    position: 'fixed',
                    bottom: '3em',
                    width: '5em',
                    height: '5em',
                    borderRadius: '1.75em',
                    boxShadow: '0 0 5px 0 rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Link href="/scan">
                    <IconButton size="large"                                
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            fontWeight: 'bold',
                            scale: '250%',
                            color: 'white',
                        }}
                    > 
                        <CropFreeIcon sx={{ textAlign: 'center', display: 'flex' }}/> 
                    </IconButton>
                </Link>
            </Box>
        </Container>
    )
}