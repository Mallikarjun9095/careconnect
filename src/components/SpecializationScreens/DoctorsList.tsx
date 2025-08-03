/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
    Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    Snackbar, InputAdornment, IconButton, Alert, TablePagination, Typography,
} from '@mui/material';
import { Search as SearchIcon, Edit as ModeEditOutlinedIcon, Visibility as VisibilityOutlinedIcon, Delete as DeleteOutlinedIcon, Close as CloseIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
import { doctorscount } from '../../apiRequest/PatientgetDeatiles';
import '../../css/shimmer.css';
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
// Interface for Doctor data
interface Doctor {

    doctor_id: number;
    doctor_name: string;
    specialization_name: string;
    experience: string;
    location: string;
    phone_number: number;
    qualification: string;
    gender: string;
}

export default function DoctorList() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [specializations, setSpecializations] = useState("")

    // Get specialization from the URL parameters
    const { specialization } = useParams<{ specialization: string }>();
    const queryParams = new URLSearchParams(window.location.search);
    const specializationId = queryParams.get('id');

    useEffect(() => {
        getDoctors(specializationId);
    }, [specializationId]);

    const getDoctors = async (specializationId: any) => {
        setLoading(true);
        try {
            const response = await doctorscount(specializationId);
            setDoctors(response.data.doctors);
            setFilteredDoctors(response.data.doctors);
            setTotalRows(response.data.doctors.length);
            setSpecializations(response.data.specialization.specialization_name)
            console.log("Data", response.data);
        } catch (error: any) {
            console.error('Error fetching doctors:', error.message);
            setSnackbarMessage('Failed to load doctors');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value.toLowerCase();
        const filtered = doctors.filter(
            (doctor) =>
                doctor.doctor_name.toLowerCase().includes(searchQuery)
        );
        setFilteredDoctors(filtered);
        setTotalRows(filtered.length);
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewClick = (doctorId: number) => {
        console.log('Doctor ID:', doctorId);
        // Redirect or handle view action for the doctor
    };

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Grid>
                    <Typography variant="h4" sx={{ margin: 0, color: 'black', fontSize: '24px', fontWeight: 'bold' }}>
                        Doctors List - {specialization}
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
                            label="Search Doctor"
                            variant="outlined"
                            onChange={handleSearch}
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
                </Grid>
            </Grid>

            {loading ? (
                <ShimmerTable />
            ) : (
                <Box sx={{ overflowX: 'auto', marginTop: 2 }}>
                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                        <Table sx={{ minWidth: 700 }} aria-label="doctors table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#2EB9AE' }}>
                                    <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>Doctor ID</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>Name</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>Specialization</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>Gender</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>Experience</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>phone_number</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>qualification</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredDoctors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((doctor) => (
                                    <TableRow key={doctor.doctor_id}>
                                        <TableCell align="left" sx={{ padding: '6px 12px' }}>{doctor.doctor_id}</TableCell>
                                        <TableCell align="left" sx={{ padding: '6px 12px' }}>{doctor.doctor_name}</TableCell>
                                        <TableCell align="left" sx={{ padding: '6px 12px' }}>{specializations}</TableCell>
                                        <TableCell align="left" sx={{ padding: '6px 12px' }}>{doctor.gender}</TableCell>
                                        <TableCell align="left" sx={{ padding: '6px 12px' }}>{doctor.experience}</TableCell>
                                        <TableCell align="left" sx={{ padding: '6px 12px' }}>{doctor.phone_number}</TableCell>
                                        <TableCell align="left" sx={{ padding: '6px 12px' }}>{doctor.qualification}</TableCell>
                                        <TableCell align="right" sx={{ padding: '6px 12px' }}>
                                            <IconButton aria-label="edit" color="success" size="small" sx={{
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
                                            }}>
                                                <DeleteOutlinedIcon sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
                                            </IconButton>
                                            <IconButton aria-label="view" color="primary" size="small" sx={{
                                                border: '1px solid blue', borderRadius: '5px', marginLeft: 1, boxShadow: 2,
                                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'blue',
                                                    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                                                },
                                            }}
                                                onClick={() => handleViewClick(doctor.doctor_id)}
                                            >
                                                <VisibilityOutlinedIcon sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            component="div"
                            count={totalRows}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </Box>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => setSnackbarOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
