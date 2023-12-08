import React from "react"
import card1Img from "../images/undraw_friends_r511.svg"
import card2Img from "../images/undraw_dog_c7i6.svg"

function AboutUs() {
  return (
    <div className="page-content about-page">
      <h1>About Us</h1>
      <div>
        <h2>Welcome to Helpet</h2>
      </div>
      <div>
        <div className="content-cards">
          <div className="content-card card1">
            <img className="cardImg" src={card1Img}></img>
            <h5>Adopt a pet</h5>
            <p>If your looking for adopting and not sure how to find your ideal pet, Helpet help you find your perfect match in a quick and easy way</p>
            {/* <p>Every day with every connection, Helpet help bring pet parents closer to their pets so they can live more fulfilled lives</p> */}
          </div>
          <div className="content-card card2">
            <img className="cardImg" src={card2Img}></img>
            <h5>Rehome your pet</h5>
            <p>For those owners who can no longer take care of their pets, Helpet is the perfect site to find a new home for them where they can be loved and taken care of.</p>
            {/* <p>Pets are being relinquished to shelters at an unprecedented rate. If you know anyone who is in the unfortunate circumstance of having to surrender their pet, let them know about Helpet, a free and reliable way to rehome a pet directly from private owner to private owner.</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
