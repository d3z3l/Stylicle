import React from "react";
import Link from "next/link";
import config from "../../../../config";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import MediaHelper from "../../../../Helpers/MediaHelper";
import AuthHelper from "../../../../Helpers/AuthHelper";
import Map from "./map";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
// import Autocomplete from "react-google-autocomplete";


class Profile extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      f_name: this.props.user_fname,
      l_name: this.props.user_lname,
      phone: this.props.user_phone,
      p_phone: '',
      image: this.props.user_image,
      banner_image: '',
      business: '',
      address: '',
      p_address: '',
      disc: '',
      gender: '',
      personal_title: '',
      job_title: '',
      consultation_price: '',
      new_image: "off",
      new_banner_image: "off",
      lat: 1,
      lng: 1,
      location: 1,

    };
  }
  componentDidMount=()=>{
         
    setTimeout(() => {
      this.setState({
        image: this.props.user_image,
        f_name: this.props.user_fname,
        l_name: this.props.user_lname,
        banner_image: this.props.user_data.banner_image,
        business: this.props.user_data.business,
        address: this.props.user_data.address,
        p_address: this.props.user_data.p_address,
        phone: this.props.user_phone,
        p_phone: this.props.user_data.p_phone,
        status: this.props.user_data.role_id,
        gender: this.props.user_data.gender,
        personal_title: this.props.user_data.personal_title,
        disc: this.props.user_data.disc,
        job_title: this.props.user_data.job_title,
        consultation_price: this.props.user_data.consultation_price,
        lat:JSON.parse(this.props.user_data.geo_location).lat,
        lng:JSON.parse(this.props.user_data.geo_location).lng,
        
      })
    }, 2000);
    
  }
  

  handleUpload = async () => {
    await MediaHelper.Upload(this.state.image).then((resp) => {
      console.log(JSON.parse(resp.data).status);
      this.state.image = JSON.parse(resp.data).status;
      this.setState({ image: JSON.parse(resp.data).status });
    });
    // console.log(this.state.image);
  };
  handlebanner_Upload = async () => {
    await MediaHelper.Upload(this.state.banner_image).then((resp) => {
      console.log(JSON.parse(resp.data).status);
      this.state.banner_image = JSON.parse(resp.data).status;
      this.setState({ banner_image: JSON.parse(resp.data).status });
    });
    // console.log(this.state.image);
  };
  hendalStatus = async () => {
    
    console.log(this.props.user_data.package[0]!=undefined);
    if (this.props.user_data.package[0]==undefined) {
      Router.push('/packages')
    } else {
        let data={}
        if (this.state.status=='0') {
          this.setState({status:'1'})
          data={role_id:'1'}
        } else {
            this.setState({status:'0'})
            data={role_id:'0'}
        }
        AuthHelper.Update(data).then((resp)=>{
    
          console.log(resp);
        })
        this.getUserHendal()
    }

  };
  getUserHendal= async ()=>{
    await AuthHelper.Get().then((resp)=>{
     this.props._user_fname(resp.data.data.user.name)
     this.props._user_lname(resp.data.data.user.name)
     this.props._user_phone(resp.data.data.user.phone)
     this.props._user_image(resp.data.data.user.image)
     this.props._user_workinghours(resp.data.data.user.workinghours)
     this.props._user_data(resp.data.data.user);
     });    
   }
  handleLogin = async () => {
    
    if (this.state.new_image == "on") {
      await this.handleUpload();
    }
    if (this.state.new_banner_image == "on") {
      await this.handlebanner_Upload();
    }
    
    var data = {
      name: this.state.f_name ,
      phone: this.state.phone,
      p_phone: this.state.p_phone,
      image: this.state.image,
      banner_image: this.state.banner_image,
      address: this.state.address,
      business: this.state.business,
      p_address: this.state.p_address,
      gender: this.state.gender,
      personal_title: this.state.personal_title,
      disc: this.state.disc,
      job_title: this.state.job_title,
      consultation_price: this.state.consultation_price,
      lat: this.state.lat,
      lng: this.state.lng,
      geo_location:'{"lat":'+this.state.lat+',"lng":'+this.state.lng+'}',
    };
    AuthHelper.Update(data).then((resp) => {
      
      this.getUserHendal()
      console.log(resp.data);
    });
  };
  
  setLatlong=(lat,lng)=>{
    this.setState({lat,lng})
    // alert(lat)
  }
  render() {
    
    return (
      <>
        <div class=" grid lg:grid-cols-3 mt-12 gap-8">
          <div>
            <h3 class="text-xl mb-2">Personal Information</h3>
            <p> Add/Update your Stylicle Account picture, name & other info</p>
          </div>
          <div class=" bg-white rounded-md lg:shadow-lg shadow col-span-2">



          


            <div class=" grid grid-cols-2 gap-3 lg:p-6 p-4">
              
            <div class="outhform_profile lg:flex-row flex-col lg:space-x-2 col-span-2" >
            <label>Gender</label>
              <select  onChange={(text) => [
                  this.setState({ gender: text.target.value }),
                ]} class="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800">
                  <option selected={''==''} value='' disabled >Select Any Gender</option>
                  <option selected={this.state.gender=='Male'} value="Male">Male</option>
                  <option selected={this.state.gender=='Female'} value="Female">Female</option>
              </select>
              <label>Title</label>
              <select  onChange={(text) => [
                  this.setState({ personal_title: text.target.value }),
                ]} class="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800">
                  <option selected={''==''} value='' disabled >Select Any Title</option>
                  <option selected={this.state.personal_title=='Mr'} value="Mr">Mr</option>
                  <option selected={this.state.personal_title=='Mrs'} value="Mrs">Mrs</option>
                  <option selected={this.state.personal_title=='Miss'} value="Miss">Miss</option>
                  <option selected={this.state.personal_title=='Ms'} value="Ms">Ms</option>
              </select>
          </div>
              <div>
                <label for="">Name</label>
                <input
                  type="text"
                  onChange={(text) => [
                    // this.props._user_lname(text.target.value),
                    this.setState({ f_name: text.target.value }),
                  ]}
                  value={this.state.f_name}
                  placeholder="Your name.."
                  class="shadow-none bg-gray-100"
                />
              </div>
              {
                this.state.status!='0'?
              
                <div>
                  <label for=""> Business name</label>
                  <input
                    type="text"
                    onChange={(text) => [
                      this.setState({ business: text.target.value }),
                    ]}
                    value={this.state.business}
                    placeholder="Business name.."
                    class="shadow-none bg-gray-100"
                  />
                </div>
                :null
              }
              <div>
                <label for="">Working Address</label>
                <input
                  type="text"
                  onChange={(text) => [
                    this.setState({ address: text.target.value }),
                  ]}
                  value={this.state.address}
                  placeholder="Address.."
                  class="shadow-none bg-gray-100"
                  value={this.state.address}
                />
              </div>
              <div>
                <label for="">Home Address</label>
                <input
                  type="text"
                  onChange={(text) => [
                    this.setState({ p_address: text.target.value }),
                  ]}
                  value={this.state.p_address}
                  placeholder="Address.."
                  class="shadow-none bg-gray-100"
                />
              </div>
              <div >
                <label for="">Business Phone</label>
                <input
                  type="text"
                  onChange={(text) => [
                    this.setState({ phone: text.target.value }),
                  ]}
                  value={this.state.phone}
                  placeholder="Your name.."
                  class="shadow-none bg-gray-100"
                />
              </div>
              <div >
                <label for="">Personal Phone</label>
                <input
                  type="text"
                  onChange={(text) => [
                    this.setState({ p_phone: text.target.value }),
                  ]}
                  value={this.state.p_phone}
                  placeholder="Your name.."
                  class="shadow-none bg-gray-100"
                />
              </div>
              <div >
                <label for="">Job Title</label>
                <input
                  type="text"
                  onChange={(text) => [
                    this.setState({ job_title: text.target.value }),
                  ]}
                  value={this.state.job_title}
                  placeholder="Your Title.."
                  class="shadow-none bg-gray-100"
                />
              </div>
              <div >
                <label for="">Consultation Price</label>
                <input
                  type="number"
                  onChange={(text) => [
                    this.setState({ consultation_price: text.target.value }),
                  ]}
                  value={this.state.consultation_price}
                  placeholder="Your price.."
                  class="shadow-none bg-gray-100"
                />
              </div>
              

              {
                this.state.status!='0'?
              <>
              {/* <div class="col-span-2">
              <label for="">Discription</label>
                <Autocomplete
                  apiKey={'AIzaSyDgw4m-jKG2UueegLrTdLfJfO4phMxS6wo'}
                  placeholder="Search Your City"
                  class="input_box shadow-none bg-gray-100"
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      alert(33)
                    }
                  }}
                  onPlaceSelected={(place) => {
                    console.log(place);
                  }}
                 
                />
              </div> */}
              <div class="col-span-2">
                <label for="">Discription</label>
                  <textarea 
                  onChange={(text) => [
                    this.setState({ disc: text.target.value }),
                  ]}
                  value={this.state.disc}
                  >
                
                  </textarea>
                </div>
                <div class="col-span-2">
                  <label for=""> Location</label>
                  <div style={{ height: "30vh", width: "100%" }}>
                    {
                      this.props.user_data!=222?
                      <Map ondrag={this.setLatlong.bind(this)} data={this.props.user_data} />
                      :null
                    }
                   
                    
                  </div>
                </div>
                </>
                :null
              }
              <div class="col-span-2" >
                <label class="col-span-2 " for="">
                  Profile image
                </label>
                <input
                type="file"
                // value={this.state.image}
                placeholder=""
                    class="shadow-none bg-gray-100 "
                  onChange={(text) => [
                    this.setState({
                      image: text.target.files[0],
                      new_image: "on",
                    }),
                  ]}
                  
                  />
              </div>
              <p>Recommend image size:500px x 500px</p>
              <div class="col-span-2" >
                <label class="col-span-2 " for="">
                  Banner image
                </label>
                <input
                type="file"
                // value={this.state.image}
                placeholder=""
                    class="shadow-none bg-gray-100 "
                  onChange={(text) => [
                    this.setState({
                      banner_image: text.target.files[0],
                      new_banner_image: "on",
                    }),
                  ]}
                  
                  />
              </div>
              <p>Recommend image size:1000px x 700px</p>
              
                </div>

            <div class="bg-gray-10 p-6 pt-0 flex justify-end space-x-3">
            <div class="switch-container">
              {/* <label class="switch">
                <input
                onClick={()=>{this.hendalStatus()}} 
                  checked={ this.state.status!='0'}
                  type="checkbox" class="off_1"
                />
                <span class="switch-button"></span>
              </label> */}
            </div>
              <button class="p-2 px-4 rounded bg-gray-50 text-red-500">
                {" "}
                Cancel{" "}
              </button>
              <button
                onClick={this.handleLogin}
                type="button"
                class="button bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>

          <div>
              
          </div>
          <div class="bg-white rounded-md lg:shadow-lg shadow lg:p-6 p-4 col-span-2">

              <div class="space-y-3">
                  <div class="flex justify-between items-center">
                      <div>
                          <h4>Change Your Account Status</h4>
                          <div> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, </div>
                      </div>
                      <div class="switches-list -mt-8 is-large">
                          <div class="switch-container">
                              <label class="switch">
                                <input
                                  onClick={()=>{this.hendalStatus()}} 
                                  checked={ this.state.status!='0'}
                                  type="checkbox" class="off_1"
                                />
                                <span class="switch-button" ></span>
                              </label>
                          </div>
                      </div>
                  </div>
                  
              </div>

          </div>



          <div>
            
          </div>
          
        </div>
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user_data: state.user_data,
    user_fname: state.user_fname,
    user_lname: state.user_lname,
    user_image: state.user_image,
    user_phone: state.user_phone,
    count: state.count,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
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
    _count: (data) => {
      dispatch({ type: "INCREMENT", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
