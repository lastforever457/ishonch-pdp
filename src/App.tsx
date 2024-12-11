import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import Employees from "./pages/employees";
import Finance from "./pages/finance";
import Groups from "./pages/groups";
import Home from "./pages/home";
import Rooms from "./pages/rooms";
import Students from "./pages/students";
import Settings from "./pages/settings.tsx";
import ReactQueryProvider from "./providers/react-query-client.tsx";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
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
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
  ]);
  return (
    <ReactQueryProvider>
      <RouterProvider router={routes} />
    </ReactQueryProvider>
  );
};

export default App;
