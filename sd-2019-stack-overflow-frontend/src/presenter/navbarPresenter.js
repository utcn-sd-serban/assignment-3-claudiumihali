import sOUserModel from "../model/sOUserModel";

class NavbarPresenter {
    onSignUpNavbar() {
        sOUserModel.activateSignUpModal();
    }

    onCloseSignUpModal() {
        sOUserModel.deactivateSignUpModal();
    }

    onChangeNewSOUserProperty(property, value) {
        sOUserModel.changeNewSOUserProperty(property, value);
    }

    onCreateAccount() {
        sOUserModel.addSOUser(sOUserModel.state.newSOUser.username,
            sOUserModel.state.newSOUser.password).then((success) => {
                if (!success) {
                    window.alert("Duplicate username. Try another one.");
                }
            });
    }

    onLogInNavbar() {
        sOUserModel.activateLogInModal();
    }

    onCloseLogInModal() {
        sOUserModel.deactivateLogInModal();
    }

    onChangeLogInSOUserProperty(property, value) {
        sOUserModel.changeLogInSOUserProperty(property, value);
    }

    onLogIn() {
        sOUserModel.logIn(sOUserModel.state.logInSOUser.username, sOUserModel.state.logInSOUser.password).then((success) => {
            if (!success) {
                window.alert("Invalid credentials!");
            }
        });
    }

    onLogOut() {
        sOUserModel.logOut();
    }
}

const navbarPresenter = new NavbarPresenter();

export default navbarPresenter;