import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as currentUserLoader } from "./components/sidebar/current-user";
import AppLayout from "./layouts/app-layout";
import Employees from "./pages/employees";
import Finance from "./pages/finance";
import Groups from "./pages/groups";
import Home from "./pages/home";
import Rooms from "./pages/rooms";
import Students from "./pages/students";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: currentUserLoader,
        },
        {
          path: "groups",
          loader: currentUserLoader,
          element: <Groups />,
        },
        {
          path: "employees",
          loader: currentUserLoader,
          element: <Employees />,
        },
        {
          path: "rooms",
          element: <Rooms />,
          loader: currentUserLoader,
        },
        {
          path: "students",
          element: <Students />,
          loader: currentUserLoader,
        },
        {
          path: "finance",
          element: <Finance />,
          loader: currentUserLoader,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
