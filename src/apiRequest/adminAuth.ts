/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { origin } from "./config";
export const adminLogin = async (data:any) => {
  console.log(data);
  
  const reqData = JSON.stringify(data)
  try {
      const response = await axios({
          url:`${origin}/api/v1/superadmin/superadmin-login`,
          method:'post',
          headers:{
              'Content-Type':'application/json'
          },
          data:reqData
      })

      const responseData = await response?.data

      return responseData;
  }
  catch (err:any) {
      console.log(err?.message);
      
  }
}

  
export const getPatientDetails = async () => {
    try {
        
        const response = await axios({
            url: `${origin}/api/v1/patientDetails/get`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response backend:', response.data);
        return response.data;
    } catch (error) {
        console.error('Axios error:', error);
        throw error;
    }
};





export const createPatient = async (data:any) => {
    const reqData = JSON.stringify(data);
    try {
      const response = await axios({
        url: `${origin}/api/v1/AdminPatientRouter/create-patient`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Add token if necessary
        },
        data: reqData,
      });
  
      return response.data;
    } catch (err) {
      console.error('API request error:', err.message);
      throw new Error(err.response?.data?.message || 'An error occurred');
    }
  };