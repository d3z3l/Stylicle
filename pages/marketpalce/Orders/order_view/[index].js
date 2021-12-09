import React from "react";
import Header from "../../../../components/Home/Head";
import Footer from "../../../../components/Home/Footer";
import OrdersHelper from "../../../../Helpers/OrdersHelper";
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { faEye,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from '../../../../config'

import SweetAlert from 'react-bootstrap-sweetalert';

const MUIDataTable = dynamic(() => import('mui-datatables-next'), {
  ssr: false
});
import Router from 'next/router';
var moment = require("moment");
import dynamic from "next/dynamic";
class ViewOrder extends React.Component {
  state = {
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
	show:false
  };
  componentDidMount = () => {
	console.log('Router.query', Router.query.index);
    this.hendalallOrders()
  };
  hendalallOrders =async (id) => {
    let orders=[]
    // alert(this.state.servicestimeslote_id)
    let data={_id:Router.query.index}
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
	//   alert(22)
	  let data={
		status:status
	  }
	  OrdersHelper.update(id,data).then((resp)=>{
		  this.hendalallOrders()
		console.log(resp.data);
	  })
  }
  hendalStatus=(id)=>{
	 switch (id) {
		 case '0':
			 return 'Panding'
			 break;
		 case '1':
			return 'Completed'
			 break;
		 case '2':
			return 'Cancled'
			 break;
	 
		 default:
			 break;
	 }
  }
  render() {
    return (
      <>
	  {
		  this.state.show?
		<SweetAlert
				// style={ { display: "none", marginTop: "-100px" } }
				warning
				showCancel
				confirmBtnText="Yes, delete it!"
				confirmBtnBsStyle="danger"
				title="Are you sure?"
				onConfirm={()=> this.hendalupdata(this.state.Order_details._id,'2')}
				onCancel={()=>this.setState({show:false})}
				focusCancelBtn
			>
            You will not be able to recover this imaginary file!
          </SweetAlert>
		  :null
	  }
        <Header />
        <div class="maincontent">
			
			<div class="container">
				<div class="order_wrepp">
					<h3>Order #{this.state.Order_details!=''?(this.state.Order_details._id):null } details</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida et nisi eget sollicitudin.</p>
					<div class="row">
						
						<div class="col-md-12">
							<div class="card mt-3 h-100">
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
										<div class="card mt-4">
											<div class="card-body">
												<div class="row">
													<div class="col-sm-6 mb-2">
														<p>Items subtotla:</p>
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
														<p><strong>December 17, 2020 vis cash on delivery</strong></p>
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
													<a href="#." class="btn btn-info">Cancled</a>
												</div>
											):null
										}
										{
											this.props.user_data.role_id=='1'?(
												<div onClick={()=> this.hendalupdata(this.state.Order_details._id,'1')} class="mt-3 ml-3">
													<a href="#." class="btn btn-info">Completed</a>
												</div>
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
		</div>Î
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
export default connect(mapStateToProps)(ViewOrder);
