const $primaryColor = '#bc1f30';
const $secondaryColor = '#c2185b';
const $lightColor = '#000';
const $warningColor = '#d32f2f';
const $successColor = '#00c853';
const $layout = 'light';
const $borderRadius = 10;

export default {
    // URL:"https://api.stylicle.com/api/api/v1/",
    // image_url:"https://api.stylicle.com/api/img/users/",
    //URL: "https://stylicle-api.vercel.app/api/v1/",
    //image_url: "http://127.0.0.1:8080/img/users/",
    URL: "http://ec2-3-14-67-56.us-east-2.compute.amazonaws.com/api/api/v1/",
    image_url: "http://ec2-3-14-67-56.us-east-2.compute.amazonaws.com/img/users/",
    Tokken: "u4cvgaruuz8ijhzblutrg56dvl1rv0mh",
    Guest_auth_id: "u4cvgaruuz8ijhzblutrg56dvl1rv0mh",
    currency_symbols: '£',
    currency_code: 'GBP',
    Source: 'FTW Android App',
    Image_path: 'https://www.fairtradewarehouse.com/pub/media/catalog/product',
    appVersion: "1.1",
    headingFont: 'OpenSans-Bold',
    defaultFont: 'OpenSans-Regular',
    layoutMode: $layout,
    backgroundColor: $layout == 'dark' ? '#222222' : '#f2f2f2',
    listBackgroundColor: $layout == 'dark' ? '#111111' : '#ffffff',
    listSeparatorColor: $layout == 'dark' ? '#222222' : '#eeeeee',
    tabBarColor: $layout == 'dark' ? '#111111' : '#fffffff',
    cardColor: $layout == 'dark' ? '#131313' : '#ffffff',
    defaultFontColor: $layout == 'dark' ? '#f2f2f2' : '#4f555f',
    primaryColor: $primaryColor,
    secondaryColor: $secondaryColor,
    lightColor: $lightColor,
    warningColor: $warningColor,
    successColor: $successColor,
    defaultBorderRadius: $borderRadius,
    badgeColor: 'red',
    badgeTextColor: '#ffffff',
    productDetailLayout: 'layout2', // layout1 or layout2
};