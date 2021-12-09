import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const OwlCarousel = dynamic(
  () => {
    return import("react-owl-carousel");
  },
  { ssr: false }
);
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default class Banner extends React.Component {
  render() {
    return (
      <section id="explore_wrepp">
        <div class="container">
          <h1>Top Categories</h1>
          <div class="row">
            <OwlCarousel
            items={5}
            // loop={true}
            // autoplay={true}
            dots={false}
            margin={10}
            >
            <div class=" item">
              <a href="#.">
                <Image
                  width={500}
                  height={500}
                  src="/images/icon-01.png"
                  alt=""
                />
                <span>Hair Salon</span>
              </a>
            </div>
            <div class=" item">
              <a href="#.">
                <Image
                  width={500}
                  height={500}
                  src="/images/icon-02.png"
                  alt=""
                />
                <span>Face Treatments</span>
              </a>
            </div>
            <div class=" item">
              <a href="#.">
                <Image
                  width={500}
                  height={500}
                  src="/images/icon-03.png"
                  alt=""
                />
                <span>Nails</span>
              </a>
            </div>
            <div class=" item">
              <a href="#.">
                <Image
                  width={500}
                  height={500}
                  src="/images/icon-04.png"
                  alt=""
                />
                <span>Braids</span>
              </a>
            </div>
            <div class=" item">
              <a href="#.">
                <Image
                  width={500}
                  height={500}
                  src="/images/icon-05.png"
                  alt=""
                />
                <span>Styling</span>
              </a>
            </div>
            <div class=" item">
              <a href="#.">
                <Image
                  width={500}
                  height={500}
                  src="/images/icon-06.png"
                  alt=""
                />
                <span>Makeup</span>
              </a>
            </div>
            </OwlCarousel>
          </div>
        </div>
      </section>
    );
  }
}
