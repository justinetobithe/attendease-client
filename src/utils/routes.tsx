import React from 'react';
import {
  Home,
  Inbox,
  User,
  Album,
  CalendarDays,
  File,
  ShoppingCart,
  Youtube,
  BadgeCheck,
  UserSquare,
  BookCheck,
  Users,
  Wallet,
  Route,
  Bus,
  HomeIcon,
  FileLock,
  MapPinIcon,
  Database,
  Computer,
  GraduationCap,
  UsersIcon
} from 'lucide-react';

interface Route {
  route: string;
  title: string;
  icon: React.ReactElement | null;
  roles: string[];
  isSidebarVisible: boolean;
  child_routes: Route[] | [];
}
const routes: Route[] = [
  {
    route: '/home',
    title: 'Home',
    icon: <Home />,
    roles: ['admin', 'operator'],
    isSidebarVisible: true,
    child_routes: [],
  }, 
  {
    route: '/strands',
    title: 'Strand',
    icon: <GraduationCap />,
    roles: ['admin'],
    isSidebarVisible: true,
    child_routes: [],
  },

  {
    route: '/students',
    title: 'Student',
    icon: <UsersIcon />,
    roles: ['admin'],
    isSidebarVisible: true,
    child_routes: [],
  }, 
  {
    route: '/records',
    title: 'Records',
    icon: <Database />,
    roles: ['admin', 'parent'],
    isSidebarVisible: true,
    child_routes: [],
  }, 
  {
    route: '/users-list',
    title: 'Users List',
    icon: <Users />,
    roles: ['admin'],
    isSidebarVisible: true,
    child_routes: [],
  },
  {
    route: '/profile',
    title: 'Profile',
    icon: <User />,
    roles: ['admin', 'mother', 'ob_gyne'],
    isSidebarVisible: true,
    child_routes: [
      {
        route: '/verification',
        title: 'Verification',
        icon: <BadgeCheck />,
        roles: ['ob_gyne'],
        isSidebarVisible: true,
        child_routes: [],
      },
      {
        route: '/display-information',
        title: 'Display Information',
        icon: <UserSquare />,
        roles: ['ob_gyne'],
        isSidebarVisible: true,
        child_routes: [],
      },
    ],
  },
];

export default routes;
