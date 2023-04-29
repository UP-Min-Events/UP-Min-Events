'use client'

import '../globals.css'
import { Inter } from 'next/font/google'
import { Button } from '@mui/material'

import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link'


const inter = Inter({ subsets: ['latin']})

export default function Page() {
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

            <h2> Let's get to know you.</h2>

            <div>
                <p>First Name</p>
                <input type="text" />
            </div>
            <div>
                <p>Last Name</p>
                <input type="text" />
            </div>
            <div>
                <p>Student Number</p>
                <input type="text" />
            </div>
            <p>Year Level</p>
            <div id="inputDropdown">
                <select>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                </select>
            </div>
            <p>College/Department</p>
            <div id="inputDropdown">
                <select>
                    <option value="">College of Science and Mathematics</option>
                    <option value="">College of Humanities and Social Sciences</option>
                    <option value="">School of Management</option>
                    <option value="">Department of Human Kinetics</option>
                </select>
            </div>
            <p>Degree Program</p>
            <div id="inputDropdown">
                <select>
                    <option value="">BS in Computer Science</option>
                    <option value="">BS in Applied Mathematics</option>
                    <option value="">BS in Biology</option>
                    <option value="">BS in Food Technology</option>
                </select>
            </div>
            <div id="terms">
                <input type="checkbox" name="" id="" /> I agree with the Terms and Conditions.
            </div>
            <Button variant="text" className={inter.className} // onClick={}
                    sx={{
                        mx: 'auto',
                        backgroundColor: '#a70000',
                        color: '#fff',
                        fontWeight: 'bold',
                        width: '12em',
                        borderRadius: '1em',
                        mt: '3em'
                    }}>
                    Finish
                </Button> 
        </div>
    )
}