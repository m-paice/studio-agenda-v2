import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Layout } from "./layout/default";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import { Services } from "./pages/Services";
import { Schedules } from "./pages/Schedules";
import { DateTime } from "./pages/DateTime";
import { Confirmation } from "./pages/Confirmation";
import { Finished } from "./pages/Finished";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/details", element: <Details /> },
      { path: "/services", element: <Services /> },
      { path: "/schedules", element: <Schedules /> },
      { path: "/datetime", element: <DateTime /> },
      { path: "/confirmation", element: <Confirmation /> },
      { path: "/finished", element: <Finished /> },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
