import React, { useEffect, useState } from "react";
import HomeSection from "./HomeSection";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const selectOrderItem = [
  { itemName: "Order By Customer", itemValue: "orderCustomer" },
  {
    itemName: "All Order ",
    itemValue: "allOrder",
  },
];

const AllOrder = () => {
  const [selectList, setSelectList] = useState("allOrder");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const overAllOrders = useSelector((state) => state.overAllOrders);
  const customerData = useSelector((state) => state.orderedProductCustomer);
  const [dataToShow, setDataToShow] = useState(overAllOrders);
  const [fData, setFData] = useState(overAllOrders);

  const handleItem = (event) => {
    const selectItem = event.target.value;
    setSelectList(selectItem);
    if (selectItem === "orderCustomer") {
      setFData(customerData);
      setDataToShow(customerData);
    } else {
      setFData(overAllOrders);
      setDataToShow(overAllOrders);
    }
  };

  const filterData = () => {
    let month = new Date(selectedDate).getMonth() + 1;
    let years = new Date(selectedDate).getFullYear();
    let newData = [];
    let d1 = fData.map((item) => {
      if (selectList === "orderCustomer") {
        if (
          new Date(item.orderDate).getMonth() + 1 === month &&
          new Date(item.orderDate).getFullYear() === years
        ) {
          newData.push(item);
        }
      } else {
        if (
          new Date(item.date).getMonth() + 1 === month &&
          new Date(item.date).getFullYear() === years
        ) {
          newData.push(item);
        }
      }
    });
    console.log(" sellDate ", d1);
    setDataToShow(newData);
  };

  useEffect(() => {
    filterData();
  }, [selectedDate]);
  return (
    <HomeSection>
      <div className="  border shadow-lg">
        <div
          className=" pt-3 p-2 z-100"
          style={{
            position: "fixed",
            width: "73%",

            background: "white",
            marginTop: "-1px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <FormControl sx={{ width: "11rem", padding: "2px" }}>
                <InputLabel>Select Orders</InputLabel>
                <Select
                  id="item"
                  value={selectList}
                  label="Item"
                  size="small"
                  onChange={handleItem}
                >
                  {selectOrderItem.map((item) => {
                    return (
                      <MenuItem key={item.itemValue} value={item.itemValue}>
                        {item.itemName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div style={{ marginRight: "5rem", display: "flex" }}>
              <p className="px-2">Filter By Date</p>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  console.log(selectedDate);
                }}
                dateFormat="MM/yyyy"
                showMonthYearPicker
              />
            </div>
          </div>
          <hr />
        </div>
        <div className=" p-2" style={{ marginTop: "6rem" }}>
          {selectList === "orderCustomer" ? (
            dataToShow.map((customer) => (
              <div className=" border py-2" style={{}}>
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
                        <p>{customer?.user.customerName}</p>
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
                        <p>
                          {new Date(customer?.orderDate).toLocaleDateString()}
                        </p>
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
                          Mobile Number :
                        </p>
                        <p>{customer?.user.mobileNumber}</p>
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
                          Total Amount :
                        </p>
                        <p>{customer.totalPrice}</p>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <hr />
                <div>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: "100%" }}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Sr. No </StyledTableCell>

                          <StyledTableCell>Item Name </StyledTableCell>

                          <StyledTableCell align="center">
                            Category
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Rate &nbsp;(RS)
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Quantity{" "}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Amount{" "}
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {customer.orderItems.map((row, ind) => (
                          <StyledTableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <StyledTableCell component="th" scope="row">
                              {ind + 1} {console.log("row Value ", row)}
                            </StyledTableCell>

                            <StyledTableCell>
                              {row.product.itemName}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.product.category}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              RS {row.rate}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.quantity}
                              <span style={{ marginLeft: ".5rem" }}>
                                {row.product.unit && row.product.unit}
                              </span>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              RS {row.price}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            ))
          ) : (
            <div className=" border ">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: "100%" }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Sr. No </StyledTableCell>
                      <StyledTableCell>Date </StyledTableCell>
                      <StyledTableCell>Item Name </StyledTableCell>

                      <StyledTableCell align="center">Category</StyledTableCell>
                      <StyledTableCell align="center">
                        Rate &nbsp;(RS)
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Quantity{" "}
                      </StyledTableCell>
                      <StyledTableCell align="center">Amount </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataToShow.map((row, ind) => (
                      <StyledTableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell component="th" scope="row">
                          {ind + 1}
                        </StyledTableCell>
                        <StyledTableCell>
                          {new Date(row.date).toLocaleDateString()}
                        </StyledTableCell>
                        <StyledTableCell>
                          {console.log("331 line", row)}
                          {row.product.itemName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.product.category}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          RS {row.rate}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.quantity}
                          <span style={{ marginLeft: ".5rem" }}>
                            {row.product.unit && row.product.unit}
                          </span>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          RS {row.price}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    </HomeSection>
  );
};

export default AllOrder;
