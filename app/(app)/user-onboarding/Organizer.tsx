import { useState } from 'react';
import styles from './page.module.scss'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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
    <>
      <div className={styles['form-item']}>
        <p>First Name</p>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className={styles['form-item']}>
        <p>Last Name</p>
        <input
          type="text"
          value={lastName}
           onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className={styles['form-item']}>
        <p>College/Department</p>
        <div className={styles.outline}>
          <select value={college} onChange={(e) => setCollege(e.target.value)}>
            <option value="" disabled hidden></option>
            <option value="csm">College of Science and Mathematics</option>
            <option value="chss">
              College of Humanities and Social Sciences
            </option>
            <option value="som">School of Management</option>
          </select>
        </div>
      </div>
      <div className={styles['form-item']}>
        <p>Affiliated Organizations</p>
        <div>
          <input
            type="text"
            value={newOrganization}
            onChange={(e) => setNewOrganization(e.target.value)}
          />
          <div className={styles['org-button']}>
            <AddIcon sx={{ scale: '0.75', color: '#a70000', p: '0' }}/>
            <button onClick={handleAddOrganization}> Add Organization </button>
          </div>
          {affiliatedOrganization.map((org, index) => (
          <div key={index}>
            <input
              type="text"
              value={org}
              onChange={(e) => handleOrganizationChange(index, e.target.value)}
            />
            <div className={styles['org-button']}>
              <RemoveIcon sx={{ scale: '0.75', color: '#a70000', p: '0' }}/>
              <button onClick={() => handleRemoveOrganization(index)}> Remove Organization </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
