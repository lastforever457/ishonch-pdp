import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/layout";
import EmployeeId from "./pages/employees/employee-id/employee-id.tsx";
import Employees from "./pages/employees/employees.tsx";
import Finance from "./pages/finance/finance.tsx";
import Groups from "./pages/group/groups.tsx";
import Home from "./pages/home.tsx";
import Rooms from "./pages/rooms.tsx";
import Settings from "./pages/settings.tsx";
import Students from "./pages/students.tsx";
import { SidebarProvider } from "./providers/sidebar-context-provider.tsx";
import { lightTheme, darkTheme } from "./theme"; // Importing themes

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
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
          path: "employees/:id",
          element: <EmployeeId />,
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
      path: "*",
      element: <div>404</div>,
    },
  ]);

  return (
    <>
      <CssBaseline />
      <SidebarProvider>
        <RouterProvider router={routes} />
      </SidebarProvider>
    </>
  );
};

export default App;
