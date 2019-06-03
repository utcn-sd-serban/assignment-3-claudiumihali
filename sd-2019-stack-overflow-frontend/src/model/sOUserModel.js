import { EventEmitter } from "events";
import client from "../rest/RestClient";

const createSOUser = (id, username, password) => (
    {id, username, password}
)

class SOUserModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            newSOUser: createSOUser(null, "", ""),
            logInSOUser: createSOUser(null, "", ""),
            loggedInUsername: null,
            signUpModalActive: false,
            logInModalActive: false
        };
    }

    activateSignUpModal() {
        this.state = {
            ...this.state,
            signUpModalActive: true
        };
        this.emit("SOUserModelChange", this.state);
    }

    deactivateSignUpModal() {
        this.state = {
            ...this.state,
            signUpModalActive: false
        };
        this.emit("SOUserModelChange", this.state);
    }

    changeNewSOUserProperty(property, value) {
        this.state = {
            ...this.state,
            newSOUser: {
                ...this.state.newSOUser,
                [property]: value
            }
        };
        this.emit("SOUserModelChange", this.state);
    }

    addSOUser(username, password) {
        return client.signUp(username, password).then((sOUser) => {
            if (sOUser === null) {
                return false;
            }
            this.state = {
                ...this.state,
                newSOUser: createSOUser(null, "", ""),
                signUpModalActive: false
            };
            this.emit("SOUserModelChange", this.state);
            return true;
        });
    }

    activateLogInModal() {
        this.state = {
            ...this.state,
            logInModalActive: true
        };
        this.emit("SOUserModelChange", this.state);
    }

    deactivateLogInModal() {
        this.state = {
            ...this.state,
            logInModalActive: false
        };
        this.emit("SOUserModelChange", this.state);
    }

    changeLogInSOUserProperty(property, value) {
        this.state = {
            ...this.state,
            logInSOUser: {
                ...this.state.logInSOUser,
                [property]: value
            }
        };
        this.emit("SOUserModelChange", this.state);
    }

    logIn(username, password) {
        return client.logIn(username, password).then((sOUser) => {
            if (sOUser === null) {
                return false;
            }
            this.state = {
                ...this.state,
                newSOUser: createSOUser(null, "", ""),
                logInSOUser: createSOUser(null, "", ""),
                loggedInUsername: sOUser.username,
                logInModalActive: false
            };
            this.emit("SOUserModelChange", this.state);
            return true;
        });
    }

    logOut() {
        client.logOut();
        this.state = {
            ...this.state,
            loggedInUsername: null
        }
        this.emit("SOUserModelChange", this.state);
    }
}

const sOUserModel = new SOUserModel();

export default sOUserModel;