import React from 'react';
import { FormControl, Select, MenuItem, Typography, Pagination } from '@mui/material';
import styles from '../styles/Dashboard.module.scss'; 

interface DashboardFooterProps {
  totalItems: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  pageCount: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const DashboardFooter: React.FC<DashboardFooterProps> = ({
  totalItems,
  pageSize,
  setPageSize,
  pageCount,
  currentPage,
  onPageChange
}) => {
  return (
    <div className={styles.footer}>
      <div className={styles.showing}>
        <Typography component="span" className={styles.typography}>
          Showing
        </Typography>
        <FormControl variant="outlined" size="small" className={styles.selectControl}>
          <Select
            labelId="page-size-select-label"
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value as string))}
            className={styles.select}
            MenuProps={{
              PaperProps: {
                className: styles.selectMenu,
              },
            }}
          >
            {[5, 10, 20, 50].map(size => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography component="span" className={styles.typography}>
          out of {totalItems}
        </Typography>
      </div>
      <div className={styles.paginationControls}>
        <Pagination count={pageCount} page={currentPage} onChange={onPageChange} shape="rounded" />
      </div>
    </div>
  );
};

export default DashboardFooter;
