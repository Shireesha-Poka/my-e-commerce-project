import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import {useNavigate } from "react-router-dom";

const Search = () => {
    const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()){
        navigate(`/product/${keyword}`);
    }
    else {
        navigate("/allproducts");
    }
    
  };

  return (
    <Fragment>
      <MetaData title="Search A Product" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;