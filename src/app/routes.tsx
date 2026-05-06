 import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { DashboardPage } from './pages/DashboardPage';
import { TravelersPage } from './pages/TravelersPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { AlertsPage } from './pages/AlertsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: 'travelers', Component: TravelersPage },
      { path: 'statistics', Component: StatisticsPage },
      { path: 'alerts', Component: AlertsPage },
    ],
  },
]);