/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
    Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientById, updatePatientById } from '../../apiRequest/PatientgetDeatiles'; 

const EditPatientForm = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState<any>({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const fetchedPatient = await getPatientById(patientId, patient);

                setPatient(fetchedPatient);  
            } catch (error) {
                console.error('Error fetching patient details:', error);
                setSnackbarMessage('Error fetching patient details.');
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        };
        fetchPatient();
    }, [patient, patientId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPatient({ ...patient, [name]: value });
    };

    const handleCancel = () => {
        navigate('/admin-dashboard/patients'); 
    };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

   
    if (typeof patientId !== 'string') {
        console.error('patientId is undefined or not a string');
        setSnackbarMessage('Patient ID is missing.');
        setSnackbarOpen(true);
        return; 
    }

    try {
        await updatePatientById(patientId, patient);
        setSnackbarMessage('Patient details updated successfully.');
        setSnackbarOpen(true);
        setTimeout(() => {
            navigate('/admin-dashboard/patients');
        }, 2000);
    } catch (error) {
        console.error('Error updating patient details:', error);
        setSnackbarMessage('Failed to update patient details.');
        setSnackbarOpen(true);
    }
};


    return (
        <Paper style={{ padding: '16px', margin: '16px', height: '88vh', overflow: 'auto' }}>
            <Box sx={{ padding: 2, maxWidth: '1000px', margin: '0 auto' }}>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>Edit Patient</Typography>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="first_name"
                                    label="First Name"
                                    value={patient.first_name || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="last_name"
                                    label="Last Name"
                                    value={patient.last_name || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="date_of_birth"
                                    label=""
                                    type="date"
                                    value={patient.date_of_birth?.split('T')[0] || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="gender"
                                    label="Gender"
                                    value={patient.gender || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="phone_number"
                                    label="Phone Number"
                                    value={patient.phone_number || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    value={patient.email || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="address"
                                    label="Address"
                                    value={patient.address || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="marital_status"
                                    label="Marital Status"
                                    value={patient.marital_status || ''}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="aadhar_id"
                                    label="Aadhar ID"
                                    value={patient.aadhar_id || ''}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="health_insurance_id"
                                    label="Health Insurance ID"
                                    value={patient.health_insurance_id || ''}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 2 }}>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={handleCancel}
                                sx={{ backgroundColor: '#2EB9AE', color: '#000', '&:hover': { backgroundColor: '#269A91' } }}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ backgroundColor: '#2EB9AE', color: '#fff', '&:hover': { backgroundColor: '#269A91' } }}>
                                Update Patient
                            </Button>
                        </Box>
                    </form>
                )}
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                    <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarMessage.includes('Error') ? 'error' : 'success'}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Paper>
    );
};

export default EditPatientForm;
