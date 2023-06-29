import React from 'react';
import './App.css';
import routes from './utils/AutoRouter'
import {MainRouter} from "./components/MainRouter";
import "./locales/i18n";


function App() {
  return (
      <MainRouter routes={routes}/>
  );
}

export default App;
