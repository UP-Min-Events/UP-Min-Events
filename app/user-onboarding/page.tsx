'use client'

import '../globals.css'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { auth, db } from '../../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, updateDoc, query, collection, where, limit, getDocs } from 'firebase/firestore'


import { Button } from '@mui/material'
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link'

const inter = Inter({ subsets: ['latin']})

export default function Page() {

    const [user] = useAuthState(auth)
    const router = useRouter()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [studentNumber, setStudentNumber] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [college, setCollege] = useState('')
    const [program, setProgram] = useState('')

    const updateInfo = async () => {
        const q = query(collection(db, 'attendees'), where('uid', '==', user.uid), limit(1))
        const querySnapshot = await getDocs(q)
        const ref = doc(db, 'attendees', querySnapshot.docs[0].id)

        await updateDoc(ref, {
            firstName: firstName,
            lastName: lastName,
            studentNumber: studentNumber,
            yearLevel: yearLevel,
            college: college,
            program: program,
        })

        router.push('/')
    }


    return (
        <div id="form">

            <Link href="/"> 
                <IconButton size="large"
                    sx={{
                        position: 'absolute',
                        left: '2rem',
                        color: '#a70000',
                        fontWeight: 'bold',
                        transform: 'translateY(-50%)',
                    }}> 
                    <ArrowBackIcon /> 
                </IconButton> 
            </Link> 

            <h2>Let&apos;s get to know you.</h2>

            <div>
                <p>First Name</p>
                <input 
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)} 
                />
            </div>
            <div>
                <p>Last Name</p>
                <input 
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}     
                />
            </div>
            <div>
                <p>Student Number</p>
                <input 
                    type="text" 
                    value={studentNumber}
                    onChange={e => setStudentNumber(e.target.value)}
                />
            </div>
            <div id="inputDropdown">
                <p>Year Level</p>   
                <select value={yearLevel} onChange={e => setYearLevel(e.target.value)} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
            <div id="inputDropdown">
                <p>College/Department</p>
                <select value={college} onChange={e => setCollege(e.target.value)} >
                    <option value="csm">College of Science and Mathematics</option>
                    <option value="chss">College of Humanities and Social Sciences</option>
                    <option value="som">School of Management</option>
                </select>
            </div>
            <div id="inputDropdown">
                <p>Degree Program</p>
                <select value={program} onChange={e => setProgram(e.target.value)} >
                    <option value="cs">BS in Computer Science</option>
                    <option value="amat">BS in Applied Mathematics</option>
                    <option value="bio">BS in Biology</option>
                    <option value="ft">BS in Food Technology</option>
                </select>
            </div>
            <div id="terms">
                <input type="checkbox" name="" id="" /> I agree with the Terms and Conditions.
            </div>
            <Button 
                variant="text"  
                className={inter.className} 
                sx={{
                    mx: 'auto',
                    backgroundColor: '#a70000',
                    color: '#fff',
                    fontWeight: 'bold',
                    width: '12em',
                    borderRadius: '1em',
                    mt: '3em'
                }}
                onClick={updateInfo}
            >
                Finish
            </Button> 
        </div>
    )
}