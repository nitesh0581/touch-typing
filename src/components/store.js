import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  currentKey: '',
  correctKeys: 0,
  incorrectKeys: 0,
}; 

// Actions
export const setKey = (key) => ({
  type: 'SET_KEY',
  payload: key,
});

export const incrementCorrectKeys = () => ({
  type: 'INCREMENT_CORRECT_KEYS',
});

export const incrementIncorrectKeys = () => ({
  type: 'INCREMENT_INCORRECT_KEYS',
});

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_KEY':
      return {
        ...state,
        currentKey: action.payload,
      };
    case 'INCREMENT_CORRECT_KEYS':
      return {
        ...state,
        correctKeys: state.correctKeys + 1,
      };
    case 'INCREMENT_INCORRECT_KEYS':
      return {
        ...state,
        incorrectKeys: state.incorrectKeys + 1,
      };
    default:
      return state;
  }
};

const store = configureStore({
    reducer: reducer
})

export default store;
