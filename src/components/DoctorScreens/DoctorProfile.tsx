/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FaUserFriends, FaHeartbeat, FaStar } from 'react-icons/fa'; 
import doctorimgfemale from '../../assets/images/doctorimgfemale.png';
import doctorimgmale from '../../assets/images/doctorimgmale.jpg';
import { DoctorIDgetDeatiles } from '../../apiRequest/PatientgetDeatiles';


const DoctorProfile = () => {
  const [doctorDetails, setDoctorDetails] = useState<any>(null);
  const { doctorId } = useParams();
  const reviews = [
    {
      name: "Wendi Combs",
      rating: 5,
      comment: "I am consulting with her for the last 10 years and she is really good in thyroid. Her experience has the greatest strength. I recommend the doctorI am consulting with her for last 10 years and she is really good in thyroid. Her experience has greatest strength. By looking at the report she will diagnosis the problem and listen to us. We might think she is in a hurry to complete the patient but her experience makes her 100%.",
    },
    {
      name: "Nick Morrow",
      rating: 5,
      comment: "Dr. Jessika is my physician from the past four years. Whatever treatment and advice she has given me is of the best kind. I recommend the doctor. my physician from past four years. Till now, whatever treatment and advice she has given me is of the best kind. I am extremely satisfied with it. There may be about 10 minutes of waiting period before consultation. The hospital and staff are good as well.",
    },
    {
      name: "Carole Dodson",
      rating: 1,
      comment: "Its a not recommerded example. Its a not recommerded example. Its a not recommerded example. Its a not recommerded example",
    },
  ];

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await DoctorIDgetDeatiles(doctorId);
        setDoctorDetails(response.data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    if (doctorId) {
      fetchDoctorDetails();
    }
  }, [doctorId]);

  if (!doctorDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ height: '100vh', overflowY: 'auto', padding: '20px', backgroundColor: '#f4f7fa' }}>
      
      <Box
  sx={{
    backgroundColor: '#00c2b3',
    color: 'white',
    borderRadius: '8px',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    flexDirection: { xs: 'column', sm: 'row' }, 
    height: { xs: 'auto', sm: '280px' }, 
  }}
>
  <Box
    component="img"
    src={doctorDetails.gender === "female" ? doctorimgfemale : doctorimgmale}
    alt={doctorDetails.doctor_name}
    sx={{
      borderRadius: '8px',
      width: { xs: '100%', sm: '310px' }, 
      height: { xs: 'auto', sm: '260px' },
      marginRight: { xs: '0', sm: '20px' },
      marginBottom: { xs: '20px', sm: '0' },
    }}
  />
  <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
   
    <Box sx={{ flex: '1' }}>
      <Typography variant="h6" sx={{ margin: 0 }}>
        Hello, I am
      </Typography>
      <Typography variant="h4" sx={{ margin: '7px 0', fontWeight: 'bold' }}>
        Dr. {doctorDetails.doctor_name}
      </Typography>
      <Typography variant="subtitle1" sx={{ margin: 0 }}>
        {doctorDetails.qualification} - {doctorDetails.specialization}
      </Typography>
      <Typography variant="body1" sx={{ margin: 0 }}>
        {doctorDetails.experience} Years Experience Overall
      </Typography>
      <Typography variant="subtitle1" sx={{ margin: 0 }}>
        Medical-Registration-Number: {doctorDetails.med_reg_number}
      </Typography>
      
    </Box>

   
   
    <Box sx={{ flex: '1', marginLeft: '20px' }}>
    <Typography variant="subtitle1" sx={{ margin: 0 }}>
        {doctorDetails.phone_number}
      </Typography>
      <Typography variant="subtitle1" sx={{ margin: 0 }}>
        {doctorDetails.email}
      </Typography>
      <Typography variant="subtitle1" sx={{ margin: 0 }}>
        {doctorDetails.gender}
      </Typography>
      <Typography variant="subtitle1" sx={{ margin: 0 }}>
        City: {doctorDetails.town_name}
      </Typography>
      <Typography variant="subtitle1" sx={{ margin: 0 }}>
        State: {doctorDetails.state}
      </Typography>
      <Typography variant="subtitle1" sx={{ margin: 0 }}>
        Doctor since: {new Date(doctorDetails.createdAt).toLocaleDateString()}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
        <Typography component="span" sx={{ color: 'gold',fontSize:"29px" }}>
          ★★★★★
        </Typography>
        
      </Box>
    </Box>
  </Box>
</Box>


      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          borderRadius: '8px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          
        }}
      >
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  backgroundColor: 'white',width:"31%",height:150 , borderRadius: '8px',boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',}}>
          <Box component="i" className="fas fa-user-circle" sx={{ fontSize: '40px', marginBottom: '10px', color: '#007bff' }} />
          <FaUserFriends style={{ fontSize: '40px', marginBottom: '10px', color: '#00c2b3' }} /> 
          <Typography variant="h4" sx={{ color: '#333', margin: 0 }}>
            {doctorDetails.appointments.length}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            Patients
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',   backgroundColor: 'white',width:"31%",height:150 , borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',}}>
          <Box component="i" className="fas fa-heartbeat" sx={{ fontSize: '40px', marginBottom: '10px', color: '#007bff' }} />
          <FaHeartbeat style={{ fontSize: '40px', marginBottom: '10px', color: '#00c2b3' }} /> 
          <Typography variant="h4" sx={{ color: '#333', margin: 0 }}>
            {doctorDetails.appointments.filter((app: { appointment_type: string; }) => app.appointment_type === "1").length}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            Surgeries
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',   backgroundColor: 'white',width:"31%",height:150 , borderRadius: '8px',boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', }}>
          <Box component="i" className="fas fa-star" sx={{ fontSize: '40px', marginBottom: '10px', color: '#007bff' }} />
          <FaStar style={{ fontSize: '40px', marginBottom: '10px', color: '#00c2b3' }} />
          <Typography variant="h4" sx={{ color: '#333', margin: 0 }}>
            {doctorDetails.appointments.length}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            Reviews
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flexDirection:"row",display:"flex" }}>
       
      <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px',width:"80%",boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', }}>
        <Typography variant="h5" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
          About
        </Typography>
        <Typography variant="body1">
          Dr. Jessika Linda is an eminent Endocrinologist associated with Med Hospitals, 
          specially trained to diagnose diseases related to glands. She specializes in treating 
          people who suffer from hormonal imbalances, typically from glands in the endocrine system. 
          The most common conditions treated by Dr. Linda are Diabetes, Metabolic disorders, 
          Lack of growth, Osteoporosis, Thyroid diseases, and more.
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          Dr. Linda's approach lies in understanding patients' diseases and the procedures 
          recommended, providing care along with advice. 
        </Typography>
        <Box sx={{ marginTop: '10px' }}>
          <Typography variant="h5" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Specialized in
          </Typography>
          <Typography variant="subtitle1" sx={{ margin: 0, backgroundColor: '#00c2b3', color: 'white', padding: '7px 10px', display: 'inline-block', borderRadius: '4px',}}>
            {doctorDetails.specialization}
          </Typography>
        </Box>
      </Box>
       
       <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px',width:"23%" ,marginLeft:3,boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',}}>
        <Typography variant="h5" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
          Availability
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body1" sx={{ marginBottom: '7px', }}>Mon - 9:00 AM - 2:00 PM</Typography>
          <Typography variant="body1" sx={{ marginBottom: '7px', }}>Tue - 9:00 AM - 2:00 PM</Typography>
          <Typography variant="body1" sx={{ marginBottom: '7px', }}>Wed - 9:00 AM - 2:00 PM</Typography>
          <Typography variant="body1" sx={{ marginBottom: '7px', }}>Thu - 9:00 AM - 2:00 PM</Typography>
          <Typography variant="body1" sx={{ marginBottom: '7px', }}>Fri - 9:00 AM - 2:00 PM</Typography>
          <Typography variant="body1" sx={{ marginBottom: '7px', }}>Sat - 9:00 AM - 2:00 PM</Typography>
         
        </Box>
        <Button variant="contained" sx={{ marginTop: '21px', backgroundColor: '#00c2b3', fontSize:"bold",color:"white" }}>
          Book Appointment
        </Button>
      </Box>

      </Box>
      <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '50px',boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          Reviews
        </Typography>

        {reviews.map((review, index) => (
          <Box key={index} sx={{ marginBottom: '20px' }}>
             <Button variant="contained" sx={{ marginTop: '21px', backgroundColor: 'white', fontSize:"bold",color:"#00c2b3" ,border:2,borderBlockColor:"#00c2b3", marginBottom: '10px',float:"right"}}>
             Excellent
        </Button>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {review.name}
            </Typography>
            
            <Typography variant="body1">{review.comment}</Typography>
            <Typography sx={{ color: 'gold', fontSize: '18px' }}>
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </Typography>
           
          </Box>
           
        ))}
        <Button variant="contained" onClick={()=>alert("Loading.......")} sx={{ marginTop: '21px', backgroundColor: '#00c2b3', fontSize:"bold",color:"white" ,width:"100%"}}>
       More Reviews
        </Button>
      </Box>

    </Box>
  );
};

export default DoctorProfile;
