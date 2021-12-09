import React from "react";
import Layout from "../../../../components/Dashboard/Layout";
import Form from "../../../../components/Auth/Signup/SellerFormGroup";

export default class Login extends React.Component {
  
  render() {
    return (
      <>
      
        <Layout>
          <div id="wrapper" class="flex flex-col justify-between h-screen">
          {/* <Header/> */}
          <Form/>
          {/* <Footer/> */}
          </div>
        </Layout>
      </>
    );
  }
}

