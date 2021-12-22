import React from "react";
import Image from "next/image";

export default class Header extends React.Component {
  render() {
    return (
      <section id="solution_wrepp">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <h1 class="pt-5">Most Popular Mobile Services on Stylicle</h1>
                <ul class="m-0" >
                  <li class="text-large">
                    <i class="far fa-check-circle"></i> Many beauty and wellness professionals across the globe have reopened the doors to their businesses and are offering the very same customized services and treatments that we’ve been dreaming about for months. 
                  </li>
                  <li>
                    <i class="far fa-check-circle"></i> As an effort to make sure that people are still able to have fresh haircuts or relaxing mani-pedis, Stylicle has created a brand new feature called Mobile Services. With Mobile Services, it’s still possible to book appointments anytime, anywhere 24 hours a day, seven days a week. 
                  </li>                
                </ul>
                <p class="pt-6">
                    <strong>
                    The Mobile Apps will be coming soon...
                    </strong>
                  </p>
                <div class="appbtn apb-left">
                  <a href="#." class="mr-3">
                    <Image
                      width={500}
                      height={500}
                      src="/images/IOS-App-Store-Icon.svg"
                      alt=""
                    />
                  </a>
                  <a href="#.">
                    <Image
                      width={500}
                      height={500}
                      src="/images/Android-App-Store-Icon.svg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
              <div class="col-md-6 text-center homeappbg">
                <Image
                  width={500}
                  height={500}
                  // style={{ width: "80%" }}
                  src="/images/business-desktop-870-x2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
    );
  }
}
