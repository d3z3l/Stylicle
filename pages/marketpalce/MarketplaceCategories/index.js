import React from "react";
// import Layout from "../../../components/Dashboard/Layout";
import Header from "../../../components/Home/Head";
import Footer from "../../../components/Home/Footer";
import AuthHelper from "../../../Helpers/AuthHelper";
import Services from "../../../components/Marketpalce/Services";
import Link from "next/link";
import Pagination from 'next-pagination'
import { connect } from "react-redux";
import ReactPaginate from 'react-paginate';
import dynamic from "next/dynamic";
import Router from "next/router";
const days = [
  "",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const OwlCarousel = dynamic(
  () => {
    return import("react-owl-carousel");
  },
  { ssr: false }
);
class ViewSeller extends React.Component {
  state = {
    Sellers: [],
  };
  componentDidMount = () => {
    AuthHelper.Varification().then((data)=>{
      if (data.status=='unauthorize') {
        Router.push('/auth/login')
      } 
    })
    this.hendalgetAllsellers()
  };
  hendalgetAllsellers = (page=0) => {
    AuthHelper.getAllsellers(this.props.category_filter,page).then((resp)=>{
      // this.setState({Sellers:resp.data.data.user})
      this.props._sellers_list(resp.data.data.user)
      this.props._pagenate_count(resp.data.data.user_count)
      console.log(this.props.pagenate_count);
    })
  };

  render() {
    return (
      <>
        <Header />
        <div class="maincontent">
          <div class="container">
            <div class="guides_heading mb-4">
              <h1>Recommended</h1>
            </div>
          </div>
          <div class="catg_slider mb-5">
            <div class="container">
              <OwlCarousel
                className="owl-theme "
                items={4}
                loop={true}
                dots={false}
                margin={10}
              >
                <div class="item">
                  <a href="#.">
                    <div class="ctgsldimg">
                      <img src="/images/fg-04.png" alt="" />
                      <p>
                        5.0 <span>240 Reviews</span>
                      </p>
                    </div>
                    <h1>
                      Savanna{" "}
                      <span class="heart">
                        <i class="far fa-heart"></i>
                      </span>
                    </h1>
                    <h2>2701 Black Rd, Joliet, Il, 60435</h2>
                  </a>
                </div>
                <div class="item">
                  <a href="#.">
                    <div class="ctgsldimg">
                      <img src="/images/fg-04.png" alt="" />
                      <p>
                        5.0 <span>240 Reviews</span>
                      </p>
                    </div>
                    <h1>
                      Savanna{" "}
                      <span class="heart">
                        <i class="far fa-heart"></i>
                      </span>
                    </h1>
                    <h2>2701 Black Rd, Joliet, Il, 60435</h2>
                  </a>
                </div><div class="item">
                  <a href="#.">
                    <div class="ctgsldimg">
                      <img src="/images/fg-04.png" alt="" />
                      <p>
                        5.0 <span>240 Reviews</span>
                      </p>
                    </div>
                    <h1>
                      Savanna{" "}
                      <span class="heart">
                        <i class="far fa-heart"></i>
                      </span>
                    </h1>
                    <h2>2701 Black Rd, Joliet, Il, 60435</h2>
                  </a>
                </div>
                <div class="item">
                  <a href="#.">
                    <div class="ctgsldimg">
                      <img src="/images/fg-04.png" alt="" />
                      <p>
                        5.0 <span>240 Reviews</span>
                      </p>
                    </div>
                    <h1>
                      Savanna{" "}
                      <span class="heart">
                        <i class="far fa-heart"></i>
                      </span>
                    </h1>
                    <h2>2701 Black Rd, Joliet, Il, 60435</h2>
                  </a>
                </div><div class="item">
                  <a href="#.">
                    <div class="ctgsldimg">
                      <img src="/images/fg-04.png" alt="" />
                      <p>
                        5.0 <span>240 Reviews</span>
                      </p>
                    </div>
                    <h1>
                      Savanna{" "}
                      <span class="heart">
                        <i class="far fa-heart"></i>
                      </span>
                    </h1>
                    <h2>2701 Black Rd, Joliet, Il, 60435</h2>
                  </a>
                </div>
              </OwlCarousel>

            </div>
          </div>

          <div class="purerow">
            <div class="container">
              {
                this.props.sellers_list.map((val,index)=>(
                  console.log(val),
                  <Link  href={{ pathname: '/marketpalce/MarketplaceCategories/'+ val._id} } >
                    <div class="row mb-5">
                      <div class="col-md-4">
                        <a href="#.">
                          <div class="ctgsldimg">
                            <img src="/images/fg-05.png" alt="" />
                            <p>
                              5.0 <span>240 Reviews</span>
                            </p>
                            <p class="recomnned">
                              <i class="fas fa-thumbs-up"></i> stylicle recommended
                            </p>
                          </div>
                        </a>
                      </div>
                      <div class="col-md-8">
                        <a href="#.">
                          <div class="thouchedbox">
                            <h1>{val.name}</h1>
                            <p>{val.phone}</p>
                          </div>
                          {
                            val.assignservices.map((val,index)=>(
                              console.log("val"),
                              console.log(val),
                              // {
                                val.services!=undefined?
                                <Services  onPress={()=> {$('.bookingmodal_2').show(),$('.bookingmodal_1').hide()}} onBook={()=>this.setState({service_val:val._id,service_price:val.price,service_duration:val.duration,service_title:val.services.title,morning:'',afternon:'',evening:''})} title={val.services.title} duration={val.duration} modal_close={'no'} price={val.price} />
                                :null
                              // }
                            ))
                          }
                        </a>
                      </div>
                    </div>
                  </Link>
                ))
              }
            <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    activeClassName={'Primery_color'}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    initialPage={0}
                    pageCount={this.props.pagenate_count}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={(e)=>this.hendalgetAllsellers(e.selected)}
                />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    user_data: state.user_data,
    user_workinghours: state.user_workinghours,
    sellers_list: state.sellers_list,
    pagenate_count: state.pagenate_count,
    category_filter: state.category_filter,

  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    _sellers_list: (data) => {
      dispatch({ type: "sellers_list", payload: data });
    },
    _pagenate_count: (data) => {
      dispatch({ type: "pagenate_count", payload: data });
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps) (ViewSeller);
