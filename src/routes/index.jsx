import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "../layouts/MainContainer";
import Dashboard from "../pages/Dashboard";
import Registered from "../pages/Registered";
import UserManagement from "../pages/UserManagement";
import OtherServices from "../pages/OtherServices";
import Faq from "../pages/Faq";

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "registered", element: <Registered /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "other-services", element: <OtherServices /> },
      { path: "faq", element: <Faq /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={adminRouter} />;
}
