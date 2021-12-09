import "../public/css/bootstrap.min.css";
import "../public/css/component.css";
import "../public/css/icons.css";
import "../public/css/owl.carousel.min.css";
import "../public/css/uikit.css";
import "../public/css/customstyle.css";
import "../public/css/tailwind-dark.css";
import "../public/css/innerstyle.css";


import "../public/css/messenger.css";
import "../public/css/chatOnline.css";
import "../public/css/conversation.css";
import "../public/css/message.css";
// import "../public/css/style.css";
import "../public/css/style_rebuild.css";
import "react-datetime/css/react-datetime.css";
import "next-pagination/dist/index.css";
import "../styles/globals.css";

import $ from 'jquery';
import Head from "next/head";
import { Provider } from "react-redux";
import { useStore } from "../store";
import Router from 'next/router'
import React, { useState, useEffect } from 'react';
import AuthHelper from "../Helpers/AuthHelper";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
        <Head>
          <meta charset="utf-8" />
          <meta name="description" content="" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link href="/images/Favicon.svg" rel="icon" type="image/png" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" 
           />
          <script src="/js/jquery.min.js"></script>
          <script src="/js/bootstrap.js"></script>
          <title>Stylicle</title>
        </Head>
        <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
