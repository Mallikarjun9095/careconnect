import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2';
import { Card, CardContent, Typography, Avatar, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper ,Link } from "@mui/material";
import { FaFemale, FaStethoscope, FaTint, FaArrowUp } from "react-icons/fa";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, PolarGrid, PolarAngleAxis, RadarChart, PolarRadiusAxis, Radar } from 'recharts';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { useParams } from 'react-router-dom';



const bpData = [
  { date: '24/04/2024', BpLevel: 140 },
  { date: '16/04/2024', BpLevel: 230 },
  { date: '10/04/2024', BpLevel: 190 },
];


const sugarData = [  
  
  { date:'24/04/2024', value: 100 },  
   { date:'24/05/2024', value: 95 },
  { date:'24/06/2024', value: 85 },
];

const heartRateData = [
  {date:'24/04/2024', value: 70 },
  {date:'24/04/2024', value: 75 },
  { date:'24/04/2024', value: 68 },
];

const cholesterolData = [
  { date:'24/04/2024', value: 180 },
  { date:'24/04/2024', value: 190 },
  { date:'24/04/2024', value: 175 },
];

const expenseData = [
  { name: 'Jan-Feb', cash: 30, card: 20 },
  { name: 'Mar-Apr', cash: 50, card: 30 },
  { name: 'May-Jun', cash: 40, card: 35 },
  { name: 'Jul-Aug', cash: 55, card: 25 },
  { name: 'Sep-Oct', cash: 50, card: 30 },
  { name: 'Nov-Dec', cash: 60, card: 40 },
];

const claimsData = [
  { name: 'Jan-Feb', requested: 20, approved: 15 },
  { name: 'Mar-Apr', requested: 40, approved: 25 },
  { name: 'May-Jun', requested: 30, approved: 20 },
  { name: 'Jul-Aug', requested: 35, approved: 25 },
  { name: 'Sep-Oct', requested: 45, approved: 30 },
  { name: 'Nov-Dec', requested: 25, approved: 20 },
];
const healthActivityData = [
  { subject: 'BP', A: 120, fullMark: 150 },
  { subject: 'Sugar', A: 90, fullMark: 100 },
  { subject: 'Heart Rate', A: 72, fullMark: 100 },
  { subject: 'Cholesterol', A: 180, fullMark: 250 },
];

const doctorVisits = [
  { doctor: 'Dr. Hector', date: '20/05/2024', department: 'Dentist', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { doctor: 'Dr. Mitchel', date: '20/05/2024', department: 'Urologist', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { doctor: 'Dr. Fermin', date: '18/03/2024', department: 'Surgeon', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
];

const reportsData = [
  { id: 1, file: 'Reports 1 clinical documentation', date: 'May-28, 2023' },
 { id: 2, file: 'Reports 2 random files documentation', date: 'Mar-20, 2023' },
  { id: 3, file: 'Reports 3 glucose level complete report', date: 'Feb-18, 2023' },
];

const PatientDashboard = () => {
  const { patientId } = useParams();
  console.log(patientId)
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      const response = await fetch(`http://localhost:3000/api/v1/AdminPatientRouter/${patientId}`);
      const data = await response.json();
      setPatient(data.data);
    };

    fetchPatientDetails();
  }, []);

  function handleDownload(id: number): void {
    // Implement download logic here
    console.log(`Download report with id: ${id}`);
  }

  function handleDelete(id: number): void {
    // Implement delete logic here
    console.log(`Delete report with id: ${id}`);
  }

  return (
    <Box sx={{ p: 3, height: '100vh', overflowY: 'auto' }}>
      {/* Patient Details Card */}
      {patient && (
        <Card sx={{ mb: 2, p: 3 }}>
          <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 10 }}>
               
               <Avatar
                alt={`${patient.first_name} ${patient.last_name}`}
                src="https://randomuser.me/api/portraits/women/45.jpg" // Placeholder image
                sx={{ width: 100, height: 100 }}
              />
             </Grid>
             <Grid size={{ xs: 12, sm: 10 }}>
                    <Grid container spacing={2}>
                    <Grid size={{ xs: 3}}>
                    <CardContent>
                     <Typography variant="h6">{`${patient.first_name} ${patient.last_name}`}</Typography>
                     <Typography variant="body2" color="textSecondary">
                       Patient Name
                     </Typography>
                   </CardContent>
                 </Grid>
                 <Grid size={{ xs: 3}}>
                 <CardContent>
                     <Typography variant="h6">
                       <FaFemale style={{ color: "#3f51b5" }} /> {patient.gender}
                     </Typography>
                     <Typography variant="body2" color="textSecondary">
                       Gender
                     </Typography>
                   </CardContent>
                 </Grid>
                 <Grid size={{ xs: 3}}>
                 <CardContent>
                     <Typography variant="h6">
                       <FaArrowUp style={{ color: "#3f51b5" }} /> {new Date(patient.date_of_birth).getFullYear() - new Date().getFullYear() + 68}
                     </Typography>
                     <Typography variant="body2" color="textSecondary">
                       Patient Age
                     </Typography>
                   </CardContent>
                 </Grid>
                 <Grid size={{ xs: 3}}>
                 <CardContent>
                     <Typography variant="h6">
                       <FaTint style={{ color: "#3f51b5" }} /> O+
                     </Typography>
                     <Typography variant="body2" color="textSecondary">
                       Blood Type
                     </Typography>
                   </CardContent>
                 </Grid>
                    <Grid size={{ xs: 3}}>
                   <CardContent>
                     <Typography variant="h6">
                       <FaStethoscope style={{ color: "#9e9e9e" }} /> Dr. David
                     </Typography>
                     <Typography variant="body2" color="textSecondary">
                       Consulting Doctor
                     </Typography>
                   </CardContent>
                 </Grid>
               </Grid>
             </Grid>
           </Grid>
         </Card>
       )}
      <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
      <Card sx={{ mb: 1, p: 1 }}>
    <CardContent>
      <Typography variant="h6" align="center" gutterBottom>
        BP Levels
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        Recent five visits
      </Typography>
      <AreaChart width={440} height={80} data={bpData}>
        <Tooltip />
        <Area type="monotone" dataKey="BpLevel" stroke="#ff5e57" fill="#ff5e57" />
      </AreaChart>
      <Table style={{ border: '1px solid #e1e3e1', borderCollapse: 'collapse', width: '100%', marginTop: '16px' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ border: '1px solid #e1e3e1', fontWeight: 'bold', padding: '4px' }} align="center">Date</TableCell>
            <TableCell style={{ border: '1px solid #e1e3e1', fontWeight: 'bold', padding: '4px' }} align="center">BpLevel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bpData.map((data, index) => (
            <TableRow key={index}>
              <TableCell style={{ border: '1px solid #e1e3e1', padding: '5px' }} align="center">{data.date}</TableCell>
              <TableCell style={{ border: '1px solid #e1e3e1', padding: '5px' }} align="center">{data.BpLevel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>

  </Grid>



  <Grid size={{ xs: 12, sm: 6 }}>
  <Card sx={{ mb: 1, p: 1 }}>
    <CardContent>
    <Typography variant="h6" align="center" gutterBottom>
      Sugar Levels
    </Typography>
    <Typography variant="body2" color="textSecondary" align="center">
      Recent five visits
    </Typography>      {/* Graph without X and Y axes */}
      <AreaChart width={430} height={80} data={sugarData}>
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
      {/* Table rendering the sugar data */}
      <Table style={{ border: '1px solid #e1e3e1', borderCollapse: 'collapse', width: '100%', marginTop: '16px' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ border: '1px solid #e1e3e1', fontWeight: 'bold' ,padding: '4px'}}align="center">Date</TableCell>
            <TableCell style={{ border: '1px solid #e1e3e1', fontWeight: 'bold',padding: '4px' }}align="center">Sugar Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sugarData.map((data, index) => (
            <TableRow key={index}>
                          <TableCell style={{ border: '1px solid #e1e3e1', padding: '5px' }} align="center">{data.date}</TableCell>
              <TableCell style={{ border: '1px solid #e1e3e1', padding: '5px' }} align="center">{data.value}</TableCell></TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</Grid>

       </Grid>
              <Grid container spacing={2}>
              <Card sx={{ mb: 1, p: 1 }}>
    <CardContent>
    <Typography variant="h6" align="center" gutterBottom>
    Cholesterol
    </Typography>
    <Typography variant="body2" color="textSecondary" align="center">
      Recent five visits
    </Typography>         {/* Graph without X and Y axes */}
      <AreaChart width={440} height={80} data={cholesterolData}>
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      {/* Table rendering the cholesterol data */}
      <Table style={{ border: '1px solid #e1e3e1', borderCollapse: 'collapse', width: '100%', marginTop: '16px' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ border: '1px solid #e1e3e1', fontWeight: 'bold', padding: '4px' }} align="center">Date</TableCell>
            <TableCell style={{ border: '1px solid #e1e3e1', fontWeight: 'bold', padding: '4px' }} align="center">Cholesterol Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cholesterolData.map((data, index) => (
            <TableRow key={index}>
              <TableCell style={{ border: '1px solid #e1e3e1', padding: '4px' }} align="center">{data.date}</TableCell>
              <TableCell style={{ border: '1px solid #e1e3e1', padding: '4px' }} align="center">{data.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
         <Grid size={{ xs: 12, sm: 6 }}>
         <Card sx={{ mb: 1, p: 1 }}>
  <CardContent>
  <Typography variant="h6" align="center" gutterBottom>
    Heart Rate
    </Typography>
    <Typography variant="body2" color="textSecondary" align="center">
      Recent five visits
    </Typography>       {/* Graph without X and Y axes */}
    <AreaChart width={440} height={80} data={heartRateData}>
      <Tooltip />
      <Area type="monotone" dataKey="value" stroke="#ff7300" fill="#ff7300" />
    </AreaChart>
    {/* Table rendering the heart rate data */}
    <Table style={{ border: '1px solid #e1e3e1', borderCollapse: 'collapse', width: '100%', marginTop: '16px' }}>
      <TableHead>
        <TableRow>
          <TableCell style={{ border: '1px solid #e1e3e1', fontWeight: 'bold', padding: '4px' }} align="center">Date</TableCell>
          <TableCell style={{ border: '1px solid #e1e3e1', fontWeight: 'bold', padding: '4px' }} align="center">Heart Rate</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {heartRateData.map((data, index) => (
          <TableRow key={index}>
            <TableCell style={{ border: '1px solid #e1e3e1', padding: '4px' }} align="center">{data.date}</TableCell>
            <TableCell style={{ border: '1px solid #e1e3e1', padding: '4px' }} align="center">{data.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>

         </Grid>
       </Grid>
         {/* Health Insurance Claims & Medical Expenses Charts */}
         <Grid container spacing={2}>

         <Grid size={{ xs: 12, sm: 6 }}>
         <Card sx={{ mb: 1, p: 1 }}>
             <CardContent>
               <Typography variant="h6">Health Insurance Claims</Typography>
               <BarChart width={450} height={200} data={claimsData}>
                 <XAxis dataKey="name" />
                 <YAxis />
                 <Tooltip />
                 <Bar dataKey="requested" fill="#3f51b5" name="Requested" />
                 <Bar dataKey="approved" fill="#9e9e9e" name="Approved" />
              </BarChart>
             </CardContent>
           </Card>
         </Grid>
        
         <Grid size={{ xs: 12, sm: 6 }}>
         <Card sx={{ mb: 1, p: 1 }}>
             <CardContent>
               <Typography variant="h6">My Medical Expenses</Typography>
               <AreaChart width={450} height={200} data={expenseData}>
                 <XAxis dataKey="name" />
                 <YAxis />
                 <Tooltip />
                 <Area type="monotone" dataKey="cash" stroke="#3f51b5" fillOpacity={0.6} fill="#3f51b5" name="Cash" />
                 <Area type="monotone" dataKey="card" stroke="#9e9e9e" fillOpacity={0.3} fill="#9e9e9e" name="Card" />
               </AreaChart>
             </CardContent>
           </Card>
         </Grid>
         </Grid>
        <Grid size={{xs:12}}>
  <Card style={{ width: '100%', marginBottom: '16px' }}> {/* Added marginBottom here */}
    <Typography variant="h6" style={{ padding: '16px' }}>
      Doctor Visits
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '18%' }}>Profile</TableCell>
            <TableCell style={{ width: '20%' }}>Doctor Name</TableCell>
            <TableCell style={{ width: '18%' }}>Date</TableCell>
            <TableCell style={{ width: '18%' }}>Department</TableCell>
            <TableCell style={{ width: '26%' }}>Reports</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctorVisits.map((visit, index) => (
            <TableRow key={index} style={{ height: '60px' }}>
              <TableCell style={{ textAlign: 'center' }}>
                <Avatar src={visit.image} alt={visit.doctor} />
              </TableCell>
              <TableCell>{visit.doctor}</TableCell>
              <TableCell>{visit.date}</TableCell>
              <TableCell>{visit.department}</TableCell>
              <TableCell>
                <Box display="flex" justifyContent="flex-start" alignItems="center">
                  <Button variant="contained" color="error" style={{ marginRight: '8px' }}>
                    View Reports
                  </Button>
                  <Button onClick={() => handleDownload(visit.id)} size="small">
                    <DownloadIcon />
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
</Grid>
{/* Reports Table */}
<Grid size={{ xs: 12 }}>
<Card style={{ width: '100%', marginBottom: '16px' }}> {/* Added marginBottom here */}
<TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>File</TableCell>
            <TableCell>Reports Link</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportsData.map((report, index) => (
            <TableRow key={index} style={{ height: '60px' }}>
              <TableCell>{report.id}</TableCell>
              <TableCell>
                <Avatar sx={{ bgcolor: 'blue' }} />
              </TableCell>
              <TableCell>
                <Typography
                  component="a"
                  href="#"
                  sx={{ color: '#2196f3', textDecoration: 'none' }}
                >
                  {report.file}
                </Typography>
              </TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>
                <Box display="flex" gap={1}>
                  <Button onClick={() => handleDelete(report.id)} size="small">
                    <DeleteIcon />
                  </Button>
                  <Button onClick={() => handleDownload(report.id)} size="small">
                    <DownloadIcon />
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
</Grid>


 <Grid container spacing={2}>
      {/* Health Activity Card */}
      <Grid size={{xs:12, sm:4}}>
      <Card sx={{ height: 350, boxShadow: 3, borderRadius: 2 , p:2 }}>
          <CardContent>
            <Typography variant="h6">Health Activity</Typography>
            <RadarChart outerRadius={90} width={300} height={250} data={healthActivityData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Health" dataKey="A" stroke="#3f51b5" fill="#3f51b5" fillOpacity={0.6} />
            </RadarChart>
          </CardContent>
        </Card>
      </Grid>

      {/* Pharmacy Card */}
      <Grid size={{xs:12, sm:4}}>
      <Card sx={{ height: 350,  boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Pharmacy
            </Typography>
            <Box
              component="img"
              src="/path-to-your-image.png" // Replace with your image path
              alt="Pharmacy Illustration"
              sx={{ mt: 2, width: '100%', height: 120, objectFit: 'contain' }}
            />
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
              $980
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Average Spending
            </Typography>
            <Typography variant="body2" color="success.main" fontWeight="bold" sx={{ mt: 0.5 }}>
              +20% vs last month
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
              You can choose from over 1600 admin dashboard templates on Bootstrap Gallery.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Timeline Card */}
      <Grid size={{xs:12, sm:4}}>
      <Card sx={{ height: 350, overflow: 'auto', boxShadow: 3, borderRadius: 2 , mb:5}}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Timeline
            </Typography>
            <Box sx={{ borderLeft: '2px solid #1976d2', mt: 2, pl: 2 }}>
              <Box mb={2}>
                <Typography variant="body2" color="textSecondary">
                  AN HOUR AGO
                </Typography>
                <Link href="#" underline="hover" color="primary" fontWeight="bold">
                  Dr. Janie Mcdonald
                </Link>
                <Typography variant="body2">- sent a new prescription.</Typography>
                <Typography variant="body2" color="error">
                  Medicine Name - Amocvmillin
                </Typography>
                <Link href="#" underline="hover" color="primary">
                  Payment Link ↗
                </Link>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="textSecondary">
                  AN HOUR AGO
                </Typography>
                <Link href="#" underline="hover" color="primary" fontWeight="bold">
                  Dr. Hector Banks
                </Link>
                <Typography variant="body2">- uploaded a report.</Typography>
                <Typography variant="body2" color="error">
                  Report Name - Lisymorpril
                </Typography>
                <Link href="#" underline="hover" color="primary">
                  Payment Link ↗
                </Link>
              </Box>

              <Box>
                <Typography variant="body2" color="textSecondary">
                  AN HOUR AGO
                </Typography>
                <Link href="#" underline="hover" color="primary" fontWeight="bold">
                  Dr. Deena Cooley
                </Link>
                <Typography variant="body2">- sent medicine details.</Typography>
                <Typography variant="body2" color="error">
                  Medicine Name - Predeymsone
                </Typography>
                <Link href="#" underline="hover" color="primary">
                  Payment Link ↗
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
         </Grid>
    
      
     </Box>
   );
 };

 export default PatientDashboard;






