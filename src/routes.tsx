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
      { path: "/:accountId", element: <Home /> },
      { path: "/:accountId/new", element: <NewSchedule /> },
      { path: "/:accountId/:scheduleId/finished", element: <Finished /> },
      { path: "/:accountId/schedules", element: <Schedules /> },
      { path: "/:accountId/:scheduleId/details", element: <Details /> },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
