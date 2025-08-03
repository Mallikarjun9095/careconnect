/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Alert, Box, Tabs, Tab } from '@mui/material';
import ReactQuill from 'react-quill';
import Grid from '@mui/material/Grid2'; 
import { useNavigate } from 'react-router-dom'; 
import { createDoctor } from '../../apiRequest/PatientgetDeatiles'; 

const AddDoctorForm = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        doctor_name: '',
        phone_number: '',
        email: '',
        qualification: '',
        bio: '',
        med_reg_number: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
        marital_status: '',
        dob: '',
        address1: '',
        address2: '',
        town: '',
        state: '',
        specialization: '',
        experience: '' 
    });

    const [availability, setAvailability] = useState({
        monday: { from: '', to: '' },
        tuesday: { from: '', to: '' },
        wednesday: { from: '', to: '' },
        thursday: { from: '', to: '' },
        friday: { from: '', to: '' },
        saturday: { from: '', to: '' },
        sunday: { from: '', to: '' }
    }as any);

    const [tabIndex, setTabIndex] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleBioChange = (value: any) => {
        setFormData({ ...formData, bio: value });
    };

    const handleImageUpload = (e: { target: { files: any[]; }; }) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Image uploaded:', file);
        }
    };

    const handleAvailabilityChange = (day: string, field: string, value: string) => {
        setAvailability({
            ...availability,
            [day]: {
                ...availability[day],
                [field]: value
            }
        });
    };

    const handleTabChange = (_event: any, newValue: React.SetStateAction<number>) => {
        setTabIndex(newValue);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const doctorDetails = {
            ...formData,
            availability,
        };

        try {
            const response = await createDoctor(doctorDetails);
            setMessage(response.message);
            navigate('/admin-dashboard/doctors'); 
        } catch (err: any) {
            setError(err || 'Error creating doctor');
        }
    };

    const handleCancel = () => {
        navigate('/admin-dashboard/doctors'); 
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Paper style={{ padding: '20px', maxHeight: '100vh', overflowY: 'auto' }}>
                {message && <Alert severity="success">{message}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}

                <Tabs 
                    value={tabIndex} 
                    onChange={handleTabChange} 
                    sx={{
                        '& .MuiTab-root': {
                            outline: 'none',
                            color: '#2EB9AE',
                            '&:hover': {
                                backgroundColor: 'rgba(46, 185, 174, 0.1)',
                            },
                        },
                        '& .Mui-selected': {
                            backgroundColor: '#2EB9AE',
                            color: 'white',
                        },
                    }}
                >
                    <Tab label="Personal Details" />
                    <Tab label="Profile & Bio" />
                    <Tab label="Availability" />
                    <Tab label="Account Details" />
                </Tabs>

                <form onSubmit={handleSubmit}>
                    {tabIndex === 0 && (
                        <Grid container spacing={2} sx={{ marginTop: 1, height: '100%' }}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="Doctor Name" name="doctor_name" value={formData.doctor_name} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="Medical Registration Number" name="med_reg_number" value={formData.med_reg_number} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="Marital Status" name="marital_status" value={formData.marital_status} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="Date of Birth" name="dob" type="date" InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="Address Line 1" name="address1" value={formData.address1} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="Address Line 2" name="address2" value={formData.address2} onChange={handleInputChange} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="Town Name" name="town" value={formData.town} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="Specialization" name="specialization" value={formData.specialization} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="Qualifications" name="qualification" value={formData.qualification} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth label="Experience (Years)" name="experience" value={formData.experience} onChange={handleInputChange} required />
                            </Grid>
                        </Grid>
                    )}


{tabIndex === 1 && (
                        <Grid container spacing={3}>
                            <Grid size={{ xs:12 }}>
                                <Typography variant="h6">Profile Image</Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </Grid>
                            <Grid size={{ xs:12 }}>
                                <ReactQuill
                                    value={formData.bio}
                                    onChange={handleBioChange}
                                    placeholder="Write a short bio..."
                                />
                            </Grid>
                        </Grid>
                    )}

                    {tabIndex === 2 && (
                        <Grid container spacing={3} sx={{ marginTop: 0 }}>
                            {Object.keys(availability).map((day) => (
                                <Grid size={{ xs: 12, sm: 4 }} key={day}>
                                    <Typography variant="h6">{day.charAt(0).toUpperCase() + day.slice(1)}</Typography>
                                    <Grid container spacing={2}>
                                        <Grid size={{xs:6}}>
                                            <TextField label="" type="time" fullWidth value={availability[day].from} onChange={(e) => handleAvailabilityChange(day, 'from', e.target.value)} />
                                        </Grid>
                                        <Grid size={{xs:6}}>
                                            <TextField label="" type="time" fullWidth value={availability[day].to} onChange={(e) => handleAvailabilityChange(day, 'to', e.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {tabIndex === 3 && (
                        <Grid container spacing={3} sx={{ marginTop: 1 }}>
                            <Grid size={{xs:12,sm:4}}>
                                <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{xs:12,sm:4}}>
                                <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} required />
                            </Grid>
                            <Grid size={{xs:12,sm:4}}>
                                <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} required />
                            </Grid>
                        </Grid>
                    )}

                    <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="outlined" onClick={handleCancel} sx={{ marginRight: 2, color: '#2EB9AE', borderColor: '#2EB9AE' }}>
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit" sx={{ backgroundColor: '#2EB9AE', color: 'white', '&:hover': { backgroundColor: '#1b8a7a' } }}>
                            Create Profile
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default AddDoctorForm;