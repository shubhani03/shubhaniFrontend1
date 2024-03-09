import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import Alert from "@mui/material/Alert";

import { Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { message } from "antd";
import { BASE_URL } from "../refer";
const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-top: 10%;
`;
const RegisterCont = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 50%;
  padding: 20px;

  border-radius: 10px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5);
`;
const Heading = styled(Typography)`
  padding: 5px;
`;
const InputText = styled(TextField)`
  margin-top: 10px;
  width: 80%;
`;
const LoginButton = styled(Button)`
  margin-top: 15px;
  width: 60%;
`;
const loginDetails = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState(loginDetails);
  const navigate = useNavigate();
  const inputdata = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    dispatch(showLoading());
    try {
      let user = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      user = await user.json();

      if (user.success) {
        setTimeout(() => {
          dispatch(hideLoading());
          message.success("Log In Successfully...");
          localStorage.setItem("token", user.jwt);
          navigate("/");
        }, 1000);
      } else {
        alert(`Login Error ${user.message}`);
        <Alert severity="success" color="info">
          Login Error {user.message}
        </Alert>;
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      alert(`messsage :Something Went Wrong`, error);
    }
  };
  return (
    <Container
      sx={{
        backgroundImage:
          "url('https://100pillars.in/wp-content/uploads/2023/04/aggregates.jpg')",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundSize: "100%",
      }}
    >
      <RegisterCont
        sx={{
          backgroundImage:
            "url('https://100pillars.in/wp-content/uploads/2023/04/Building-materials-industry-%E2%80%93-Retrospect-2020-min.jpg')",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          backgroundSize: "100%",
          color: "#ff0040",
        }}
      >
        <Heading variant="h4" text-center>
          Login Here...
        </Heading>

        <InputText
          label="Email"
          value={loginData.email}
          name="email"
          onChange={inputdata}
          required
        />
        <InputText
          label="Password"
          type="password"
          name="password"
          onChange={inputdata}
          required
        />

        <LoginButton variant="contained" onClick={loginHandler}>
          Login
        </LoginButton>
        {/* <Link to="/register" className="m-2" style={{ textDecoration: "none" }}>
          SignUp For New User...
        </Link> */}
      </RegisterCont>
    </Container>
  );
};

export default Login;
