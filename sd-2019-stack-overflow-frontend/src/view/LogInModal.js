import React from "react";

const LogInModal = ( {active, onCloseLogInModal, username, password, onChangeLogInSOUserProperty, onLogIn} ) => (
    <div className={"modal" + (active ? " is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Log In</p>
                <button className="delete" aria-label="close" onClick={() => onCloseLogInModal()}></button>
            </header>
            <section className="modal-card-body">
                <div className="field">
                    <label className="label">Username:</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Enter your username" value={username}
                            onChange={e => onChangeLogInSOUserProperty("username", e.target.value)} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password:</label>
                    <div className="control">
                        <input className="input" type="password" placeholder="Enter your password" value={password}
                            onChange={e => onChangeLogInSOUserProperty("password", e.target.value)} />
                    </div>
                </div>
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={() => onLogIn()}>Log In</button>
            </footer>
        </div>
    </div>
);

export default LogInModal;