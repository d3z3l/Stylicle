import React from "react";
import Header from "../../../../components/Home/Head";
import Footer from "../../../../components/Home/Footer";
import OrdersHelper from "../../../../Helpers/OrdersHelper";
import ReviewsHelper from "../../../../Helpers/ReviewsHelper";
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import cookie from 'react-cookies'
import { faEye,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from '../../../../config'
import TransactionHelper from "../../../../Helpers/TransactionHelper";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../../components/Dashboard/Layout";

import SweetAlert from 'react-bootstrap-sweetalert';

const MUIDataTable = dynamic(() => import('mui-datatables-next'), {
  ssr: false
});
import Router from 'next/router';
var moment = require("moment");
import dynamic from "next/dynamic";
class ViewOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type:'',
			seats:'',
			from:'',
			to:'',
			day:'',
			servicestimeslote_id:'',
			subCategories:[],
			servicestimeslotes:[],
			assignservices:[],
			message:"",
			assignservice_id:'',
			Order_details:'',
			show:false,
			show2:false,
			show3:false,
			review:'',
			amount:0
		};
	}
  componentDidMount = () => {
	if (Router.query.index!=undefined) {
		console.log('Router.query', Router.query.index);
		cookie.save('Order_id', Router.query.index , { path: '/' })
		this.hendalallOrders(Router.query.index)
	}else{
		console.log('Router.Cookie', cookie.load('Order_id'));
		this.hendalallOrders(cookie.load('Order_id'))
	}


  };
  hendalallOrders =async (id) => {
    let orders=[]
    let data={_id:id}
    await OrdersHelper.get_all(data).then((resp)=>{
      this.setState({Order_details:resp.data.data.orders[0]})
    })
    this.setState({servicestimeslotes:orders})
  };
  getMuiTheme = () => createMuiTheme({
    typography: {htmlFontSize: 10},
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          fontSize: 15,
        }
      },
      MUIDataTablePagination: {
        root: {
          backgroundColor: "#80808054",
        }
      },
    }
  })
  hendalupdata=(id,status)=>{
	  let data={ 
		status:status
	  }
	  OrdersHelper.update(id,data).then((resp)=>{
		  this.hendalallOrders()
		  this.setState({show:false,show2:false})
		console.log(resp.data);
	  })
  }
  hendalcancle=(id,status)=>{
	  let data={ 
		status:status
	  }
	  OrdersHelper.cancle(id,data).then((resp)=>{
		  this.hendalallOrders()
		  this.setState({show:false,show2:false})
		console.log(resp.data);
	  })
  }
  hendalCashTrans = (id,status) => {
	  
		let data2={
			amount:this.state.amount,
			date:(new Date().valueOf())/1000,
			sender:this.state.Order_details.customer,
			receiver:this.state.Order_details.seller,
			method:'Cash',
		}
      	TransactionHelper.create_admin_cash(data2).then((resp)=>{
			let data={ 
				status:status
			}
			OrdersHelper.update(id,data).then((resp)=>{
				this.hendalallOrders()
				this.setState({show:false,show2:false})
			})
			Router.push('/marketpalce/Orders')
      })
  };
  hendalStatus=(id)=>{
	 switch (id) {
		case '0':
			return 'Pending'
			break;
		  case '1':
		   return 'Completed'
			break;
		  case '2':
		   return 'Canceled'
			break;
	 
		 default:
			 break;
	 }
  }
  hendalMethod=(id)=>{
	//   alert(id)
	 switch (id) {
		case 100:
			return 'Cash on delivery'
			break;
		  case 101:
		   return 'Card'
			break;
		  case 102:
		   return 'E Wallet'
			break;
	 
		 default:
			 break;
	 }
  }
  hendalreview=()=>{
	  let data={
		review:this.state.review,
		clint_name:this.props.user_data.name,
		orders:Router.query.index,
		seller:this.state.Order_details.seller
	  }
	//   console.log(data);
	ReviewsHelper.Create(data).then((resp)=>{
		// console.log(resp)
		
		// toast("Success! ", { type: "success" });
		toast.success('Success!', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			});
		// alert(333)
	})
	// console.log(this.state.Order_details.seller)
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

	  {
		  this.state.show?
		<SweetAlert
				// style={ { display: "none", marginTop: "-100px" } }
				warning
				showCancel
				confirmBtnText="Yes, cancel it!"
				confirmBtnBsStyle="danger"
				title="Are you sure?"
				onConfirm={()=> this.hendalcancle(this.state.Order_details._id,'2')}
				onCancel={()=>this.setState({show:false})}
				focusCancelBtn
			>
            You will not be able to recover this imaginary file!
          </SweetAlert>
		  :null
	  }
	  {
		  this.state.show2?
		<SweetAlert
				// style={ { display: "none", marginTop: "-100px" } }
				success
				showCancel
				confirmBtnText="Yes, Let's go!"
				confirmBtnBsStyle="success"
				title="Are you sure?"
				onConfirm={()=> this.hendalupdata(this.state.Order_details._id,'1')}
				onCancel={()=>this.setState({show2:false})}
				focusCancelBtn
			>
            You will not be able to recover this imaginary file!
          </SweetAlert>
		  :null
	  }
	  {
		  this.state.show3?
		<SweetAlert
				// style={ { display: "none", marginTop: "-100px" } }
				success
				showCancel
				confirmBtnText="Yes, Let's go!"
				confirmBtnBsStyle="success"
				title="Are you sure?"
				onConfirm={()=> this.hendalCashTrans(this.state.Order_details._id,'1')}
				onCancel={()=>this.setState({show2:false})}
				focusCancelBtn
			>
            You will not be able to recover this imaginary file!
          </SweetAlert>
		  :null
	  }
        <Layout>
        <div class="maincontent p-0">
			
			<div class="container">
			<h1 class="text-2xl leading-none text-gray-900 tracking-tight my-5 ">
            Order Details
            </h1>
				<div class="order_wrepp">
					<h3>Order #{this.state.Order_details!=''?(this.state.Order_details._id):null } details</h3>
					<div class="row">
						
						<div class="col-md-12">
							<div class="card mt-3">
								<div class='row' >
									<div class="col-md-6">
										<div class="card-body">
											<h6>Billing <span class="float-right"><i class="fas fa-pencil-alt"></i></span></h6>
											<p>334 A street Askari 11 Lahore  Pakistan</p>
											<h6>Email address:</h6>
											<p>{this.state.Order_details!=''?(this.state.Order_details.details[0].customer.email):null }</p>
										</div>
									</div>
									<div class="col-md-6">
										<div class="card-body">											<h6>Phone:</h6>
											<p>{this.state.Order_details!=''?(this.state.Order_details.details[0].customer.phone):null }</p>
											<h6>Full Name:</h6>
											<p>{this.state.Order_details!=''?(this.state.Order_details.details[0].customer.name):null }</p>
										</div>
									</div>
								</div>

							</div>	
						</div>
						
					</div>
				</div>
				<div class="catg_listing">
					<div class="row">
						<div class="col-md-12">
							<div class="card p-3 uk-box-shadow-medium">
								<div class="table-responsive">
									<table class="table table-border table-striped">
										<tr>
											<th>
												Title
											</th>
											<th>
												Price
											</th>
											<th>
												Start
											</th>
											<th>
												End
											</th>
											<th>
												Date
											</th>
										</tr>
										{
											this.state.Order_details!=''?
											this.state.Order_details.details.map((val,index)=>(
												// console.log(val),
												<tr>
													
													<td>
														{val.assignservices.services.title}
													</td>
													<td>${val.assignservices.price}</td>
													<td>
													{moment(
														new Date(
															(val.time_slot.start_time + new Date().getTimezoneOffset() * 60) *
															1000
																)
														).format("LT")}
													</td>
													<td>
													{moment(
														new Date(
															(val.time_slot.end_time + new Date().getTimezoneOffset() * 60) *
															1000
																)
														).format("LT")}
													</td>
													<td>
													{moment(
														new Date(
															(this.state.Order_details.date + new Date().getTimezoneOffset() * 60) *
															1000
																)
														).format('MMM Do YY')}
													</td>
													
												</tr>
											))
											:null
										}
									</table>
								</div>
								<div class="row">
								<div class="col-md-6 ml-auto">
									{
										this.state.Order_details.status=='1' && this.props.user_data.role_id=='0'?
										<div class="card px-3 mt-4">
											<h3>Feedback</h3>
											<textarea
												type="textarea"
												onChange={(text) => [
												this.setState({ review: text.target.value }),
												]}
												placeholder="Your text......."
												class="bg-gray-200 mb-2 shadow-none dark:bg-gray-800"
												style={{ border: "1px solid #d3d5d8 !important" }}
											/>
											<div  onClick={(e)=> this.hendalreview()} class="mt-3 p-0 col-2 ">
												<a href="#." class="btn btn-info">Submit</a>
											</div>
										</div>
										:null
									}
									</div>
									<div class="col-md-6 ml-auto">
										<div class="card mt-4">
											<div class="card-body">
												<div class="row">
													<div class="col-sm-6 mb-2">
														<p>Items subtotal:</p>
													</div>
													<div class="col-sm-6 mb-2">
														<p><strong>${this.state.Order_details!=''?(this.state.Order_details.price):null }</strong></p>
													</div>
													<div class="col-sm-6 mb-2">
														<p>Qty</p>
													</div>
													<div class="col-sm-6 mb-2">
														<p><strong>{this.state.Order_details!=''?(this.state.Order_details.qty):null }</strong></p>
													</div>
													
													<div class="col-sm-6 mb-2">
														<p>Order total</p>
													</div>
													<div class="col-sm-6 mb-2">
														<p><strong>${this.state.Order_details!=''?(this.state.Order_details.price):null }</strong></p>
													</div>
													<hr style={{"border-bottom": "1px solid #ccc", margin: "10px 0px", width: "100%"}} / >
													<div class="col-sm-6 mb-2">
														<p><strong>Status</strong></p>
													</div>
													<div class="col-sm-6 mb-2">
														<p><strong>{this.hendalStatus(this.state.Order_details.status)}</strong></p>
													</div>
													<div class="col-sm-6 mb-2">
														<p><strong>Method</strong></p>
													</div>
													<div class="col-sm-6 mb-2">
														
														<p><strong>{this.hendalMethod(this.state.Order_details.Payment_method)}</strong></p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								{
									this.state.Order_details.status=='0'?
									<div class='row' >
												{/* <div  onClick={() => this.setState({ show: true })} class="mt-3 col-2 ">
													<a href="#." class="btn btn-info">Alert</a>
												</div> */}
										{
											this.props.user_data.role_id=='0'?(
												<div  onClick={()=>this.setState({show:true})} class="mt-3 col-2 ">
													<a href="#." class="btn btn-info">Cancel</a>
												</div>
											):null
										}
										{
											this.props.user_data.role_id=='1'?(
												<>
												
												
												{
												this.state.Order_details.Payment_method==100?(
													<>
													<input
														type="text"
														onChange={(text) => [this.setState({ amount: text.target.value })]}
														placeholder="Enter Paid amount"
														class="bg-gray-200 mb-2 m-3 shadow-none dark:bg-gray-800"
														style={{ border: "1px solid #d3d5d8 !important",'width':'200px','height': '34px' }}
													/>
													<div onClick={()=>this.setState({show3:true})}  class="mt-3 ml-3">
														<a href="#." class="btn btn-info">Completed</a>
													</div>
													</>
													):null
												}
												<div onClick={()=>this.setState({show2:true})}  class="mt-3 ml-3">
													<a href="#." class="btn btn-info">Completed</a>
												</div>
											</>
											):null
										}
										
											
									</div>
									:null
								}
								
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        </Layout>
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
export default connect(mapStateToProps)(ViewOrder);
