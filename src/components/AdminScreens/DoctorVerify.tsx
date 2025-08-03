import React, { useState, useEffect, ReactNode } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, InputAdornment, IconButton, TablePagination, Typography, MenuItem, Select, Button,
  SelectChangeEvent,
} from '@mui/material';
import { Delete as DeleteOutlinedIcon, Search as SearchIcon, Edit as ModeEditOutlinedIcon, Add as AddIcon, Visibility as VisibilityOutlinedIcon, } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import CustomAlert from '../CustomAlert'; // Adjust the path as needed
import '../../css/shimmer.css';
import { DoctorgetDeatiles } from '../../apiRequest/PatientgetDeatiles';

// Shimmer Table for Loading
const ShimmerTable = () => (
  <TableContainer sx={{ width: '100%', marginTop: '20px' }}>
    <Table>
      <TableHead>
        <TableRow>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableCell key={index} align="left">
              <div className="shimmer shimmer-cell"></div>
            </TableCell>
          ))}
          <TableCell align="right">
            <div className="shimmer shimmer-cell"></div>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <TableCell key={idx} align="left">
                <div className="shimmer shimmer-cell"></div>
              </TableCell>
            ))}
            <TableCell align="right">
              <div className="shimmer shimmer-cell"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

// Doctor Verification Interface
interface DoctorVerification {
  qualificationDocs: ReactNode;
  med_reg_number: ReactNode;
  doctor_id: number;
  doctor_name: string;
  document_type: string;
  document_url: string;
  document_status: string;
}

const DoctorVerificationTable: React.FC = () => {
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [doctorList, setDoctorList] = useState<DoctorVerification[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorVerification[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<DoctorVerification | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const page = 1;  // Set your desired page number
        const limit = 10; // Set your desired limit for the number of doctors per page

        const response = await DoctorgetDeatiles(page, limit);
        const data: DoctorVerification[] = response.data || []; // Assuming response.data contains your doctor data
        setDoctorList(data);
        setFilteredDoctors(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, []);


  // Search doctor verifications
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    const filtered = doctorList.filter((doctor) =>
      doctor.doctor_name.toLowerCase().includes(searchQuery)
    );
    setFilteredDoctors(filtered);
  };

  // Handle filter change
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setStatusFilter(value);
    const filtered = doctorList.filter((doctor) =>
      value === 'All' || doctor.document_status === value
    );
    setFilteredDoctors(filtered);
  };

  // Pagination Handlers
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Delete Document
  const handleDeleteClick = (doctor: DoctorVerification) => {
    setDoctorToDelete(doctor);
    setAlertVisible(true);
  };
  const handleEditClick = () => {
    window.location.href = '/admin-dashboard/editDoctor'
  };
  const handleViewClick = (doctorId: number) => {
    window.location.href = `/admin-dashboard/doctorprofile/${doctorId}`
  };

  const handleConfirmDelete = async () => {
    if (doctorToDelete) {
      // Simulate deletion
      setDoctorList((prev) =>
        prev.filter((item) => item.doctor_id !== doctorToDelete.doctor_id)
      );
      setFilteredDoctors((prev) =>
        prev.filter((item) => item.doctor_id !== doctorToDelete.doctor_id)
      );
      setSnackbarMessage('Document deleted successfully');
      setSnackbarOpen(true);
      setAlertVisible(false);
      setDoctorToDelete(null);
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
    setDoctorToDelete(null);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}>
          Doctor Verification Table
        </Typography>

        <TextField
          sx={{ width: '30%' }}
          label="Search Doctor Name"
          variant="outlined"
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Select
          value={statusFilter}
          onChange={handleFilterChange}
          sx={{ width: '30%', marginLeft: '10px' }}
        >
          <MenuItem value="All">All Statuses</MenuItem>
          <MenuItem value="Verified">Verified</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>

        <IconButton
          sx={{ backgroundColor: 'green', color: 'white' }}
          onClick={() => console.log('Add Document')}
        >
          <AddIcon />
        </IconButton>
      </Grid>

      {loading ? (
        <ShimmerTable />
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#2EB9AE' }}>
                <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>Doctor ID</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>Doctor Name</TableCell>
                {/* <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>Document Type</TableCell> */}
                <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>med_reg_number</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>qualificationDocs</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>Approvel Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDoctors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((doctor) => (
                <TableRow key={doctor.doctor_id}>
                  <TableCell align="left" sx={{ padding: '6px 12px' }}>{doctor.doctor_id}</TableCell>
                  <TableCell align="left" sx={{ padding: '6px 12px' }}>{doctor.doctor_name}</TableCell>
                  <TableCell align="left" sx={{ padding: '6px 12px' }}>
                    <a href={doctor.document_url} target="_blank" rel="noopener noreferrer">{doctor.med_reg_number}</a>
                  </TableCell>
                  <TableCell align="left" sx={{ padding: '6px 12px' }}>{doctor.qualificationDocs}</TableCell>
                  <TableCell align="left" sx={{ padding: '6px 12px' }}>{doctor.document_status}</TableCell>
                  <TableCell align="center" sx={{ padding: '6px 12px' }}>
                    <IconButton aria-label="edit" color="success" size="small" onClick={handleEditClick} sx={{
                      border: '1px solid green', borderRadius: '5px', marginLeft: 1, backgroundColor: 'transparent', boxShadow: 2,
                      transition: 'background-color 0.3s ease, color 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'green',
                        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                      },
                    }}>
                      <ModeEditOutlinedIcon sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
                    </IconButton>
                    <IconButton aria-label="delete" color="error" size="small" sx={{
                      border: '1px solid red', borderRadius: '5px', marginLeft: 1, boxShadow: 2,
                      transition: 'background-color 0.3s ease, color 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'red',
                        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                      },
                    }} onClick={() => handleDeleteClick(doctor)}>
                      <DeleteOutlinedIcon sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
                    </IconButton>
                    <IconButton aria-label="view" color="primary" size="small" onClick={() => handleViewClick(doctor.doctor_id)} sx={{
                      border: '1px solid blue', borderRadius: '5px', marginLeft: 1, boxShadow: 2,
                      transition: 'background-color 0.3s ease, color 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'blue',
                        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                      },

                    }}>
                      <VisibilityOutlinedIcon sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
                    </IconButton>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredDoctors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CustomAlert
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        severity="error"
        message={snackbarMessage}
      />

      {isAlertVisible && (
        <CustomAlert
          open={isAlertVisible}
          onClose={handleCloseAlert}
          severity="warning"
          message="Are you sure you want to delete this document?"
          actions={
            <React.Fragment>
              <Button color="inherit" onClick={handleConfirmDelete}>Yes</Button>
              <Button color="inherit" onClick={handleCloseAlert}>No</Button>
            </React.Fragment>
          }
        />
      )}
    </Box>
  );
};

export default DoctorVerificationTable;
