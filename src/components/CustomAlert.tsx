
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { Close, Warning } from '@mui/icons-material';

const CustomAlert = ({ visible, title, message, onConfirm, onClose }: any) => {
  return (
    <Modal open={visible} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          borderRadius: 2,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 24,
          minWidth: 300,
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
        <Warning sx={{ fontSize: 50, color: '#2EB9AE' }} />
        <Typography
          variant="h6"
          sx={{
            fontSize: 20,
            fontWeight: 'bold',
            mt: 2,
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: 16,
            textAlign: 'center',
            my: 2,
          }}
        >
          {message}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#2EB9AE',
              minWidth: 100,
              '&:hover': {
                backgroundColor: '#1a8f85',
              },
            }}
            onClick={onConfirm}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomAlert;
