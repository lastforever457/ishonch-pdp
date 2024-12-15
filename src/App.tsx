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
import { AuthProvider } from "./providers/auth-context-provider.tsx";
import { SidebarProvider } from "./providers/sidebar-context-provider.tsx";

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
    {
      path: "*",
      element: <div>404</div>,
    },
  ]);
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <SidebarProvider>
          <RouterProvider router={routes} />
        </SidebarProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
};

export default App;
