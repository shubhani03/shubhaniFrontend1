import React from "react";
import Header from "./Header";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";

const BillData = () => {
  const customerData = useSelector((state) => state.customer);
  const cartItem = useSelector((state) => state.sellItems);
  const subTotal = useSelector((state) => state.totalAmount);
  return (
    <div style={{ border: "2px solid black" }}>
      <Grid container>
        <Grid item xs={12}>
          <div>
            <Header />
            <hr />
          </div>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    marginRight: "1rem",
                    marginLeft: "2rem",
                    fontWeight: "700",
                  }}
                >
                  Name :
                </p>
                <p>{customerData[0]?.customerName}</p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "5rem",
                }}
              >
                <p
                  style={{
                    marginRight: "5rem",
                    fontWeight: "700",
                  }}
                >
                  Date :
                </p>
                <p>{new Date(customerData[0]?.date).toLocaleDateString()}</p>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    marginRight: "1rem",
                    marginLeft: "2rem",
                    fontWeight: "700",
                  }}
                >
                  Address :
                </p>
                <p>{customerData[0]?.address}</p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "5rem",
                }}
              >
                <p style={{ marginRight: "2rem", fontWeight: "700" }}>
                  Mob No. :
                </p>
                <p>{customerData[0]?.mobileNumber}</p>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Sr.No </TableCell>
                <TableCell align="center">Item Name </TableCell>

                <TableCell align="center">Rate &nbsp;(RS)</TableCell>
                <TableCell align="center">Quantity </TableCell>
                <TableCell align="center">Amount &nbsp;(RS)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItem?.map((row, ind) => (
                <TableRow
                  key={row.itemID}
                  // sx={{
                  //   "&:last-child td, &:last-child th": { border: 0 },
                  // }}
                >
                  <TableCell align="center">{ind + 1}</TableCell>
                  <TableCell align="center">{row.itemName}</TableCell>
                  <TableCell align="center"> RS {row.rate}</TableCell>
                  <TableCell align="center">
                    {row.quantity}
                    <span style={{ marginLeft: ".5rem" }}>
                      {row.unit && row.unit}
                    </span>
                  </TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <div
          className="py-3 border"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <h5>Total Amount : </h5>
          <h5>{subTotal.amount}</h5>
        </div>
      </Grid>
      <Grid item xs={12}></Grid>
    </div>
  );
};

export default BillData;
