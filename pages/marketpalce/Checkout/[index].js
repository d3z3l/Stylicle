import React from "react";
// import Layout from "../../../../components/Dashboard/Layout";
import methodsHelper from "../../../Helpers/methodsHelper";
import config from "../../../config";
import Header from "../../../components/Home/Head";
import Footer from "../../../components/Home/Footer";
import ReservationsHelper from "../../../Helpers/ReservationsHelper";
import OrdersHelper from "../../../Helpers/OrdersHelper";
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
    seller_id:'',
	// customer_val:'60e82ca25b798c0b8c41a849',
	customer_val:this.props.user_data._id,
  };
  componentDidMount = () => {
	if (Router.query.index!=undefined) {
		cookie.save('Seller', Router.query.index , { path: '/' })
		this.hendalReservationsGet(Router.query.index);
		this.setState({seller_id:Router.query.index})
	}else{
		this.setState({seller_id:cookie.load('Seller')})
		this.hendalReservationsGet(cookie.load('Seller'));
	}
    this.hendalGetServices()
  };

  hendalReservationsGet = (id) => {
	let data={
	 seller:id
	 }
   ReservationsHelper.get(data).then((resp)=>{
	 this.setState({reservations:resp.data.data.orders})
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
  hendal_total = (e) => {
    return e.reduce(function(sum, current){ return sum + current.time_slot.assignservices.price },0)
  };
  hendalOrders = () => {
	//   console.log(this.state.reservations[0].time_slot.start_time);
	//   console.log(this.state.reservations[0].date);
	//   alert(this.state.reservations[0].time_slot.start_time+this.state.reservations[0].date)
	//   return false
    var price=0
    let details=[]
    for (let i = 0; i < this.state.reservations.length; i++) {
      const element = this.state.reservations[i];
      price+=element.time_slot.assignservices.price
      details.push(element._id)
      console.log(element._id);
    }
    console.log(details);
	// reservations[0].time_slot.start_time+reservations.date
    let data={
      seller:this.state.seller_id,
      price:price,
      qty:this.state.reservations.length,
      Payment_method:this.state.selected_method,
      date:this.state.reservations[0].time_slot.start_time+this.state.reservations[0].date,
      customer:this.state.customer_val,
      details:details
    }
    OrdersHelper.create(data).then((resp)=>{
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
			amount:price,
			date:(new Date().valueOf())/1000,
			sender:this.state.customer_val,
			receiver:this.state.seller_id,
			method:method,
			order_id:resp.data.data.orders._id,
		}
      TransactionHelper.create(data2).then((resp)=>{
        this.setState({reservations:[]})
		Router.push('/marketpalce/Orders')
      })
    })
	
  };
handleToken=()=> {
	CheckoutHelper.create(this.hendal_total(this.state.reservations)).then((resp)=>{
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
						  <h3 class="d-flex justify-content-between align-items-center mb-3">
							<span>Your Cart</span>
							<span class="badge badge-secondary badge-pill">{this.state.reservations.length}</span>
						  </h3>
						  <ul class="list-group mb-3 uk-box-shadow-medium">
							{
								this.state.reservations.map((val,index)=>(
									console.log(val.time_slot.assignservices.services),
									<li class="list-group-item d-flex justify-content-between lh-condensed">
										<div>
											<h6 class="my-0">{val.time_slot.assignservices.services.title}</h6>
											<p>
												{moment(
												new Date(
													(val.time_slot.start_time +
													new Date().getTimezoneOffset() * 60) *
													1000
												)
												).format("LT") + "  -  "}
												{/* - */}

												{moment(
												new Date(
													(val.time_slot.end_time + new Date().getTimezoneOffset() * 60) *
													1000
												)
												).format("LT")}
											</p>
										</div>
										<span class="text-muted">${val.time_slot.assignservices.price}</span>
									</li>

								))
							}
							
							<li class="list-group-item d-flex justify-content-between cpt-amt">
							  <span>Total (USD)</span>
							  <strong>${this.hendal_total(this.state.reservations)}</strong>
							</li>
						  </ul>
						</div>
						<div class="col-md-8 order-md-1">
						  <h3 class="mb-3">Order Details</h3>
						  <div class="card uk-box-shadow-medium p-3">
						   <h4 class="mb-1">Seller Details</h4>
							{/* <form class="needs-validation" novalidate> */}
							<hr class="mb-4"/>

							<h4 class="mb-1">Select Payment Method</h4>
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
									<div className="container text-center">
										<div className="product">
											{/* <h1>{product.name}</h1> */}
											<h4>Total Order Amount · ${this.hendal_total(this.state.reservations)}</h4>
										</div>
										<StripeCheckout
											stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
											token={this.handleToken}
											amount={this.hendal_total(this.state.reservations) * 100}
											email={'aunrizvi16@gmail.com'}
											name="Tesla Roadster"
										/>
									</div>
								:null
							}
							<hr class="mb-4"/>
							<button onClick={this.hendalOrders} class="btn btn-info btn-block" type="submit">Confirm Order</button>
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
