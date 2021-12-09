import React from "react";
import Image from "next/image";

export default class Header extends React.Component {
  render() {
    return (
      <footer>
          <div class="container">
            <div class="row">
              <div class="col">
                <h1>Categories</h1>
                <ul>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                </ul>
              </div>
              <div class="col">
                <h1>About Stylicle</h1>
                <ul>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                </ul>
              </div>
              <div class="col">
                <h1>Stylicle Support</h1>
                <ul>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                </ul>
              </div>
              <div class="col">
                <h1>Stylicle Community</h1>
                <ul>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                </ul>
              </div>
              <div class="col">
                <h1>More From Stylicle</h1>
                <ul>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                  <li>
                    <a href="#.">Lorem ipsum </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="bottom_footer">
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <ul class="footerlinks">
                    <li>
                      <a href="#.">Home</a>
                    </li>
                    <li>
                      <a href="#.">About Us </a>
                    </li>
                    <li>
                      <a href="#.">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#.">Terms of Service </a>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6">
                  <div class="appbtn">
                    <a href="#.">
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
              </div>
              <hr />
              <div class="row">
                <div class="col-md-6">
                  <p>
                    <Image
                      width={50}
                      height={50}
                      style={{ width: "50px" }}
                      src="/images/footerlogo.svg"
                      alt=""
                    />{" "}
                    <span>© Stylicle. 2021</span>
                  </p>
                </div>
                <div class="col-md-6">
                  <ol>
                    <li>
                      <a href="#.">
                        <i class="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#.">
                        <i class="fab fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#.">
                        <i class="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#.">
                        <i class="fab fa-pinterest"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#.">
                        <i class="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </footer>
    );
  }
}
