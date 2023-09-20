import React from "react";

export default function Poster(props) {
    return (
        <div className="poster">
            <img className="poster--image" src={props.url} alt="poster" />
            <h2>{props.name}</h2>
            <p>{props.describe}</p>
            <p className="detail button">
                <button>More Detail</button>
            </p>
        </div>
    )
}