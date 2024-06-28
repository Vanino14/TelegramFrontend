import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid,Button,SvgIcon } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import {AccountTable} from 'src/sections/account/account-table';
import { subDays, subHours } from 'date-fns';
import { useState,useMemo,useCallback, useEffect } from 'react';
import { useSelection } from 'src/hooks/use-selection';
import { applyPagination } from 'src/utils/apply-pagination';
import Cookies from 'js-cookie';
import { AccountSearch } from 'src/sections/account/account-search';

const now = new Date();

const Page = () => {
  const [data2, setData] = useState([]); 
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
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_DOMAIN}/users`, requestOptions);
      const responseData = await response.json();

      if (response.status === 200) {
        console.log(responseData);
        setData(responseData.users || []);
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

const useCustomerIds = (accounts) => {
  return useMemo(
    () => {
      return accounts.map((account) => account.id);
    },
    [accounts]
  );
};
const filteredData = useMemo(() => {
  return data2.filter((account) =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [data2, searchQuery]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const accounts = useAccounts(filteredData,page, rowsPerPage);
  console.log(accounts);
  const accountsIds = useCustomerIds(accounts);
  const accountsSelection = useSelection(accountsIds);

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
        Account | Telegram Notification
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              {/* <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile />
              </Grid> */}
              <Grid
                xs={12}
                md={12}
                lg={12}
              >
                <AccountProfileDetails />
              </Grid>
              
            </Grid>
          </div> <AccountSearch 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
          />
          <AccountTable
              count={data2.length}
              items={accounts}
              onDeselectAll={accountsSelection.handleDeselectAll}
              onDeselectOne={accountsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={accountsSelection.handleSelectAll}
              onSelectOne={accountsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={accountsSelection.selected}
            />
        </Stack>
      </Container>
    </Box>
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
