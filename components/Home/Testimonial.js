import React from "react";
import Image from "next/image";
import Link from "next/link";

export default class Header extends React.Component {
  render() {
    return (
      <section id="testimonial_wrepp">
          <div class="container">
            <div class="owl-two owl-carousel owl-theme">
              <div class="item">
                <div class="row">
                  <div class="col-md-5">
                    <Image
                      width={200}
                      height={200}
                      src="/images/testimonial-img-01.png"
                      alt=""
                    />
                  </div>
                  <div class="col-md-7">
                    <div class="text-content">
                      <h5>Jhon Doe</h5>
                      <blockquote class="font-domaine">
                        <i>
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Pellentesque dignissim, nulla imperdiet iaculis
                          efficitur, purus est volutpat nulla, congue finibus
                          augue massa non nisl. In enim lorem."
                        </i>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="row">
                  <div class="col-md-5">
                    <Image
                      width={200}
                      height={200}
                      src="/images/testimonial-img-02.png"
                      alt=""
                    />
                  </div>
                  <div class="col-md-7">
                    <div class="text-content">
                      <h5>Michael James</h5>
                      <blockquote class="font-domaine">
                        <i>
                          "Sed turpis diam, feugiat sit amet leo ut, placerat
                          ornare lacus. Cras a neque semper, laoreet enim sed,
                          molestie odio. Aenean sagittis quis erat in pretium.
                          Aliquam ornare mi vel placerat rhoncus."
                        </i>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="incredible_box">
              <div class="row">
                <div class="col-md-6">
                  <h1>Do more, better </h1>
                  <p class="text-large">
                  Use Stylicle for all your booking, marketing, and payment needs.
                  </p>
                  <Link href="/auth/signup" >
                    <a class="btn btn-info" href="#.">
                      Register Now{" "}
                    </a>
                  </Link>
                </div>
                <img
                 
                  class="icridimg"
                  src="/images/img.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
    );
  }
}
