import { createSlice } from '@reduxjs/toolkit';

export let stock = createSlice({
  name: 'stock',
  initialState: {
    pdstock: [10, 50, 30, 5, 4],
  },
});

export default stock;
