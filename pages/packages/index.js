import React from "react";
// import Layout from "../../components/Dashboard/Layout";
import packagesHelper from "../../Helpers/packagesHelper";
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
    Packages:[],
  };
  componentDidMount = () => {
    this.hendalGetServices()
    this.hendalgetAllsellers()
  };
  hendalgetAllsellers = (page=0) => {
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
      this.props._sellers_list(resp.data.data.user)
      this.props._pagenate_count(resp.data.data.user_count)
      console.log(this.props.pagenate_count);
    })
  };
  hendalGetServices = () => {
    let services=[]
    packagesHelper.Get_all().then((resp) => {
    console.log(resp);
    this.setState({Packages:resp.data.data.packages})
    // console.log(this.state.services.length);
    
    });
  };
  hendalStatus = async (id) => {
    
    let data={
      package:id,
      subscription:3,
      role_id:'1',
      subscription_date:new Date().getTime() / 1000
    }
      AuthHelper.Update(data).then((resp)=>{
        this.getUserHendal()
        Router.push('/dashboard/feed')
      })

  };
  getUserHendal= async ()=>{
    await AuthHelper.Get().then((resp)=>{
     this.props._user_fname(resp.data.data.user.name.split(" ").slice(0, -1).join(" "))
     this.props._user_lname(resp.data.data.user.name.split(" ").slice(-1).join(" "))
     this.props._user_phone(resp.data.data.user.phone)
     this.props._user_image(resp.data.data.user.image)
     this.props._user_workinghours(resp.data.data.user.workinghours)
     this.props._user_data(resp.data.data.user);
     });    
   }
  render() {
    return (
      <>
        <Header />
        <div class="maincontent">
			<div class="pakgwrepp">
				<div class="container">
        <h1 class="text-center my-1">Your business, your way.</h1>
        <p class="text-center lh-lg my-3">Flexible pricing options so that you can access the solutions you need,<br/> when you need them. And when you don't? Turn them off, anytime.
				</p>
					<div class="row">
            {
              this.state.Packages.map((val,index)=>(
                <div class="col-md-3 mb-4">
							<div class="card overflow-hidden rounded-0 position-relative pkgbox">
								<div class="phgheader">
									<h1>{val.title}</h1>
                  {val.features.map((val2)=>(
                    <>
                    <p>{val2.name} </p>
                    <hr/>
                    </>
                  ))}
                  {
                    val.price==0?
                    // <Link  href={{ pathname: '/dashboard/feed'+ val._id,query:{dueration:0} }}  >
                      <a  onClick={()=>this.hendalStatus(val._id)} class="btn btn-info btn-block">Free for month</a>
                    // </Link>
                    :
                    <div class="row" >
                      <div class="col-12" >
                      <Link  href={{ pathname: '/packages/Checkout/'+ val._id,query:{dueration:2} }}  >
                        <a href="#." class="btn btn-white btn-block">USD {(val.price_2-1)+0.99} per order</a>
                      </Link>
                      </div>
                      <div class="col-12" >
                        <Link  href={{ pathname: '/packages/Checkout/'+ val._id,query:{dueration:1} }}>
                          <a href="#." class="btn btn-info btn-block">USD {(val.price-1)+0.99} monthly</a>
                        </Link>
                      </div>
                    </div>
                  }
									
								</div>
								<div class="line1"></div>
								<div class="line2"></div>
								<div class="line3"></div>
								<div class="line4"></div>
								<h2>{index+1}</h2>
							</div>
						</div>
      
              ))
            }
						     	
          </div>
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
    },
    _user_data: (data) => {
      dispatch({ type: "user_data", payload: data });
    },
    _user_fname: (data) => {
      dispatch({ type: "user_fname", payload: data });
    },
    _user_lname: (data) => {
      dispatch({ type: "user_lname", payload: data });
    },
    _user_phone: (data) => {
      dispatch({ type: "user_phone", payload: data });
    },
    _user_image: (data) => {
      dispatch({ type: "user_image", payload: data });
    },
    _user_workinghours: (data) => {
      dispatch({ type: "user_workinghours", payload: data });
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps) (ViewSeller);
