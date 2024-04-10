import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodosAction = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodosAction.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { actions } = todosSlice;
export default todosSlice.reducer;