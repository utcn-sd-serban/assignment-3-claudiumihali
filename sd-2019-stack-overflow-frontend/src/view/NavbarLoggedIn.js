import React from "react";
import logo from "../so.png";

const NavbarLoggedIn = ( {loggedInUsername, onLogOut} ) => (
    <nav className="navbar is-white topNav">
        <div className="container">
            <div className="navbar-brand">
                <a className="navbar-item" href="#/">
                    <img src={logo} alt="Stack Overflow Logo"/>
                    <big>&nbsp; Stack <strong>Overflow</strong></big>
                </a>
            </div>
            <div id="topNav" className="navbar-menu is-active">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-grouped">
                            <p className="control">
                                <button className="button is-small" onClick={() => onLogOut()}>
                                    <span className="icon">
                                        <i className="fa fa-minus"></i>
                                    </span>
                                    <span>
                                        Log Out
                                    </span>
                                </button>
                            </p>
                            <p className="control">
                                <button className="button is-small is-info is-outlined is-static">
                                    <span className="icon">
                                        <i className="fa fa-user"></i>
                                    </span>
                                    <span>{loggedInUsername}</span>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
);

export default NavbarLoggedIn;