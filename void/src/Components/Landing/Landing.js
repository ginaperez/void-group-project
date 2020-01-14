import React from "react";
import "./Landing.scss";

export default class Landing extends React.Component {
  componentDidMount() {
    this.props.changeTitle("Login");
    this.props.setSidebar(false);
  }

  render() {
    return (
      <div className="home-main">
        <div className="picture-element">
          <div className="headers-container-bg-transparent">
            <div className="headers-container">
              <h1>Void</h1>
              <h2>Changing the way you work as a group.</h2>
            </div>
          </div>
        </div>
        <div className="dark-color-block">
          The group productivity app that allows you to collaborate with your team in a single dashboard. 
        </div>
        <div className="icon-block">
          <div className="dashboard-icon-container">
            <img
              className="dashboard-icon"
              src="https://image.flaticon.com/icons/svg/348/348186.svg"
              alt="Dashboard"
            />
            <div className="dashboard-icon-text">
              View All of Your Group's Tasks in Your Dashboard
            </div>
          </div>
          <div className="chat-icon-container">
            <img
              className="chat-icon"
              src="https://image.flaticon.com/icons/svg/2025/2025049.svg"
              alt="Live Chat"
            />
            <div className="chat-icon-text">
              Chat Live with Everyone In Your Group
            </div>
          </div>
        </div>
        <div className="about-us">
          <h1 className="about-us-title">Meet The Team</h1>
          <div className="team-members">
            <div className="team-child-1">
              <div className="social-icons">
                <a
                  href="https://github.com/ginaperez"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="github-icon"
                    src="https://image.flaticon.com/icons/png/512/25/25231.png"
                    alt="Github Icon"
                  ></img>
                </a>
                <a
                  href="https://www.linkedin.com/in/gina-perez-81234772/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="linkedin-icon"
                    src="https://icon-library.net/images/linkedin-black-icon/linkedin-black-icon-15.jpg"
                    alt="LinkedIn Icon"
                  ></img>
                </a>
              </div>
              <div className="name-1">Gina Perez</div>
              <img
                className="image-1"
                src="https://media.licdn.com/dms/image/C4E03AQH0WWaKW9gMhQ/profile-displayphoto-shrink_200_200/0?e=1582156800&v=beta&t=oP3Eyz0rXa1DkIx-5_Ox_PjbA8iPttPWsmazqWK52qE"
                alt="Gina Perez"
              ></img>
            </div>
            <div className="team-child-2">
              <div className="social-icons">
                <a
                  href="https://github.com/jorovernier"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="github-icon"
                    src="https://image.flaticon.com/icons/png/512/25/25231.png"
                    alt="Github Icon"
                  ></img>
                </a>
                <a
                  href="https://www.linkedin.com/in/joely-vernier/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="linkedin-icon"
                    src="https://icon-library.net/images/linkedin-black-icon/linkedin-black-icon-15.jpg"
                    alt="LinkedIn Icon"
                  ></img>
                </a>
              </div>
              <div className="name-2">Joely Vernier</div>
              <img
                className="image-2"
                src="https://media.licdn.com/dms/image/C5603AQFnjXu66Xpeqw/profile-displayphoto-shrink_800_800/0?e=1582156800&v=beta&t=zZVYNVZlFtKQ25EP6y938bp9UGZhr79Tw4c-q5IPWE4"
                alt="Joely Vernier"
              ></img>
            </div>
            <div className="team-child-3">
              <div className="social-icons">
                <a
                  href="https://github.com/thoover1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="github-icon"
                    src="https://image.flaticon.com/icons/png/512/25/25231.png"
                    alt="Github Icon"
                  ></img>
                </a>
                <a
                  href="https://www.linkedin.com/in/thomas-hoover-781540195/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="linkedin-icon"
                    src="https://icon-library.net/images/linkedin-black-icon/linkedin-black-icon-15.jpg"
                    alt="LinkedIn Icon"
                  ></img>
                </a>
              </div>
              <div className="name-3">Thomas Hoover</div>
              <img
                className="image-3"
                src="https://media.licdn.com/dms/image/C5603AQHw6ySUVOcgTA/profile-displayphoto-shrink_800_800/0?e=1582156800&v=beta&t=Yj8QI-W6nTTdnUxj4G9qaIUhQNFpV0X9-0Mpjww17iY"
                alt="Thomas Hoover"
              ></img>
            </div>
            <div className="team-child-4">
              <div className="social-icons">
                <a
                  href="https://github.com/isaachansen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="github-icon"
                    src="https://image.flaticon.com/icons/png/512/25/25231.png"
                    alt="Github Icon"
                  ></img>
                </a>
                <a
                  href="https://www.linkedin.com/in/isaac-hansen-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="linkedin-icon"
                    src="https://icon-library.net/images/linkedin-black-icon/linkedin-black-icon-15.jpg"
                    alt="LinkedIn Icon"
                  ></img>
                </a>
              </div>
              <div className="name-4">Isaac Hansen</div>
              <img
                className="image-4"
                src="https://media.licdn.com/dms/image/C5603AQGACH3GQ9lhKw/profile-displayphoto-shrink_800_800/0?e=1582156800&v=beta&t=vo_WDoEAPj9IIOPwb6iz8jcNtglfK4x7YS1z-n7nAdc"
                alt="Isaac Hansen"
              ></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
