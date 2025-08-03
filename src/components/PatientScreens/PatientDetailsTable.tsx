import React, { useState, useEffect } from 'react';
import {
    Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    Snackbar, InputAdornment, IconButton, Alert, TablePagination, Typography
} from '@mui/material';
import { Delete as DeleteOutlinedIcon, Edit as ModeEditOutlinedIcon, Add as AddIcon, Visibility as VisibilityOutlinedIcon, Search as SearchIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { PatientgetDeatiles } from '../../apiRequest/PatientgetDeatiles';
import '../../css/shimmer.css';
import axios from 'axios';
interface Patient {
    id: number;
    patient_id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    phone_number: string;
    email: string;
    status: boolean;
}

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

export default function PatientDetailsTable() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(true); 
    const [refreshData, setRefreshData] = useState(false); 

    useEffect(() => {
        getPatients();
    }, [refreshData]); 
    const getPatients = async () => {
        setLoading(true); 
        try {
            const patientData = await PatientgetDeatiles();
            if (patientData) {
                patientData.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
                setPatients(patientData);
                setFilteredPatients(patientData);
                setTotalRows(patientData.length);
                setPage(0);
            }
        } catch (error) {
            console.error('Error fetching patients:', error);
        } finally {
            setLoading(false); 
        }
    };
// Function to handle viewing the patient profile
const handleViewPatientClick = (patientId: number) => {
    window.location.href = `/admin-dashboard/patientProfile/${patientId}`;
};

// Function to handle deleting a patient
const handleDeletePatientClick = async (patientId: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this patient?");
    
    if (confirmed) {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/AdminPatientRouter/${patientId}`);
            
            if (response.status === 200) {
                setSnackbarMessage("Patient deleted successfully.");
                setSnackbarOpen(true);
                // Refresh the data after deletion
                setRefreshData((prev) => !prev);
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
            alert("Failed to delete the patient.");
        }
    }
};
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value.toLowerCase();
        const searchNumber = !isNaN(Number(searchQuery)) ? Number(searchQuery) : null;

        const filtered = patients.filter((patient) =>
            patient.first_name.toLowerCase().includes(searchQuery) ||
            patient.last_name.toLowerCase().includes(searchQuery) ||
            patient.email.toLowerCase().includes(searchQuery) ||
            patient.phone_number.includes(searchQuery) ||
            patient.gender.toLowerCase().includes(searchQuery) ||
            (patient.status ? 'active' : 'inactive').includes(searchQuery) ||
            (searchNumber !== null && patient.patient_id === searchNumber)
        );

        setFilteredPatients(filtered);
        setTotalRows(filtered.length);
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddDetails = () => {
        window.location.href = '/admin-dashboard/addPatient';
    };
    const handleEditPatientClick = (patientId: number) => {
        window.location.href = `/admin-dashboard/editPatient/${patientId}`
    };

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Grid size={{ xs: 4, md: 2 }}>
                    <Typography variant="h4" sx={{ margin: 0, color: 'black', fontSize: '24px', fontWeight: 'bold' }}>
                        Patients List
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
                            label="Search By Name, Email, or Address"
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
                    </Grid>
                    <Grid sx={{ display: 'flex' }}>
                        <IconButton
                            onClick={handleAddDetails}
                            aria-label="addPatient"
                            sx={{
                                backgroundColor: 'green',
                                borderRadius: 2,
                                color: 'white',
                                padding: '5px 20px',
                                gap: 1
                            }}
                        >
                            <Typography sx={{ fontSize: '16px' }}>Add Patient</Typography>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

            {loading ? (
                <ShimmerTable />
            ) : (
                <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: '440px', overflowY: 'auto' }}>
                    <Table sx={{ minWidth: 700 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#2EB9AE' }}>
                                <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>Patient ID</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>Patient Name</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>DOB</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>Gender</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>Phone</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>Email</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '500', color: 'white' }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: '500', color: 'white' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? filteredPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filteredPatients
                            ).map((patient) => (
                                <TableRow key={patient.id} sx={{ height: '10px' }}>
                                    <TableCell align="left" sx={{ padding: '6px 30px', fontSize: 11 }}>{patient.patient_id}</TableCell>
                                    <TableCell align="left" sx={{ padding: '6px 12px', fontSize: 11 }}>{patient.first_name} {patient.last_name}</TableCell>
                                    <TableCell align="left" sx={{ padding: '6px 12px', fontSize: 11 }}>{new Date(patient.date_of_birth).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}</TableCell>
                                    <TableCell align="left" sx={{ padding: '6px 12px', fontSize: 11 }}>{patient.gender}</TableCell>
                                    <TableCell align="left" sx={{ padding: '6px 12px', fontSize: 11 }}>{patient.phone_number}</TableCell>
                                    <TableCell align="left" sx={{ padding: '6px 12px', fontSize: 11 }}>{patient.email}</TableCell>
                                    <TableCell align="left" sx={{ padding: '6px 12px', fontSize: 11 }}>{patient.status ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell align="right" sx={{ padding: '6px 12px' }}>
                                    <IconButton aria-label="edit" color="success" size="small" onClick={() => handleEditPatientClick(patient.patient_id)}sx={{
                                        border: '1px solid green', borderRadius: '5px', marginLeft: 1, backgroundColor: 'transparent',boxShadow:2,
                                        transition: 'background-color 0.3s ease, color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'green',
                                            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                                        },
                                    }}>
                                        <ModeEditOutlinedIcon sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
                                    </IconButton>
                                    <IconButton aria-label="delete" color="error" size="small" onClick={() => handleDeletePatientClick(patient.patient_id)} sx={{
                                        border: '1px solid red', borderRadius: '5px', marginLeft: 1,boxShadow:2,
                                        transition: 'background-color 0.3s ease, color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'red',
                                            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                                        },
                                    }}>
                                        <DeleteOutlinedIcon sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
                                    </IconButton>
                                    <IconButton aria-label="view" color="primary" size="small" onClick={() => handleViewPatientClick(patient.patient_id)} sx={{
                                        border: '1px solid blue', borderRadius: '5px', marginLeft: 1,boxShadow:2,
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
                rowsPerPageOptions={[10, 25, 50 ,100]}
                component="div"
                count={totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}



