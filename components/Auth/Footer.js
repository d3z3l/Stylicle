import React from "react";
import Head from "next/head";
import $ from "jquery";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        toggle: false,
    };
}
  


  render() {
    return (
      <>
        <div class="lg:mb-5 py-3 uk-link-reset">
            <div class="flex flex-col items-center justify-between lg:flex-row max-w-6xl mx-auto lg:space-y-0 space-y-3">
                <div class="flex space-x-2 text-gray-700 uppercase">
                    <a href="#"> About</a>
                    <a href="#"> Help</a>
                    <a href="#"> Terms</a>
                    <a href="#"> Privacy</a>
                </div>
                <p class="capitalize"> © copyright 2021 by Stylicle</p>
            </div>
        </div>      </>
    );
  }
}
