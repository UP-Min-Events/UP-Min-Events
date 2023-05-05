'use client'

import { CircularProgress } from '@mui/material'

export default function CircleLoading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </div>
    )
}