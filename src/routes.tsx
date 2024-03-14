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
      { path: "/:id", element: <Home /> },
      { path: "/public/account/:id/details", element: <Details /> },
      { path: "/public/account/:id/services", element: <Services /> },
      { path: "/public/account/:id/schedules", element: <Schedules /> },
      { path: "/public/account/:id/datetime", element: <DateTime /> },
      { path: "/public/account/:id/confirmation", element: <Confirmation /> },
      { path: "/finished", element: <Finished /> },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
