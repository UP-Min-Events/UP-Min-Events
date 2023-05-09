import { useState } from 'react';
import styles from './page.module.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  firstName: string;
  lastName: string;
  college: string;
  affiliatedOrganization: string[];
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setCollege: (college: string) => void;
  setAffiliatedOrganization: (affiliatedOrganization: string[]) => void;
}

export default function Organizer({
  firstName,
  lastName,
  college,
  affiliatedOrganization,
  setFirstName,
  setLastName,
  setCollege,
  setAffiliatedOrganization,
}: Props) {
  
  const [newOrganization, setNewOrganization] = useState('');

  const handleOrganizationChange = (index: number, value: string) => {
    const updatedOrganizations = [...affiliatedOrganization];
    updatedOrganizations[index] = value;
    setAffiliatedOrganization(updatedOrganizations);
  };

  const handleAddOrganization = () => {
    if (newOrganization.trim() !== '') {
      setAffiliatedOrganization([...affiliatedOrganization, newOrganization]);
      setNewOrganization('');
    }
  };

  const handleRemoveOrganization = (index: number) => {
    const updatedOrganizations = affiliatedOrganization.filter(
      (_, i) => i !== index
    );
    setAffiliatedOrganization(updatedOrganizations);
  };

  return (
    <div className={`${inter.className} ${styles.formBody}`}>
      <div>
        <p>First Name</p>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <p>Last Name</p>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <p>College/Department</p>
      <div id="inputDropdown">
        <select
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        >
          <option value="" disabled hidden></option>
          <option value="csm">College of Science and Mathematics</option>
          <option value="chss">
            College of Humanities and Social Sciences
          </option>
          <option value="som">School of Management</option>
        </select>
      </div>
      <p>Affiliated Organizations</p>
      <div>
        {affiliatedOrganization.map((org, index) => (
          <div key={index}>
            <input
              type="text"
              value={org}
              onChange={(e) => handleOrganizationChange(index, e.target.value)}
            />
            <button onClick={() => handleRemoveOrganization(index)}>
              Remove
            </button>
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
      </div>
    </div>
  );
}
