import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import styles from '../styles/Dashboard.module.scss';
import {
  FaBriefcase,
  FaHome,
  FaUsers,
  FaUserShield,
  FaMoneyCheckAlt,
  FaPiggyBank,
  FaHandHoldingUsd,
  FaUserCheck,
  FaUserTimes,
  FaHandshake,
  FaBuilding,
  FaCoins,
  FaPercentage,
  FaUserCog,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaLayerGroup,
  FaScroll,
  FaChevronDown,
} from 'react-icons/fa';

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
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

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, toggleSidebar }) => {
  const classes = useStyles(); 
  const [activeItem, setActiveItem] = useState<string>('Users');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleItemClick = (itemName: string) => {
    if (itemName === 'Logout') {
      navigate('/');
    } 
    else if (itemName === 'Dashboard') {
      navigate('/dashboard');
    } 
    else {
      setActiveItem(itemName);
    }
    toggleSidebar();
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOrgSelect = (orgName: string) => {
    handleMenuClose();
  };

  return (
    <nav className={`${styles.sidebar} ${isOpen ? styles.active : styles.hidden}`}>
      <ul>
        <li
          className={`${styles.navItem}  ${styles.switchOrganization}`}
          onClick={() => handleItemClick('Switch Organization')}
        >
          <FaBriefcase className={styles.navIcon} />
          <span>Switch Organization</span>
          <IconButton onClick={handleMenuClick} size="small">
            <FaChevronDown className={styles.caretIcon} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            classes={{ paper: styles.menuPaper }}
          >
            <MenuItem onClick={() => handleOrgSelect('Lendsqr')} className={classes.menuItem}>Lendsqr</MenuItem>
            <MenuItem onClick={() => handleOrgSelect('Zene')} className={classes.menuItem}>Zene</MenuItem>
          </Menu>
        </li>
        <li className={`${styles.navItem} `} onClick={() => handleItemClick('Dashboard')}>
          <FaHome className={styles.navIcon} />
          <span>Dashboard</span>
        </li>
        <div className={styles.navCategory}>CUSTOMERS</div>
        <li className={`${styles.navItem} ${activeItem === 'Users' ? styles.active : ''}`} onClick={() => handleItemClick('Users')}>
          <FaUsers className={styles.navIcon} />
          <span>Users</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Guarantors' ? styles.active : ''}`} onClick={() => handleItemClick('Guarantors')}>
          <FaUserShield className={styles.navIcon} />
          <span>Guarantors</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Loans' ? styles.active : ''}`} onClick={() => handleItemClick('Loans')}>
          <FaMoneyCheckAlt className={styles.navIcon} />
          <span>Loans</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Decision Models' ? styles.active : ''}`} onClick={() => handleItemClick('Decision Models')}>
          <FaHandshake className={styles.navIcon} />
          <span>Decision Models</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Savings' ? styles.active : ''}`} onClick={() => handleItemClick('Savings')}>
          <FaPiggyBank className={styles.navIcon} />
          <span>Savings</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Loan Requests' ? styles.active : ''}`} onClick={() => handleItemClick('Loan Requests')}>
          <FaHandHoldingUsd className={styles.navIcon} />
          <span>Loan Requests</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Whitelist' ? styles.active : ''}`} onClick={() => handleItemClick('Whitelist')}>
          <FaUserCheck className={styles.navIcon} />
          <span>Whitelist</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Karma' ? styles.active : ''}`} onClick={() => handleItemClick('Karma')}>
          <FaUserTimes className={styles.navIcon} />
          <span>Karma</span>
        </li>
        <div className={styles.navCategory}>BUSINESSES</div>
        <li className={`${styles.navItem} ${activeItem === 'Organization' ? styles.active : ''}`} onClick={() => handleItemClick('Organization')}>
          <FaBuilding className={styles.navIcon} />
          <span>Organization</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Loan Products' ? styles.active : ''}`} onClick={() => handleItemClick('Loan Products')}>
          <FaCoins className={styles.navIcon} />
          <span>Loan Products</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Savings Products' ? styles.active : ''}`} onClick={() => handleItemClick('Savings Products')}>
          <FaPiggyBank className={styles.navIcon} />
          <span>Savings Products</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Fees and Charges' ? styles.active : ''}`} onClick={() => handleItemClick('Fees and Charges')}>
          <FaPercentage className={styles.navIcon} />
          <span>Fees and Charges</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Transactions' ? styles.active : ''}`} onClick={() => handleItemClick('Transactions')}>
          <FaLayerGroup className={styles.navIcon} />
          <span>Transactions</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Services' ? styles.active : ''}`} onClick={() => handleItemClick('Services')}>
          <FaScroll className={styles.navIcon} />
          <span>Services</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Service Account' ? styles.active : ''}`} onClick={() => handleItemClick('Service Account')}>
          <FaUserCog className={styles.navIcon} />
          <span>Service Account</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Settlements' ? styles.active : ''}`} onClick={() => handleItemClick('Settlements')}>
          <FaCog className={styles.navIcon} />
          <span>Settlements</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Reports' ? styles.active : ''}`} onClick={() => handleItemClick('Reports')}>
          <FaChartBar className={styles.navIcon} />
          <span>Reports</span>
        </li>
        <div className={styles.navCategory}>SETTINGS</div>
        <li className={`${styles.navItem} ${activeItem === 'Preferences' ? styles.active : ''}`} onClick={() => handleItemClick('Preferences')}>
          <FaCog className={styles.navIcon} />
          <span>Preferences</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Fees and Pricing' ? styles.active : ''}`} onClick={() => handleItemClick('Fees and Pricing')}>
          <FaPercentage className={styles.navIcon} />
          <span>Fees and Pricing</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Audit Logs' ? styles.active : ''}`} onClick={() => handleItemClick('Audit Logs')}>
          <FaLayerGroup className={styles.navIcon} />
          <span>Audit Logs</span>
        </li>
        <li className={`${styles.navItem} ${activeItem === 'Logout' ? styles.active : ''}`} onClick={() => handleItemClick('Logout')}>
          <FaSignOutAlt className={styles.navIcon} />
          <span>Logout</span>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardSidebar;
