// src/slices/currencySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCurrencies = createAsyncThunk(
  'currency/fetchCurrencies',
  async () => {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    return Object.keys(data.rates);
  }
);

export const convertCurrency = createAsyncThunk(
  'currency/convertCurrency',
  async ({ amount, fromCurrency, toCurrency }) => {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    return amount * rate;
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    amount: '',
    fromCurrency: 'Select Currency',
    toCurrency: 'Select Currency',
    currencies: [],
    isFromMenuVisible: false,
    isToMenuVisible: false,
    convertedAmount: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setFromCurrency: (state, action) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action) => {
      state.toCurrency = action.payload;
    },
    setIsFromMenuVisible: (state, action) => {
      state.isFromMenuVisible = action.payload;
    },
    setIsToMenuVisible: (state, action) => {
      state.isToMenuVisible = action.payload;
    },
    resetAmount: (state) => {
      state.amount = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currencies = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(convertCurrency.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(convertCurrency.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.convertedAmount = action.payload;
      })
      .addCase(convertCurrency.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setAmount,
  setFromCurrency,
  setToCurrency,
  setIsFromMenuVisible,
  setIsToMenuVisible,
  resetAmount,
} = currencySlice.actions;

export default currencySlice.reducer;
