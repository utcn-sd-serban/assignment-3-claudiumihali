import React from "react";

const SignUpModal = ( {active, onCloseSignUpModal, username, password, onChangeNewSOUserProperty, onCreateAccount} ) => (
    <div className={"modal" + (active ? " is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Sign Up</p>
                <button className="delete" aria-label="close" onClick={() => onCloseSignUpModal()}></button>
            </header>
            <section className="modal-card-body">
                <div className="field">
                    <label className="label">Username:</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Enter your preferred username" value={username}
                            onChange={e => onChangeNewSOUserProperty("username", e.target.value)} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password:</label>
                    <div className="control">
                        <input className="input" type="password" placeholder="Enter a password" value={password}
                            onChange={e => onChangeNewSOUserProperty("password", e.target.value)} />
                    </div>
                </div>
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={() => onCreateAccount()}>Create Account</button>
            </footer>
        </div>
    </div>
);

export default SignUpModal;