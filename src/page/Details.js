import React from "react";
import Moment from "react-moment";
import Data from "./data/data";
import "../assets/css/main.css";

class ProductList extends React.Component {
  state = {
    filter: "",
    data: Data,
    currentPage: 1,
    PerPage: 10,
    itemsToShow: 3,
    expanded: false,
  };

  handleClick = this.handleClick.bind(this);
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }
  handleChange = (event) => {
    this.setState({ filter: event.target.value });
  };
  sortByNameAsc = () => {
    let sortedProductsAsc;
    sortedProductsAsc = this.state.data.sort((a, b) => {
      return (a.name > b.name) * 2 - 1;
    });

    this.setState({
      data: sortedProductsAsc,
    });
  };

  sortByNameDsc = () => {
    let sortedProductsDsc;
    sortedProductsDsc = this.state.data.sort((a, b) => {
      return (b.name > a.name) * 2 - 1;
    });

    this.setState({
      data: sortedProductsDsc,
    });
  };
  sortByYearAsc = () => {
    let sortedProductsAsc;
    sortedProductsAsc = this.state.data.sort((a, b) => {
      return parseInt(a.createdAt) - parseInt(b.createdAt);
    });

    this.setState({
      data: sortedProductsAsc,
    });
  };

  sortByYearDsc = () => {
    let sortedProductsDsc;
    sortedProductsDsc = this.state.data.sort((a, b) => {
      return parseInt(b.createdAt) - parseInt(a.createdAt);
    });

    this.setState({
      data: sortedProductsDsc,
    });
  };
  render() {
    const { filter, data } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const { currentPage, PerPage } = this.state;

    const indexOfLast = currentPage * PerPage;
    const indexOfFirst = indexOfLast - PerPage;
    const currentItem = data.slice(indexOfFirst, indexOfLast);

    const filteredData = currentItem.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toLowerCase().includes(lowercasedFilter)
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / PerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = (
      <div class="pagination">
        <a href="#">&laquo;</a>{" "}
        {pageNumbers.map((number) => {
          return (
            <a
              key={number}
              className={
                (this.state.currentPage === number ? "active " : "") +
                "controls"
              }
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </a>
          );
        })}{" "}
        <a href="#">&raquo;</a>
      </div>
    );
    return (
      <div>
        <div className="searchInput">
          <input
            placeholder="&#61442; Research in Text"
            type="text"
            className="productDetail"
            value={filter}
            onChange={this.handleChange}
          />
        </div>

        <div class="detailArea">
          <div class="dropdown">
            <button class="dropbtn">
              <span class="icon-embed icon-embed--vertical"></span> Order By
            </button>
            <div class="dropdown-content">
              <a onClick={this.sortByNameAsc}>Name ascending</a>
              <a onClick={this.sortByNameDsc}>Name descending</a>
              <a onClick={this.sortByYearAsc}>Year ascending</a>
              <a onClick={this.sortByYearDsc}>Year descending</a>
            </div>
          </div>
          {filteredData.map((item) => (
            <div className="items" key={item.email}>
              <div className="space">
                <b>{item.title}</b>
                <br />
                <span className="text">
                  {item.name} - <Moment format="YYYY">{item.createdAt}</Moment>
                </span>
              </div>
            </div>
          ))}
        </div>
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default ProductList;
