/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { origin } from "./config";

export const PatientgetDeatiles = async () => {
  try {
    const response = await axios({
      url: `${origin}/api/v1/doctorGetDetailsRouter/getAllPatient`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const responseData = await response?.data;

    return responseData;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log('An unexpected error occurred.');
    }
  }
}


export const DoctorgetDeatiles = async (page: number, limit: number) => {
  
  

    try {
        const response = await axios({
            url:`${origin}/api/v1/doctorGetDetailsRouter/getAllDoctors`,
            method:'get',
            params: { page, limit }, 
            headers:{
                'Content-Type':'application/json'
            },
            
        })
  
        const responseData = await response?.data
  
        return responseData;
    }
    catch (err:any) {
        console.log(err?.message);
        
    }
  }



  export const fetchSpecializations = async () => {
    try {
        const response = await axios.get(`${origin}/api/v1/SpecializationRouter/all`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response?.data;
        return data;
    } catch (error: any) {
        console.error('Error fetching specializations:', error.message);
        throw new Error('Failed to load specializations');
    }
};


export const doctorscount = async (specilization:any) => {
  try {
      const response = await axios.get(`${origin}/api/v1/SpecializationRouter/specialization/doctors/${specilization}`, {
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const data = response?.data;
      return data;
  } catch (error: any) {
      console.error('Error fetching specializations:', error.message);
      throw new Error('Failed to load specializations');
  }
};

export const fetchDoctorsBySpecialization = async (specialization_id: any) => {
  try {
    const response = await axios.get(`${origin}/api/v1/DoctorSpecializationRouter/doctors/${specialization_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response?.data;
    console.log("jvedsgjbcnksjvhewbdnskjgjhvebdsb",data)
    return data;
  } catch (error: any) {
    console.error('Error fetching doctors by specialization:', error.message);
    throw new Error('Failed to load doctors for the given specialization');
  }
};

// Function to delete specialization by ID
export const deleteSpecializationById = async (specialization_Id:any) => {
  try {
    console.log('Deleting specialization', specialization_Id)
    const response = await axios.delete(`${origin}/api/v1/SpecializationRouter/delete/${specialization_Id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response?.data;
  } catch (error: any) {
    console.error('Error deleting specialization:', error.message);
    throw new Error('Failed to delete specialization');
  }
};

export const AdmingetDeatiles = async () => {

  try {
      const response = await axios({
          url:`${origin}/api/v1/subAdminRouter/list`,
          method:'get',
          headers:{
              'Content-Type':'application/json'
          },
          
      })

      const responseData = await response?.data

      return responseData;
  }
  catch (err:any) {
      console.log(err?.message);
      
  }
}

// export const CreatePatient = async (data:any) => {
//   console.log(data);
  
//   const reqData = JSON.stringify(data)
//   try {
//       const response = await axios({
//           url:`${origin}/v1/api/v1/AdminPatientRouter/create-patient`,
//           method:'post',
//           headers:{
//               'Content-Type':'application/json'
//           },
//           data:reqData
//       })

//       const responseData = await response?.data

//       return responseData;
//   }
//   catch (err:any) {
//       console.log(err?.message);
      
//   }
// }





export const CreatePatient = async (data:any) => {
  try {
    const response = await axios.post(`${origin}/v1/api/v1/AdminPatientRouter/create-patient`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (err:any) {
    console.error(err?.message || 'An error occurred while creating patient');
    throw err; 
  }
};








const BASE_URL = 'http://localhost:3000/api/v1/AdminPatientRouter';

export const getPatientById = async (patientId: string | undefined, _String: StringConstructor) => {
    const response = await axios.get(`${BASE_URL}/${patientId}`);
    return response.data.data;
};

export const updatePatientById = async (patientId: string, patientData: any) => {
    const response = await axios.put(`${BASE_URL}/${patientId}`, patientData);
    return response.data;
};



















const API_URL = 'http://localhost:3000/api/v1/AdminDoctorRouter';

export const createDoctor = async (doctorDetails: any) => {
    try {
        const response = await axios.post(`${API_URL}/create-doctor`, doctorDetails);
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data.message : 'Server error';
    }
};










export const fetchDoctorDetails = async (doctorId: any) => {
  const response = await axios.get(`${API_URL}/${doctorId}`);
  return response.data.data; 
};

export const updateDoctorDetails = async (doctorId: any, formData: any) => {
  const response = await axios.put(`${API_URL}/${doctorId}`, formData);
  return response.data; 
};
