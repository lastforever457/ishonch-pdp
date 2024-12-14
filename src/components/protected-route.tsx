// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../providers/auth-context-provider";

// const ProtectedRoute = ({ roles }: { roles: string[] }) => {
//   const { user } = useAuth();

//   switch (userRole) {
//     case "ADMIN":
//       if (!roles.includes(userRole)) {
//         return <Navigate to="/unauthorized" replace />;
//       }
//       break;
//     case "TEACHER":
//       if (!roles.includes(userRole)) {
//         return <Navigate to="/unauthorized" replace />;
//       }
//       break;
//     case "STUDENT":
//       if (!roles.includes(userRole)) {
//         return <Navigate to="/unauthorized" replace />;
//       }
//       break;

//     default:
//       return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
