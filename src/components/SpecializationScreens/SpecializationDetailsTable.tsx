/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
    Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    Snackbar, InputAdornment, IconButton, Alert, TablePagination, Typography
} from '@mui/material';
import { Delete as DeleteOutlinedIcon, Edit as ModeEditOutlinedIcon, Visibility as VisibilityOutlinedIcon, Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { fetchSpecializations, doctorscount, deleteSpecializationById } from '../../apiRequest/PatientgetDeatiles';
import CustomAlert from '../../components/CustomAlert'; // Adjust the path as needed
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
// Interface for Specialization data
interface Specialization {
    specialization_Id: number;
    specialization_name: string;
    description: string;
    doctorCount?: number; 
}

export default function SpecializationTable() {
    const [loading, setLoading] = useState(true);
    const [specializationList, setSpecializationList] = useState<Specialization[]>([]);
    const [filteredSpecializations, setFilteredSpecializations] = useState<Specialization[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [specializationToDelete, setSpecializationToDelete] = useState<Specialization | null>(null);

    useEffect(() => {
        getSpecializations();
    }, []);

    const getSpecializations = async () => {
        try {
            const data = await fetchSpecializations();
            if (Array.isArray(data?.data)) {
                data?.data.sort((a: Specialization, b: Specialization) => b.specialization_Id - a.specialization_Id);
                setSpecializationList(data?.data);
                setFilteredSpecializations(data?.data);
                setTotalRows(data?.data.length);
    
                await updateDoctorCounts(data?.data);
                setPage(0);
            }
        } catch (error: any) {
            console.error('Error fetching specializations:', error.message);
            setSnackbarMessage('Failed to load specializations');
            setSnackbarOpen(true);
        } finally {
            setLoading(false); // Ensure loading is set to false here
        }
    };
    

    const updateDoctorCounts = async (specializations: Specialization[]) => {
        try {
            const countDataPromises = specializations.map(async (specialization) => {
                try {
                    const response = await doctorscount(specialization.specialization_name);
                    const doctorCount = response?.data?.doctorCount || 0;
                    return { ...specialization, doctorCount };
                } catch (apiError) {
                    console.error(`Error fetching doctor count for ${specialization.specialization_name}:`, apiError);
                    return { ...specialization, doctorCount: 0 };
                }
            });
    
            const updatedSpecializationList = await Promise.all(countDataPromises);
            setFilteredSpecializations(updatedSpecializationList);
        } catch (error: any) {
            console.error('Error fetching doctor counts:', error.message);
            setSnackbarMessage('Failed to load doctor counts');
            setSnackbarOpen(true);
        }
    };
    

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value.toLowerCase();
        const filtered = specializationList.filter(
            (specialization) =>
                specialization.specialization_name.toLowerCase().includes(searchQuery)
        );
        setFilteredSpecializations(filtered);
        setTotalRows(filtered.length);
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewClick = (specialization: Specialization) => {
        const specialization_id = encodeURIComponent(specialization.specialization_Id);
        window.location.href = `/admin-dashboard/DoctorsList?id=${specialization_id}`;
    };

    const handleDeleteClick = (specialization: Specialization) => {
        setSpecializationToDelete(specialization);
        setAlertVisible(true);
    };

    const handleConfirmDelete = async () => {
        if (specializationToDelete) {
            try {
                const specialization_Id = encodeURIComponent(specializationToDelete.specialization_Id);
                await deleteSpecializationById(specialization_Id);
                getSpecializations();
            } catch (error: any) {
                console.error('Error deleting specialization:', error.message);
                setSnackbarMessage('Failed to delete specialization');
                setSnackbarOpen(true);
                setLoading(false);
            } finally {
                setAlertVisible(false);
                setSpecializationToDelete(null);
                setLoading(false);
            }
        }
    };

    const handleCloseAlert = () => {
        setAlertVisible(false);
        setSpecializationToDelete(null);
    };

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Grid>
                    <Typography variant="h4" sx={{ margin: 0, color: 'black', fontSize: '24px', fontWeight: 'bold' }}>
                        Specializations Table
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
                            label="Search Specialization Name"
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
                    <Grid sx={{ display: 'flex' }}>
                        <IconButton
                            aria-label="add specialization"
                            sx={{
                                backgroundColor: 'green',
                                borderRadius: 2,
                                color: 'white',
                                padding: '5px 20px',
                                gap: 1
                            }}
                        >
                            <Typography sx={{ fontSize: '16px' }}>Add Specialization</Typography>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            {loading ? (
                <ShimmerTable />
            ) : (
                <>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table sx={{ minWidth: 700 }} aria-label="specializations table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#2EB9AE' }}>
                            <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>Specializations</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>Doctors Count</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}> Specialization Description</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSpecializations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((specialization) => (
                            <TableRow key={specialization.specialization_Id}>
                                <TableCell align="left" sx={{ padding: '6px 12px' }}>{specialization.specialization_Id}</TableCell>
                                <TableCell align="left" sx={{ padding: '6px 12px' }}>{specialization.specialization_name}</TableCell>
                                <TableCell align="left" sx={{ padding: '6px 12px' }}>{specialization.doctorCount || 0}</TableCell>
                                <TableCell align="left" sx={{ padding: '6px 12px' }}>{specialization.description}</TableCell>
                                <TableCell align="right" sx={{ padding: '6px 12px' }}>
                                    <IconButton aria-label="edit" color="success" size="small" sx={{
                                        border: '1px solid green', borderRadius: '5px', marginLeft: 1, backgroundColor: 'transparent', boxShadow: 2,
                                        transition: 'background-color 0.3s ease, color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'green',
                                            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                                        },
                                    }} onClick={() => handleViewClick(specialization)}>
                                        <ModeEditOutlinedIcon sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
                                    </IconButton>

                              

                                    <IconButton aria-label="delete" color="error" size="small" sx={{
                                        border: '1px solid red', borderRadius: '5px', marginLeft: 1, boxShadow: 2,
                                        transition: 'background-color 0.3s ease, color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'red',
                                            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                                        },
                                    }} onClick={() => handleDeleteClick(specialization)}>
                                        <DeleteOutlinedIcon sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
                                    </IconButton>
                                    <IconButton aria-label="view" color="primary" size="small" sx={{
                                        border: '1px solid blue', borderRadius: '5px', marginLeft: 1, backgroundColor: 'transparent', boxShadow: 2,
                                        transition: 'background-color 0.3s ease, color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'blue',
                                            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                                        },
                                    }} onClick={() => handleViewClick(specialization)}>
                                        <VisibilityOutlinedIcon sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
      </>
            )}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <CustomAlert
                visible={isAlertVisible}
                title="Confirm Delete"
                message="Are you sure you want to delete this specialization?"
                onConfirm={handleConfirmDelete}
                onClose={handleCloseAlert}
            />
        </Box>
    );
}
