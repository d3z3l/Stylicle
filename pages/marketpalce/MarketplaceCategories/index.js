import React from "react";
import Layout from "../../../components/Dashboard/Layout";
import config from "../../../config";

import Header from "../../../components/Home/Head";
import Footer from "../../../components/Home/Footer";
import AuthHelper from "../../../Helpers/AuthHelper";
import Services from "../../../components/Marketpalce/Services";
import Link from "next/link";
import Pagination from "next-pagination";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import dynamic from "next/dynamic";
import Router from "next/router";
import ContentLoader from "react-content-loader";
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
const MyLoader = () => <ContentLoader type="facebook" />;
class ViewSeller extends React.Component {
  state = {
    Sellers: [],
    loading: false,
  };
  componentDidMount = () => {
    // AuthHelper.Varification().then((data)=>{
    //   if (data.status=='unauthorize') {
    //     Router.push('/auth/login')
    //   }
    // })
    // alert(222)
    this.hendalgetAllsellers();
    // setTimeout(() => {

    //   this.setState({loading:true})
    // }, 1000);
  };
  hendalgetAllsellers = (page = 0) => {
    var cat = "";
    var type = "";
    var location = { lat: 0, lng: 0 };
    // alert(this.props.search_location)
    console.log(this.props.search_location);
    if (this.props.service_filter != "") {
      // alert(this.props.service_filter)
      type = "service";
      cat = this.props.service_filter;
    } else {
      cat = this.props.category_filter;
    }
    if (this.props.search_location != "") {
      location = this.props.search_location;
    }
    AuthHelper.getAllsellers(cat, page, type, location).then((resp) => {
      // AuthHelper.getAllsellers(this.props.category_filter,page).then((resp)=>{
      // this.setState({Sellers:resp.data.data.user})
      this.props._sellers_list(resp.data.data.user);
      // this.props._sellers_list(resp.data.data.user)
      // alert(this.props.sellers_list)
      this.props._pagenate_count(resp.data.data.user_count);
      console.log(this.props.pagenate_count);
      setTimeout(() => {
        this.setState({ loading: true });
      }, 500);
    });
  };

  render() {
    return (
      <>
        <Header />
        <div class="maincontent">
          <div class="container">
            <div class="guides_heading mb-4">
              <h1>
                Recommended (
                {this.state.loading == true ? this.props.pagenate_count : 0})
              </h1>
            </div>
          </div>
          <div class="catg_slider mb-5">
            <div class="container"></div>
          </div>

          <div class="purerow">
            <div class="container">
              {this.state.loading == true ? (
                this.props.sellers_list.length != 0 &&
                this.props.sellers_list.length != undefined ? (
                  this.props.sellers_list.map(
                    (val, index) => (
                      console.log(val),
                      (
                        <Link
                          href={{
                            pathname:
                              "/marketpalce/MarketplaceCategories/" + val._id,
                          }}
                        >
                          <div class="row mb-5">
                            <div class="col-md-4">
                              <a href="#.">
                                <div class="ctgsldimg">
                                  {val.banner_image != undefined ? (
                                    <img
                                      src={config.image_url + val.banner_image}
                                      alt=""
                                    />
                                  ) : null}
                                  <p>
                                    5.0 <span>240 Reviews</span>
                                  </p>
                                  <p class="recomnned">
                                    <i class="fas fa-thumbs-up"></i> stylicle
                                    recommended
                                  </p>
                                </div>
                              </a>
                            </div>
                            <div class="col-md-8">
                              <a href="#.">
                                <div class="thouchedbox">
                                  <h1 class="m-0">{val.business}</h1>
                                  <p class="m-0">{val.address}</p>
                                </div>
                                {val.assignservices.map(
                                  (val, index) => (
                                    console.log("val"),
                                    console.log(val),
                                    // {
                                    val.services != undefined ? (
                                      <Services
                                        onPress={() => {
                                          $(".bookingmodal_2").show(),
                                            $(".bookingmodal_1").hide();
                                        }}
                                        onBook={() =>
                                          this.setState({
                                            service_val: val._id,
                                            service_price: val.price,
                                            service_duration: val.duration,
                                            service_title: val.services.title,
                                            morning: "",
                                            afternon: "",
                                            evening: "",
                                          })
                                        }
                                        title={val.services.title}
                                        disc={val.disc}
                                        duration={val.duration}
                                        modal_close={"no"}
                                        price={val.price}
                                      />
                                    ) : null
                                    // }
                                  )
                                )}
                              </a>
                            </div>
                          </div>
                        </Link>
                      )
                    )
                  )
                ) : (
                  <>
                    <h2>No result found</h2>
                    <Link href={"/"}>
                      <a>back to Home</a>
                    </Link>
                  </>
                )
              ) : (
                <>
                  <ContentLoader
                    style={{ marginTop: "30px" }}
                    height={80}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
                    <rect x="90" y="17" rx="4" ry="4" width="80" height="13" />
                    <rect x="90" y="40" rx="3" ry="3" width="250" height="10" />
                    <rect x="90" y="60" rx="3" ry="3" width="250" height="10" />
                  </ContentLoader>
                  <ContentLoader
                    style={{ marginTop: "30px" }}
                    height={80}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
                    <rect x="90" y="17" rx="4" ry="4" width="80" height="13" />
                    <rect x="90" y="40" rx="3" ry="3" width="250" height="10" />
                    <rect x="90" y="60" rx="3" ry="3" width="250" height="10" />
                  </ContentLoader>
                  <ContentLoader
                    style={{ marginTop: "30px" }}
                    height={80}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
                    <rect x="90" y="17" rx="4" ry="4" width="80" height="13" />
                    <rect x="90" y="40" rx="3" ry="3" width="250" height="10" />
                    <rect x="90" y="60" rx="3" ry="3" width="250" height="10" />
                  </ContentLoader>
                  <h2>No result found</h2>
                  <Link href={"/"}>
                    <a>back to Home</a>
                  </Link>
                </>
              )}

              {this.props.pagenate_count > 3 ? (
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  activeClassName={"Primery_color"}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  initialPage={0}
                  pageCount={this.props.pagenate_count / 4}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  onPageChange={(e) => this.hendalgetAllsellers(e.selected)}
                />
              ) : null}
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
    service_filter: state.service_filter,
    search_location: state.search_location,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    _sellers_list: (data) => {
      dispatch({ type: "sellers_list", payload: data });
    },
    _pagenate_count: (data) => {
      dispatch({ type: "pagenate_count", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSeller);
