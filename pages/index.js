import React from "react";
import Header from "../components/Home/Head";
import Banner from "../components/Home/Banner";
import PopularServices from "../components/Home/PopularServices";
import Fingertips from "../components/Home/Fingertips";
import TopCategories from "../components/Home/TopCategories";
import AppLinks from "../components/Home/AppLinks";
import Testimonial from "../components/Home/Testimonial";
import Inspired from "../components/Home/Inspired";
import Footer from "../components/Home/Footer";

export default class Home extends React.Component {
  componentDidMount = () => {
    if (typeof window === "undefined") {
      global.window = {};
    }
  };

  render() {
    return (
      <>
        <Header/>
        <Banner/>
        <PopularServices/>
        <Fingertips/>
        <TopCategories/>
        <AppLinks/>
        <Testimonial/>
        <Inspired/>
        <Footer/>
        
        
      </>
    );
  }
}
