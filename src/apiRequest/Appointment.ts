import axios from "axios";
import { origin } from "./config";
import Cookies from "js-cookie";

export const Appointment = async (p0: number, rowsPerPage: number) => {
  try {
    const token = Cookies.get("adminCookie");

    // If the token is missing, you may want to handle this scenario
    if (!token) {
      console.log("No token found, cannot make API request.");
      return;
    }

    const response = await axios({
      url: `${origin}/api/v1/appointmentsrouter/admin-appointments`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  
      },
    });

    const responseData = response?.data;
    return responseData;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log('An unknown error occurred');
    }
  }
};



export const getDoctorDetails = async (doctor_id: number) => {
  try {
    const response = await axios({
      url: `${origin}/api/v1/DoctorSpecializationRouter/specializations/${doctor_id}`, 
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data; 
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error fetching doctor details:', err.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};
