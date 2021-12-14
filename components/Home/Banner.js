import React from "react";
import dynamic from "next/dynamic";
import Link from 'next/link'
import { connect } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import { faMapMarkerAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OwlCarousel = dynamic(
    () => {
        return import ("react-owl-carousel");
    }, { ssr: false }
);
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ServicesHelper from "../../Helpers/ServicesHelper";
import CountriesHelper from "../../Helpers/CountriesHelper";
import Modal from 'react-awesome-modal';
import Router from 'next/router'

class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            result: [],
            countries: [],
            selected_country: '',
            lat: 1,
            lng: 1,
            search_location: '',
            search_modal: false,
            search_location_text: '',
            search_box_dropdown: true,
            search_box_dropdown_selected_text: '',
        };
    }
    componentDidMount = () => {
        if (this.props.service_filter_item != '') {
            this.setState({ search_box_dropdown_selected_text: this.props.service_filter_item })
        }
        if (this.props.service_filter_location_name != '') {
            this.setState({ search_location_text: this.props.service_filter_location_name })
        }
        this.getLocation()
        this.hendalregions()
        this.hendalGetServices()
    }
    getLocation = async() => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // setStatus('Geolocation is not supported by your browser');
        } else {
            // setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyDgw4m-jKG2UueegLrTdLfJfO4phMxS6wo")
                    .then((res) => res.json())
                    .then((resjson) => {

                        console.clear();
                        let lastElement = resjson.results.pop().address_components[0].short_name;
                        this.setState({ selected_country: lastElement })
                            // console.log(lastElement)
                    })
                    .catch((error) => { console.log(error) })
            }, () => {
                toast.error("Turn Location Services and GPS on", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // setStatus('Unable to retrieve your location');
            });
        }
    }
    getLatlng = (id, text) => {
        if (id == undefined) {
            toast.error("No location selected", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false
        }
        CountriesHelper.GetlatlngByid(id).then((resp) => {
                // console.log('ssssssssssssss');
                // console.log(resp.data.data.data);
                // console.clear();
                this.setState({ search_location: resp.data.data.data, search_location_text: text })
                this.props._service_filter_location_name(text)
                this.props._search_location(resp.data.data.data)
                    // console.log(resjson.resp.data.data.data);
            }).catch((error) => { console.log(error); })
            //  fetch("https://maps.googleapis.com/maps/api/place/details/json?placeid="+id+"&key=AIzaSyDgw4m-jKG2UueegLrTdLfJfO4phMxS6wo")
            //   .then((res) => res.json())
            //     .then( (resjson) => {
            //         console.clear();
            //         this.setState({search_location:resjson.result.geometry.location,search_location_text:text})
            //         this.props._service_filter_location_name(text)
            //         this.props._search_location(resjson.result.geometry.location)
            //         console.log(resjson.result.geometry.location);
            //         // let lastElement = 
            //         // this.setState({selected_country:lastElement})
            //       // console.log(lastElement)
            //     })
            //   .catch((error)=>{console.log(error)})
    }
    search = (val) => {

        if (val.length > 2) {
            ServicesHelper.Get_search(val).then((resp) => {
                this.setState({ result: resp.data.data.services })
            })
        } else if (val.length == 0) {
            this.setState({ result: [] })
        }
        // alert(val.length)
    }
    hendalGetServices = () => {
        let services = []
        ServicesHelper.Popular_Services().then((resp) => {

            for (let i = 0; i < resp.data.data.services.length; i++) {
                const element = resp.data.data.services[i];
                services.push( <
                    Link href = "/marketpalce/MarketplaceCategories" >
                    <
                    li onClick = {
                        () => { this.props._service_filter(element._id) } } >
                    <
                    a href = "" > { element.title } < /a> <
                    /li> <
                    /Link>
                )
            }
            this.setState({ services })
        });
    };
    hendalregions = () => {
        let services = []
        CountriesHelper.Get_regions().then((resp) => {
            this.setState({ countries: resp.data.data.countries })
            console.log(resp);
            // this.setState({services})
        });
        // CountriesHelper.Get_geo().then((resp) => {
        //   this.setState({countries:resp.data.data.countries})
        //   console.log(resp);
        // // this.setState({services})
        // });
    };
    hendalSearchService = () => {

        Router.push('/marketpalce/MarketplaceCategories')
    };
    render() {
        return ( <
            >
            <
            ToastContainer position = "top-right"
            autoClose = { 5000 }
            hideProgressBar = { false }
            newestOnTop = { false }
            closeOnClick rtl = { false }
            pauseOnFocusLoss draggable pauseOnHover /
            >
            <
            Modal visible = { this.state.search_modal }
            width = "700"
            height = "auto"
            effect = "fadeInUp"
            // onClickAway={() => this.closeModal()}
            >
            <
            div >
            <
            div class = "banner_content banner_content_popup" >
            <
            div class = "popup_box" >

            <
            div style = {
                { width: "100%", position: 'relative' } } >
            <
            span class = "search-bar-icon"
            style = {
                { width: "16px", height: "16px", left: '16px' } } >
            <
            FontAwesomeIcon onClick = {
                () => this.setState({ search_modal: false }) }
            style = {
                {
                    color: '#00000',
                    fontSize: '20px',
                    cursor: "pointer",
                    margin: '0px 5px'
                }
            }
            icon = { faArrowLeft }
            /> <
            /span> <
            Autocomplete apiKey = { 'AIzaSyDgw4m-jKG2UueegLrTdLfJfO4phMxS6wo' }
            placeholder = "Where ?"
            class = "form-control"
            onKeyPress = {
                event => {
                    if (event.key === 'Enter') {
                        // alert(33)
                        // this.handleLogin()
                    }
                }
            }
            onPlaceSelected = {
                (place) => {
                    this.getLatlng(place.place_id, place.formatted_address);
                    console.log(place);
                }
            }
            options = {
                {
                    types: ["(regions)"],
                    componentRestrictions: { country: this.state.selected_country },
                }
            }
            /> <
            /div>

            <
            div style = {
                { width: "100%", position: 'relative' } } >
            <
            span class = "search-bar-icon"
            style = {
                { width: "16px", height: "16px", left: '16px' } } >
            <
            FontAwesomeIcon style = {
                {
                    color: '#95979d',
                    fontSize: '16px',
                    cursor: "pointer",
                    margin: '0px 5px'
                }
            }
            icon = { faMapMarkerAlt }
            /> <
            /span> <
            select class = "form-control"
            onChange = {
                (text) => [this.setState({ selected_country: text.target.value })] } >
            {
                this.state.countries.map((val) => ( <
                    option selected = { val.code == this.state.selected_country }
                    value = { val.code } > { val.name } < /option>
                ))
            } <
            /select> <
            /div>


            <
            div class = "d-flex justify-content-center py-3" >
            <
            button onClick = {
                () => this.setState({ search_modal: false }) }
            style = {
                { padding: ' 13px 74px' } }
            class = "btn-default" > Select < /button> <
            /div>

            <
            /div>


            <
            /div>


            <
            /div> <
            /Modal> <
            section id = "banner_wrepp" >
            <
            div id = "carouselExampleSlidesOnly"
            class = "carousel slide slide-fade"
            data - ride = "carousel" >
            <
            OwlCarousel className = "owl-theme "
            items = { 1 }
            loop = { true }
            autoplay = { true }
            dots = { false }
            margin = { 10 } >
            <
            div class = "item" >
            <
            div class = "carousel-item active"
            style = {
                {
                    background: "url(/images/main-banner-01.png) no-repeat",
                }
            } >
            <
            div class = "text-inner" > < /div> <
            /div> <
            /div> <
            div class = "item" >
            <
            div class = "carousel-item active"
            style = {
                {
                    background: "url(/images/main-banner-02.png) no-repeat",
                }
            } >
            <
            div class = "text-inner" > < /div> <
            /div> <
            /div> <
            /OwlCarousel>

            <
            /div> <
            div class = "banner_content" >
            <
            h1 >
            Explore and hire < i > beauty & wellness < /i> professionals in your
            neighbourhood. <
            /h1> <
            form class = "" >

            <
            div style = {
                { width: "100%", position: 'relative' } } >
            <
            span class = "search-bar-icon"
            style = {
                { width: "16px", height: "16px", left: '16px' } } >
            <
            svg width = "16"
            height = "16"
            viewBox = "0 0 16 16"
            xmlns = "http://www.w3.org/2000/svg" >
            <
            path d = "M15.8906 14.6531L12.0969 10.8594C12.025 10.7875 11.9313 10.75 11.8313 10.75H11.4187C12.4031 9.60938 13 8.125 13 6.5C13 2.90937 10.0906 0 6.5 0C2.90937 0 0 2.90937 0 6.5C0 10.0906 2.90937 13 6.5 13C8.125 13 9.60938 12.4031 10.75 11.4187V11.8313C10.75 11.9313 10.7906 12.025 10.8594 12.0969L14.6531 15.8906C14.8 16.0375 15.0375 16.0375 15.1844 15.8906L15.8906 15.1844C16.0375 15.0375 16.0375 14.8 15.8906 14.6531ZM6.5 11.5C3.7375 11.5 1.5 9.2625 1.5 6.5C1.5 3.7375 3.7375 1.5 6.5 1.5C9.2625 1.5 11.5 3.7375 11.5 6.5C11.5 9.2625 9.2625 11.5 6.5 11.5Z" > < /path> <
            /svg> <
            /span> <
            input type = "search"
            class = "form-control"
            placeholder = "Search Your Servicesss"
            value = { this.state.search_box_dropdown_selected_text }
            onChange = {
                (e) => { this.search(e.target.value), this.setState({ search_box_dropdown: true, search_box_dropdown_selected_text: e.target.value }), e.target.value == '' ? (this.props._service_filter_item(''), this.props._service_filter('')) : null } }
            /> <
            /div> <
            div onClick = {
                () => this.setState({ search_modal: true }) }
            style = {
                { width: "100%", position: 'relative' } } >
            <
            span class = "search-bar-icon"
            style = {
                { width: "16px", height: "16px", left: '16px' } } >
            <
            FontAwesomeIcon style = {
                {
                    color: '#95979d',
                    fontSize: '16px',
                    cursor: "pointer",
                    margin: '0px 5px'
                }
            }
            icon = { faMapMarkerAlt }
            /> <
            /span> <
            input value = { this.state.search_location_text }
            apiKey = { 'AIzaSyDgw4m-jKG2UueegLrTdLfJfO4phMxS6wo' }
            placeholder = "Search Your Location"
            class = "form-control"
            disabled = { true }
            style = {
                { cursor: 'pointer' } }
            onClick = {
                () => this.setState({ search_modal: true }) }
            /> <
            /div> <
            button type = "button"
            onClick = {
                () => this.hendalSearchService() }
            class = "btn-default" > Search < /button> <
            /form> <
            div class = "bg-white search-r" > {
                this.state.search_box_dropdown ?
                this.state.result.map((val, index) => (
                    // <Link  href="/marketpalce/MarketplaceCategories" >
                    <
                    li onClick = {
                        () => { this.props._service_filter(val._id), this.props._service_filter_item(val.title), this.setState({ search_box_dropdown: false, search_box_dropdown_selected_text: val.title }) } } > { val.title } < /li>
                    // </Link>
                )) :
                    null
            } <
            /div> <
            div class = "tag" >
            <
            span > Popular: < /span> <
            ul > {
                this.state.services
            } {
                /* <li>
                                  <a href="#">Hair Salon</a>
                                </li>
                                <li>
                                  <a href="#">Tattoo</a>
                                </li>
                                <li>
                                  <a href="#">Piercing</a>
                                </li>
                                <li>
                                  <a href="#">Tanning</a>
                                </li>
                                <li>
                                  <a href="#">Med spa</a>
                                </li> */
            } <
            /ul> <
            /div> <
            /div> <
            /section>

            <
            />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        category_filter: state.category_filter,
        service_filter_item: state.service_filter_item,
        service_filter_location_name: state.service_filter_location_name,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        _service_filter: (data) => {
            dispatch({ type: "service_filter", payload: data });
        },
        _search_location: (data) => {
            dispatch({ type: "search_location", payload: data });
        },
        _service_filter_location_name: (data) => {
            dispatch({ type: "service_filter_location_name", payload: data });
        },
        _service_filter_item: (data) => {
            dispatch({ type: "service_filter_item", payload: data });
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Banner);