import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Layout } from "./layout/default";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import { Schedules } from "./pages/Schedules";
import { Finished } from "./pages/Finished";
import { NewSchedule } from "./pages/NewSchedule";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/details", element: <Details /> },
      { path: "/schedules", element: <Schedules /> },
      { path: "/newSchedule", element: <NewSchedule /> },
      { path: "/finished", element: <Finished /> },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
