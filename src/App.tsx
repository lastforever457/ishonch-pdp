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
import Login from "./pages/login.tsx";
import Signup from "./pages/signup.tsx";
import { AuthProvider } from "./providers/auth-context-provider.tsx";
import { PermissionsProvider } from "./providers/permission-provider.tsx";
import { useEffect, useState } from "react";
import api from "./utils/axios.ts";
import { apiLink } from "./utils/api-link.ts";

const App = () => {
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(apiLink("/permissions/findMany"));

      setPermissions(res.data);
    };

    fetch();
  }, []);

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
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "*",
      element: <div>404</div>,
    },
  ]);
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <PermissionsProvider permissions={permissions}>
          <RouterProvider router={routes} />
        </PermissionsProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
};

export default App;
