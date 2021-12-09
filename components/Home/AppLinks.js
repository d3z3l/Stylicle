import React from "react";
import Image from "next/image";

export default class Header extends React.Component {
  render() {
    return (
      <section id="solution_wrepp">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <h1>Donec vel enim tortor. Fusce sagittis mollis massa.</h1>
                <p>
                  <strong>
                    Id pellentesque augue tempus non. Phasellus dictum dui arcu.
                  </strong>
                </p>
                <ul>
                  <li>
                    <i class="far fa-check-circle"></i> At bibendum nunc
                    sagittis eu. Nullam iaculis quis elit sed laoreet.
                  </li>
                  <li>
                    <i class="far fa-check-circle"></i> Proin eget sollicitudin
                    ipsum. Ut quis interdum dolor.
                  </li>
                  <li>
                    <i class="far fa-check-circle"></i> Aliquam eget sem
                    lobortis metus euismod laoreet.
                  </li>
                  <li>
                    <i class="far fa-check-circle"></i> Suspendisse potenti. In
                    nec orci justo. Vestibulum laoreet laoreet libero at
                    tristique.{" "}
                  </li>
                  <li>
                    <i class="far fa-check-circle"></i> Vivamus at porta tortor,
                    sed dapibus lectus. Nullam tempus turpis lacus, vel tempus
                    metus placerat at.
                  </li>
                </ul>
                <div class="apbtn">
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
              <div class="col-md-6 text-center">
                <Image
                  width={500}
                  height={500}
                  style={{ width: "80%" }}
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
