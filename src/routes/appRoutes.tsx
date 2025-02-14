import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../App';
import { Home } from '../pages/home/home';
import { BecomeProvider } from '../pages/becomeProvider/becomeProvider';
import { MakeAppointment } from '../pages/makeAppointment/makeAppointment';
import { Services } from '../pages/services/services';
import LoginRegister from '../pages/login/loginRegister';

// Define routes as an array of RouteObject
const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> }, // Default route for "/"
      { path: 'services', element: <Services /> },
      { path: 'make-an-appointment', element: <MakeAppointment /> },
      { path: 'become-a-provider', element: <BecomeProvider /> },
      { path: '*', element: <div>page not found</div> }, // Catch-all for 404, //TODO
    ],
  },
  {
    path: '/login',
    element: <LoginRegister />,
  },
];

// Create the router
const appRouter = createBrowserRouter(routes);

export default appRouter;
