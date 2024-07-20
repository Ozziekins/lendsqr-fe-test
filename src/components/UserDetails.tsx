import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../styles/UserDetails.module.scss';
import dashstyles from '../styles/Dashboard.module.scss';
import avatar from '../assets/images/details-avatar.png';
import Header from './Header';
import DashboardSidebar from './DashboardSidebar';

interface Guarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
}

interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  fullName: string;
  userId: string;
  rating: number;
  accountBalance: string;
  bankDetails: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  guarantor: Guarantor;
}

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('General Details');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'warning'>('success');

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    navigate(`/dashboard?search=${encodeURIComponent(searchTerm)}`);
  };

  const updateUserStatus = async (newStatus: User['status']): Promise<void> => {
    if (!user) return;

    try {
      // const response = await fetch(`http://localhost:5000/users/${user.id}`, {
        const response = await fetch(`/.netlify/functions/updateUser?id=${user.id}&status=${newStatus}`, {
          method: 'PATCH',
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setUser(updatedUser);
          setSnackbarMessage(`User ${newStatus === 'Blacklisted' ? 'Blacklisted' : 'Activated'}!`);
          setAlertType(newStatus === 'Blacklisted' ? 'warning' : 'success');
          setSnackbarOpen(true);
        } else {
          throw new Error('Failed to update user status');
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleBlacklistUser = () => {
    if (user) updateUserStatus('Blacklisted');
  };

  const handleActivateUser = () => {
    if (user) updateUserStatus('Active');
  };

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  useEffect(() => {
    if (!userId) return; 

  const fetchUserData = async () => {
    try {
      // const response = await fetch(`http://localhost:5000/users/${userId}`);
      const response = await fetch(`/.netlify/functions/getUser?id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  fetchUserData();
}, [userId]);

  // if (!user) {
  //   return 
  //   <div className={dashstyles.dashboardContainer}>
  //     <Box>
  //       <CircularProgress />
  //     </Box>
  //   </div>;
  // }

  return (
    <div className={dashstyles.dashboardContainer}>
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} onSearchClick={handleSearchClick} />
      <DashboardSidebar />
      <main className={styles.userDetailsContainer}>
        <div className={styles.backBtn} onClick={handleBackClick}>
          <FaArrowLeft className={styles.backIcon} />
          <div className={styles.backText}>Back to Users</div>
        </div>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>User Details</h1>
          <div className={styles.actions}>
            <button className={styles.blacklistButton} onClick={handleBlacklistUser}>Blacklist User</button>
            <button className={styles.activateButton} onClick={handleActivateUser}>Activate User</button>
          </div>
        </div>
        {user && (
        <div className={styles.headerCard}>
          <div className={styles.userDetailsHeader}>
            <div className={styles.avatarContainer}>
              <img src={avatar} alt="User Avatar" className={styles.avatar} />
            </div>
            <div className={styles.userNameContainer}>
              <div className={styles.userName}>{user.fullName}</div>
              <div className={styles.userId}>{user.userId}</div>
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.userTier}>
              <span className={styles.tierText}>User’s Tier</span>
              <Rating name="read-only" value={user.rating} readOnly size="small" max={3} className={styles.rating} />
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.accountBalance}>
              <div className={styles.balance}>{user.accountBalance}</div>
              <div className={styles.bankDetails}>{user.bankDetails}</div>
            </div>
          </div>
          <div className={styles.tabs}>
            <div className={`${styles.tab} ${activeTab === 'General Details' ? styles.active : ''}`} onClick={() => handleTabClick('General Details')}>General Details</div>
            <div className={`${styles.tab} ${activeTab === 'Documents' ? styles.active : ''}`} onClick={() => handleTabClick('Documents')}>Documents</div>
            <div className={`${styles.tab} ${activeTab === 'Bank Details' ? styles.active : ''}`} onClick={() => handleTabClick('Bank Details')}>Bank Details</div>
            <div className={`${styles.tab} ${activeTab === 'Loans' ? styles.active : ''}`} onClick={() => handleTabClick('Loans')}>Loans</div>
            <div className={`${styles.tab} ${activeTab === 'Savings' ? styles.active : ''}`} onClick={() => handleTabClick('Savings')}>Savings</div>
            <div className={`${styles.tab} ${activeTab === 'App and System' ? styles.active : ''}`} onClick={() => handleTabClick('App and System')}>App and System</div>
          </div>
        </div> )}
        {user && (
          <div className={styles.infoCard}>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Personal Information</div>
              <div className={styles.infoGrid}>
                <div><label>Full Name</label><span>{user.fullName}</span></div>
                <div><label>Phone Number</label><span>{user.phoneNumber}</span></div>
                <div><label>Email Address</label><span>{user.email}</span></div>
                <div><label>BVN</label><span>{user.bvn}</span></div>
                <div><label>Gender</label><span>{user.gender}</span></div>
                <div><label>Marital Status</label><span>{user.maritalStatus}</span></div>
                <div><label>Children</label><span>{user.children}</span></div>
                <div><label>Type of Residence</label><span>{user.typeOfResidence}</span></div>
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Education and Employment</div>
              <div className={styles.infoGrid}>
                <div><label>Level of Education</label><span>{user.levelOfEducation}</span></div>
                <div><label>Employment Status</label><span>{user.employmentStatus}</span></div>
                <div><label>Sector of Employment</label><span>{user.sectorOfEmployment}</span></div>
                <div><label>Duration of Employment</label><span>{user.durationOfEmployment}</span></div>
                <div><label>Office Email</label><span>{user.officeEmail}</span></div>
                <div><label>Monthly Income</label><span>{user.monthlyIncome}</span></div>
                <div><label>Loan Repayment</label><span>{user.loanRepayment}</span></div>
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Socials</div>
              <div className={styles.infoGrid}>
                <div><label>Twitter</label><span>{user.twitter}</span></div>
                <div><label>Facebook</label><span>{user.facebook}</span></div>
                <div><label>Instagram</label><span>{user.instagram}</span></div>
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Guarantor</div>
              <div className={styles.infoGrid}>
                <div><label>Full Name</label><span>{user.guarantor.fullName}</span></div>
                <div><label>Phone Number</label><span>{user.guarantor.phoneNumber}</span></div>
                <div><label>Email Address</label><span>{user.guarantor.emailAddress}</span></div>
                <div><label>Relationship</label><span>{user.guarantor.relationship}</span></div>
              </div>
            </div>
          </div>
        )}
        <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar} message={snackbarMessage} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} action={action}> 
          <Alert onClose={handleCloseSnackbar} severity={alertType} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
};

export default UserDetails;
