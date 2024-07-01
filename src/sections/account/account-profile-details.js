import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,InputAdornment,
  Unstable_Grid2 as Grid,
  Snackbar,Slide,Alert
} from '@mui/material';
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];
export const AccountProfileDetails = () => {
  const [formValid, setFormValid] = useState(true);
  const [values, setValues] = useState({
    name: '',
    phone: '',
  });
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
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );
 
  const notifySuccess=()=>{
    <Popup
      trigger={<div />}  // Use an empty trigger to make the popup appear without a button
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">Success!</div>
          <div className="content">
            User added successfully!
            <br />
            Your additional success message or content here.
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                console.log('modal closed');
                close();
              }}
            >
              Close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  }
  
  const notifyFailed=()=>{
    <Popup
      trigger={<div />}  // Use an empty trigger to make the popup appear without a button
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">FAILED!</div>
          <div className="content">
            User added successfully!
            <br />
            Your additional success message or content here.
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                console.log('modal closed');
                close();
              }}
            >
              Close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  }
const handlesubmit= async()=>{
  console.log(values);
  const myHeaders = new Headers();
  myHeaders.append("X-Request-Auth", Cookies.get('auth'));

  const formdata = new FormData();
  formdata.append("name", values.name);
  formdata.append("phone", values.phone);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
    credentials:'include'
  };

  try {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_DOMAIN}/user/register`, requestOptions);

    if (response.status === 200) {
      setSuccessMessage('User Added successfully! Refreshing in 2s');
      setSnackbarOpen(true);
      setSeverity('success');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 2 seconds
      location.reload();
      return true;
    } else {
      setSeverity('error');
      setSuccessMessage('Adding User Failed! reloading in 2 second');
      setSnackbarOpen(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 2 seconds
      location.reload();
      // Handle the error, maybe show an error message to the user
      return false;
    }
  } catch (error) {
    setSeverity('error');
    setSuccessMessage('Adding User Failed! reloading in 2 second');
    setSnackbarOpen(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 2 seconds
    location.reload();
    // Handle the error, maybe show an error message to the user
    return false;
  }
};

const validateForm = () => {
  // Implement your validation logic here
  // For simplicity, just checking if 'name' is filled
  const isValid = values.name.trim() !== '';
  setFormValid(isValid);
  return isValid;
};

const handleButtonClick = () => {
  if (validateForm()) {
    handlesubmit();
  }
};
const isValidPhoneNumber = (phoneNumber) => {
  // Simple regex for a valid Indonesian phone number starting with +62
  const phoneRegex = /^\8\d{9,15}$/;
  return phoneRegex.test(phoneNumber);
};
  

  return (
    <form
      autoComplete="off"
      noValidate
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify User Name"
                  label="User Name"
                  name="name"
                  onChange={handleChange}
                  error={!values.name && !formValid}
                  required
                  value={values.name}
                />
              </Grid> 
              <Grid xs={12}
               md={6}>
              <TextField
                fullWidth
                helperText={
                  (!formValid && values.phone !== '') ? 
                  'Invalid phone number' : 
                  (values.phone === '') ? 
                  'Please enter a phone number' : 
                  ''
                }
                error={!formValid || (values.phone !== '' && !isValidPhoneNumber(values.phone))}
                label="Phone Number"
                name="phone"
                onChange={(e) => handleChange(e)}
                type="tel"
                value={values.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+62</InputAdornment>
                  ),
                }}
              />
            </Grid>
              {/* <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid> */}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" 
           onClick={handleButtonClick}
           disabled={!formValid}>
            Save details
          </Button>
        </CardActions>
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
      </Card>
    </form>
  );
};

