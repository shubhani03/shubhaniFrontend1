import { Button, Grid } from "@mui/material";
import React, { useState } from "react";

import CustomerDialog from "./CustomerDialog";
import HomeSection from "./HomeSection";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { removeAllItems } from "../redux/features/sellSlice";
import { revomeCustomer } from "../redux/features/customerSlice";
import BillData from "./BillData";
import { BASE_URL } from "../refer";
import BounceLoader from "react-spinners/BounceLoader";

const FinalBill = () => {
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer);
  const cartItem = useSelector((state) => state.sellItems);
  const subTotal = useSelector((state) => state.totalAmount);
  const [bounce, setBounce] = useState(false);
  const navigate = useNavigate();
  const handlePrint = () => {
    navigate("/finalprint");
  };

  const saveAndExit = async (e) => {
    e.preventDefault();

    let orderData = {
      customer: customerData[0],
      products: cartItem,
      totalAmount: subTotal.amount,
    };
    setBounce(true);
    // dispatch(showLoading());
    try {
      let user = await fetch(`${BASE_URL}/auth/createorders`, {
        method: "post",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      user = await user.json();
      if (user.success) {
        setTimeout(() => {
          // dispatch(hideLoading());
          setBounce(false);
          message.success("Add Item Successfully...");
          navigate("/");
        }, 1000);
      } else {
        message.danger("Something wrong");
      }
    } catch (error) {
      // dispatch(hideLoading());
      setBounce(false);
      alert(`messsage :Something Went Wrong`);
    }
    setToggle(false);
    dispatch(removeAllItems());
    dispatch(revomeCustomer());
  };

  return (
    <HomeSection>
      {bounce ? (
        <BounceLoader />
      ) : (
        <div>
          <CustomerDialog toggle={toggle} />

          <BillData />
          <div className=" py-3  flex item-center">
            <Grid container>
              <Grid item xs={6}>
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    marginRight: "5rem",
                  }}
                >
                  <Button variant="contained" onClick={handlePrint}>
                    Print
                  </Button>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" onClick={saveAndExit}>
                  Save & Exist
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </HomeSection>
  );
};

export default FinalBill;
