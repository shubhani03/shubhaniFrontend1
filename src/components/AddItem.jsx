import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import React, { useState } from "react";
import HomeSection from "./HomeSection";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { BASE_URL } from "../refer";
import BounceLoader from "react-spinners/BounceLoader";

const AddItem = () => {
  const [item, setItem] = useState("");
  const [rates, setRates] = useState();
  const [quantityValue, setQuantityValue] = useState();
  const [selected, setSelected] = useState();
  const [bounce, setBounce] = useState(false);
  const data = useSelector((state) => state.storeData);
  const handleItem = (event) => {
    const selectItem = event.target.value;
    setItem(selectItem);

    let rate = data.find((itm) => itm._id === selectItem);
    setSelected(rate);
    setRates(rate.rate);
    setQuantityValue(rate.quantity);
  };
  const changeQauntity = (e) => {
    let quantity = e.target.value;
    setQuantityValue(quantity);
  };
  const changeRate = (e) => {
    let rate = e.target.value;
    setRates(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const itemData = {
      itemName: data.get("itemName"),
      category: data.get("category"),
      quantity: data.get("quantity"),
      rate: data.get("rate"),
      unit: data.get("unit"),
    };
    console.log("item", itemData);
    setBounce(true);
    // dispatch(showLoading());
    try {
      let user = await fetch(`${BASE_URL}/auth/createproduct`, {
        method: "post",
        body: JSON.stringify(itemData),
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
        }, 1000);
      } else {
        message.danger("Something wrong");
      }
    } catch (error) {
      // dispatch(hideLoading());
      setBounce(false);
      alert(`messsage :Something Went Wrong`);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setBounce(true);
    let productData = {
      rate: rates,
      quantity: quantityValue,
    };

    // dispatch(showLoading());
    try {
      let user = await fetch(
        `${BASE_URL}/auth/updateoneproduct/${selected._id}`,
        {
          method: "PUT",
          body: JSON.stringify(productData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      user = await user.json();

      if (user.success) {
        setTimeout(() => {
          // dispatch(hideLoading());
          setBounce(false);
          message.success("Update Item Successfully...");
        }, 1000);
      } else {
        message.danger("Something wrong");
      }
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
        <div className=" p-4 border rounded-lg shadow-lg bg-white">
          <div className=" border rounded-s-md shadow-lg p-2">
            <div className=" ">
              <h3 className=""> Add new Items</h3>
            </div>
            <div className=" px-2 mt-4 pb-3 ">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} className="">
                  <Grid item lg={3} xs={4}>
                    <TextField
                      id="itemName"
                      label="Item Name"
                      name="itemName"
                      variant="outlined"
                      fullWidth
                      size="small"
                      required
                    />
                  </Grid>
                  <Grid item lg={3} xs={4}>
                    <TextField
                      id="category"
                      label="Category"
                      size="small"
                      name="category"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item lg={3} xs={4}>
                    <TextField
                      id="quantity"
                      name="quantity"
                      label="Quantity"
                      size="small"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item lg={3} xs={4}>
                    <TextField
                      id="rate"
                      name="rate"
                      label="Rate"
                      size="small"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item lg={3} xs={4}>
                    <TextField
                      id="unit"
                      name="unit"
                      label="Unit"
                      size="small"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item lg={3} xs={4}>
                    <Button
                      sx={{ bgcolor: "rgb(145 85 253)" }}
                      size="large"
                      variant="contained"
                      type="submit"
                    >
                      Add Items
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>

          <div className=" border raunded-md shadow-lg p-2 mt-3">
            <div className=" ">
              <h3 className=""> Updates Item</h3>
            </div>
            <div className="px-2 mt-4 pb-3">
              <Grid container spacing={2}>
                <Grid item xs={6} lg={3}>
                  <FormControl fullWidth>
                    <InputLabel>Items</InputLabel>
                    <Select
                      id="item"
                      value={item}
                      label="Item"
                      size="small"
                      onChange={handleItem}
                    >
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
                <Grid item xs={6} lg={3}>
                  <TextField
                    id="category"
                    name="category"
                    label="Category"
                    variant="outlined"
                    fullWidth
                    size="small"
                    aria-readonly
                    value={selected ? selected.category : ""}
                    defaultValue=""
                  />
                </Grid>

                <Grid item lg={3} xs={6}>
                  <TextField
                    id="rate"
                    name="rate"
                    label="Rate"
                    variant="outlined"
                    fullWidth
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={rates}
                    onChange={changeRate}
                    defaultValue={selected?.rate}
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
                      onChange={changeQauntity}
                      value={quantityValue}
                      defaultValue={selected?.quantity}
                      endAdornment={
                        <InputAdornment position="end">
                          {selected?.unit}
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <div className=" flex items-end">
                    <Button
                      sx={{ mt: 2, bgcolor: "rgb(145 85 253)" }}
                      size="large"
                      variant="contained"
                      onClick={handleUpdate}
                    >
                      Update Items
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      )}
    </HomeSection>
  );
};

export default AddItem;
