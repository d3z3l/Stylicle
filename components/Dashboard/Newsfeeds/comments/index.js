import React from "react";
import Link from "next/link";
import config from "../../../../config";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }
  componentDidMount = () => {
    console.log('this.props.data');
    console.log(this.props.data);
  };
  render() {
    return (
      <>
        <div class="flex">
          <div class="w-10 h-10 rounded-full relative  flex-shrink-0">
            <img
              src={config.image_url + this.props.data.user.image}
              alt=""
              class="absolute h-full rounded-full w-full"
            />
           
          </div>
          
          <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 h-full relative lg:ml-5 ml-2 lg:mr-20  dark:bg-gray-800 dark:text-gray-100">
            <p class="leading-6">
              {this.props.data.text}
            </p>
            
            <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
            
          </div>
          
        </div>
        <h5 class="leading-6 ml-5">
          {this.props.data.user.name}
        </h5>
        
      </>
    );
  }
}
