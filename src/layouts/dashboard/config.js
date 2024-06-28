import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import BellAlertIcon from '@heroicons/react/24/solid/BellAlertIcon';
import ComputerDesktopIcon2 from '@heroicons/react/24/outline/ComputerDesktopIcon';
import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Notification',
    icon: (
      <SvgIcon fontSize="small">
        <BellIcon />
      </SvgIcon>
    ),
    children: [
      {
        title: 'List Notification',
        path: '/notification',
        icon: (
          <SvgIcon fontSize="small">
            <BellAlertIcon />
          </SvgIcon>
        ),
      },
      // Tambahkan child lainnya di sini jika diperlukan
    ],
  },
  {
    title: 'Application',
    icon: (
      <SvgIcon fontSize="small">
        <ComputerDesktopIcon />
      </SvgIcon>
    ), children: [
      {
        title: 'List Application',
        path: '/application',
        icon: (
          <SvgIcon fontSize="small">
            <ComputerDesktopIcon2 />
          </SvgIcon>
        ),
      },
      // Tambahkan child lainnya di sini jika diperlukan
    ],
  },
  {
    title: 'User',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ), children: [
      {
        title: 'List User',
        path: '/users',
        icon: (
          <SvgIcon fontSize="small">
            <UsersIcon />
          </SvgIcon>
        ),
      },
      // Tambahkan child lainnya di sini jika diperlukan
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Register',
    path: '/auth/register',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Logout',
    path: '/auth/logout',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  },
  // Tambahkan item baru di sini jika diperlukan
];
