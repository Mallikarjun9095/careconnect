import React, { useState, useEffect } from 'react';
import {
    Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    Snackbar, InputAdornment, IconButton, Alert, TablePagination, Typography
} from '@mui/material';
import { Delete as DeleteOutlinedIcon, Edit as ModeEditOutlinedIcon, Add as AddIcon, Visibility as VisibilityOutlinedIcon, Search as SearchIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { AdmingetDeatiles } from '../../apiRequest/PatientgetDeatiles';



// Update Admin interface to match backend fields
interface Admin {
    subAdmin_id: number;
    email: string;
    hashed_password: string;
    role: string;
}

export default function AdminDetailsTable() {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);
    const [selectedAdmins, setSelectedAdmins] = useState<Set<number>>(new Set());
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);

    useEffect(() => {
        // Fetch admins from API when the component loads
        getAdmins();
    }, []);

    const getAdmins = async () => {
        try {
            const adminData = await AdmingetDeatiles(); // Call API to fetch data
            if (adminData) {
                // Sort and update state with fetched admin data
                adminData.sort((a: Admin, b: Admin) => b.subAdmin_id - a.subAdmin_id);
                setAdmins(adminData);
                setFilteredAdmins(adminData);
                setTotalRows(adminData.length);
                setPage(0);
            }
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    const handleDeleteSelected = async () => {
        try {
            console.log('Deleting admins with IDs:', Array.from(selectedAdmins));
            setSelectedAdmins(new Set());
            setSnackbarMessage('Selected admins deleted successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting selected admins:', error);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value.toLowerCase();
        const filtered = admins.filter(
            (admin) =>
                admin.email.toLowerCase().includes(searchQuery) ||
                admin.role.toLowerCase().includes(searchQuery)
        );
        setFilteredAdmins(filtered);
        setTotalRows(filtered.length);
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
      <Box sx={{ width: '100%', padding: 2 }}>
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Grid size={{ xs: 4, md: 2 }}>
              <Typography variant="h4" sx={{ margin: 0, color: 'black', fontSize: '24px', fontWeight: 'bold' }}>
                  Admins List
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
                      label="Search By Admin Name"
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
                      onClick={() => setSelectedAdmins(new Set())}
                      aria-label="add admins"
                      sx={{
                          backgroundColor: 'green',
                          borderRadius: 2,
                          color: 'white',
                          padding: '5px 20px',
                          gap: 1
                      }}
                  >
                      <Typography sx={{ fontSize: '16px' }}>Add Admins</Typography>
                      <AddIcon />
                  </IconButton>
              </Grid>
          </Grid>
      </Grid>

            
            {selectedAdmins.size > 0 && (
                <IconButton onClick={handleDeleteSelected} aria-label="delete" sx={{ marginTop: 2 }}>
                    <DeleteOutlinedIcon />
                </IconButton>
            )}

         
            <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 500, overflowY: 'auto' }}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#2EB9AE' }}>
                            <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>No.</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold', color: 'white' }}>Email</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Role</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredAdmins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredAdmins
                        ).map((admin) => (
                            <TableRow key={admin.subAdmin_id} sx={{ height: '10px' }}>
                                <TableCell align="left" sx={{ padding: '6px 12px' }}>{admin.subAdmin_id}</TableCell>
                                <TableCell align="left" sx={{ padding: '6px 12px' }}>{admin.email}</TableCell>
                                <TableCell align="center" sx={{ padding: '6px 12px' }}>{admin.role}</TableCell>
                                <TableCell align="right" sx={{ padding: '6px 12px' }}>
                                    <IconButton aria-label="edit" color="success" size="small" sx={{
                                        border: '1px solid green', borderRadius: '5px', marginLeft: 1, backgroundColor: 'transparent',boxShadow:2,
                                        transition: 'background-color 0.3s ease, color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'green',
                                            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                                        },
                                    }}> 
                                        <ModeEditOutlinedIcon sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
                                    </IconButton>
                                    <IconButton aria-label="delete" color="error" size="small" sx={{
                                        border: '1px solid red', borderRadius: '5px', marginLeft: 1,boxShadow:2,
                                        transition: 'background-color 0.3s ease, color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'red',
                                            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                                        },
                                    }}>
                                        <DeleteOutlinedIcon sx={{ fontSize: '18px', color: "#757575", fontWeight: 400, '&:hover': { color: '#fff' }, }} />
                                    </IconButton>
                                    <IconButton aria-label="view" color="primary" size="small" sx={{
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

            <TablePagination
                rowsPerPageOptions={[7, 10, 15]}
                component="div"
                count={totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ marginTop: 2 }}
            />

           
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}