/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Tabs, Tab, TextField, Button, Typography, Alert } from '@mui/material';
import ReactQuill from 'react-quill';
import Grid from '@mui/material/Grid2';
import { fetchDoctorDetails, updateDoctorDetails } from '../../apiRequest/PatientgetDeatiles'; // Adjust the import path

const DoctorUpdateForm = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctor_name: '',
    email: '',
    phone_number: '',
    gender: '',
    marital_status: '',
    date_of_birth: '',
    address_line_1: '',
    address_line_2: '',
    town_name: '',
    state: '',
    med_reg_number: '',
    qualification: '',
    specialization: '',
    experience: '',
    bio: '',
    username: '',
    password: '',
    confirmPassword: '',


  });

  const [availability, setAvailability] = useState({
    monday: { from: '', to: '' },
    tuesday: { from: '', to: '' },
    wednesday: { from: '', to: '' },
    thursday: { from: '', to: '' },
    friday: { from: '', to: '' },
    saturday: { from: '', to: '' },
    sunday: { from: '', to: '' },
  }as any);

  const [tabIndex, setTabIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleTabChange = (_event: unknown, newIndex: React.SetStateAction<number>) => {
    setTabIndex(newIndex);
  };

  const handleInputChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvailabilityChange = (day: string, type: string, value: string) => {
    setAvailability({
      ...availability,
      [day]: { ...availability[day], [type]: value },
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await updateDoctorDetails(doctorId, formData);
      setMessage('Doctor updated successfully!');
      setTimeout(() => {
        navigate('/admin-dashboard/doctors');
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Error updating doctor details');
    }
  };

  const handleImageUpload = () => {
    // Handle image upload logic
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDoctorDetails(doctorId);
        setFormData({
          doctor_name: data.doctor_name,
          email: data.email,
          phone_number: data.phone_number,
          gender: data.gender,
          marital_status: data.marital_status,
          date_of_birth: data.date_of_birth.split('T')[0],
          address_line_1: data.address_line_1 || '',
          address_line_2: data.address_line_2 || '',
          town_name: data.town_name,
          state: data.state,
          med_reg_number: data.med_reg_number,
          qualification: data.qualification,
          specialization: data.specialization,
          experience: data.experience,
          bio: data.bio || '',
          username: data.username,
          password: data.  password,
          confirmPassword: data.confirmPassword,
        });
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
    fetchData();
  }, [doctorId]);

  function handleCancel() {
    navigate('/admin-dashboard/doctors'); // Redirect to the doctor list on cancel
  }

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
          {/* Render form fields based on selected tab */}
          {tabIndex === 0 && (
                        <Grid container spacing={2} sx={{ marginTop: 1, height: '100%' }}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Doctor Name"
                  name="doctor_name"
                  value={formData.doctor_name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Medical Registration Number"
                  name="med_reg_number"
                  value={formData.med_reg_number}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Marital Status"
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Address Line 1"
                  name="address_line_1"
                  value={formData.address_line_1}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Address Line 2"
                  name="address_line_2"
                  value={formData.address_line_2}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Town Name"
                  name="town_name"
                  value={formData.town_name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Qualifications"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>
          )}

                   {tabIndex === 1 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6">Profile Image</Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ReactQuill
                  value={formData.bio}
                  onChange={(bio: any) => setFormData({ ...formData, bio })}
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
           < Grid size={{xs:12,sm:4}}>
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
              Update Profile
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default DoctorUpdateForm;
