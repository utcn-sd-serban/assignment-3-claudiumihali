import React, {Component} from "react";
import sOUserModel from "../model/sOUserModel";
import navbarPresenter from "../presenter/navbarPresenter";
import NavbarNotLoggedIn from "./NavbarNotLoggedIn";
import NavbarLoggedIn from "./NavbarLoggedIn";
import SignUpModal from "./SignUpModal";
import LogInModal from "./LogInModal";

const mapModelStateToComponentState = (sOUserModelState) => (
    {
        loggedInUsername: sOUserModelState.loggedInUsername,
        signUpModalActive: sOUserModelState.signUpModalActive,
        newSOUserUsername: sOUserModelState.newSOUser.username,
        newSOUserPassword: sOUserModelState.newSOUser.password,
        logInModalActive: sOUserModelState.logInModalActive,
        logInSOUserUsername: sOUserModelState.logInSOUser.username,
        logInSOUserPassword: sOUserModelState.logInSOUser.password
    }
);

export default class SmartNavbar extends Component {
    constructor() {
        super();
        this.state = mapModelStateToComponentState(sOUserModel.state);
        this.listener = () => this.setState(mapModelStateToComponentState(sOUserModel.state));
        sOUserModel.addListener("SOUserModelChange", this.listener);
    }

    componentWillUnmount() {
        sOUserModel.removeListener("SOUserModelChange", this.listener);
    }

    render() {
        return (
            <div>
                {
                    this.state.loggedInUsername === null
                        ?
                        <NavbarNotLoggedIn
                            onSignUpNavbar={navbarPresenter.onSignUpNavbar}
                            onLogInNavbar={navbarPresenter.onLogInNavbar}
                        />
                        :
                        <NavbarLoggedIn
                            loggedInUsername={this.state.loggedInUsername}
                            onLogOut={navbarPresenter.onLogOut}
                        />
                }
                {
                    this.state.signUpModalActive === true
                        ?
                        <SignUpModal
                            active={true}
                            onCloseSignUpModal={navbarPresenter.onCloseSignUpModal}
                            username={this.state.newSOUserUsername}
                            password={this.state.newSOUserPassword}
                            onChangeNewSOUserProperty={navbarPresenter.onChangeNewSOUserProperty}
                            onCreateAccount={navbarPresenter.onCreateAccount}
                        />
                        :
                        <SignUpModal
                            active={false}
                            username={this.state.newSOUserUsername}
                            password={this.state.newSOUserPassword}
                        />
                }
                {
                    this.state.logInModalActive === true
                        ?
                        <LogInModal
                            active={true}
                            onCloseLogInModal={navbarPresenter.onCloseLogInModal}
                            username={this.state.logInSOUserUsername}
                            password={this.state.logInSOUserPassword}
                            onChangeLogInSOUserProperty={navbarPresenter.onChangeLogInSOUserProperty}
                            onLogIn={navbarPresenter.onLogIn}
                        />
                        :
                        <LogInModal
                            active={false}
                            username={this.state.logInSOUserUsername}
                            password={this.state.logInSOUserPassword}
                        />
                }
            </div>
        );
    }
}