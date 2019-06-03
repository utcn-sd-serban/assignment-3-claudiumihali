import React from "react";
import logo from "../so.png";

const NavbarNotLoggedIn = ( {onSignUpNavbar, onLogInNavbar} ) => (
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
                                <button className="button is-small" onClick={() => onSignUpNavbar()}>
                                    <span className="icon">
                                        <i className="fa fa-user-plus"></i>
                                    </span>
                                    <span>
                                        Sign Up
                                    </span>
                                </button>
                            </p>
                            <p className="control">
                                <button className="button is-small is-info is-outlined" onClick={() => onLogInNavbar()}>
                                    <span className="icon">
                                        <i className="fa fa-user"></i>
                                    </span>
                                    <span>Log In</span>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
);

export default NavbarNotLoggedIn;