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
      loader: currentUserLoader,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "groups",
          element: <Groups />,
        },
        {
          path: "employees",
          element: <Employees />,
        },
        {
          path: "rooms",
          element: <Rooms />,
        },
        {
          path: "students",
          element: <Students />,
        },
        {
          path: "finance",
          element: <Finance />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
