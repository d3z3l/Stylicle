import React from "react";
import { connect } from "react-redux";
import Image from "next/image";
import Layout from "../../components/Dashboard/Layout_admin";


class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: false,
      index:0
    };
  }
  componentDidMount = () => {
  };


  tabhendal = async (index) => {
    this.setState({index})
    await $(".Profile_Settings_tab").removeClass("uk-active");
    $("#tab_" + index).addClass("uk-active");
  };

  render() {
    return (
      <>
        <Layout>
          <div class="container m-auto">
            <h1 class="text-2xl leading-none text-gray-900 tracking-tight mt-5">
              Dashboard
            </h1>
            <Image
              width={'1200px'}
              height={800}
              src="/images/dashboard.png"
              alt=""
            />
                    
                  
                  
           
          </div>
        </Layout>
      </>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    user_data: state.user_data,
    user_fname: state.user_fname,
    user_workinghours: state.user_workinghours,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    _user_data: (data) => {
      dispatch({ type: "user_data", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);