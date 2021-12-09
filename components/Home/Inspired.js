import React from "react";
import Image from "next/image";

export default class Header extends React.Component {
  render() {
    return (
      <section id="inspired_wrepp" class="trandingwrepp">
          <div class="container">
            <div class="guides_heading mb-5">
              <h1>
                Trending on Stylicle{" "}
                <span>
                  <a href="#.">
                    More in trending <i class="fas fa-chevron-right"></i>
                  </a>
                </span>
              </h1>
            </div>
            <div class="owl-one owl-carousel owl-theme">
              <div class="item">
                <div class="card overflow-hidden">
                  <div class="position-relative">
                    <a href="#.">
                      <Image
                        width={500}
                        height={500}
                        src="/images/fg-01.png"
                        alt=""
                      />
                    </a>
                    <div class="hoverbox"></div>
                  </div>
                  <div class="project-info">
                    <span class="gig-info">
                      <b>
                        <a href="#.">My style, my rules</a>
                      </b>
                      <a href="#.">by AA Salon</a>
                    </span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="card overflow-hidden">
                  <div class="position-relative">
                    <a href="#.">
                      <Image
                        width={500}
                        height={500}
                        src="/images/fg-02.png"
                        alt=""
                      />
                    </a>
                    <div class="hoverbox"></div>
                  </div>
                  <div class="project-info">
                    <span class="gig-info">
                      <b>
                        <a href="#.">Impressive work</a>
                      </b>
                      <a href="#.">by Janat Ali</a>
                    </span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="card overflow-hidden">
                  <div class="position-relative">
                    <a href="#.">
                      <Image
                        width={500}
                        height={500}
                        src="/images/fg-03.png"
                        alt=""
                      />
                    </a>
                    <div class="hoverbox"></div>
                  </div>
                  <div class="project-info">
                    <span class="gig-info">
                      <b>
                        <a href="#.">Hair trim</a>
                      </b>
                      <a href="#.">by Eley</a>
                    </span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="card overflow-hidden">
                  <div class="position-relative">
                    <a href="#.">
                      <Image
                        width={500}
                        height={500}
                        src="/images/fg-04.png"
                        alt=""
                      />
                    </a>
                    <div class="hoverbox"></div>
                  </div>
                  <div class="project-info">
                    <span class="gig-info">
                      <b>
                        <a href="#.">A busy day</a>
                      </b>
                      <a href="#.">by HA Salon & Spa</a>
                    </span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="card overflow-hidden">
                  <div class="position-relative">
                    <a href="#.">
                      <Image
                        width={500}
                        height={500}
                        src="/images/fg-05.png"
                        alt=""
                      />
                    </a>
                    <div class="hoverbox"></div>
                  </div>
                  <div class="project-info">
                    <span class="gig-info">
                      <b>
                        <a href="#.">Lovely colour</a>
                      </b>
                      <a href="#.">by Matt </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="guidesbox2">
              <div class="guidesheading">
                <h1>Sed ut ex elit. Fusce vestibulum.</h1>
                <a href="#." class="btn btn-outline-light">
                  Become a partner
                </a>
              </div>
            </div>
          </div>
        </section>
    );
  }
}
