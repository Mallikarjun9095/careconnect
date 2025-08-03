// theme.js
import { createTheme } from '@mui/material/styles';

// Define your custom colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#32BA46', // Example primary color
    },
    secondary: {
      main: '#FEB100', // Example secondary color
    },
  },
  typography: {
    fontFamily: 'popins, sans-serif', // Optionally, set a custom font
  },
});

export default theme;