import React from 'react';
// import { makeStyles } from '@mui/system';
import Modal from '@mui/material/Modal';
import {Snackbar,MuiAlert,Typography, Button,Grid,Slide,Alert,OutlinedInput } from '@mui/material';
import { borderRadius } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState,useCallback } from 'react';

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',maxWidth: '20%', // Atur lebar maksimum modal di sini
  margin: 'auto',
};

const paperStyle = {
    borderRadius:'10%',
    backgroundColor: 'white',
  boxShadow: 'rgb(12, 9, 25)',
  padding: '2rem', // Anda mungkin ingin menyesuaikan ukuran padding sesuai kebutuhan
};

const columnStyle = {
  display: 'flex',
  alignItems: 'center',
};
const ModalAdd = ({ open, onClose}) => {
  
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [values, setValues] = useState({
    name:'',
    description: '',
    header: '',
    footer: '',
  });
  const handleClose = () => {
    onClose();
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleShowSnackbar = () => {
    setSnackbarOpen(true);
  };
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );
  
const handleSubmit= async()=>{
  console.log(values);
  const myHeaders = new Headers();
  myHeaders.append("X-Request-Auth", Cookies.get('auth'));

  const formdata = new FormData();
  formdata.append("name",values.name);
  formdata.append("description", values.description);
  formdata.append("message_header", values.header);
  formdata.append("message_footer", values.footer);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
    credentials:'include'
  };

  try {
    const response = await fetch(`http://${process.env.NEXT_PUBLIC_DOMAIN}/application/register`, requestOptions);

    if (response.status === 200) {
      setSuccessMessage('Apps Created successfully! Refreshing in 2s');
      setSnackbarOpen(true);
      setSeverity('success');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 2 seconds
      location.reload();
      return true;
    } else {
      console.error("Failed to add user:", response.statusText);
      setSeverity('error');
      setSuccessMessage('Creating Apps Failed! reloading in 2 second');
      setSnackbarOpen(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 2 seconds
      location.reload();
      // Handle the error, maybe show an error message to the user
      return false;
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    setSeverity('error');
    setSuccessMessage('Creating Apps Failed Contact Our Admin! reloading in 2 second');
    setSnackbarOpen(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 2 seconds
    location.reload();
    // Handle the error, maybe show an error message to the user
    return false;
  }
};

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={modalStyle}
    >
     <div style={paperStyle}>
        <Typography 
        variant="h6" 
        component="h2">
          Add Apps
        </Typography>
        <Grid container spacing={1} style={columnStyle}>
        <Grid style={columnStyle} item xs={4} >
            <Typography sx={{ mt: 1 }}>App Logo</Typography>
          </Grid>
          <Grid style={columnStyle} item xs={8}>
            <OutlinedInput sx={{ mt: 1 }}
            type="file"
            placeholder="App Logo">
              
            </OutlinedInput>
          </Grid><Grid style={columnStyle} item xs={4} >
            <Typography sx={{ mt: 1 }}>App Name</Typography>
          </Grid>
          <Grid style={columnStyle} item xs={8}>
            <OutlinedInput sx={{ mt: 1 }}
            onChange={handleChange}
            name="name"
            placeholder="App name">
              
            </OutlinedInput>
          </Grid>
          <Grid style={columnStyle} item xs={4}>
            <Typography sx={{ mt: 1 }}>Description</Typography>
          </Grid>
          <Grid style={columnStyle} item xs={8}>
            <Typography sx={{ mt: 1 }}>
              <OutlinedInput 
              onChange={handleChange}
              name="description"
              placeholder="description"></OutlinedInput>
            </Typography>
          </Grid>
          <Grid style={columnStyle} item xs={4}>
            <Typography sx={{ mt: 1 }}>Header</Typography>
          </Grid>
          <Grid style={columnStyle} item xs={8}>
            <Typography sx={{ mt: 1 }}>
              <OutlinedInput 
              onChange={handleChange}
              name="header"
              placeholder="Header Message" />
            </Typography>
          </Grid>
          <Grid style={columnStyle} item xs={4}>
            <Typography sx={{ mt: 1 }}>Footer</Typography>
          </Grid>
          <Grid style={columnStyle} item xs={8}>
            <Typography sx={{ mt: 1 }}>
              <OutlinedInput
              onChange={handleChange}
              name="footer"
              placeholder="Footer Message" />
            </Typography>
          </Grid>
          
        <Grid  item xs={6}><Button onClick={handleSubmit} variant="contained">Submit</Button></Grid>
        <Grid  item xs={6}><Button onClick={handleClose} variant="contained">Close</Button></Grid>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          TransitionComponent={Slide}
          >
           <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
       {successMessage}
        </Alert>
        </Snackbar>
      </div>
    </Modal>
  );
};

export default ModalAdd;
