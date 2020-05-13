import React, { Component } from "react";
import MainComponent from "./components/MainComponent";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <MainComponent />
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
