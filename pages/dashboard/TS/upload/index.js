import React from "react";
import config from "../../../../config";
import Layout from "../../../../components/Dashboard/Layout";
import Newsfeeds from "../../../../components/Dashboard/Newsfeeds/post";
import TS from "../../../../Helpers/TS";
// import TS from "../../../Helpers/TS";

import Upload from "../../../../components/Dashboard/TS/upload";

import { faEye,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from 'jquery'
const jwt = require('jsonwebtoken');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts:''
     
    };
  }
  componentDidMount = (prevProps) => {
    // TS.Get_all().then((data)=>{
    //   let info=[]
    //   let array = data.data.data.tsModel_
    //   console.log(array);
    //   array.forEach((element,index) => {
    //     info.push(<Newsfeeds data={element}   />)
    //   });
      
    //   this.setState({posts:info})
    // })
  };

  render() {
    return (
      <>
     
        <Layout>
          <div class="container m-auto">
            <Upload ts={true} />
          </div>
        </Layout>
      </>
    );
  }
}
