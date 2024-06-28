import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Card,
  CardContent,
  Divider,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import { useState,useCallback,useEffect,useMemo } from 'react';
import { useSelection } from 'src/hooks/use-selection';
import Cookies from 'js-cookie';
import { applyPagination } from 'src/utils/apply-pagination';
import ModalAdd from 'src/sections/companies/modal_add';

const companies = [
  {
    id: '2569ce0d517a7f06d3ea1f24',
    createdAt: '27/03/2019',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    logo: '/assets/logos/logo-dropbox.png',
    title: 'Dropbox',
    downloads: '594'
  },
  {
    id: 'ed2b900870ceba72d203ec15',
    createdAt: '31/03/2019',
    description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    logo: '/assets/logos/logo-medium.png',
    title: 'Medium Corporation',
    downloads: '625'
  },
  {
    id: 'a033e38768c82fca90df3db7',
    createdAt: '03/04/2019',
    description: 'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    logo: '/assets/logos/logo-slack.png',
    title: 'Slack',
    downloads: '857'
  },
  {
    id: '1efecb2bf6a51def9869ab0f',
    createdAt: '04/04/2019',
    description: 'Lyft is an on-demand transportation company based in San Francisco, California.',
    logo: '/assets/logos/logo-lyft.png',
    title: 'Lyft',
    downloads: '406'
  },
  {
    id: '1ed68149f65fbc6089b5fd07',
    createdAt: '04/04/2019',
    description: 'GitHub is a web-based hosting service for version control of code using Git.',
    logo: '/assets/logos/logo-github.png',
    title: 'GitHub',
    downloads: '835'
  },
  {
    id: '5dab321376eff6177407e887',
    createdAt: '04/04/2019',
    description: 'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
    logo: '/assets/logos/logo-squarespace.png',
    title: 'Squarespace',
    downloads: '835'
  }
];

const Page = () => {
  const [data2, setData] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback((newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  }, []);
  const fetchData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("X-Request-Auth", Cookies.get('auth'));
    console.log(myHeaders);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      credentials: 'include'
    };

    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_DOMAIN}/applications`, requestOptions);
      const responseData = await response.json();

      if (response.status === 200) {
        console.log(response);
        setData(responseData.applications || []);
      } else {
        console.error("Failed to fetch Apps:", response.statusText);
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

const useCustomerIds = (apps) => {
  return useMemo(
    () => {
      return apps.map((app) => app.id);
    },
    [apps]
  );
};
const filteredData = useMemo(() => {
  return data2.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [data2, searchQuery]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const apps = useAccounts(filteredData,page, rowsPerPage);
  console.log(apps);
  const accountsIds = useCustomerIds(apps);
  const accountsSelection = useSelection(accountsIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value); // Perbarui nilai page sesuai dengan nilai halaman yang dipilih
    },
    []
  );

 

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
      setPage(0); // Ketika mengubah baris per halaman, kembalikan halaman ke 0
    },
    []
  );

  const handleAdd = () => {
    setIsModalAddOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalAddOpen(false);
  };
return(
  <>
    <Head>
      <title>
        List Application | Devias Kit
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
                Applications
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Export
                </Button>
              </Stack>
            </Stack>
            <div>
              <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
                onClick={() => handleAdd()}
              >
                Add
              </Button>
            </div>
          </Stack>
          <CompaniesSearch 
           searchQuery={searchQuery} 
           onSearchChange={handleSearchChange} 
           />
          <Grid
            container
            spacing={3}
          >
          {apps.length === 0 ? (
             <Card
             sx={{
               display: 'flex',
               flexDirection: 'column',
               height: '100%',
               width:'100%'
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
               </Box>
               <Typography
                 align="center"
                 gutterBottom
                 variant="h5"
               >
                 NO DATA
               </Typography>
               <Typography
                 align="center"
                 variant="body1"
               >
               </Typography>
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
               
                 <Typography
                   color="text.secondary"
                   display="inline"
                   variant="body2"
                 >
                 
                 </Typography>
               </Stack>
             </Stack>
           </Card>
          ) : (
            apps.map((app) => (
              <Grid xs={12} md={6} lg={4} key={app.id} item>
                <CompanyCard company={app} />
              </Grid>
            ))
          )}
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
           <Pagination
            size="small"
            count={Math.ceil(filteredData.length / rowsPerPage)}
            onChange={(event, value) => handlePageChange(event, value - 1)} // Mengurangi 1 dari nilai value
            page={page + 1} // Menambah 1 ke nilai page
          />

          </Box>
        </Stack>
      </Container>
      <ModalAdd
      open={isModalAddOpen} 
      onClose={handleCloseModal} 
      />
    </Box>
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
