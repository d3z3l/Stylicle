import React from "react";
import config from "../../../../config";
import Layout from "../../../../components/Dashboard/Layout";
import Newsfeeds from "../../../../components/Dashboard/Newsfeeds/post";
import NewsfeedsHelper from "../../../../Helpers/NewsfeedsHelper";
import Upload from "../../../../components/Dashboard/Newsfeeds/upload";

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
    NewsfeedsHelper.Get_all().then((data)=>{
      let info=[]
      let array = data.data.data.newsfeeds_posts
      console.log(array);
      array.forEach((element,index) => {
        info.push(<Newsfeeds data={element}   />)
      });
      
      this.setState({posts:info})
    })
  };

  render() {
    return (
      <>
     
        <Layout>
          <div class="container m-auto">
            <Upload/>
          </div>
        </Layout>
      </>
    );
  }
}
