import React from "react";
import { connect } from "react-redux";

import Layout from "../../../components/Dashboard/Layout";
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
    // alert(index)
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
              Account Setting
            </h1>

            <Tabs   selectedIndex={this.state.index}  onSelect={(index) => this.tabhendal(index)}>
              <TabList>
                <ul class="mt-5 -mr-3 flex-nowrap lg:overflow-hidden overflow-x-scroll uk-tab">
                 <Tab disabled={false} >
                    <li id={'tab_0'} class=" uk-active tab_0 Profile_Settings_tab">
                      <a href="#">General</a>
                    </li>
                  </Tab>
                  {
                    this.props.user_data.role_id=='1'?(
                      <>
                      <Tab  disabled={false} >
                        <li id={'tab_1'} class="Profile_Settings_tab   ">
                          <a href="#">Working Hours</a>
                        </li>
                      </Tab>
                      <Tab>
                        <li id={'tab_2'} class=" Profile_Settings_tab  ">
                          <a href="#">Assign Services</a>
                        </li>
                      </Tab>
                      <Tab>
                        <li id={'tab_3'} class=" Profile_Settings_tab  ">
                          <a href="#">Services Time Slots</a>
                        </li>
                      </Tab>

                      </>
                    ):null
                  }
                  {
                    console.log(this.props.user_data.role_id),
                    this.props.user_data.role_id=='2'?(
                      <>
                      <Tab>
                        <li id={'tab_1'} class=" Profile_Settings_tab  ">
                          <a href="#">Categories</a>
                        </li>
                      </Tab>
                      <Tab>
                        <li id={'tab_2'} class=" Profile_Settings_tab  ">
                          <a href="#">Sub Categories</a>
                        </li>
                      </Tab>
                      <Tab>
                        <li id={'tab_3'} class=" Profile_Settings_tab  ">
                          <a href="#">Services</a>
                        </li>
                      </Tab>
                      </>
                    ):null
                  }
                 
                 
                 
                </ul>
              </TabList>
              
              <TabPanel>
                <Profile />
              </TabPanel>
              {
                this.props.user_data.role_id=='1'?(
                  <>
                  <TabPanel>
                    <Workinghours/>
                  </TabPanel>
                  <TabPanel>
                    <AssignServices/>
                  </TabPanel>
                  <TabPanel>
                    <ServicesTimeSlots/>
                  </TabPanel>
                  </>
                ):null
              }
              {
                this.props.user_data.role_id=='2'?(
                  <>
                  <TabPanel>
                    <Categories/>
                  </TabPanel>
                  <TabPanel>
                    <SubCategories/>
                  </TabPanel>
                  <TabPanel>
                    <Services/>
                  </TabPanel>
                  </>
                ):null
              }
              
              
              
            </Tabs>
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