/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, List, ListItem, ListItemText, Collapse, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  LocalHospital as DoctorsIcon,
  Person as PatientsIcon,
  Business as HospitalsIcon,
  Event as AppointmentsIcon,
  Work as SpecializationIcon,
  RateReview as ReviewsIcon,
  AdminPanelSettings as AdminsIcon,
  Payment as AccountsIcon,
  ChevronRight,
  ExpandLess,
  AccountCircle as DoctorProfileIcon,
  Edit as ModeEditOutlinedIcon,
  Add as AddIcon,
} from '@mui/icons-material';

export default function SideNavAdmin() {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null); // Controls which submenu is open
  const navigate = useNavigate();

  useEffect(() => {
    const savedTab = localStorage.getItem('currentTab');
    if (savedTab) {
      setActiveTab(JSON.parse(savedTab));
    }
  }, []);

  const handleMenuClick = (id: number, path: string | null) => {
    if (openSubMenu === id) {
      setOpenSubMenu(null); // Close submenu if it's already open
    } else {
      setOpenSubMenu(id); // Open the new submenu
    }

    if (path) {
      onchangeCurrentTab(id, path);
    }
  };

  const onchangeCurrentTab = (id: number, path: string) => {
    localStorage.setItem('currentTab', JSON.stringify(id));
    setActiveTab(id);
    navigate(path);
  };

  const RenderRoutes = (props: any) => {
    const { item } = props;

    return (
      <>
        <ListItem
          onClick={() => handleMenuClick(item?.id, item?.subItems ? null : item?.path)}
          key={item?.id}
          component="li"
          sx={{
            width: '100%',
            background:
              activeTab === item?.id
                ? 'linear-gradient(195deg, #2EB9AE, #2EB9AE)'
                : 'transparent',
            color: activeTab === item?.id ? 'white' : 'black',
            height: '40px',
            marginBottom: '10px',
            borderRadius: '5px',
            gap: 2,
            boxShadow: activeTab === item?.id ? 3 : '0',
            cursor: 'pointer',
            '&:hover': {
              background:
                activeTab === item?.id
                  ? 'linear-gradient(195deg, #2EB9AE, #2EB9AE)'
                  : '#f8fffe',
              borderBottom: '2px solid #E0E0E0',
            },
          }}
        >
          <Box
            sx={{
              color: activeTab === item?.id ? 'white' : 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: activeTab === item?.id ? 'none' : '#f8fffe',
              padding: '5px',
              borderRadius: '5px',
              boxShadow: activeTab === item?.id ? '0' : '1',
            }}
          >
            {item?.icon}
          </Box>

          <ListItemText
            primary={item?.name}
            sx={{ fontSize: '20px', textTransform: 'capitalize', fontWeight: 700 }}
          />

          {/* Arrow Icon for Menu Items with Submenus */}
          {item?.subItems && (openSubMenu === item?.id ? <ExpandLess /> : <ChevronRight />)}
        </ListItem>

        {/* Conditionally render sub-menu for active tab */}
        {item?.subItems && (
          <Collapse in={openSubMenu === item?.id} timeout="auto" unmountOnExit>
            <Box sx={{ pl: 2}}>
              {item?.subItems?.map((subItem: any) => (
                <ListItem
                  key={subItem?.id}
                  onClick={() => onchangeCurrentTab(subItem?.id, subItem?.path)}
                  sx={{
                    background:
                      activeTab === subItem?.id
                        ? 'linear-gradient(195deg, #2EB9AE, #2EB9AE)'
                        : 'transparent',
                    color: activeTab === subItem?.id ? 'white' : 'black',
                    height: '35px',
                    width: '100%',
                    marginBottom: '7px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    '&:hover': {
                      background:
                        activeTab === subItem?.id
                          ? 'linear-gradient(195deg, #2EB9AE, #2EB9AE)'
                          : '#f8fffe',
                      borderBottom: '2px solid #E0E0E0',
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: activeTab === subItem?.id ? 'white' : 'black',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: activeTab === subItem?.id ? 'none' : '#f8fffe',
                      padding: '4px',
                      borderRadius: '5px',
                      boxShadow: activeTab === subItem?.id ? '0' : '1',
                    }}
                  >
                    {subItem?.icon}
                  </Box>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '14px', fontWeight: 500, marginLeft: '10px' }}>
                        {subItem?.name}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </Box>
          </Collapse>
        )}
      </>
    );
  };

  const navigationArray = [
    {
      id: 1,
      name: 'Dashboard',
      path: '/admin-dashboard',
      icon: <DashboardIcon sx={{ fontSize: '20px' }} />,
    },
    {
      id: 2,
      name: 'Doctors',
      // path: '/admin-dashboard/doctors',
      icon: <DoctorsIcon sx={{ fontSize: '20px' }} />,
      subItems: [
        {
          id: 20,
          name: 'Doctor Dashboard',
          path: '/admin-dashboard/doctorDashboard',
          icon: <DashboardIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 21,
          name: 'Doctor Profile',
          path: '/admin-dashboard/doctorprofile',
          icon: <DoctorProfileIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 22,
          name: 'Doctor List',
          path: '/admin-dashboard/doctors',
          icon: <DoctorsIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 23,
          name: 'Edit Doctor',
          path: '/admin-dashboard/editDoctor/:doctorId',
          icon: <ModeEditOutlinedIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 24,
          name: 'Add Doctor',
          path: '/admin-dashboard/addDoctor',
          icon: <AddIcon sx={{ fontSize: '18px' }} />,
        },
      ],
    },
    {
      id: 3,
      name: 'Patients',
      icon: <PatientsIcon sx={{ fontSize: '20px' }} />,
      subItems: [
        {
          id: 30,
          name: 'Patient Dashboard',
          path: '/admin-dashboard/patientDashboard',
          icon: <DashboardIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 31,
          name: 'Patient Profile',
          path: '/admin-dashboard/patientProfile/:patientId',
          icon: <DoctorProfileIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 32,
          name: 'Patient List',
          path: '/admin-dashboard/patients',
          icon: <PatientsIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 33,
          name: 'Edit Patient',
          path: '/admin-dashboard/editPatient/:patientId',
          icon: <ModeEditOutlinedIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 34,
          name: 'Add Patient',
          path: '/admin-dashboard/addPatient',
          icon: <AddIcon sx={{ fontSize: '16px' }} />,
        },
      ],
    },
    {
      id: 4,
      name: 'Hospitals',
      path: '/admin-dashboard/hospitals',
      icon: <HospitalsIcon sx={{ fontSize: '20px' }} />,
    },
    {
      id: 5,
      name: 'Appointments',
      path: '/admin-dashboard/appointments',
      icon: <AppointmentsIcon sx={{ fontSize: '20px' }} />,
      subItems: [
        {
          id: 50,
          name: 'AppointmentDashboard',
          path: '/admin-dashboard/AppointmentDashboard',
          icon: <AppointmentsIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 51,
          name: 'Pendingappointment',
          path: '/admin-dashboard/Pendingappointment',
          icon: <AppointmentsIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 52,
          name: 'Confirmedappointment',
          path: '/admin-dashboard/Confirmedappointment',
          icon: <AppointmentsIcon sx={{ fontSize: '16px' }} />,
        },
       
        {
          id: 53,
          name: 'Completedappointment',
          path: '/admin-dashboard/Completedappointment',
          icon: <AppointmentsIcon sx={{ fontSize: '16px' }} />,
        },
        {
           id:54,
           name:'Cancelledappointment',
           path:'/admin-dashboard/Cancelledappointment',
           icon:<AppointmentsIcon sx={{fontSize:'16px'}} />,
        },
      ],
    },
    {
      id: 6,
      name: 'Specialization',
      path: '/admin-dashboard/specialization',
      icon: <SpecializationIcon sx={{ fontSize: '20px' }} />,
      subItems: [
        {
          id: 60,
          name: 'Dashboard',
          path: '/admin-dashboard/specializationDashboard',
          icon: <DashboardIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 61,
          name: 'Specialization List',
          path: '/admin-dashboard/specialization',
          icon: <SpecializationIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 62,
          name: 'Edit Specialization',
          path: '/admin-dashboard/editSpecialization',
          icon: <ModeEditOutlinedIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 63,
          name: 'Add Specialization',
          path: '/admin-dashboard/addSpecialization',
          icon: <AddIcon sx={{ fontSize: '16px' }} />,
        },
       
      ],
    },
    {
      id: 7,
      name: 'Reviews',
      path: '/admin-dashboard/reviews',
      icon: <ReviewsIcon sx={{ fontSize: '20px' }} />,
    },
    {
      id: 8,
      name: 'Admins',
      icon: <AdminsIcon sx={{ fontSize: '20px' }} />,
      subItems: [
        {
          id: 80,
          name: 'Admin Dashboard',
          path: '/admin-dashboard/admin-listDashboard',
          icon: <DashboardIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 81,
          name: 'Admin List',
          path: '/admin-dashboard/admins',
          icon: <AdminsIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 82,
          name: 'Edit Admin',
          path: '/admin-dashboard/editAdmin',
          icon: <ModeEditOutlinedIcon sx={{ fontSize: '16px' }} />,
        },
        {
          id: 83,
          name: 'Doctor verify',
          path: '/admin-dashboard/DoctorVerify',
          icon: <AddIcon sx={{ fontSize: '16px' }} />,
        },
       
      ],
    },
    {
      id: 9,
      name: 'Accounts',
      path: '/admin-dashboard/accounts',
      icon: <AccountsIcon sx={{ fontSize: '20px' }} />,
    },
  ];

  return (
    <Box
      sx={{
        background: 'white',
        display: 'flex',
        width: '100%',
        padding: '15px',
        flexDirection: 'column',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <List sx={{ width: '100%', gap: 2 }}>
        {navigationArray?.map((x: any) => (
          <RenderRoutes item={x} key={x.id} />
        ))}
      </List>
    </Box>
  );
}
