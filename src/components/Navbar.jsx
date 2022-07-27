import React from "react";

export const Navbar = (props) => {
    return (
        <div className={"navbar"}>
            <button className={(props.page === 'static') ? "btn" : "btn active"}
                    onClick={() => {
                        props.setPage('static')
                    }}
            >Static</button>
            <button className={(props.page === 'dynamic') ? "btn" : "btn active"}
                    onClick={() => {
                        props.setPage('dynamic')
                    }}
            >Dynamic</button>
        </div>
    )
}