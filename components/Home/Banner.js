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
       <section id="banner_wrepp">
          <div
            id="carouselExampleSlidesOnly"
            class="carousel slide slide-fade"
            data-ride="carousel"
          >
            <OwlCarousel
                className="owl-theme "
                items={1}
                loop={true}
                autoplay={true}
                dots={false}
                margin={10}
                
              >
                <div class="item">
                  <div
                    class="carousel-item active"
                    style={{
                      background: "url(/images/main-banner-01.png) no-repeat",
                    }}
                  >
                    <div class="text-inner"></div>
                  </div>
                </div>
                <div class="item">
                  <div
                    class="carousel-item active"
                    style={{
                      background: "url(/images/main-banner-02.png) no-repeat",
                    }}
                  >
                    <div class="text-inner"></div>
                  </div>
                </div>
              </OwlCarousel>

          </div>
          <div class="banner_content">
            <h1>
              Explore and hire <i>beauty & wellness</i> professionals in your
              neighbourhood
            </h1>
            <form class="">
              <span
                class="search-bar-icon"
                style={{ width: "16px", height: "16px" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.8906 14.6531L12.0969 10.8594C12.025 10.7875 11.9313 10.75 11.8313 10.75H11.4187C12.4031 9.60938 13 8.125 13 6.5C13 2.90937 10.0906 0 6.5 0C2.90937 0 0 2.90937 0 6.5C0 10.0906 2.90937 13 6.5 13C8.125 13 9.60938 12.4031 10.75 11.4187V11.8313C10.75 11.9313 10.7906 12.025 10.8594 12.0969L14.6531 15.8906C14.8 16.0375 15.0375 16.0375 15.1844 15.8906L15.8906 15.1844C16.0375 15.0375 16.0375 14.8 15.8906 14.6531ZM6.5 11.5C3.7375 11.5 1.5 9.2625 1.5 6.5C1.5 3.7375 3.7375 1.5 6.5 1.5C9.2625 1.5 11.5 3.7375 11.5 6.5C11.5 9.2625 9.2625 11.5 6.5 11.5Z"></path>
                </svg>
              </span>
              <input
                type="search"
                class="form-control"
                placeholder="Book Your Services"
                value=""
              />
              <button class="btn-default">Search</button>
            </form>
            <div class="tag">
              <span>Popular:</span>
              <ul>
                <li>
                  <a href="#">Hair Salon</a>
                </li>
                <li>
                  <a href="#">Tattoo</a>
                </li>
                <li>
                  <a href="#">Piercing</a>
                </li>
                <li>
                  <a href="#">Tanning</a>
                </li>
                <li>
                  <a href="#">Med spa</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
                
      </>
    );
  }
}
