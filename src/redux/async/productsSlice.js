import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    const response = await axios.put(`${API_URL}/${product.id}`, product);
    return response.data;
  }
);
export const stockIn = createAsyncThunk(
  "products/stockIn",
  async ({ id, stock }) => {
    const response = await axios.patch(`${API_URL}/${id}`, { stock });
    return response.data;
  }
);
export const stockOut = createAsyncThunk(
  "products/stockOut",
  async ({ id, stock }) => {
    const response = await axios.patch(`${API_URL}/${id}`, { stock });
    return response.data;
  }
);

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isSuccess: false,
  isUpdate: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    currentProduct: (state, action) => {
      state.isUpdate = true;
      state.product = action.payload;
    },
    resetProduct: (state) => {
      state.isUpdate = false;
      state.product = {};
    },
  },
  extraReducers: (builder) => {
    // fetch products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
    // add product
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
      state.isSuccess = false;
    });
    builder.addCase(addProduct.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
    // delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.isSuccess = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
    // update product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.isSuccess = false;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
      state.isUpdate = false;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
    // stock in
    builder.addCase(stockIn.pending, (state) => {
      state.loading = true;
      state.isSuccess = false;
    });
    builder.addCase(stockIn.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(stockIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
    // stock out
    builder.addCase(stockOut.pending, (state) => {
      state.loading = true;
      state.isSuccess = false;
    });
    builder.addCase(stockOut.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(stockOut.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { resetProduct, currentProduct } = productsSlice.actions;
export default productsSlice.reducer;
