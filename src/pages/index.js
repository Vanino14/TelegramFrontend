import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewUser } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalApps } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Page = () => { 
  const [data, setData] = useState([]); 
  const [data2, setDataChatDaily] = useState([]); 
  const [app, setDataApp] = useState([]); 
  const [user, setDataUser] = useState([]); 
  const [chat, setDataChat] = useState([]); 
  const appCount = app.length;
  const chatCount = chat.length;
  const userCount = user.length;

  const currentYearData = Array(12).fill(0);
  const lastYearData = Array(12).fill(0);

data.forEach(item => {
  const date = new Date(item.date);
  const count = item.count;
  const yearDiff = new Date().getFullYear() - date.getFullYear();
  const month = date.getMonth();
  // console.log(month);

  if (yearDiff === 0) {
    currentYearData[month] += count;
  } else if (yearDiff === 1) {
    lastYearData[month] += count;
  }
});

// Construct the final format
const reconstructedData = [
  { name: 'This year', data: currentYearData },
  { name: 'Last year', data: lastYearData }
];

const dailyData=Array(7).fill(0);
const dailyLabel = [];
data2.forEach(item => {
  const date = new Date(item.date);
  const count = item.count;
  const day = date.getDay();
  var dayName;
  if(day=='1'){
    dayName="Monday";
  }else if(day=='2'){
    dayName="Tuesday";
  }else if(day=='3'){
    dayName="Wednesday";
  }else if(day=='4'){
    dayName="Thursday";
  }else if(day=='5'){
    dayName="Friday";
  }else if(day=='6'){
    dayName="Saturday";
  }else{
    dayName="Sunday";
  }
  // console.log(day);

    dailyData[day] = count;
    dailyLabel[day] = dayName;
});

const now = new Date();

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
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_DOMAIN}/message/statistic/monthly`, requestOptions);
    const responseData = await response.json();

    if (response.status === 200) {
      // console.log(responseData);
      setData(responseData.notification || []);
    } else {
      console.error("Failed to fetch statistic monhyly:", response.statusText);
      // Handle the error, maybe show an error message to the user
    }
  } catch (error) {
    console.error("Error during statistic monthly fetch:", error);
    // Handle the error, maybe show an error message to the user
  }
  try {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_DOMAIN}/applications`, requestOptions);
    const responseData = await response.json();

    if (response.status === 200) {
      // console.log(responseData);
      setDataApp(responseData.applications || []);
    } else {
      console.error("Failed to fetch app:", response.statusText);
      // Handle the error, maybe show an error message to the user
    }
  } catch (error) {
    console.error("Error during app fetch:", error);
    // Handle the error, maybe show an error message to the user
  }
  try {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_DOMAIN}/users`, requestOptions);
    const responseData = await response.json();

    if (response.status === 200) {
      // console.log(responseData);
      setDataUser(responseData.users || []);
    } else {
      console.error("Failed to fetch users:", response.statusText);
      // Handle the error, maybe show an error message to the user
    }
  } catch (error) {
    console.error("Error during user fetch:", error);
    // Handle the error, maybe show an error message to the user
  }
  try {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_DOMAIN}/message/allmessage`, requestOptions);
    const responseData = await response.json();

    if (response.status === 200) {
      // console.log(responseData);
      setDataChat(responseData.notification || []);
    } else {
      console.error("Failed to fetch Chats:", response.statusText);
      // Handle the error, maybe show an error message to the user
    }
  } catch (error) {
    console.error("Error during Chats fetch:", error);
    // Handle the error, maybe show an error message to the user
  }try {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_DOMAIN}/message/statistic/daily`, requestOptions);
    const responseData = await response.json();

    if (response.status === 200) {
      // console.log(responseData);
      setDataChatDaily(responseData.notification || []);
    } else {
      console.error("Failed to fetch Chats:", response.statusText);
      // Handle the error, maybe show an error message to the user
    }
  } catch (error) {
    console.error("Error during Chats fetch:", error);
    // Handle the error, maybe show an error message to the user
  }
};

useEffect(() => {
  fetchData();
}, []); 
  return(
  
  <>
    <Head>
      <title>
        Overview | Telegram Notification
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
        <Grid
          container
          spacing={7}
        >
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewUser
              difference={12}
              positive
              sx={{ height: '100%' }}
              value={userCount}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewTotalApps
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value={appCount}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={chatCount}
            />
          </Grid>
          
          <Grid
            xs={12}
            lg={6}
          >
            <OverviewSales
              chartSeries={reconstructedData}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={6}
          >
            <OverviewTraffic
              chartSeries={dailyData}
              labels={dailyLabel}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
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
