import React from "react";
import Header from "../../../components/Auth/Head";
import Form from "../../../components/Auth/Signup/Form";
import Footer from "../../../components/Auth/Footer";


export default class Login extends React.Component {
  componentDidMount = () => {
    
  };

  render() {
    return (
      <>
      <div id="wrapper" class="flex flex-col justify-between h-screen">
        <Header/>
        <Form/>
        <Footer/>
      </div>
        
        
      </>
    );
  }
}
