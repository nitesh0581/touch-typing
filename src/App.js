import React from 'react';
import { Provider } from 'react-redux';
import store from './components/store';
import KeyPractice from './components/Keypractice';

const App = () => {
  return (
    <Provider store={store}>
      <KeyPractice />
    </Provider>
  );
};

export default App;
