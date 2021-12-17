import React from "react";
import Link from "next/link";
import Router from "next/router";

import config from "../../../../config";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import MediaHelper from "../../../../Helpers/MediaHelper";
import AuthHelper from "../../../../Helpers/AuthHelper";
import TS from "../../../../Helpers/TS";
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
  componentDidMount = () => {
    this.setState({
      image: this.props.user_image,
      f_name: this.props.user_fname,
      l_name: this.props.user_lname,
      phone: this.props.user_phone,
    });
  };
  componentWillMount() {}

  handleUpload = async () => {
    await MediaHelper.Upload(this.state.image).then((resp) => {
      console.log(JSON.parse(resp.data).status);
      this.state.image = JSON.parse(resp.data).status;
      this.setState({ image: JSON.parse(resp.data).status });
    });
  };
  handleForm = async () => {
    if (this.state.new_image == "on") {
      await this.handleUpload();
    }
    var data = {
      text: this.state.phone,
      image_name: this.state.image,
    };
    console.log(TS);
    TS.Upload(data).then((resp) => {
      Router.push("/dashboard/TS");

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
            <h3 onClick={this.count} class="text-xl mb-2">
              {" "}
              Basic
            </h3>
            <p>
              Want a custom haircut please upload a reference photo for styling
            </p>
          </div>
          <div class="bg-white rounded-md lg:shadow-lg shadow col-span-2 mt-5">
            <div class="grid grid-cols-2 gap-3 lg:p-6 p-4">
              <div class="col-span-2">
                <label for="">Discription</label>
                <textarea
                  type="text"
                  onChange={(text) => [
                    this.setState({ phone: text.target.value }),
                  ]}
                  // value={this.state.phone}
                  placeholder="Discription.."
                  class="shadow-none bg-gray-100"
                />
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
                onClick={this.handleForm}
                type="button"
                class="button bg-blue-700"
              >
                Save
              </button>
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
    _count: (data) => {
      dispatch({ type: "INCREMENT", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
