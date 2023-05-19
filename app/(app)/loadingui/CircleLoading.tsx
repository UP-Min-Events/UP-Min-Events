'use client'

import { CircularProgress } from '@mui/material'

export default function CircleLoading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress color='error' size='6rem' thickness={3.6} />
        </div>
    )
}