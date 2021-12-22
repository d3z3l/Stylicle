import React from "react";
import Header from "../../components/Home/Head";
import Footer from "../../components/Home/Footer";
import About from "../../components/StaticPages/About";
import TermsofService from "../../components/StaticPages/Terms-of-Service";
import Privacy from "../../components/StaticPages/privacy";
import Contact from "../../components/StaticPages/Contact";


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     page:4,
    };
  }
  componentDidMount = () => {
    
  };

  render() {
    return (
      <>
      <div id="wrapper" class="flex flex-col justify-between h-screen">
        <Header/>
        <div class="maincontent static_page">
          <section id="about_wrepp">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <ul class="list-group">
                    <li onClick={()=>this.setState({page:1})}  class={`list-group-item ${this.state.page==1?'bg-secondary text-white':''}`}  >About Us</li>
                    <li onClick={()=>this.setState({page:2})} class={`list-group-item ${this.state.page==2?'bg-secondary text-white':''}`}>Terms of Service</li>
                    <li onClick={()=>this.setState({page:3})} class={`list-group-item ${this.state.page==3?'bg-secondary text-white':''}`}>Privacy Policy</li>
                    <li onClick={()=>this.setState({page:4})} class={`list-group-item ${this.state.page==4?'bg-secondary text-white':''}`}>Contact</li>
                  </ul>
                </div>
                {
                  this.state.page==1?(
                    <About/>
                  ):null
                }
                {
                  this.state.page==2?(
                    <TermsofService/>
                  ):null
                }
                {
                  this.state.page==3?(
                    <Privacy/>
                  ):null
                }
                {
                  this.state.page==4?(
                    <Contact/>
                  ):null
                }
              </div>
            </div>
          </section>
        </div>
        <Footer/>
      </div>
      </>
    );
  }
}
