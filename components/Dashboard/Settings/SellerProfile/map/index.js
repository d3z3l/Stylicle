import React from "react";
import Link from "next/link";
import config from "../../../../../config";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import MediaHelper from "../../../../../Helpers/MediaHelper";
import AuthHelper from "../../../../../Helpers/AuthHelper";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";

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
      f_name: this.props.user_fname,
      l_name: this.props.user_lname,
      phone: this.props.user_phone,
      p_phone: '',
      image: this.props.user_image,
      banner_image: '',
      business: '',
      address: '',
      p_address: '',
      gender: '',
      personal_title: '',
      new_image: "off",
      new_banner_image: "off",
      // lat: JSON.parse(this.props.user_data.geo_location).lat,
      // lng: JSON.parse(this.props.user_data.geo_location).lng,
      lat: 20,
      lng: 20,

    };
  }
  componentDidMount=()=>{
      console.log(this.props.data);
      console.log(33333434);
  }
  
  
  

  
   loadMap = (map, maps) => {
    let cityCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: {lat: JSON.parse(this.props.data.geo_location).lat, lng: JSON.parse(this.props.data.geo_location).lng},
      radius: 8,
      draggable: true,
    });

    let marker = new maps.Marker({
      position: {lat: JSON.parse(this.props.data.geo_location).lat, lng: JSON.parse(this.props.data.geo_location).lng},
      map,
      draggable: true,
    });
  };
  render() {
    
    return (
      // console.log(JSON.parse(this.props.data.geo_location).lat)
      <>
      {console.log(JSON.parse(this.props.data.geo_location))}
      {console.log(88888)}
          <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDgw4m-jKG2UueegLrTdLfJfO4phMxS6wo" }}
          center={{lat: JSON.parse(this.props.data.geo_location).lat, lng: JSON.parse(this.props.data.geo_location).lng}}
          zoom={20}
          onDragend={(data)=> {
            console.log(data.lat);
            this.setState({lat:data.lat,lng:data.lng}) 
          }}
          onClick={(data)=> {
            console.log(data.lat);
            this.props.ondrag(data.lat,data.lng)
            this.setState({lat:data.lat,lng:data.lng}) 
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.loadMap(map, maps)}
        />
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
