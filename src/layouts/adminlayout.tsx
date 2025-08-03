/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2';
import AdminContext from "../utils/admincontext";
import { Badge, Box, Drawer, IconButton, Snackbar, Typography } from "@mui/material";
import { Notifications as NotificationsIcon, AccountCircle as AccountCircleIcon, ExitToApp as ExitToAppIcon, Menu as MenuIcon } from '@mui/icons-material';
import CloseIcon from "@mui/icons-material/Close";
import { Outlet } from "react-router-dom";
import SideNavAdmin from "./sideNavAdmin";
import { adminCookie } from "../apiRequest/config";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
export default function AdminLayout() {

  const [currentTab, setCurrentTab] = useState(1);
  const [openNotifer, setOpenNotifier] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [hideDurationNotifier, setHiderDurationNotifier] = useState(50000000);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [adminName, setAdminName] = useState("admin");
  const notificationCount = 5;
  useEffect(() => {
    // First, check for the token in cookies
    const token = Cookies.get(adminCookie) || localStorage.getItem(adminCookie);
    console.log("token: " + token);
  
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log("name: " + decodedToken.admin_name);
        setAdminName(decodedToken.admin_name); // Adjust according to your token payload
      } catch (error) {
        console.error("Error decoding token:", error);  
      }
    } else {
      console.error("Token not found!");
    }
  }, []);
  const handleLogout = () => {
    Cookies.remove(adminCookie);
    window.location.href = '/login'
    setNotifyMessage('Logged out successfully!');
    setOpenNotifier(true);
  };
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpenNotifier(!openNotifer)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <AdminContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        hideDurationNotifier,
        setHiderDurationNotifier,
        notifyMessage,
        setNotifyMessage,
        openNotifer,
        setOpenNotifier,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: '100vw', height: "100vh", overflow: "hidden", backgroundColor: '#ebf8f7' }} >
        <Box sx={{ width: "100%", height: "8vh", backgroundColor: '#2EB9AE', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0px 50px', boxShadow: 2 }} >
          <Box sx={{ flexShrink: 0, mr: 2, alignContent: 'center', display: 'flex', alignItems: 'center' }}>
            <Grid sx={{ display: { xs: 'block', lg: 'none' }, mr: 1 }}>
              <IconButton onClick={toggleDrawer(true)} sx={{ border: 'none', '&:focus': { outline: 'none' } }}>
                <MenuIcon sx={{ fontSize: 40, color: 'white' }} />
              </IconButton>
            </Grid>
            <Typography variant="h5" component="h1" sx={{ color: 'white', fontWeight: '700', display: { xs: 'none', lg: 'block' } }}>
              CareConnect
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton sx={{ border: 'none', '&:focus': { outline: 'none' } }}>
                <AccountCircleIcon sx={{ fontSize: 30, color: 'white' }} />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 500, color: 'white' }}>{adminName}</Typography>
            </Box>
            <IconButton sx={{ border: 'none', '&:focus': { outline: 'none' } }}>
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon sx={{ fontSize: 30, color: 'white' }} />
              </Badge>
            </IconButton>
            <Box  onClick={() => handleLogout()} sx={{ cursor:'pointer', display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: 1, height: '5.5vh', padding: '0px 7px', '&:hover': { backgroundColor: 'black', '& .icon, & .text': { color: 'white', } } }}>
              <IconButton sx={{ border: 'none', '&:focus': { outline: 'none' } }}>
                <ExitToAppIcon className="icon" fontSize="small" sx={{ fontSize: 20, color: 'black', fontWeight: 500 }} />
              </IconButton>
              <Typography className="text" sx={{ fontWeight: 500, color: 'black', fontSize: '14px' }}  >
                LOGOUT
              </Typography>
            </Box>

          </Box>
        </Box>
        <Grid container sx={{ width: "100%", height: '92vh', overflow: "hidden" }} >

          <Grid size={{ xs: 0, md: 0, lg: 2 }} sx={{ display: { xs: 'none', md: 'none', lg: 'block' }, height: "100%", overflow: "hidden", boxShadow: 2 }} >
            <SideNavAdmin />
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 10 }} >
            <Outlet />
          </Grid>
        </Grid>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <SideNavAdmin />
          </Box>
        </Drawer>
      </Box>
      <Snackbar
        open={openNotifer}
        autoHideDuration={hideDurationNotifier}
        onClose={() => setOpenNotifier(!openNotifer)}
        message={notifyMessage}
        action={action}
      />
    </AdminContext.Provider>
  );
}
