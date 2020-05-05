import React, { Component } from "react";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import Dishdetail from "./DishdetailComponent";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route, Redirect } from "react-router-dom";

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  render() {


    const HomePage = () => {
      return(
        <Home />
      );
    }
    return (
      <div>
        <Header />

        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.state.dishes} />}
          />
          <Redirect to="/home" />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default MainComponent;
