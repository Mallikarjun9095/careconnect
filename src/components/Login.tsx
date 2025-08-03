/* eslint-disable @typescript-eslint/no-explicit-any */
import Grid from '@mui/material/Grid2';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/login.css";
import loginImage from '../assets/images/CareconnectLogo.png';
import LoginImage1 from '../assets/images/LoginImage1.png';
import LoginImage2 from '../assets/images/LoginImage2.png';
import LoginImage3 from '../assets/images/LoginImage3.png';
import { Box, FormControl, TextField, Typography, FormHelperText, Button, Snackbar, IconButton, InputAdornment } from '@mui/material';
import { adminLogin } from '../apiRequest/adminAuth';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { adminCookie } from '../apiRequest/config';
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

const LoginScreen = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const navigate = useNavigate();
    const [openSnack, setOpenSnack] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const [userDataErrors, setUserDataErrors] = useState({
        email: '',
        password: '',
    });

    const handleChangeUserData = (e: any) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleBlurEmail = () => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!userData.email || !emailRegex.test(userData.email)) {
            setUserDataErrors({
                ...userDataErrors,
                email: 'Please enter a valid email',
            });
        } else {
            setUserDataErrors({
                ...userDataErrors,
                email: '',
            });
        }
    };

    const handleBlurPassword = () => {
        if (!userData.password) {
            setUserDataErrors({
                ...userDataErrors,
                password: 'Please enter the password',
            });
        } else {
            setUserDataErrors({
                ...userDataErrors,
                password: '',
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const token = await Cookies.get(adminCookie);
        if (token) {
            const decodedToken: any = jwtDecode(token);
            if (decodedToken) {
                navigate('/admin-dashboard');
            } else{
                navigate('/login');
            }
        }
    }
    const onClickSubmitLogin = async () => {
      try {
        const response = await adminLogin(userData);
        if (response?.token) {
          Cookies.set(adminCookie, response.token);
          window.location.href = '/admin-dashboard';
        } else {
          setMessage(response?.message || 'Login failed. Please check your credentials.');
          setOpenSnack(true);
        }
      } catch (error) {
        console.error('Error during login:', error);
        setMessage('Failed to login. Please try again later.');
        setOpenSnack(true);
      }
    };

    const action = (
        <Button color="secondary" size="small" onClick={() => setOpenSnack(false)}>
            UNDO
        </Button>
    );

  return (
    <Grid container style={{ height: '100vh' , overflowY:'auto' }}>
      {/* Left Side */}
      <Grid  size={{xs:12,md:6}} sx={{ backgroundColor: '#2EB9AE', padding: '20px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 500 }}>
          <Slider {...settings} >
            <div>
              <img src={LoginImage1} alt="Slider 1" style={{width:500,height:500}}/>
            </div>
            <div>
              <img src={LoginImage2} alt="Slider 2" style={{width:500,height:500}}/>
            </div>
            <div>
              <img src={LoginImage3} alt="Slider 3" style={{width:500,height:500}}/>
            </div>
          </Slider>
        </Box>
      </Grid>

      {/* Right Side */}
      <Grid  size={{xs:12,md:6}}  sx={{ display: 'flex', flexDirection: 'column',alignItems:'center', padding: '20px',backgroundColor:'#ebf8f7' }}>   
                <img src={loginImage} alt="image" style={{width:'200px' , marginTop:100}}/>
                <Typography sx={{fontSize:'24px',fontWeight:'600', marginTop:6, }}>Welcome To Care Connect</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop:5 ,gap:1,alignItems:'center' }}> 
                    <FormControl>
                      <Typography sx={{color:'#2EB9AE',fontWeight:'600',fontSize:'16px'}}>User name or Email</Typography>
                        <TextField
                        sx={{ width: '500px' }}
                            className="custom-textfield"
                            value={userData.email}
                            name="email"
                            onChange={handleChangeUserData}
                            onBlur={handleBlurEmail}
                            size="small"
                            id="outlined-basic"
                            // label="Email"
                            variant="outlined"
                        />
                        <FormHelperText sx={{ color: 'red' }}>
                            {userDataErrors.email}
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                    <Typography sx={{color:'#2EB9AE',fontWeight:'600',fontSize:'16px'}}>Password</Typography>
                        <TextField
                            sx={{ width: '500px' }}
                             className="custom-textfield"
                            value={userData.password}
                            name="password"
                            onChange={handleChangeUserData}
                            onBlur={handleBlurPassword}
                            type={showPassword ? 'text' : 'password'}
                            size="small"
                            id="outlined-basic"
                            // label="Password"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                            aria-label="toggle password visibility"
                                            sx={{'&:hover': { background: 'transparent' },
                                                    '&:focus': { outline: 'none' }}}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <FormHelperText sx={{ color: 'red' }}>
                            {userDataErrors.password}
                        </FormHelperText>
                    </FormControl>
                    {/* <Typography sx={{ color: 'red', fontSize: '12px', marginTop: '-10px', marginBottom: '-10px', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={handleClickForgotPassword}>
                        Forgot Password?
                    </Typography> */}
                    <Button onClick={onClickSubmitLogin} variant="contained" sx={{padding:'10px 80px' ,marginTop:3 ,backgroundColor:'#2EB9AE',color:'white',borderRadius:20}}>
                        Login
                    </Button>
                    {/* <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <Typography sx={{ color: 'black', fontSize: '12px', marginTop: '-5px', marginBottom: '-5px' }}>
                            Not a member yet?
                        </Typography>
                        <Typography sx={{ color: 'blue', fontSize: '12px', marginTop: '-5px', marginBottom: '-5px', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={handleClickSignin}>
                            Register
                        </Typography>
                    </Box> */}
                </Box>
            <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={() => setOpenSnack(false)}
                message={message}
                action={action}
            />
      </Grid>
    </Grid>
  );
};

export default LoginScreen;
