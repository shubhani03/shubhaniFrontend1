import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import HomeSection from "./HomeSection";
import { useDispatch, useSelector } from "react-redux";
import { addItems, removeItem } from "../redux/features/sellSlice";
import { useNavigate } from "react-router-dom";
import { addAmount } from "../redux/features/totalAmountSlice";
import { showDialog } from "../redux/features/DialogSlice";

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

const SellItem = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.storeData);
  const cartItem = useSelector((state) => state.sellItems);
  const [item, setItem] = useState("");
  const [rates, setRates] = useState();
  const [quantity, setquantityValue] = useState("");
  const subTotal = useSelector((state) => state.totalAmount);
  const navigate = useNavigate();
  const [delTogle, setDelToggle] = useState(false);

  const handleItem = (event) => {
    const selectItem = event.target.value;
    setItem(selectItem);
    let rate = data.find((itm) => itm._id === selectItem);
    setRates(rate);
  };
  const setQuantity = (e) => {
    let value = e.target.value;
    setquantityValue(value);
  };
  const bagItems = (e) => {
    e.preventDefault();
    if (quantity === 0 || quantity === "") {
      alert("Quantity should not be ( 0 ) or Empty");
      return;
    }
    if (rates.quantity < quantity) {
      alert("You have insufficient quantity  ");
      return;
    }
    let cart = {
      id: rates._id,
      itemName: rates.itemName,
      rate: rates.rate,
      quantity: quantity,
      amount: rates.rate * quantity,
      remainQuantiy: rates.quantity - quantity,
      unit: rates.unit,
    };

    dispatch(addItems(cart));
    dispatch(addAmount(rates.rate * quantity));
    setquantityValue("");
    setDelToggle(!delTogle);
  };
  const deleteItem = (item) => {
    dispatch(removeItem(item));
    setDelToggle(!delTogle);
  };

  const makeBills = (e) => {
    e.preventDefault();
    dispatch(showDialog());
    navigate("/finalbill");
  };
  return (
    <HomeSection>
      <div className="   p-1 px-2">
        <div className="border raunded-md shadow-lg p-1 mt-2 px-2 pb-4">
          <div className=" px-5 pb-2">
            <h3 className=""> Select Products</h3>
          </div>
          <div className="px-2 mt-2 pb-1">
            <Grid container spacing={3}>
              <Grid item xs={6} lg={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Items</InputLabel>
                  <Select
                    id="item"
                    value={item}
                    label="Item"
                    onChange={handleItem}
                  >
                    {/* <MenuItem value="select item">Select an Item</MenuItem> */}
                    {data.map((item) => {
                      return (
                        <MenuItem key={item._id} value={item._id}>
                          {item.itemName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item lg={3} xs={6}>
                <TextField
                  id="rate"
                  name="rate"
                  label="Rate"
                  variant="outlined"
                  fullWidth
                  size="small"
                  aria-readonly
                  value={rates ? rates.rate : 0}
                  defaultValue={0}
                />
              </Grid>
              <Grid item lg={3} xs={6}>
                <FormControl
                  id="quantity"
                  name="quantity"
                  label="Quantity"
                  variant="outlined"
                  size="small"
                  fullWidth
                >
                  <OutlinedInput
                    onChange={setQuantity}
                    value={quantity}
                    equired
                    defaultValue={rates?.quantity}
                    endAdornment={
                      <InputAdornment position="end">
                        {rates?.unit}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                {/* <span style={{ marginLeft: ".5rem" }}>
                  {rates.unit?.rates.unit}
                </span> */}
              </Grid>
              <Grid item lg={3} xs={6}>
                <div className=" flex items-end">
                  <Button
                    sx={{ bgcolor: "rgb(145 85 253)" }}
                    size="large"
                    variant="contained"
                    type="submit"
                    onClick={bagItems}
                  >
                    Add Items
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="border raunded-md shadow-lg p-1 mt-2 px-2 bg-white">
          <h3 className=" px-5 pb-2">your bags</h3>
          <div className="">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: "100%" }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sr.No </StyledTableCell>
                    <StyledTableCell>Item Name </StyledTableCell>

                    <StyledTableCell align="center">
                      Rate &nbsp;(RS)
                    </StyledTableCell>
                    <StyledTableCell align="center">Quantity </StyledTableCell>
                    <StyledTableCell align="center">
                      Amount &nbsp;(RS)
                    </StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItem.map((row, ind) => (
                    <StyledTableRow
                      key={row.itemID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {ind + 1}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.itemName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        RS {row.rate}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.quantity}{" "}
                        <span style={{ marginLeft: ".5rem" }}>{row.unit}</span>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        RS {row.amount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton onClick={() => deleteItem(row)}>
                          <DeleteForeverIcon sx={{ color: "red" }} />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          {cartItem.length > 0 && (
            <div
              className="  py-3"
              style={{
                display: "flex",
                // flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div>
                <h5>Total Amount :</h5>
              </div>
              <div>
                <h5>{subTotal.amount}</h5>
              </div>
              <div>
                <Button onClick={makeBills} variant="contained">
                  Make Bill
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </HomeSection>
  );
};

export default SellItem;
