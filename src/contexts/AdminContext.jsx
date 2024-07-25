import { createContext, useEffect, useState } from "react";
import adminApi from "../apis/admin";

export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
  const [dashboardData, setDashboardData] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const res = await adminApi.getDashboardData();
      setDashboardData(res.data);
    };
    fetchdata();
  }, []);

  return (
    <AdminContext.Provider value={{ dashboardData }}>
      {children}
    </AdminContext.Provider>
  );
}
