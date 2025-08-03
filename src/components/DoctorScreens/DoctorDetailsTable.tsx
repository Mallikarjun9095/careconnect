/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import {
    Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    Snackbar, InputAdornment, IconButton, Alert, TablePagination, Typography
} from '@mui/material';
import { Delete as DeleteOutlinedIcon, Edit as ModeEditOutlinedIcon, Add as AddIcon, Visibility as VisibilityOutlinedIcon, Search as SearchIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';

import '../../css/shimmer.css';
import { DoctorgetDeatiles } from '../../apiRequest/PatientgetDeatiles';
import axios from 'axios';

const ShimmerTable = () => (
    <TableContainer sx={{ width: '100%', marginTop: '20px' }}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="left"><div className="shimmer shimmer-cell"></div></TableCell>
                    <TableCell align="left"><div className="shimmer shimmer-cell"></div></TableCell>
                    <TableCell align="left"><div className="shimmer shimmer-cell"></div></TableCell>
                    <TableCell align="right"><div className="shimmer shimmer-cell"></div></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell align="left"><div className="shimmer shimmer-cell"></div></TableCell>
                        <TableCell align="left"><div className="shimmer shimmer-cell"></div></TableCell>
                        <TableCell align="left"><div className="shimmer shimmer-cell"></div></TableCell>
                        <TableCell align="right"><div className="shimmer shimmer-cell"></div></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default function DoctorDetailsTable() {
    const [loading, setLoading] = useState(true);
    const [doctors, setDoctors] = useState<any[]>([]);
    const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshData, setRefreshData] = useState(false);
    
    useEffect(() => {
        fetchDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage, refreshData]); // Trigger fetchDoctors when refreshData changes


    useEffect(() => {
        // Filter doctors based on search query
        const filtered = doctors.filter(doctor =>
            doctor.doctor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.phone_number.includes(searchQuery) ||
            doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDoctors(filtered);
        setTotalRows(filtered.length); 
    }, [searchQuery, doctors]);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const response = await DoctorgetDeatiles(page + 1, rowsPerPage); 
            const doctorData = response.data;
            const totalCount = response.totalCount; 

            setDoctors(doctorData);
            setFilteredDoctors(doctorData);
            setTotalRows(totalCount);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setLoading(false);
        }
    };
      const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };
   
    const handleEditClick = (doctorId:number) => {
        window.location.href = `/admin-dashboard/editDoctor/${doctorId}`
    };
    
    const handleAddDetails = () => {
        window.location.href = '/admin-dashboard/addDoctor'
    };

    const handleViewClick = (doctorId:number) => {
        window.location.href = `/admin-dashboard/doctorprofile/${doctorId}`
    };
    const handleDeleteClick = async (doctorId:number) => {
        const confirmed = window.confirm("Are you sure you want to delete this doctor?");
    
        if (confirmed) {
          try {
            const response = await axios.delete(` http://localhost:3000/api/v1/AdminDoctorRouter/${doctorId}`)
    
             if (response.status === 200) {
                alert('Doctor deleted successfully.');
                setRefreshData(!refreshData); // Toggle refreshData to trigger a re-fetch
            }
          } catch (error) {
            console.error('Error deleting doctor:', error);
            alert("Failed to delete the doctor.");
          }
        }
      };

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Grid >
                    <Typography variant="h4" sx={{ margin: 0, color: 'black', fontSize: '24px', fontWeight: 'bold' }}>
                        Doctors List
                    </Typography>
                </Grid>

                <Grid container sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    <Grid>
                        <TextField
                            sx={{
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    height: '45px',
                                    display: 'flex',
                                    alignItems: 'center',
                                },
                                '& .MuiInputBase-input': {
                                    fontSize: '0.875rem',
                                    textAlign: 'center',
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '0.875rem',
                                    top: '-6px',
                                },
                            }}
                            label="Search Doctor Name..."
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />
                    </Grid>
                    <Grid sx={{ display: 'flex' }}>
                        <IconButton
                            aria-label="add patient"
                            onClick={handleAddDetails}
                            sx={{
                                backgroundColor: 'green',
                                borderRadius: 2,
                                color: 'white',
                                padding: '5px 20px',
                                gap: 1
                            }}
                        >
                            <Typography sx={{ fontSize: '16px' }}>Add Doctor</Typography>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>


            {loading ? (
                <ShimmerTable />
            ) : (
                <>
                                       <TableContainer component={Paper} sx={{ marginTop: 2 ,maxHeight: '440px', overflowY: 'auto'}}>
                        <Table sx={{ minWidth: 700  }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#2EB9AE' }}>
                                    <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>ID</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>Name</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>Email</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>Phone</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>Specialization</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>Experience</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>Qualification</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: '500', color: 'white' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredDoctors.slice(page  *rowsPerPage, page  *rowsPerPage + rowsPerPage).map((doctor) => (
                                    <TableRow key={doctor.doctor_id}>
                                        <TableCell align="left" sx={{ padding: '6px 12px', fontSize: '10px', fontWeight: '500', color: '#3D3D3D',width:'100px', overflow:'hidden' }}>
                                            {doctor.doctor_id}
                                        </TableCell>
                                        <TableCell align="left" sx={{ padding: '6px 12px', fontSize: '10px', fontWeight: '500', color: '#3D3D3D',width:'100px', overflow:'hidden' }}>
                                            {doctor.doctor_name}
                                        </TableCell>
                                        <TableCell align="left" sx={{ padding: '6px 12px', fontSize: '10px', fontWeight: '500', color: '#3D3D3D',width:'100px', overflow:'hidden' }}>
                                            {doctor.email}
                                        </TableCell>
                                        <TableCell align="left" sx={{ padding: '6px 12px', fontSize: '10px', fontWeight: '500', color: '#3D3D3D',width:'100px', overflow:'hidden' }}>
                                            {doctor.phone_number}
                                        </TableCell>
                                        <TableCell align="left" sx={{ padding: '6px 12px', fontSize: '10px', fontWeight: '500', color: '#3D3D3D',width:'100px', overflow:'hidden' }}>
                                            {doctor.specialization}
                                        </TableCell>
                                        <TableCell align="left" sx={{ padding: '6px 12px', fontSize: '10px', fontWeight: '500', color: '#3D3D3D',width:'100px', overflow:'hidden' }}>
                                            {doctor.experience}
                                        </TableCell>
                                        <TableCell align="left" sx={{ padding: '6px 12px', fontSize: '10px', fontWeight: '500', color: '#3D3D3D',width:'100px', overflow:'hidden' }}>
                                            {doctor.qualification}
                                        </TableCell>
                                        <TableCell align="right" sx={{ padding: '6px 12px' }}>
                                            <IconButton aria-label="edit" color="success" size="small" onClick={() => handleEditClick(doctor.doctor_id)} sx={{
                                                border: '1px solid green', borderRadius: '5px', marginLeft: 1, backgroundColor: 'transparent', boxShadow: 2,
                                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'green',
                                                    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                                                },
                                            }}>
                                                <ModeEditOutlinedIcon sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
                                            </IconButton>
                                            <IconButton aria-label="delete" color="error" size="small" onClick={() => handleDeleteClick(doctor.doctor_id)}  sx={{
                                                border: '1px solid red', borderRadius: '5px', marginLeft: 1, boxShadow: 2,
                                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'red',
                                                    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                                                },
                                            }}>
                                                <DeleteOutlinedIcon  sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
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

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={totalRows}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

