import React from "react";
import dynamic from "next/dynamic";
import ServicesHelper from "../../Helpers/ServicesHelper";
import config from "../../config";
import Link from 'next/link'

const OwlCarousel = dynamic(
  () => {
    return import("react-owl-carousel");
  },
  { ssr: false }
);
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default class Banner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      services:[],
    };
  }
  componentDidMount= ()=>{
    this.hendalGetServices()
  }
  hendalGetServices = () => {
    let services=[]
    ServicesHelper.Popular_Services().then((resp) => {
    //   for (let i = 0; i < resp.data.data.services.length; i++) {
    //     const element = resp.data.data.services[i];
    //     services.push(
    //       <li>
    //         <a href="#">{element.title}</a>
    //       </li>
    //     )
    // }
    this.setState({services:resp.data.data.services})
    console.log(this.state.services.length);
    
    });
  };

  render() {
    return (
      <>
        <section id="inspired_wrepp" class="services_wrepp">
          <div class="container">
            <div class="guides_heading mb-4">
              <h1>Popular Services</h1>
            </div>
            {
              this.state.services.length!=0?(
                <OwlCarousel
                className="owl-theme "
                items={5}
                loop={true}
                dots={false}
                margin={10}
              >
                {
                  this.state.services.map((val,index)=>(
                    <>
                    {console.log(val)}
                    <div class="item">
                    <Link href="/marketpalce/MarketplaceCategories">
                      <div class="card overflow-hidden">
                        <div class="position-relative">
                          <a href="#">
                            <img src={config.image_url + val.image} alt="" />
                          </a>
                          <div class="line1"></div>
                          <div class="line2"></div>
                          <div class="line3"></div>
                          <div class="line4"></div>
                        </div>
                        <div class="text-box">
                          <h4>{val.title}</h4>
                        </div>
                      </div>
                      </Link>
                    </div>
                    </>
                  ))
                }


                {/* <div class="item">
                  <div class="card overflow-hidden">
                    <div class="position-relative">
                      <a href="#.">
                        <img src="/images/services-hair-cutting.png" alt="" />
                      </a>
                      <div class="line1"></div>
                      <div class="line2"></div>
                      <div class="line3"></div>
                      <div class="line4"></div>
                    </div>
                    <div class="text-box">
                      <h4>Hair Cutting {this.state.services.length}</h4>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="card overflow-hidden">
                    <div class="position-relative">
                      <a href="#.">
                        <img
                          src="/images/services-hair-straightening.png"
                          alt=""
                        />
                      </a>
                      <div class="line1"></div>
                      <div class="line2"></div>
                      <div class="line3"></div>
                      <div class="line4"></div>
                    </div>
                    <div class="text-box">
                      <h4>Hair Straightening</h4>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="card overflow-hidden">
                    <div class="position-relative">
                      <a href="#.">
                        <img src="/images/services-hair-styling.png" alt="" />
                      </a>
                      <div class="line1"></div>
                      <div class="line2"></div>
                      <div class="line3"></div>
                      <div class="line4"></div>
                    </div>
                    <div class="text-box">
                      <h4>Hair Styling</h4>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="card overflow-hidden">
                    <div class="position-relative">
                      <a href="#.">
                        <img src="/images/services-massage.png" alt="" />
                      </a>
                      <div class="line1"></div>
                      <div class="line2"></div>
                      <div class="line3"></div>
                      <div class="line4"></div>
                    </div>
                    <div class="text-box">
                      <h4>Massage</h4>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="card overflow-hidden">
                    <div class="position-relative">
                      <a href="#.">
                        <img src="/images/services-nails.png" alt="" />
                      </a>
                      <div class="line1"></div>
                      <div class="line2"></div>
                      <div class="line3"></div>
                      <div class="line4"></div>
                    </div>
                    <div class="text-box">
                      <h4>Nails</h4>
                    </div>
                  </div>
                </div> */}
    
              </OwlCarousel>
              ):null
            }
          </div>
        </section>
      </>
    );
  }
}
