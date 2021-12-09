import React from "react";
import dynamic from "next/dynamic";
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
      <>
        <section id="inspired_wrepp" class="services_wrepp">
          <div class="container">
            <div class="guides_heading mb-4">
              <h1>Popular Services</h1>
            </div>
            <OwlCarousel
                className="owl-theme "
                items={5}
                loop={true}
                dots={false}
                margin={10}
              >
                <div class="item">
                <div class="card overflow-hidden">
                  <div class="position-relative">
                    <a href="#.">
                      <img src="/images/services-beard.png" alt="" />
                    </a>
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                    <div class="line4"></div>
                  </div>
                  <div class="text-box">
                    <h4>Services Beard</h4>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="card overflow-hidden">
                  <div class="position-relative">
                    <a href="#.">
                      <img src="/images/services-hair-cutting.png" alt="" />
                    </a>
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                    <div class="line4"></div>
                  </div>
                  <div class="text-box">
                    <h4>Hair Cutting</h4>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="card overflow-hidden">
                  <div class="position-relative">
                    <a href="#.">
                      <img
                        src="/images/services-hair-straightening.png"
                        alt=""
                      />
                    </a>
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                    <div class="line4"></div>
                  </div>
                  <div class="text-box">
                    <h4>Hair Straightening</h4>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="card overflow-hidden">
                  <div class="position-relative">
                    <a href="#.">
                      <img src="/images/services-hair-styling.png" alt="" />
                    </a>
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                    <div class="line4"></div>
                  </div>
                  <div class="text-box">
                    <h4>Hair Styling</h4>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="card overflow-hidden">
                  <div class="position-relative">
                    <a href="#.">
                      <img src="/images/services-massage.png" alt="" />
                    </a>
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                    <div class="line4"></div>
                  </div>
                  <div class="text-box">
                    <h4>Massage</h4>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="card overflow-hidden">
                  <div class="position-relative">
                    <a href="#.">
                      <img src="/images/services-nails.png" alt="" />
                    </a>
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                    <div class="line4"></div>
                  </div>
                  <div class="text-box">
                    <h4>Nails</h4>
                  </div>
                </div>
              </div>
  
              </OwlCarousel>

          </div>
        </section>
      </>
    );
  }
}
