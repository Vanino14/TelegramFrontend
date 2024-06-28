import { useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import Cookies from 'js-cookie';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();


const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [data, setData] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback((newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  }, []);
  const fetchData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("X-Request-Auth", Cookies.get('auth'));

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      credentials: 'include'
    };

    try {
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_DOMAIN}/message/allmessage`, requestOptions);
      const responseData = await response.json();

      if (response.status === 200) {
        console.log(responseData.notification);
        setData(responseData.notification || []);
      } else {
        console.error("Failed to fetch users:", response.statusText);
        // Handle the error, maybe show an error message to the user
      }
    } catch (error) {
      console.error("Error during user fetch:", error);
      // Handle the error, maybe show an error message to the user
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts


  // console.log(data2);

const useAccounts = (data,page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data,page, rowsPerPage]
  );
};

const useCustomerIds = (notifications) => {
  return useMemo(
    () => {
      return notifications.map((notification) => notification.id);
    },
    [notifications]
  );
};
const filteredData = useMemo(() => {
  return data.filter((notification) =>
    notification.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [data, searchQuery]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const notifications = useAccounts(filteredData,page, rowsPerPage);
  console.log(notifications);
  const accountsIds = useCustomerIds(notifications);
  const notificationsSelection = useSelection(accountsIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );
 

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Notification List | Abhati Notification
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  List Notification
                </Typography>
                
              </Stack>
              <div>
              
              </div>
            </Stack>
            <CustomersSearch 
            searchQuery={searchQuery} 
            onSearchChange={handleSearchChange} />
            <CustomersTable
              count={data.length}
              items={notifications}
              onDeselectAll={notificationsSelection.handleDeselectAll}
              onDeselectOne={notificationsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={notificationsSelection.handleSelectAll}
              onSelectOne={notificationsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={notificationsSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
