import React from "react";
import Head from "next/head";
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
        <Head>
          <meta charset="utf-8" />
          <meta name="description" content="" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link href="/images/Favicon.svg" rel="icon" type="image/png" />

          <title>Stylicle</title>
        </Head>
        <div class="bg-white py-4 shadow dark:bg-gray-800">
            <div class="max-w-6xl mx-auto">


                <div class="flex items-center lg:justify-between justify-around">

                    <a href="index.html">
                        <img src="/images/Stylicle-Icon.svg" alt="" class="w-16"/>
                    </a>

                    <div class="capitalize flex font-semibold hidden lg:block my-2 space-x-3 text-center text-sm">
                    <Link href="/auth/login">
                        <a href="form-login.html" class="py-3 px-4">Login</a>
                    </Link>
                    <Link href="/auth/signup">
                      <a href="form-register.html" class="bg-pink-500 pink-500 px-6 py-3 rounded-md shadow text-white">Register</a>
                    </Link>
                        
                    </div>

                </div>
            </div>
        </div>      
      </>
    );
  }
}
