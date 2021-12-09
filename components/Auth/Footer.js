import React from "react";
import Head from "next/head";
import $ from "jquery";
import Link from "next/link";

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
            <ul class="footerlinks">
                    <li>
                      <Link href="/Pages/About" >
                          <a href="">About Us </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/Pages/Privacy" >
                            <a href="">Privacy Policy</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/Pages/TermsofService" >
                            <a href="">Terms of Service</a>
                      </Link>
                    </li>
                  </ul>
                <p class="capitalize"> © copyright 2021 by Stylicle</p>
            </div>
        </div>      </>
    );
  }
}
