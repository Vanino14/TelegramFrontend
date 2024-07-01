import React from 'react';
// import { makeStyles } from '@mui/system';
import Modal from '@mui/material/Modal';
import {Snackbar,MuiAlert,Typography, Button,Grid,Slide,Alert } from '@mui/material';
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


const ModalConfirmation = ({ open, onClose, companyName}) => {
 
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleShowSnackbar = () => {
    setSnackbarOpen(true);
  };
  const handleClose = () => {
    onClose();
  };
  const handleDelete= async()=>{
    
    const myHeaders = new Headers();
    myHeaders.append("X-Request-Auth", Cookies.get('auth'));
  
    const formdata = new FormData();
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };
  
    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_DOMAIN}/application/`+companyName, requestOptions);
  
      if (response.status === 200) {
        setSuccessMessage('Apps deleted successfully! Refreshing in 2s');
        setSnackbarOpen(true);
        setSeverity('success');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 2 seconds
        location.reload();
        return true;
      } else {
        console.error("Failed to Delete App:", response.statusText);
        setSeverity('error');
        setSuccessMessage('Deleting Apps Failed! reloading in 2 second');
        setSnackbarOpen(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 2 seconds
        location.reload();
        // Handle the error, maybe show an error message to the user
        return false;
      }
    } catch (error) {
      console.error("Error during deletion App:", error);
      setSeverity('error');
      setSuccessMessage('Deleting Apps Failed! Refreshing in 2s');
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
          Delete Apps
        </Typography>
        <Grid container spacing={1} style={columnStyle}>
         <Grid item xs={12}><Typography>Apakah anda yakin akan Menghapus {companyName}?</Typography></Grid>
        <Grid  item xs={6}><Button onClick={handleDelete} variant="contained">Yes</Button></Grid>
        <Grid  item xs={6}><Button onClick={handleClose}  variant="contained">No</Button></Grid>
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

export default ModalConfirmation;
