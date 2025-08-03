import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer } from 'recharts';
import Grid from '@mui/material/Grid2';

// Sample data for charts
const doctorSpecializationData = [
  { name: 'Cardiology', value: 10 },
  { name: 'Neurology', value: 8 },
  { name: 'Pediatrics', value: 12 },
  { name: 'Dermatology', value: 5 },
];

const revenueData = [
  { name: 'Cardiology', revenue: 10000 },
  { name: 'Neurology', revenue: 8500 },
  { name: 'Pediatrics', revenue: 9500 },
  { name: 'Dermatology', revenue: 5000 },
];

const specializationRatingData = [
  { month: 'Jan', Cardiology: 4.5, Neurology: 4.0, Pediatrics: 4.2, Dermatology: 3.8 },
  { month: 'Feb', Cardiology: 4.6, Neurology: 4.1, Pediatrics: 4.3, Dermatology: 4.0 },
  { month: 'Mar', Cardiology: 4.7, Neurology: 4.3, Pediatrics: 4.5, Dermatology: 4.1 },
];

const appointmentData = [
  { name: 'Cardiology', appointments: 120 },
  { name: 'Neurology', appointments: 90 },
  { name: 'Pediatrics', appointments: 110 },
  { name: 'Dermatology', appointments: 70 },
];

// Doctor list by specialization
const doctorList = [
  { name: 'Dr. John Doe', specialization: 'Cardiology', patients: 50, rating: 4.7 },
  { name: 'Dr. Jane Smith', specialization: 'Neurology', patients: 45, rating: 4.5 },
  { name: 'Dr. Alice Brown', specialization: 'Pediatrics', patients: 60, rating: 4.8 },
  { name: 'Dr. Bob White', specialization: 'Dermatology', patients: 30, rating: 4.2 },
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function SpecializationDashboard() {
  return (
    <Box sx={{ padding: 4, height: '100vh', overflowY: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Doctor Specialization Dashboard</Typography>

      <Grid container spacing={4}>
        {/* Specialization Count Cards */}
        {doctorSpecializationData.map((specialization, index) => (
          <Grid key={index} size={{xs:12, sm:6, md:3}}>
            <Card sx={{ backgroundColor: COLORS[index % COLORS.length], color: 'white' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{specialization.name}</Typography>
                <Typography variant="h4">{specialization.value}</Typography>
                <Typography>Doctors</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Pie Chart - Number of Doctors per Specialization */}
        <Grid size={{xs:12, md:6}}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Doctors per Specialization</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={doctorSpecializationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                  {doctorSpecializationData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart - Revenue by Specialization */}
        <Grid size={{xs:12 ,md:6}}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Revenue by Specialization</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Line Chart - Specialization Ratings */}
        <Grid size={{xs:12 ,md:6}}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Specialization Ratings Over Time</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={specializationRatingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Cardiology" stroke="#8884d8" />
                <Line type="monotone" dataKey="Neurology" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Pediatrics" stroke="#ffc658" />
                <Line type="monotone" dataKey="Dermatology" stroke="#ff8042" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart - Appointments per Specialization */}
        <Grid size={{xs:12 ,md:6}}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Appointments per Specialization</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appointments" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Doctor List Table */}
        <Grid size={{xs:12}}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Doctor Performance by Specialization</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Specialization</TableCell>
                  <TableCell>Patients</TableCell>
                  <TableCell>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctorList.map((doctor, index) => (
                  <TableRow key={index}>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.specialization}</TableCell>
                    <TableCell>{doctor.patients}</TableCell>
                    <TableCell>{doctor.rating}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
