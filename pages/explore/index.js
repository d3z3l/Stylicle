import React from "react";
// import Layout from "../../components/Dashboard/Layout";
import NewsfeedsHelper from "../../Helpers/NewsfeedsHelper";
import config from "../../config";
import Header from "../../components/Home/Head";
import Footer from "../../components/Home/Footer";
import AuthHelper from "../../Helpers/AuthHelper";
import Services from "../../components/Marketpalce/Services";
import Link from "next/link";
import Pagination from 'next-pagination'
import { connect } from "react-redux";
import ReactPaginate from 'react-paginate';
import dynamic from "next/dynamic";

import { faCar,faPlus,faStar,faCheckCircle,faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import GoogleMapReact from 'google-map-react';
import ContentLoader from 'react-content-loader'

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
  
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 1,
      Sellers: [],
      services:[],
      loading:false

    };
  }
  componentDidMount = () => {

    // AuthHelper.Varification().then((data)=>{
    //   if (data.status=='unauthorize') {
    //     Router.push('/auth/login')
    //   } 
    // })
    // this.hendalGetServices()
    // this.hendalgetAllsellers()
    // setTimeout(() => {
    //   this.setState({loading:true})
    // }, 1000);
  };
  hendalgetAllsellers = (page=0) => {
    this.setState({loading:false})
    var cat=''
    var type=''
    if (this.props.service_filter!='') {
      // alert(this.props.service_filter)
      type='service'
      cat=this.props.service_filter
    }else{
      cat=this.props.category_filter
    }
    AuthHelper.getAllsellers(cat,page,type).then((resp)=>{  
    // AuthHelper.getAllsellers(this.props.category_filter,page).then((resp)=>{
      // this.setState({Sellers:resp.data.data.user})
      let length = resp.data.data.user.length
      console.log(resp.data.data.user.length);
      console.log(resp.data.data.user);
      console.log('resp.data.data.user');
      // console.log(JSON.parse(resp.data.data.user[0].geo_location));
      if (length==0) {
        this.setState({center: { lat: 1, lng: 1 }})
      } else {
       var data =resp.data.data.user.reduce
        var lat=  (...data) => data.reduce(function(sum, current){ return sum + JSON.parse(current.geo_location).lat },0) /length
      var lng= (...data) => data.reduce(function(sum, current){ return sum + JSON.parse(current.geo_location).lng },0) /length
      this.setState({center: { lat: lat, lng: lng }})

      }
      this.props._sellers_list(resp.data.data.user)
      this.props._pagenate_count(resp.data.data.user_count)
      setTimeout(() => {
      
        this.setState({loading:true})
      }, 500);


    })
  };
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
  modal=()=>{
        $('#exampleModalCenter').show()
  }
  _onChildClick = (key, childProps) => {
    $( "#target_1" ).scroll();
    console.log(222);
    // this.props.onCenterChange([childProps.lat, childProps.lng]);
  }
  goToSeller = (val) => {
    Router.push('/marketpalce/MarketplaceCategories/'+ val._id)

  }
  render() {
    return (
      <>
      
        <div
          class="modal "
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
          style={{width:'1200px','max-width':'1200px'}}
            class="modal-dialog modal-dialog-centered bookingmodal modal-lg"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">
                  Powered by <img src="images/footerlogo.svg" alt="" />
                </h5>
                <button
                  type="button"
                  class="close remort_close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-9" >
                  <div style={{ height: '80vh', width: '100%' }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: 'AIzaSyDgw4m-jKG2UueegLrTdLfJfO4phMxS6wo' }}
                      center={this.state.center}
                      zoom={this.state.zoom}
                      // hoverDistance={K_SIZE / 2}
                      // onBoundsChange={this._onBoundsChange}
                      onChildClick={this._onChildClick}
                      // onChildMouseEnter={this._onChildMouseEnter}
                      // onChildMouseLeave={this._onChildMouseLeave}
                    >
                      {
                        
                        this.props.sellers_list.length!=0 && this.props.sellers_list.length!=undefined?
                          this.props.sellers_list.map((val,index)=>(
                            <div lat={JSON.parse(val.geo_location).lat} lng={JSON.parse(val.geo_location).lng} >
                              <a href={'#target_'+index} >
                                <FontAwesomeIcon
                                  style={{
                                    color: config.primaryColor,
                                    fontSize:'25px',
                                    cursor: "pointer",
                                    margin:'0px 5px'
                                  }}
                                  icon={faMapMarkerAlt}
                                />
                              </a>
                            </div>
                          ))
                        :null
                      }
                    </GoogleMapReact>
                  </div>
                  </div>
                  <div style={{'max-height':'80vh','overflow': 'scroll'}} class="col-3 py-3" >
                    {

                  this.props.sellers_list.length!=0 && this.props.sellers_list.length!=undefined?
                      this.props.sellers_list.map((val,index)=>(
                          console.log(val),
                          <div type="button" onClick={()=>this.goToSeller(val)} data-dismiss="modal" aria-label="Close" >
                            <Link href={{ pathname: '/marketpalce/MarketplaceCategories/'+ val._id} } >
                              <div id={"target_"+index} class="row mb-5">
                                <div class="col-md-12 seller_list_map">
                                  <a href="#.">
                                    <div class="ctgsldimg">
                                    <img src={config.image_url + val.banner_image} alt="" />
                                      <p>
                                        5.0 <span>240 Reviews</span>
                                      </p>
                                      <p class="recomnned">
                                        <i class="fas fa-thumbs-up"></i> stylicle recommended
                                      </p>
                                    </div>
                                  </a>
                                </div>
                                <div class="col-md-12">
                                  <a href="#.">
                                    <div class="thouchedbox">
                                      <h1>{val.business}</h1>
                                      <p>{val.address}</p>
                                    </div>
                                    {
                                      val.assignservices.map((val,index)=>(
                                        console.log("val"),
                                        console.log(val),
                                          val.services!=undefined?
                                          <Services  onPress={()=> {$('.bookingmodal_2').show(),$('.bookingmodal_1').hide()}} onBook={()=>this.setState({service_val:val._id,service_price:val.price,service_duration:val.duration,service_title:val.services.title,morning:'',afternon:'',evening:''})} title={val.services.title}  disc={''} duration={val.duration} modal_close={'no'} price={val.price} />
                                          :null
                                      ))
                                    }
                                  </a>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))
                      :null
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
                        pageCount={this.props.pagenate_count/4}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        onPageChange={(e)=>this.hendalgetAllsellers(e.selected)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Header />
        <div class="maincontent trandingwrepp whbmain" id="inspired_wrepp">
          <div class="container">
            <div class="guides_heading mb-4">
            <h1>Recommended ({this.state.loading==true?this.props.pagenate_count:0})</h1>
            </div>
          </div>
          <div class="catg_slider mb-5">
            <div class="container">
            {
              this.state.services.length!=0?(
                <OwlCarousel
                className="owl-theme "
                items={4}
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
                        {/* <div class="text-box p-3">
                          <p class="whb"><b>{val.text}</b></p>
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


    
              </OwlCarousel>
              ):null
            }

            </div>
          </div>

          <div class="purerow">
            
            <div class="container d-flex justify-content-end" >
              <button
                  onClick={()=>this.modal()}
                        // class="btn btn-info"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                onClick={this.handleLogin}
                class="bg-gradient-to-br from-pink-500 p-3 rounded-full  text-white text-xl to-red-400 "
              >
                Map View
                <FontAwesomeIcon
                  style={{
                    // color: config.primaryColor,
                    fontSize:'15px',
                    cursor: "pointer",
                    margin:'0px 5px'
                  }}
                  icon={faMapMarkerAlt}
                />
              </button>
            </div>
            <div class="container">
            {
                this.state.loading==true?
                  this.props.sellers_list.length!=0 && this.props.sellers_list.length!=undefined?
                    this.props.sellers_list.map((val,index)=>(
                      console.log(val),
                      <Link  href={{ pathname: '/marketpalce/MarketplaceCategories/'+ val._id} } >
                        <div class="row mb-5">
                          <div class="col-md-4">
                            <a href="#.">
                              <div class="ctgsldimg">
                                {
                                  val.banner_image!=undefined?
                                <img src={config.image_url + val.banner_image} alt="" />
                                :null
                                }
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
                                <h1 class='m-0' >{val.business}</h1>
                                <p class='m-0' >{val.address}</p>
                              </div>
                              {
                                val.assignservices.map((val,index)=>(

                                  console.log("val"),
                                  console.log(val),
                                  // {
                                    val.services!=undefined?
                                    <Services  onPress={()=> {$('.bookingmodal_2').show(),$('.bookingmodal_1').hide()}} onBook={()=>this.setState({service_val:val._id,service_price:val.price,service_duration:val.duration,service_title:val.services.title,morning:'',afternon:'',evening:''})} title={val.services.title} disc={val.disc} duration={val.duration} modal_close={'no'} price={val.price} />
                                    :null
                                  // }
                                ))
                              }
                            </a>
                          </div>
                        </div>
                      </Link>
                    ))
                  :<>
                 
                  <h2>No result found</h2>
                  <Link href={'/'} >
                    <a>back to Home</a>
                  </Link>
                </>
              :<>
              <ContentLoader style={{ marginTop: '30px' }} height={80} speed={1} >
                    <rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
                    <rect x="90" y="17" rx="4" ry="4" width="80" height="13" />
                    <rect x="90" y="40" rx="3" ry="3" width="250" height="10" />
                    <rect x="90" y="60" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
              <ContentLoader style={{ marginTop: '30px' }} height={80} speed={1} >
                    <rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
                    <rect x="90" y="17" rx="4" ry="4" width="80" height="13" />
                    <rect x="90" y="40" rx="3" ry="3" width="250" height="10" />
                    <rect x="90" y="60" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
              <ContentLoader style={{ marginTop: '30px' }} height={80} speed={1} >
                    <rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
                    <rect x="90" y="17" rx="4" ry="4" width="80" height="13" />
                    <rect x="90" y="40" rx="3" ry="3" width="250" height="10" />
                    <rect x="90" y="60" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
              <h2>No result found</h2>
              <Link href={'/'} >
                <a>back to Home</a>
              </Link>
              </>

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
                    pageCount={this.props.pagenate_count/4}
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
    service_filter: state.service_filter,

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
