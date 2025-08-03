/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TextField, Button, Paper, Snackbar, Alert, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { createPatient } from '../../apiRequest/adminAuth'; 
import { useNavigate } from 'react-router-dom'; 

const PatientForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    date_of_birth: '',
    gender: '',
    address: '',
    marital_status: '',
    aadhar_id: '',
    health_insurence_id: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); 

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const responseData = await createPatient(formData);
      setSuccess('Patient created successfully');
      console.log(responseData);

      
      setTimeout(() => {
        navigate(-1);
      }, 2000); 
    } catch (err:any) {
      setError(err.message || 'An error occurred');
    }
  };

  const handleCancel = () => {
    navigate('/admin-dashboard/patients'); 
  };

  const handleCloseSnackbar = () => {
    setError('');
    setSuccess('');
  };

  return (
    <Paper style={{ padding: '24px', margin: '16px', height: '88vh', overflow: 'auto' }}>
     
      <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
        Add Patient Details
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          height: 'calc(100vh - 150px)', 
          overflowY: 'auto', 
          paddingTop: 2 
        }}
      >
        <Grid container spacing={3}>
          <Grid size={{xs:12,sm:6}}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12,sm:6}}>        
                <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12,sm:6}}>          
              <TextField
              fullWidth
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12,sm:6}}>         
               <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12,sm:6}}>           
             <TextField
              fullWidth
              label="Date of Birth"
              name="date_of_birth"
              type="date"
              InputLabelProps={{ shrink: true, style: { fontSize: '10px', fontWeight: 'bold' } }}
              value={formData.date_of_birth}
              onChange={handleChange}
            />
          </Grid>

          
          <Grid size={{xs:12,sm:6}}>        
                <FormControl fullWidth>
              <InputLabel style={{ fontSize: '10px', fontWeight: 'bold' }}>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{xs:12,sm:6}}>       
                 <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>

         
          <Grid size={{xs:12,sm:6}}>            <FormControl fullWidth>
              <InputLabel style={{ fontSize: '10px', fontWeight: 'bold' }}>Marital Status</InputLabel>
              <Select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
                label="Marital Status"
              > 
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{xs:12,sm:6}}>        
                <TextField
              fullWidth
              label="Aadhar ID"
              name="aadhar_id"
              value={formData.aadhar_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12,sm:6}}>        
                <TextField
              fullWidth
              label="Health Insurance ID"
              name="health_insurence_id"
              value={formData.health_insurence_id}
              onChange={handleChange}
            />
          </Grid>
          
         
          <Grid size={{ xs: 12 }} container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Grid size="auto">
              <Button
                onClick={handleCancel}
                variant="contained"
                sx={{
                  backgroundColor:'#2EB9AE',
                  color: 'black',
                  '&:hover': { backgroundColor: '#2EB9AE'},
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid size="auto">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor:'#2EB9AE',
                  color: 'white',
                  '&:hover': { backgroundColor: '#2EB9AE' },
                }}
              >
                Create Patient
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>

     
      <Snackbar open={!!success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>

      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default PatientForm;

