import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import { protectedRouter } from './protectedRoutes/protectedRouter';
import { ThemeProvider } from '@mui/material/styles';
const Login = React.lazy(() => import('./components/Login'))
const Dashboard = React.lazy(() => import('./components/Dashboard'))
const DoctorDetailsTable = React.lazy(() => import('./components/DoctorScreens/DoctorDetailsTable'));
const PatientDetailsTable = React.lazy(() => import('./components/PatientScreens/PatientDetailsTable'));
const HospitalDetailsTable = React.lazy(() => import('./components/HospitalDetailsTable'));
const AppointmentDetailsTable = React.lazy(() => import('./components/AppointmentScreen/AppointmentDetailsTable'));
const SpecializationDetailsTable = React.lazy(() => import('./components/SpecializationScreens/SpecializationDetailsTable'));
const ReviewsDetailsTable = React.lazy(() => import('./components/ReviewsDetailsTable'));
const AdminListTable = React.lazy(() => import('./components/AdminScreens/AdminListTable'));
const AccountDetails = React.lazy(() => import('./components/AccountDetails'));
const Settings = React.lazy(() => import('./components/Settings'));
const DoctorProfile = React.lazy(() => import('./components/DoctorScreens/DoctorProfile'));
const DoctorDashboard = React.lazy(() => import('./components/DoctorScreens/DoctorDashboard'));
const EditDoctorDetails = React.lazy(() => import('./components/DoctorScreens/EditDoctorDetails'));
const AddDoctorDetails = React.lazy(() => import('./components/DoctorScreens/AddDoctorDetails'));
const PatientDashboard = React.lazy(() => import('./components/PatientScreens/PatientDashboard'));
const PatientProfile = React.lazy(() => import('./components/PatientScreens/PatientProfile'));
const AddPatient = React.lazy(() => import('./components/PatientScreens/AddPatient'));
const EditPatient = React.lazy(() => import('./components/PatientScreens/EditPatient'));
const SpecializationDashboard = React.lazy(() => import('./components/SpecializationScreens/SpecializationDashboard'));
const AddSpecialization = React.lazy(() => import('./components/SpecializationScreens/AddSpecialization'));
const EditSpecialization = React.lazy(() => import('./components/SpecializationScreens/EditSpecialization'));
const DoctorsList = React.lazy(() => import('./components/SpecializationScreens/DoctorsList'));
const AdminDashboard = React.lazy(() => import('./components/AdminScreens/AdminDashboard'));
const DoctorVerify = React.lazy(() => import('./components/AdminScreens/DoctorVerify'));
const EditAdmin = React.lazy(() => import('./components/AdminScreens/EditAdmin'));



const AppointmentDashboard = React.lazy(() => import('./components/AppointmentScreen/AppointmentDetailsTable'));
const Confirmedappointment = React.lazy(() => import('./components/AppointmentScreen/Confirmedappointment'));
const Completedappointment = React.lazy(() => import('./components/AppointmentScreen/Completedappointment'));
const Cancelledappointment = React.lazy(() => import('./components/AppointmentScreen/Cancelledappointment'));
const  Pendingappointment  = React.lazy(() =>import('./components/AppointmentScreen/Pendingappointment'));



import PageNotFound from './components/PageNotFound';

import { QueryClient, QueryClientProvider } from 'react-query';
import theme from './utils/theme';
import AdminLayout from './layouts/adminlayout';



function App() {
  const queryClient = new QueryClient();
 
  const router = createBrowserRouter([
    {
      path: "admin-dashboard",
      element: protectedRouter() == "admin" ? <React.Suspense fallback="loading..."><AdminLayout /></React.Suspense> : <Navigate to="/login" />,

      children: [
        { path: '', element: <React.Suspense fallback="loading..."><Dashboard/></React.Suspense> },
        //admin Screens
        { path: '/admin-dashboard/admin-listDashboard', element: <React.Suspense fallback="loading..."><AdminDashboard/></React.Suspense> },
        { path: '/admin-dashboard/DoctorVerify', element: <React.Suspense fallback="loading..."><DoctorVerify/></React.Suspense> },
        { path: '/admin-dashboard/editAdmin', element: <React.Suspense fallback="loading..."><EditAdmin/></React.Suspense> },
        //hospital Screens
        //doctor Screens
        { path: '/admin-dashboard/doctors', element: <React.Suspense fallback="loading..."><DoctorDetailsTable/></React.Suspense> },
        { path: '/admin-dashboard/doctorprofile/:doctorId', element: <React.Suspense fallback="loading..."><DoctorProfile/></React.Suspense> },
        { path: '/admin-dashboard/doctorDashboard', element: <React.Suspense fallback="loading..."><DoctorDashboard/></React.Suspense> },
        { path: '/admin-dashboard/editDoctor/:doctorId', element: <React.Suspense fallback="loading..."><EditDoctorDetails/></React.Suspense> },
        { path: '/admin-dashboard/addDoctor', element: <React.Suspense fallback="loading..."><AddDoctorDetails/></React.Suspense> },
        //patient Screens
        { path: '/admin-dashboard/patients', element: <React.Suspense fallback="loading..."><PatientDetailsTable/></React.Suspense> },
        { path: '/admin-dashboard/patientDashboard', element: <React.Suspense fallback="loading..."><PatientDashboard/></React.Suspense> },
        { path: '/admin-dashboard/patientProfile/:patientId', element: <React.Suspense fallback="loading..."><PatientProfile patient={undefined}/></React.Suspense> },
        { path: '/admin-dashboard/addPatient', element: <React.Suspense fallback="loading..."><AddPatient/></React.Suspense> },
        { path: '/admin-dashboard/editPatient/:patientId', element: <React.Suspense fallback="loading..."><EditPatient/></React.Suspense> },

        { path: '/admin-dashboard/hospitals', element: <React.Suspense fallback="loading..."><HospitalDetailsTable/></React.Suspense> },
        { path: '/admin-dashboard/appointments', element: <React.Suspense fallback="loading..."><AppointmentDetailsTable/></React.Suspense> },
        //specialization Screens
        { path: '/admin-dashboard/specialization', element: <React.Suspense fallback="loading..."><SpecializationDetailsTable/></React.Suspense> },
        { path: '/admin-dashboard/specializationDashboard', element: <React.Suspense fallback="loading..."><SpecializationDashboard/></React.Suspense> },
        { path: '/admin-dashboard/addSpecialization', element: <React.Suspense fallback="loading..."><AddSpecialization/></React.Suspense> },
        { path: '/admin-dashboard/editSpecialization', element: <React.Suspense fallback="loading..."><EditSpecialization/></React.Suspense> },
        { path: '/admin-dashboard/DoctorsList', element: <React.Suspense fallback="loading..."><DoctorsList/></React.Suspense> },
        
        { path: '/admin-dashboard/reviews', element: <React.Suspense fallback="loading..."><ReviewsDetailsTable/></React.Suspense> },
        { path: '/admin-dashboard/admins', element: <React.Suspense fallback="loading..."><AdminListTable/></React.Suspense> },
        { path: '/admin-dashboard/accounts', element: <React.Suspense fallback="loading..."><AccountDetails/></React.Suspense> },
        { path: '/admin-dashboard/settings', element: <React.Suspense fallback="loading..."><Settings/></React.Suspense> },
  
        //appointment screen
        { path: '/admin-dashboard/AppointmentDashboard', element: <React.Suspense fallback="loading..."><AppointmentDashboard/></React.Suspense> },
        { path: '/admin-dashboard/Pendingappointment', element: <React.Suspense fallback="loading..."><Pendingappointment/></React.Suspense> },
        { path: '/admin-dashboard/Confirmedappointment', element: <React.Suspense fallback="loading..."><Confirmedappointment/></React.Suspense> },
        { path: '/admin-dashboard/Completedappointment', element: <React.Suspense fallback="loading..."><Completedappointment/></React.Suspense> },
         {path: '/admin-dashboard/Cancelledappointment', element: <React.Suspense fallback="loading..."><Cancelledappointment/></React.Suspense>},

      ]
    },
    {
      path: "/",
      element:
        <React.Suspense fallback="loading..." >
          <Login />
        </React.Suspense>
    },
    {
      path: "/login",
      element:
        <React.Suspense fallback="loading..." >
          <Login />
        </React.Suspense>
    },
    { path: '*', element: <React.Suspense fallback="loading"><PageNotFound /></React.Suspense> }

  ])

  return (
    <ThemeProvider theme={theme}  >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App