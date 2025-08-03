import { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Appointment as AppointmentApi } from '../../apiRequest/Appointment';

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

const Confirmedappointment = () => {
  const [confirmedAppointments, setConfirmedAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchConfirmedAppointments = async () => {
      const result = await AppointmentApi(page + 1, rowsPerPage);

      if (result && result.data) {
        const filtered = result.data.filter((appointment: Appointment) => appointment.appointment_status === 1);
        setConfirmedAppointments(filtered);
        setFilteredAppointments(filtered); 
      }
    };
    fetchConfirmedAppointments();
  }, [page, rowsPerPage]);

 
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredAppointments(confirmedAppointments); 
    } else {
      const filtered = confirmedAppointments.filter((appointment) =>
        appointment.appointment_id.toString().includes(searchTerm) ||
      appointment.patient_id.toString().includes(searchTerm) ||
      appointment.doctor_id.toString().includes(searchTerm) ||
      appointment.appointment_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.disease_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAppointments(filtered);
    }
  }, [searchTerm, confirmedAppointments]);

  return (
    <Box sx={{ padding: 2 }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Typography variant="h4" sx={{ textAlign: 'left' }}>
          Confirmed Appointments
        </Typography>

        
        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '200px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '15px',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <Table aria-label="confirmed appointments">
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
            {filteredAppointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((appointment) => (
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
        count={filteredAppointments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
      />
    </Box>
  );
};

export default Confirmedappointment;
