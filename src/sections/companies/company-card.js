import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon.js';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography ,TextField, Button} from '@mui/material';
import ClipboardIcon from '@heroicons/react/24/outline/ClipboardIcon';
import { useState } from 'react';
import ModalComponent from './modal';
import Cookies from 'js-cookie';
import ModalConfirmation from './modal_confirmation';

export const CompanyCard = (props) => {
  
  const { company } = props;
  const datetimeString = company.createdAt; // Replace this with your actual datetime string
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmationOpen, setIsModalOpenConfirmation] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedCompanyDesc, setSelectedCompanyDesc] = useState(null);
  const [selectedCompanyHeader, setSelectedCompanyHeader] = useState(null);
  const [selectedCompanyFooter, setSelectedCompanyFooter] = useState(null);
  // Creating a Date object from the datetime string
  const datetime = new Date(datetimeString);
  const handleEdit = (companyName,companyDesc,companyHeader,companyFooter) => {
    setSelectedCompanyId(companyName);
    setSelectedCompanyDesc(companyDesc);
    setSelectedCompanyHeader(companyHeader);
    setSelectedCompanyFooter(companyFooter);
    setIsModalOpen(true);
  };
  const handleDeleteModal = (companyName) => {
    setSelectedCompanyId(companyName);
    setIsModalOpenConfirmation(true);
  };
  const handleCopyClick = (code) => {
    navigator.clipboard.writeText(code);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalOpenConfirmation(false);
  };
  const capitalized= company.name.toUpperCase();
  // Formatting date and time
  const formattedDate = datetime.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const formattedTime = datetime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src={company.logo}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {capitalized}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {company.description}
        </Typography>
          <Typography  align="center"
          variant="body1" >
        <TextField
         align="center"
         value={company.tokenSecret}
         readOnly
         InputProps={{
           endAdornment: (
             <Button style={{minWidth:'50px'}}>
               <ClipboardIcon onClick={()=>handleCopyClick(company.tokenSecret)} />
                         </Button>
                        ),
                      }}
                    /></Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {formattedDate} | {formattedTime}
          </Typography>
        </Stack> <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          onClick={() => handleEdit(company.name,company.description,company.messageHeader,company.messageFooter)} // Menambahkan fungsi onClick
          style={{ cursor: 'pointer' }}
          sx={{
            '&:hover': {
              height:'22px',
              width:'70px',
              borderRadius:'10%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // Warna latar belakang yang gelap saat hover
            },
          }}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <PencilIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {company.downloads} Edit
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          onClick={() => handleDeleteModal(company.name)} // Menambahkan fungsi onClick
          style={{ cursor: 'pointer' }}
          sx={{
            '&:hover': {
              height:'22px',
              width:'70px',
              borderRadius:'10%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // Warna latar belakang yang gelap saat hover
            },
          }}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <TrashIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {company.downloads} Delete
          </Typography>
        </Stack>
      </Stack>
      <ModalComponent
      open={isModalOpen} 
      onClose={handleCloseModal} 
      companyName={selectedCompanyId}
      companyDesc={selectedCompanyDesc}
      companyHeader={selectedCompanyHeader}
      companyFooter={selectedCompanyFooter} />
      
      <ModalConfirmation
      open={isModalConfirmationOpen} 
      onClose={handleCloseModal} 
      companyName={selectedCompanyId} />
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};
