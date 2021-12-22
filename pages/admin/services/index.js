import React from "react";
import { connect } from "react-redux";

import Layout from "../../../components/Dashboard/Layout_admin";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import 'react-tabs/style/react-tabs.css';
// import Profile from "../../../components/Dashboard/Settings/Profile";
import dynamic from "next/dynamic";

const Profile = dynamic(() => import('../../../components/Dashboard/Settings/Profile'), {
  ssr: false
});
const Workinghours = dynamic(() => import('../../../components/Dashboard/Settings/workinghours'), {
  ssr: false
})
const Categories = dynamic(() => import('../../../components/Dashboard/Settings/Categories'), {
  ssr: false
})
const SubCategories = dynamic(() => import('../../../components/Dashboard/Settings/SubCategories'), {
  ssr: false
})
const Services = dynamic(() => import('../../../components/Dashboard/Settings/Services'), {
  ssr: false
})
const AssignServices = dynamic(() => import('../../../components/Dashboard/Settings/AssignServices'), {
  ssr: false
})
const ServicesTimeSlots = dynamic(() => import('../../../components/Dashboard/Settings/ServicesTimeSlots'), {
  ssr: false
})
const Employees = dynamic(() => import('../../../components/Dashboard/Settings/Employees'), {
  ssr: false
})
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
          <div class="container ">
            <div class="mt-5" >
              <Services/>
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