'use client'

import styles from '../page.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useState, useEffect } from 'react'
import { auth, db } from '../../../../firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'


export default function Organization() {
     const [user] = useAuthState(auth);
     const id = user?.uid;

     const [newOrganization, setNewOrganization] = useState<string>('');
     const [organizations, setOrganizations] = useState<string[]>([]);

     const getDetails = async () => {
          const docRef = doc(db, 'organizers', `${id}`);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
               const data = docSnap.data();
               if (data && data.affiliatedOrganization) {
                    setOrganizations(data.affiliatedOrganization);
               }
          }
     };

     useEffect(() => {
          getDetails();
     }, []);

     const handleOrganizationChange = (index: number, value: string) => {
          const updatedOrganizations = [...organizations];
          updatedOrganizations[index] = value;
          setOrganizations(updatedOrganizations);
     };

     const handleDeleteOrganization = (index: number) => {
          const updatedOrganizations = [...organizations];
          updatedOrganizations.splice(index, 1);
          setOrganizations(updatedOrganizations);
     };

     const handleAddOrganization = () => {
          if (newOrganization.trim() !== '') {
               setOrganizations([...organizations, newOrganization]);
               setNewOrganization('');
          }
     };

     const handleSave = async () => {
          const docRef = doc(db, 'organizers', `${id}`);
          await updateDoc(docRef, { affiliatedOrganization: organizations });
     };

     return (
          <>
               <div className={styles.nav}>
                    <Link href="/settings">
                         <ArrowBackIcon sx={{ scale: '125%', color: '#a70000', p: '0' }} />
                    </Link>
                    <button className={styles['save-setting']} onClick={handleSave}>
                         Save
                    </button>
               </div>
               <div>Organization</div>
               {organizations.map((org, index) => (
                    <div key={index}>
                         <input
                              type="text"
                              value={org}
                              onChange={(e) => handleOrganizationChange(index, e.target.value)}
                         />
                         <button onClick={() => handleDeleteOrganization(index)}>Delete</button>
                    </div>
               ))}
               <div>
                    <input
                         type="text"
                         value={newOrganization}
                         onChange={(e) => setNewOrganization(e.target.value)}
                    />
                    <button onClick={handleAddOrganization}>Add Organization</button>
               </div>
          </>
     );
}