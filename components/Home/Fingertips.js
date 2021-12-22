import React from "react";
import Image from "next/image";

export default class Header extends React.Component {
  render() {
    return (
      <section id="fingertips_wrepp">
        <div class="container">
          <div class="row">
            <div class="col-md-5">
              <div class="text-box">
                <h2>
                Scheduling Appointments <br/> Just Got Easier
                </h2>
                <div class="text-inner">
                  <h3>
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"></path>
                        <path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"></path>
                      </svg>
                    </span>
                    Look Around for Listed Services
                  </h3>
                  <p>
                  We makes it easy to find appointments with local beauty, wellness, and health professionals. Find your favorite spot or discover new businesses through Stylicle.
                   
                  </p>
                </div>
                <div class="text-inner">
                  <h3>
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"></path>
                        <path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"></path>
                      </svg>
                    </span>
                    Appointments, Online{" "}
                  </h3>
                  <p>
                  Book services instantly through the Stylicle and avoid the back-and-forth phone calls.
                  </p>
                </div>
                <div class="text-inner">
                  <h3>
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"></path>
                        <path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"></path>
                      </svg>
                    </span>
                    Payment Process
                  </h3>
                  <p>
                  Flexible payments solutions - on the go, in person or even when you show up.
                  </p>
                </div>
                
              </div>
            </div>
            <div class="col-md-7">
              <div class="image-holder">
                <Image
                  width={600}
                  height={400}
                  src="/images/video-image.png"
                  class="img-fluid"
                  alt=""
                />
                <a href="#">
                  <Image
                    width={100}
                    height={100}
                    src="/images/play-btn.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
