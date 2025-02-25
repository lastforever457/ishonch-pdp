import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/layout";
import EmployeeId from "./pages/employees/employee-id/employee-id.tsx";
import Employees from "./pages/employees/employees.tsx";
import Finance from "./pages/finance/finance.tsx";
import Attendance from "./pages/group/attendance.tsx";
import Groups from "./pages/group/groups.tsx";
import Home from "./pages/home.tsx";
import Rooms from "./pages/rooms.tsx";
import Settings from "./pages/settings.tsx";
import Students from "./pages/students/students.tsx";
import { SidebarProvider } from "./providers/sidebar-context-provider.tsx";
import StudentId from "./pages/students/student-id/student-id.tsx";

const App = () => {
  const [mainColor, setMainColor] = useState<string>("#635AD9");
  const [font, setFont] = useState<string>(
    localStorage.getItem("ishonch-font") || "inter"
  );

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
          path: "groups/:groupId",
          element: <Attendance />,
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
          path: "students/:id",
          element: <StudentId />,
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

  useEffect(() => {
    const changeFont = (font: string) => {
      localStorage.setItem("ishonch-font", font);
      const fonts: Record<string, string> = {
        poppins: "Poppins",
        roboto: "Roboto",
        "open-sans": "Open Sans",
        inter: "Inter",
        lato: "Lato",
        montserrat: "Montserrat",
        nunito: "Nunito",
        raleway: "Raleway",
        ubuntu: "Ubuntu",
        "baloo-chettan-2": "Baloo Chettan 2",
        "times-new-roman": "Times New Roman",
        arial: "Arial",
      };

      // body'ga CSS custom property qo‘llash
      document.documentElement.style.setProperty(
        "--main-font",
        fonts[font] || "Inter"
      );
    };

    changeFont(font);
  }, [font]);

  return (
    <SidebarProvider>
      <RouterProvider router={routes} />
    </SidebarProvider>
  );
};

export default App;
