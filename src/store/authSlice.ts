import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import {  createAsyncThunk } from '@reduxjs/toolkit';
import {   nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


// Type for our state
export interface AuthState {
  authState: boolean;
}

// Initial state
const initialUiState: AuthState = {
  authState: false,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState:initialUiState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;

export default authSlice.reducer


// slices/dataSlice.ts
 
interface DataState {
  products: any[];
  loading: boolean;
}

const initialState: DataState = {
  products: [],
  loading: false,
};

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data.products;
});

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(HYDRATE, (state, action) => {
        // Attention: This will overwrite client state!
        return action.payload.data ? action.payload.data : state;
      });
  },

  // [HYDRATE]:(state , action)=>{
  //   return {
  //     ...state , action.payload.data,
  //   }
  // }
});

export   const dataReducer = dataSlice.reducer;

interface CounterType{
  value:number;
}


const initialCounterState:CounterType = {
  value:0,
}

export const counterSlice = createSlice({
  name:'counter',
  initialState:initialCounterState,
  reducers:{
 increment:(state)=>{
  state.value +=1
 },

decrement:(state)=>{
  state.value -=1
},

  },

extraReducers:{
  [HYDRATE]:(state ,action)=>{
    return {
      ...state , ...action.payload.counter,
    }
  }
}

})


 export const {increment , decrement } = counterSlice.actions;
 export const counterReducer =  counterSlice.reducer
