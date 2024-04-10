import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slise/todoSlise';

const store = configureStore({
  reducer: {
    todos: todosReducer
  },
});

export default store;
