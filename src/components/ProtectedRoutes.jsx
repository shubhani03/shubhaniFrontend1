import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hideLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import { setStoreData } from "../redux/features/storeSlice";
import { setProductStoreData } from "../redux/features/orderProductSlice";
import { setAllStoreData } from "../redux/features/overallorderslice";
import { BASE_URL } from "../refer";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      let res = await fetch(`${BASE_URL}/auth/getUserData`, {
        method: "post",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      res = await res.json();
      dispatch(hideLoading());
      // console.log(res);

      if (res.success) {
        dispatch(setUser(res.data));
      } else {
        <Navigate to="/login" />;
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading());

      localStorage.clear();
    }
  };
  const getAllData = async () => {
    try {
      let res = await fetch(`${BASE_URL}/auth/getallproduct`);
      res = await res.json();
      dispatch(setStoreData(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  const getAllOrders = async () => {
    try {
      let res = await fetch(`${BASE_URL}/auth/getallorders`);
      res = await res.json();
      dispatch(setAllStoreData(res.data));
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllcustomerOrder = async () => {
    try {
      let res = await fetch(`${BASE_URL}/auth/getallcustomerorder`);
      res = await res.json();
      dispatch(setProductStoreData(res.data));
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllData();
    getAllcustomerOrder();
    getAllOrders();
    if (!user) {
      getUser();
    }
  }, [user, getUser]);
  if (localStorage.getItem("token")) return children;
  else return <Navigate to="/login" />;
};

export default ProtectedRoutes;
