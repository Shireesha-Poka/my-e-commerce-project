import React from 'react';
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.png";
import {FaUserAlt} from "react-icons/fa";
import {BsSearch,BsCart2} from "react-icons/bs"

const options = {
  burgerColorHover: "black",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/allproducts",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  searchIconMargin : "1vmax",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};


const Header = () => {
  return (
    <ReactNavbar 
    {...options}
    profileIcon = {true}
    ProfileIconElement = {FaUserAlt}
    searchIcon = {true}
    SearchIconElement = {BsSearch}
    cartIcon = {true}
    CartIconElement = {BsCart2}

     />
  )
}

export default Header;