import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaCaretDown, FaSignOutAlt } from 'react-icons/fa';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from '../assets/images/logo.png';
import avatar from '../assets/images/avatar.png';
import styles from '../styles/Dashboard.module.scss'; 

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

const useStyles = makeStyles({
  menuPaper: {
    boxShadow: '3px 5px 20px rgba(0, 0, 0, 0.04)',
    borderRadius: '4px',
    border: '1px solid rgba(84, 95, 125, 0.04)',
    padding: '10px 10px',
    marginTop: '5px',
  },
  menuItem: {
    "&&": {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 16px',
      color: '#545F7D',
      fontSize: '14px',
      fontWeight: 500,
      "&:hover": {
        backgroundColor: "#e5f6ef",
      }
    },
  },
  menuIcon: {
    marginRight: '10px',
    fontSize: '16px',
    color: '#545F7D',
  },
});

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, onSearchClick }) => {
  const classes = useStyles(); 
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const profileButtonRef = React.useRef(null);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleLogoutClick = () => {
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="Lendsqr Logo" className={styles.logo} />
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search for anything"
          value={searchTerm}
          onChange={onSearchChange}
          onKeyDown={(event) => event.key === 'Enter' && onSearchClick()}
        />
        <button onClick={onSearchClick}>
          <FaSearch className={styles.searchIcon} />
        </button>
      </div>
      <div className={styles.profile}>
        <a href="https://lendsqr.com/" className={styles.docs} target="_blank" rel="noopener noreferrer">Docs</a>
      <div className={styles.notifications}>
          <FaBell className="bellIcon" />
        </div>
        <div className={styles.profileDetails}>
          <span className={styles.profileName}>Adedeji</span>
          <img src={avatar} alt="Profile" className={styles.profileImage} />
          <IconButton
            ref={profileButtonRef}
            aria-label="profile options"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileClick}
            style={{ fontSize: '15px' }}
          >
            <FaCaretDown className={styles.dropdownIcon} />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={profileButtonRef.current}
            keepMounted
            open={profileMenuOpen}
            onClose={() => setProfileMenuOpen(false)}
            classes={{ paper: styles.menuPaper }}
          >
            <MenuItem onClick={handleLogoutClick} className={classes.menuItem}>
              <FaSignOutAlt className={classes.menuIcon} />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
