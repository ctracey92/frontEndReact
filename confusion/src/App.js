import React, { Component } from "react";
import MainComponent from "./components/MainComponent";
import "./App.css";
import {BrowserRouter} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <MainComponent />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
