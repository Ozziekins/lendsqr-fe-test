import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Dashboard.module.scss';
import usersIcon from '../assets/images/users.png';
import activeUsersIcon from '../assets/images/active_users.png';
import usersWithLoansIcon from '../assets/images/users_with_loans.png';
import usersWithSavingsIcon from '../assets/images/users_with_savings.png';
import { FaFilter, FaEllipsisV, FaEye, FaUserTimes, FaUserCheck } from 'react-icons/fa';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Header from './Header';
import DashboardSidebar from './DashboardSidebar';
import DashboardFooter from './DashboardFooter';

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

interface Filters {
  organization: string;
  fullName: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
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
  filterMenu: {
    maxHeight: '600px',
    maxWidth: '250px',
    boxShadow: '3px 5px 20px rgba(0, 0, 0, 0.04)',
    border: '1px solid rgba(84, 95, 125, 0.04)',
    borderRadius: '4px',
    overflow: 'auto',
    padding: '15px',
  },
  filterMenuItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '10px 20px',
    width: '100%',
    '& label': {
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '600',
      color: '#545F7D',
      width: '100%',
    },
    '& input, & select': {
      width: '100%',
      padding: '8px',
      margin: '5px 0',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      fontSize: '14px',
      color: '#545F7D',
    },
  },
  filterMenuActions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    '& button': {
      borderRadius: '8px',
      padding: '10px 20px',
      fontWeight: '600',
      fontSize: '14px',
      '&.resetButton': {
        background: 'none',
        color: '#545F7D',
        border: '1px solid #545F7D',
      },
      '&.filterButton': {
        background: '#39CDCC',
        color: 'white',
        border: '1px solid #39CDCC',
      },
    },
  },
});
  
const Dashboard: React.FC = () => {
  const classes = useStyles(); 
	const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [paginatedUsers, setPaginatedUsers] = useState<User[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(5);
	const [totalItems, setTotalItems] = useState<number>(0);const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<Filters>({
    organization: '',
    fullName: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: ''
  });

  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    handleSearchClickDirectly(newSearchTerm);
  };

  const handleSearchClick = () => {
    if (!searchTerm.trim()) {
      setPaginatedUsers(users);
    } else {
      const filtered = allUsers.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber.includes(searchTerm)
      );
      setPaginatedUsers(filtered);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, []);
  
  const handleSearchClickDirectly = (search: string) => {
    if (search.trim() === "") {
      setPaginatedUsers(users); 
    } else {
      const filtered = allUsers.filter(user =>
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.organization.toLowerCase().includes(search.toLowerCase()) ||
        user.phoneNumber.includes(search)
      );
      setPaginatedUsers(filtered);
    }
  };  

  useEffect(() => {
    if (searchTerm && paginatedUsers.length > 0) {
      handleSearchClickDirectly(searchTerm);
    }
  }, [searchTerm, paginatedUsers, handleSearchClickDirectly]); 
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleFilterIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };
  
  const handleFilterMenuClose = () => {
    setFilterMenuAnchorEl(null);
  };  

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value
    }));
};

const applyFilters = (): void => {
  if (Object.values(filters).every(value => !value)) {
    setPaginatedUsers(users);
  } else {
    const newFilteredUsers = allUsers.filter(user => {
      return (filters.organization ? user.organization === filters.organization : true) &&
            (filters.fullName ? user.fullName.toLowerCase().includes(filters.fullName.toLowerCase()) : true) &&
            (filters.email ? user.email.toLowerCase().includes(filters.email.toLowerCase()) : true) &&
            (filters.phoneNumber ? user.phoneNumber.includes(filters.phoneNumber) : true) &&
            (filters.status ? user.status === filters.status : true) &&
            (filters.date ? new Date(user.dateJoined).toLocaleDateString() === new Date(filters.date).toLocaleDateString() : true);
    });
    setFilteredUsers(newFilteredUsers);
  }
  setCurrentPage(1);
  handleCloseFilterMenu();
};

  const resetFilters = (): void => {
    setFilters({
      organization: '',
      fullName: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: ''
    });
    setFilteredUsers(users);
    setPaginatedUsers(users);
    if (currentPage !== 1) {
      setCurrentPage(1); 
    }
    handleCloseFilterMenu();
  };
  
  const handleCloseFilterMenu = (): void => {
    setFilterMenuAnchorEl(null);
  };

  const handleViewDetails = (userId: number): void => {
    navigate(`/user/${userId}`);
  };

  const updateUserStatus = async (userId: number, newStatus: User['status']): Promise<void> => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, status: newStatus };
      }
      return user;
    });
  
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setPaginatedUsers(updatedUsers);
  
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  
  const handleBlacklistUser = (userId: number): void => {
    updateUserStatus(userId, 'Blacklisted');
    handleClose();
  };
  
  const handleActivateUser = (userId: number): void => {
    updateUserStatus(userId, 'Active');
    handleClose();
  };  

  // const filteredUsers = useMemo(() => {
  //   return users.filter(user => {
  //     const matchesSearchTerm = searchTerm
  //       ? user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         user.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         user.phoneNumber.includes(searchTerm)
  //       : true;

  //     const matchesFilters = (filters.organization ? user.organization === filters.organization : true) &&
  //                            (filters.fullName ? user.fullName.toLowerCase().includes(filters.fullName.toLowerCase()) : true) &&
  //                            (filters.email ? user.email.toLowerCase().includes(filters.email.toLowerCase()) : true) &&
  //                            (filters.phoneNumber ? user.phoneNumber.includes(filters.phoneNumber) : true) &&
  //                            (filters.status ? user.status === filters.status : true) &&
  //                            (filters.date ? new Date(user.dateJoined).toISOString().slice(0, 10) === filters.date : true);

  //     return matchesSearchTerm && matchesFilters;
  //   });
  // }, [users, searchTerm, filters]);
  
	useEffect(() => {
		const offset = (currentPage - 1) * pageSize;
		const url = `http://localhost:5000/users?_start=${offset}&_limit=${pageSize}`;
	
		fetch(url)
			.then(response => {
				const totalCount = response.headers.get('X-Total-Count');
				if (totalCount !== null) {
					setTotalItems(parseInt(totalCount, 10));
				}
				return response.json();
			})
			.then(data => {
				setUsers(data);
        if (!Object.values(filters).some(value => value !== '')) {
          setFilteredUsers(data);
          setPaginatedUsers(data);
          setAllUsers(data);
        }
			})
			.catch(error => console.error('Fetching error:', error));
	}, [currentPage, pageSize, filters]);

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then(response => response.json())
      .then((data: User[]) => {
        setAllUsers(data);
      })
      .catch(error => console.error('Fetching error:', error));
  }, []);
  
  useEffect(() => {
    const filtersActive = Object.values(filters).some(value => value);
    const activeList = filtersActive ? filteredUsers : allUsers;
    
    setTotalItems(activeList.length);
  
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const paginatedItems = activeList.slice(start, end);
    setPaginatedUsers(paginatedItems);
  
    if (currentPage > Math.ceil(activeList.length / pageSize)) {
      setCurrentPage(1);
    }
  }, [currentPage, pageSize, users, allUsers, filteredUsers, filters]);
  
	
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number): void => {
    setPageSize(size);
    setCurrentPage(1); 
  };

  return (
    <div className={styles.dashboardContainer}>
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} onSearchClick={handleSearchClick} />
      <DashboardSidebar />
      <main className={styles.mainContent}>
        <h1>Users</h1>
        <div className={styles.stats}>
          <div className={styles.card}>
            <img src={usersIcon} alt="Users Icon" className="icon" />
            <p>Users</p>
            <span>2,453</span>
          </div>
          <div className={styles.card}>
            <img src={activeUsersIcon} alt="Active Users Icon" className="icon" />
            <p>Active Users</p>
            <span>2,453</span>
          </div>
          <div className={styles.card}>
            <img src={usersWithLoansIcon} alt="Users with Loans Icon" className="icon" />
            <p>Users with Loans</p>
            <span>12,453</span>
          </div>
          <div className={styles.card}>
            <img src={usersWithSavingsIcon} alt="Users with Savings Icon" className="icon" />
            <p>Users with Savings</p>
            <span>102,453</span>
          </div>
        </div>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>
                Organization 
                <IconButton onClick={handleFilterIconClick}>
                  <FaFilter className={styles.filterIcon} />
                </IconButton>
              </th>
              <th>
                Name 
                <IconButton onClick={handleFilterIconClick}>
                  <FaFilter className={styles.filterIcon} />
                </IconButton>
              </th>
              <th>
                Email 
                <IconButton onClick={handleFilterIconClick}>
                  <FaFilter className={styles.filterIcon} />
                </IconButton>
              </th>
              <th>
                Phone Number 
                <IconButton onClick={handleFilterIconClick}>
                  <FaFilter className={styles.filterIcon} />
                </IconButton>
              </th>
              <th>
                Date Joined 
                <IconButton onClick={handleFilterIconClick}>
                  <FaFilter className={styles.filterIcon} />
                </IconButton>
              </th>
              <th>
                Status 
                <IconButton onClick={handleFilterIconClick}>
                  <FaFilter className={styles.filterIcon} />
                </IconButton>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  {new Date(user.dateJoined).toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </td>
                <td className={`${styles.status} ${styles[user.status.toLowerCase()]}`}>
                  <div className={`${styles['status-pill']} ${styles[user.status.toLowerCase() + '-pill']}`}>
                    {user.status}
                  </div>
                </td>
                <td className="actions">
									<IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, user.id)}
										style={{ fontSize: '15px' }} 
                  >
                  	<FaEllipsisV className="dotsIcon" />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl) && selectedUserId === user.id}
                    onClose={handleClose}
                    classes={{ paper: classes.menuPaper }}
                  >
                    <MenuItem className={classes.menuItem} onClick={() => handleViewDetails(user.id)}>
                      <FaEye className={classes.menuIcon} />
                      View Details
                    </MenuItem>
                    <MenuItem className={classes.menuItem} onClick={() => handleBlacklistUser(user.id)}>
                      <FaUserTimes className={classes.menuIcon} />
                      Blacklist User
                    </MenuItem>
                    <MenuItem className={classes.menuItem} onClick={() => handleActivateUser(user.id)}>
                      <FaUserCheck className={classes.menuIcon} />
                      Activate User
                    </MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DashboardFooter
          totalItems={totalItems}
          pageSize={pageSize}
          setPageSize={handlePageSizeChange}
          pageCount={Math.ceil(totalItems / pageSize)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
      <Menu
        id="filter-menu"
        anchorEl={filterMenuAnchorEl}
        keepMounted
        open={Boolean(filterMenuAnchorEl)}
        onClose={handleFilterMenuClose}
        classes={{ paper: classes.filterMenu }}
      >
        <MenuItem className={classes.filterMenuItem} >
          <label htmlFor="organization">Organization</label>
          <select name="organization" value={filters.organization} onChange={handleFilterChange}>
            <option value="">Select</option>
            <option value="Quicksave">Quicksave</option>
            <option value="Paylater">Paylater</option>
            <option value="SavingsPlus">SavingsPlus</option>
            <option value="QuickCredit">QuickCredit</option>
            <option value="FinSave">FinSave</option>
            <option value="CashMint">CashMint</option>
            <option value="BankDirect">BankDirect</option>
            <option value="MoneyHub">MoneyHub</option>
          </select>
        </MenuItem>
        <MenuItem className={classes.filterMenuItem} >
          <label htmlFor="fullName">Username</label>
          <input type="text" name="fullName" value={filters.fullName} onChange={handleFilterChange} placeholder="User" />
        </MenuItem>
        <MenuItem className={classes.filterMenuItem} >
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={filters.email} onChange={handleFilterChange} placeholder="Email" />
        </MenuItem>
        <MenuItem className={classes.filterMenuItem} >
          <label htmlFor="date">Date</label>
          <input type="date" name="date" value={filters.date} onChange={handleFilterChange} placeholder="Date" />
        </MenuItem>
        <MenuItem className={classes.filterMenuItem} >
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" name="phoneNumber" value={filters.phoneNumber} onChange={handleFilterChange} placeholder="Phone Number" />
        </MenuItem>
        <MenuItem className={classes.filterMenuItem} >
          <label htmlFor="status">Status</label>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </MenuItem>
        <div className={classes.filterMenuActions}>
          <button className="resetButton" onClick={resetFilters}>Reset</button>
          <button className="filterButton" onClick={applyFilters}>Filter</button>
        </div>
      </Menu>
    </div>
  );
};

export default Dashboard;
