import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,TextField,
  Stack,
  Table,
  TableBody,Button,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import IconButton from '@mui/material';
import ClipboardIcon from '@heroicons/react/24/outline/ClipboardIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import Cookies from 'js-cookie';
import ModalConfirmationDeleteUser from './modal_confirmation';
import { useState } from 'react';

export const AccountTable = (props) => {
  const [isModalConfirmationOpen, setIsModalOpenConfirmation] = useState(false);
  const [selectedUser, setSelectedCompanyId] = useState(null);
  const handleCopyClick = (code) => {
    navigator.clipboard.writeText(code);
  };
  
  const handleCloseModal = () => {
    setIsModalOpenConfirmation(false);
  };
  const handleDeleteModal = (companyName) => {
    setSelectedCompanyId(companyName);
    setIsModalOpenConfirmation(true);
  };
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;
  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
console.log("test"+items);
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Token
                </TableCell>
                <TableCell>
                Signed Up
                </TableCell>
                <TableCell>
                  Activated Date
                </TableCell>
                <TableCell>
                  Option
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((account) => {
                
                const isSelected = selected.includes(account.id);
                const datetimeString = account.createdAt; // Replace this with your actual datetime string

                // Creating a Date object from the datetime string
                const datetime = new Date(datetimeString);
              
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

                const datetimeStringActivated = account.userActivationTime; // Replace this with your actual datetime string

                // Creating a Date object from the datetime string
                const datetimeActivated = new Date(datetimeStringActivated);
              
                // Formatting date and time
                const formattedDateActivated = datetimeActivated.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                });
                const formattedTimeActivated = datetimeActivated.toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                });
                return (
                  <TableRow
                    hover
                    key={account.id}
                    selected={isSelected}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={account.avatar}>
                          {getInitials(account.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {account.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      0{account.phone}
                    </TableCell>
                    <TextField
                      value={account.tokenSecret}
                      readOnly
                      InputProps={{
                        endAdornment: (
                          <Button style={{minWidth:'50px'}}>
                            <ClipboardIcon onClick={()=>handleCopyClick(account.tokenSecret)} />
                         </Button>
                        ),
                      }}
                    />
                    <TableCell>
                    {formattedDate} | {formattedTime}
                    </TableCell>
                    <TableCell>
                    {formattedDateActivated} | {formattedTimeActivated}
                    </TableCell>
                    <TableCell>
                    <Button style={{minWidth:'50px'}}>
                            <TrashIcon onClick={()=>handleDeleteModal(account.phone)} />
                         </Button>
                    </TableCell>
                  </TableRow>
                );
              {no++;}
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
       <ModalConfirmationDeleteUser
      open={isModalConfirmationOpen} 
      onClose={handleCloseModal} 
      companyName={selectedUser} />
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AccountTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
