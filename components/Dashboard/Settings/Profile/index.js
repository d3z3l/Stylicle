import React from "react";
import Link from "next/link";
import config from "../../../../config";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import MediaHelper from "../../../../Helpers/MediaHelper";
import AuthHelper from "../../../../Helpers/AuthHelper";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AnyReactComponent = ({ text }) => (
  <FontAwesomeIcon
    style={{ "font-size": "30", color: config.primaryColor }}
    icon={faMapMarker}
  />
);

class Profile extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  constructor(props) {
    super(props);
    this.state = {
      image: this.props.user_image,
      f_name: this.props.user_fname,
      l_name: this.props.user_lname,
      phone: this.props.user_phone,
      new_image: "off",
    };
  }
  componentDidMount=()=>{
    this.setState({
      image: this.props.user_image,
      f_name: this.props.user_fname,
      l_name: this.props.user_lname,
      phone: this.props.user_phone,
      status: this.props.user_data.role_id,
    })
  }
  
  componentWillMount() {
   
  }
  // getUserHendal = async () => {
  //   await AuthHelper.Get().then((resp) => {
  //     this.setState({
  //       f_name: resp.data.data.user.name.split(" ").slice(0, -1).join(" "),
  //       l_name: resp.data.data.user.name.split(" ").slice(-1).join(" "),
  //       phone: resp.data.data.user.phone,
  //       image: resp.data.data.user.image,
  //       image: resp.data.data.user.image,
  //     });
  //   });
  // };

  handleUpload = async () => {
    await MediaHelper.Upload(this.state.image).then((resp) => {
      console.log(JSON.parse(resp.data).status);
      this.state.image = JSON.parse(resp.data).status;
      this.setState({ image: JSON.parse(resp.data).status });
    });
    // console.log(this.state.image);
  };
  hendalStatus = async () => {
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
  handleLogin = async () => {
    if (this.state.new_image == "on") {
      await this.handleUpload();
    }
    var data = {
      name: this.state.f_name + " " + this.state.l_name,
      phone: this.state.phone,
      image: this.state.image,
    };
    alert(this.state.image);
    AuthHelper.Update(data).then((resp) => {
      // this.props._user_fname(resp.data.data.name.split(" ").slice(0, -1).join(" "))
      // this.props._user_lname(resp.data.data.name.split(" ").slice(-1).join(" "))
      // this.props._user_phone(resp.data.data.phone)
      // this.props._user_image(resp.data.data.image)
      // this.props._user_workinghours(resp.data.data.workinghours)
      // this.props._user_data(resp.data.data.user);
      this.getUserHendal()
      console.log(resp.data);
    });
  };

  count = () => {
    // setTimeout(() => {
    this.props._count(22);
    // }, 2000);
  };

  render() {
    const loadMap = (map, maps) => {
      const cityCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: { lat: 40.756795, lng: -73.954298 },
        radius: 10000,
        draggable: true,
      });

      let marker = new maps.Marker({
        position: { lat: 40.856795, lng: -73.954298 },
        map,
        
        draggable: true,
      });
    };
    return (
      <>
        <div class="grid lg:grid-cols-3 mt-12 gap-8">
          <div>
            <h3 onClick={this.count} class="text-xl mb-2"> Basic</h3>
            <p> Lorem ipsum dolor sit amet nibh consectetuer adipiscing elit</p>
          </div>
          <div class="bg-white rounded-md lg:shadow-lg shadow col-span-2">
            <div class="grid grid-cols-2 gap-3 lg:p-6 p-4">
              <div>
                <label for=""> First name</label>
                <input
                  type="text"
                  onChange={(text) => [
                    this._user_lname(text.target.value),
                    this.setState({ f_name: text.target.value }),
                  ]}
                  value={this.props.user_fname}
                  placeholder="Your name.."
                  class="shadow-none bg-gray-100"
                />
              </div>
              <div>
                <label for=""> Last name</label>
                <input
                  type="text"
                  onChange={(text) => [
                    this.setState({ l_name: text.target.value }),
                  ]}
                  value={this.state.l_name}
                  placeholder="Your name.."
                  class="shadow-none bg-gray-100"
                />
              </div>
              <div class="col-span-2">
                <label for=""> Phone</label>
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

              <div class="col-span-2">
                <label for=""> Location</label>
                <div style={{ height: "50vh", width: "100%" }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDgw4m-jKG2UueegLrTdLfJfO4phMxS6wo" }}
                    defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
                    defaultZoom={10}
                    onDragend={(data)=>console.log(data)}
                    onClick={(data)=>console.log(data)}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
                  />
                </div>
              </div>
              <div>
                <label class="col-span-2" for="">
                  {" "}
                  Image
                </label>
                <input
                  onChange={(text) => [
                    this.setState({
                      image: text.target.files[0],
                      new_image: "on",
                    }),
                  ]}
                  type="file"
                  // value={this.state.image}
                  placeholder=""
                  class="shadow-none bg-gray-100"
                />
              </div>
            </div>

            <div class="bg-gray-10 p-6 pt-0 flex justify-end space-x-3">
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
                  <div>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,{" "}
                  </div>
                </div>
                <div class="switches-list -mt-8 is-large">
                  <div class="switch-container">
                    <label class="switch">
                      <input onClick={this.hendalStatus} type="checkbox" checked={this.state.status=='1'?true:false} />
                      <span class="switch-button"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
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
