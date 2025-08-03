import { Link } from 'react-router-dom'
import { Typography, Button, Box } from '@mui/material'
import Grid from '@mui/material/Grid2';
import pageNotFound from '../assets/images/pageNotFound.jpg'
import '../css/pageNotFound.css'

const PageNotFound = () => {
  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
        <Grid size={{xs:4,md:6,lg:6}} >
          <Typography variant="h3" align="center" gutterBottom>
            404 - Page Not Found
          </Typography>
        </Grid>
        <Grid size={{xs:4,md:6,lg:6}}>
          <img src={pageNotFound} alt="404" className="not-found-image" style={{ maxWidth: '100%', height: 'auto' }} />
        </Grid>
        <Grid size={{xs:4,md:6,lg:6}}>
          <Typography variant="body1" align="center">
            Sorry, the page you are looking for does not exist.
          </Typography>
        </Grid>
        <Grid size={{xs:4,md:6,lg:6}}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="admin-dashboard"
            sx={{ textTransform: 'none' }}
          >
            Go to Home
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PageNotFound
