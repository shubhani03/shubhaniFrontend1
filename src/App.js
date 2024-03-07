import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import AddItem from "./components/AddItem";
import SellItem from "./components/SellItem";
import ViewsData from "./components/ViewsData";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AllOrder from "./components/AllOrder";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import Login from "./components/Login";
import PublicRoute from "./components/PublicRoute";
import FinalBill from "./components/FinalBill";
import FinalPrint from "./printpages/FinalPrint";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading ? (
        <PublicRoute>
          <Spinner />
        </PublicRoute>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/additems"
            element={
              <ProtectedRoutes>
                <AddItem />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/smellites"
            element={
              <ProtectedRoutes>
                <SellItem />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/viewdata"
            element={
              <ProtectedRoutes>
                <ViewsData />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/finalbill"
            element={
              <ProtectedRoutes>
                <FinalBill />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/allorders"
            element={
              <ProtectedRoutes>
                <AllOrder />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/finalprint"
            element={
              <ProtectedRoutes>
                <FinalPrint />
              </ProtectedRoutes>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
