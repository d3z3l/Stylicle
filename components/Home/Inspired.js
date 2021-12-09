import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import NewsfeedsHelper from "../../Helpers/NewsfeedsHelper";
import config from "../../config";

import Link from 'next/link'

const OwlCarousel = dynamic(
  () => {
    return import("react-owl-carousel");
  },
  { ssr: false }
);
export default class Header extends React.Component {
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
    NewsfeedsHelper.Get_all_Featureds().then((resp) => {
    //   for (let i = 0; i < resp.data.data.services.length; i++) {
    //     const element = resp.data.data.services[i];
    //     services.push(
    //       <li>
    //         <a href="#">{element.title}</a>
    //       </li>
    //     )
    // }
    this.setState({services:resp.data.data.newsfeeds_posts})
    console.log(this.state.services.length);
    
    });
  };
  render() {
    return (
      <section id="inspired_wrepp" class="trandingwrepp">
          <div class="container">
            <div class="guides_heading mb-5">
              <h1>
                Trending on Stylicle
                <span>
                  <Link href="/explore" >                    
                    <a>
                      More in trending <i class="fas fa-chevron-right"></i>
                    </a>
                  </Link>
                </span>
              </h1>
            </div>

            {
              this.state.services.length!=0?(
                <OwlCarousel
                className="owl-theme "
                items={4}
                loop={true}
                nav={true}
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
                          <img src={config.image_url + val.media} alt="" />
                          <div class="hoverbox"></div>
                        </div>
                        {/* <div class="position-relative  featured_posts p-3">
                          <div >
                            <img src={config.image_url + val.media} alt="" />
                          </div>
                          <div class="line1"></div>
                          <div class="line2"></div>
                          <div class="line3"></div>
                          <div class="line4"></div>
                        </div> */}
                        <div class="project-info">
                          <div class="gig-info">
                              <p><b>{val.text}</b></p>
                              <p>by {val.user.name}</p>
                          </div>
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


            <div class="guidesbox2">
              <div class="guidesheading">
                <h1>We keep your business on pace with your passion.</h1>
                <Link href="/auth/SellerSignup/" >
                    <a class="btn btn-outline-light" >
                    Become Our Partner
                    </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
    );
  }
}
