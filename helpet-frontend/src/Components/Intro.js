import React from "react"
import petsCover from "../images/pets-cover.png"

export default function Intro() {
    return (
        <section className="intro">
            <img
                className="intro--photo"
                src={petsCover}
                alt=""
            />
            <h1 className="intro--header ">Adopt pets from us</h1>
            <p className="intro--text">These lovely pets need a home!</p>
        </section>
    )
}
