import AdminContextProvider from "./contexts/AdminContext.jsx";
import Router from "./routes/index.jsx";

function App() {
  return (
    <AdminContextProvider>
      <Router />
    </AdminContextProvider>
  );
}

export default App;
