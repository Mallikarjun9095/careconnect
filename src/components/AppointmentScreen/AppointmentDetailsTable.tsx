import { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, CardContent, MenuItem, FormControl, Select, InputLabel, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,  TablePagination, InputAdornment
} from '@mui/material';
import {
  Search as SearchIcon,
  EventNote as EventNoteIcon,
  PendingActions as PendingActionsIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  ConfirmationNumber as ConfirmationNumberIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Appointment } from '../../apiRequest/Appointment';
import Grid from '@mui/material/Grid2';

interface Appointment {
  appointment_id: number;
  patient_id: string;
  doctor_id: string;
  appointment_type: string;
  appointment_date: string;
  appointment_time: string;
  disease_type: string;
  appointment_status: number;
}

const AppointmentDashboard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([]);
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    total: 0,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchAppointments = async () => {
      const result = await Appointment(page + 1, rowsPerPage);

      if (result && result.data) {
        setAppointmentsData(result.data);
      }

      if (result && result.statusCounts) {
        setStatusCounts({
          pending: result.statusCounts.pending || 0,
          confirmed: result.statusCounts.confirmed || 0,
          completed: result.statusCounts.completed || 0,
          cancelled: result.statusCounts.cancelled || 0,
          total: result.totalAppointments || 0,
        });
      }
    };
    fetchAppointments();
  }, [page, rowsPerPage]);

  const getFilteredAppointments = () => {
    if (!filter) return appointmentsData;
    return appointmentsData.filter((app) => {
      switch (filter) {
        case 'pending': return app.appointment_status === 0;
        case 'confirmed': return app.appointment_status === 1;
        case 'completed': return app.appointment_status === 2;
        case 'cancelled': return app.appointment_status === 3;
        default: return true;
      }
    });
  };

  const filteredAndSearchedAppointments = getFilteredAppointments().filter((appointment) =>
    appointment.appointment_id.toString().includes(searchTerm) ||
    appointment.patient_id.toString().includes(searchTerm) ||
    appointment.doctor_id.toString().includes(searchTerm) ||
    appointment.appointment_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.disease_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAppointments = [
    { type: 'pending', title: 'Pending', count: statusCounts.pending, icon: <PendingActionsIcon /> },
    { type: 'confirmed', title: 'Confirmed', count: statusCounts.confirmed, icon: <ConfirmationNumberIcon /> },
    { type: 'completed', title: 'Completed', count: statusCounts.completed, icon: <CheckCircleIcon /> },
    { type: 'cancelled', title: 'Cancelled', count: statusCounts.cancelled, icon: <CancelIcon /> },
    { type: 'total', title: 'Total Appointments', count: statusCounts.total, icon: <EventNoteIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', marginTop: '16px', marginBottom: '24px' }}>
        Appointments
      </Typography>

      {/* Appointment Summary Cards */}
      <Box sx={{ overflowY: 'auto', padding: '20px', flex: 1 }}>
        <Grid container spacing={3} sx={{ justifyContent: 'space-around' }}>
          {filteredAppointments.map((appointment) => (
            <Grid size={{ xs: 9, sm: 8, md: 5, lg: 2 }} key={appointment.type} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper
                elevation={2}
                sx={{
                  borderRadius: '12px', width: { xs: '160px', sm: '180px', md: '260px' }, height: { xs: '100px', sm: '180px', md: '200px' },
                  padding: '1px', backgroundColor: '#F9FAFC', textAlign: 'center', overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)' },
                }}
                onClick={() => {
                  const path = `/admin-dashboard/${appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}appointment`;
                  navigate(path);
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                    <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E3F2FD', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {appointment.icon}
                    </Box>
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem', color: '#1D3557', marginBottom: '6px' }}>{appointment.title}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '2.5rem', color: '#1D3557' }}>{appointment.count}</Typography>
                </CardContent>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Filter and Search */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', paddingTop: 2, paddingRight: 2 }}>
        <TextField
          label="Search" variant="outlined" onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '200px', marginRight: '20px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}
          InputProps={{ endAdornment: (<InputAdornment position="end"><SearchIcon /></InputAdornment>) }}
        />
        <FormControl variant="outlined" sx={{ marginTop: '2px', width: '200px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
          <InputLabel>Filter</InputLabel>
          <Select label="Filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="all"><em>All</em></MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Appointments Table */}
      <Box sx={{ padding: 0, flex: 1 }}>
        <Typography variant="h5" gutterBottom sx={{ left: 230 }}>Appointments list</Typography>
        <TableContainer component={Paper} sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
          <Table aria-label="appointments">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#2EB9AE' }}>
                <TableCell>Appointment ID</TableCell>
                <TableCell>Patient ID</TableCell>
                <TableCell>Doctor ID</TableCell>
                <TableCell>Appointment Type</TableCell>
                <TableCell>Appointment Date</TableCell>
                <TableCell>Appointment Time</TableCell>
                <TableCell>Disease Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAndSearchedAppointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((appointment) => (
                <TableRow key={appointment.appointment_id}>
                  <TableCell>{appointment.appointment_id}</TableCell>
                  <TableCell>{appointment.patient_id}</TableCell>
                  <TableCell>{appointment.doctor_id}</TableCell>
                  <TableCell>{appointment.appointment_type}</TableCell>
                  <TableCell>{appointment.appointment_date}</TableCell>
                  <TableCell>{appointment.appointment_time}</TableCell>
                  <TableCell>{appointment.disease_type}</TableCell>                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredAndSearchedAppointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        />
      </Box>
    </Box>
  );
};

export default AppointmentDashboard;
