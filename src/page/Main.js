import React from "react";
import Moment from "react-moment";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Details from "./Details";
import Data from "./data/data";
import "../assets/css/main.css";

class Main extends React.Component {
  state = {
    filter: "",
    data: Data,
    limitTo: 5,
  };
  handleChange = (event) => {
    this.setState({ filter: event.target.value });
  };
  render() {
    const { filter, data } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = data.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toLowerCase().includes(lowercasedFilter)
      );
    });

    return (
      <Router>
        <Route
          path="/"
          exact
          render={() => {
            return (
              <div className="center">
                <div className="searchInput">
                  <input
                    className="product"
                    placeholder="&#61442; Research in Text"
                    type="text"
                    value={filter}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="searchArea">
                  {filteredData.slice(0, this.state.limitTo).map((item) => (
                    <div className="items" key={item.email}>
                      <div>
                        <b>{item.title}</b>
                        <br />
                       <span className="text">{item.name} -{" "}
                        <Moment format="YYYY">{item.createdAt}</Moment></span> 
                      </div>
                    </div>
                  ))}{" "}
                  <div className="showMore">
                    <Link to="/detail">Show More</Link>
                  </div>
                </div>
              </div>
            );
          }}
        />

        <Route component={Details} path="/detail" />
      </Router>
    );
  }
}
export default Main;
