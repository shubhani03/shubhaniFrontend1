import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HomeSection from "./HomeSection";
import { useSelector } from "react-redux";
import { message } from "antd";
import { BASE_URL } from "../refer";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BounceLoader from "react-spinners/BounceLoader";

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

const ViewsData = () => {
  const data = useSelector((state) => state.storeData);
  const [bounce, setBounce] = useState();
  const deleteItem = async (id) => {
    setBounce(true);
    console.log("product id ", id);
    // dispatch(showLoading());
    try {
      let user = await fetch(`${BASE_URL}/auth/deleteProduct/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      user = await user.json();

      if (user.success) {
        setTimeout(() => {
          // dispatch(hideLoading());
          setBounce(false);
          message.success("Delete Item Successfully...");
        }, 1000);
      } else {
        message.danger("Something wrong");
      }
      window.location.reload();
    } catch (error) {
      // dispatch(hideLoading());
      setBounce(false);
      alert(`messsage :Something Went Wrong`);
    }
  };
  return (
    <HomeSection>
      {bounce ? (
        <BounceLoader />
      ) : (
        <div className=" p-5">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sr. No </StyledTableCell>
                  <StyledTableCell>Item Name </StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">
                    Rate &nbsp;(RS)
                  </StyledTableCell>
                  <StyledTableCell align="center">Quantity </StyledTableCell>
                  <StyledTableCell align="center">Action </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, ind) => (
                  <StyledTableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {ind + 1}
                    </StyledTableCell>
                    <StyledTableCell>{row.itemName}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.category}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      RS {row.rate}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.quantity}
                      <span style={{ marginLeft: ".5rem" }}>
                        {row.unit && row.unit}
                      </span>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton onClick={() => deleteItem(row._id)}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </HomeSection>
  );
};
export default ViewsData;
