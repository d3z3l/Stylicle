import React from "react";
// import Layout from "../../../../components/Dashboard/Layout";
import methodsHelper from "../../../Helpers/methodsHelper";
import config from "../../../config";
import Header from "../../../components/Home/Head";
import Footer from "../../../components/Home/Footer";
import packagesHelper from "../../../Helpers/packagesHelper";
import AuthHelper from "../../../Helpers/AuthHelper";
import TransactionHelper from "../../../Helpers/TransactionHelper";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import Router from "next/router";
import cookie from 'react-cookies'
import StripeCheckout from "react-stripe-checkout";
import { toast,ToastContainer } from "react-toastify";
import CheckoutHelper from "../../../Helpers/CheckoutHelper";
import "react-toastify/dist/ReactToastify.css";
var moment = require("moment");

class ViewSeller extends React.Component {
  state = {
    Sellers: [],
    Methods:[],
    selected_method:'',
    reservations:[],
    Package_id:'',
	dueration:'',
	// customer_val:'60e82ca25b798c0b8c41a849',
	customer_val:this.props.user_data._id,
	payable:0
  };
  componentDidMount = () => {
	if (Router.query.index!=undefined) {
		cookie.save('Package', Router.query.index , { path: '/' })
		cookie.save('dueration', Router.query.dueration , { path: '/' })
		this.hendalReservationsGet(Router.query.index);
		this.setState({Package_id:Router.query.index,dueration:Router.query.dueration})
	}else{
		this.setState({Package_id:cookie.load('Package'),dueration:cookie.load('dueration')})
		this.hendalReservationsGet(cookie.load('Package'));
		// this.hendalReservationsGet(cookie.load('dueration'));
	}
	
    this.hendalGetServices()
  };

  hendalReservationsGet = (id) => {
	//   alert(id)
	let data={
	 _id:id
	 }
	packagesHelper.Get(data).then((resp)=>{
		console.log(resp);
		this.state.dueration==0?this.setState({payable:resp.data.data.packages.price_2}):this.setState({payable:resp.data.data.packages.price_2})
		this.setState({reservations:resp.data.data.packages})
	})
 };
  hendalGetServices = () => {
    let services=[]
    methodsHelper.Get_all().then((resp) => {
    console.log(resp);
    this.setState({Methods:resp.data.data.packages})
    // console.log(this.state.services.length);
    });
  };
  
  hendalOrders = () => {
    // var price=0 dfgfgfd
	let data={
		package:this.state.Package_id,
		subscription:this.state.dueration,
		role_id:'1',
		status:'1',
		subscription_date:new Date().getTime() / 1000
	}
    AuthHelper.Update(data).then((resp)=>{
		var method=''
		if (this.state.selected_method==102) {
			method='wallet'
		} else if (this.state.selected_method==101) {
			method='Card'
		} else if (this.state.selected_method==100){
			method='Cash'
			return false
		}
		let data2={
			amount:this.state.payable,
			date:(new Date().valueOf())/1000,
			sender:this.state.customer_val,
			// receiver:this.state.Package_id,
			method:method,
		}
		TransactionHelper.create_admin(data2).then((resp)=>{
			this.setState({reservations:[]})
			Router.push('/dashboard/feed/')
		})
    })
  };
handleToken=()=> {
	CheckoutHelper.create(this.state.payable).then((resp)=>{
		console.log(resp.status)
		if (resp.status) {
			this.hendalOrders()
			toast("Success! Check email for details", { type: "success" });
		} else {
			toast("Something went wrong", { type: "error" });
		}
	})
}

  render() {
    return (
      <>
	  <ToastContainer
		position="top-right"
		autoClose={5000}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
		/>
        <Header />
    		<div class="maincontent">	
			<div class="container">
				<div class="checkoutmain">
					<div class="row">
						<div class="col-md-4 order-md-2 mb-4">
						  <h4 class="d-flex justify-content-between align-items-center mb-3">
							<span class="text-muted">Your cart</span>
							<span class="badge badge-secondary badge-pill">{this.state.reservations.length}</span>
						  </h4>
						  <ul class="list-group mb-3 uk-box-shadow-medium">
								
									<li class="list-group-item d-flex justify-content-between lh-condensed">
										<div>
											<h3 class="my-0">{this.state.reservations.title}</h3>
										</div>
										{/* <span class="text-muted">${this.state.reservations.price}</span> */}
									</li>
									<ul>
									{
										this.state.reservations.features!=undefined?
											this.state.reservations.features.map((val,index)=>(
												<li class="list-group-item d-flex justify-content-between lh-condensed py-1">
													<div>
														<h6 class="my-0">{val.name}</h6>
													</div>
												</li>
											))
										:null
									}
									</ul>

								
							
							<li class="list-group-item d-flex justify-content-between">
							  <span>Total (USD)</span>
							  {
								  this.state.dueration==2?
								  <strong>${this.state.reservations.price_2}</strong>
								  :
								  <strong>${this.state.reservations.price}</strong>
							  }
							</li>
						  </ul>
						</div>
						<div class="col-md-8 order-md-1">
						  <h4 class="mb-3">Billing address</h4>
						  <div class="card uk-box-shadow-medium p-3">
							{/* <form class="needs-validation" novalidate> */}
							<hr class="mb-4"/>

							<h4 class="mb-3">Payment</h4>
							<div class="d-block my-3">
							{
								this.state.Methods.map((val,index)=>(
									<div class="d-flex">
									<input   name="paymentMethod" onChange={()=>this.setState({selected_method:val.code})} type="radio" class="custom-control-" checked={this.state.selected_method==val.code} />
									<label class="custom-control" for="credit">{val.title}</label>
									</div>
								))
							}
							</div>
							{
								this.state.selected_method==101?
									<div className="container">
										<div className="product">
											{/* <h1>{product.name}</h1> */}
											<h3>Pay via card · ${this.state.payable}</h3>
										</div>
										<StripeCheckout
											stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
											token={this.handleToken}
											amount={this.state.payable * 100}
											email={'aunrizvi16@gmail.com'}
											name="Tesla Roadster"
										/>
									</div>
								:null
							}
							<hr class="mb-4"/>
							<button onClick={this.hendalOrders} class="btn btn-info btn-block" type="submit">Continue to checkout</button>
						  {/* </form> */}
						  </div>
						</div>
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
  };
}
export default connect(mapStateToProps)(ViewSeller);
