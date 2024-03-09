import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Grid, TextField } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../redux/features/customerSlice";
import { useNavigate } from "react-router-dom";
import { hideDialog } from "../redux/features/DialogSlice";

const customerDetails = {
  customerName: "",
  mobileNumber: "",
  address: "",
};
const CustomerDialog = (props) => {
  const dispatch = useDispatch();

  const [customerData, setCustomerData] = useState(customerDetails);
  const [date, setDate] = useState(Date.now());
  let navigate = useNavigate();
  const printTogle = useSelector((state) => state.printT);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const selectDate = (selectedDate) => {
    let date = new Date(selectedDate).toString();
    setDate(date);
  };
  const inputdata = (event) => {
    setCustomerData({
      ...customerData,
      [event.target.name]: event.target.value,
    });
  };

  const makeBills = () => {
    let customData = {
      ...customerData,
      date,
    };
    console.log("customere", customData);
    dispatch(setCustomer(customData));
    dispatch(hideDialog());
  };
  const handleClose = () => {
    navigate("/");
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={printTogle.loading}
        onClose={handleClose}
        aria-labelledby="Customer Details"
      >
        <DialogTitle id="Customer Details"></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid item xs={12}>
              <h3 className="py-2 pb-4">Cutomer details </h3>
            </Grid>
            <hr />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="customerName"
                  label="Cutomer Name"
                  name="customerName"
                  variant="outlined"
                  fullWidth
                  onChange={inputdata}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="mobileNumber"
                  label="Mobile Number"
                  name="mobileNumber"
                  variant="outlined"
                  fullWidth
                  onChange={inputdata}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className="mt-4 py-1"
                  id="address"
                  label="Address"
                  name="address"
                  variant="outlined"
                  fullWidth
                  onChange={inputdata}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      "DatePicker",
                      "MobileDatePicker",
                      "DesktopDatePicker",
                    ]}
                  >
                    <DemoItem label="Choose date">
                      <DatePicker
                        onChange={selectDate}
                        defaultValue={dayjs(Date.now())}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={makeBills}
            sx={{ mt: 2, bgcolor: "green" }}
          >
            Make Bills
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ mt: 2, bgcolor: "red" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default CustomerDialog;
