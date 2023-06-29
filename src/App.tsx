import React from 'react';
import './App.css';
import routes from './utils/AutoRouter'
import {MainRouter} from "./components/MainRouter";

function App() {
  return (
    <MainRouter routes={routes}/>
  );
}

export default App;
