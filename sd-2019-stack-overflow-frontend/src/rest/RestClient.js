const BASE_URL = "http://localhost:8080";

class RestClient {
    logIn(username, password) {
        this.authorization = "Basic " + btoa(username + ":" + password);
        return fetch(BASE_URL + "/sousers/login", {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (!response.ok) {
                return null;
            } else {
                return response.json();
            }
        });
    }

    logOut() {
        this.authorization = "";
    }

    signUp(username, password) {
        return fetch(BASE_URL + "/sousers", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (!response.ok) {
                return null;
            } else {
                return response.json();
            }
        });
    }

    getAllQuestions() {
        return fetch(BASE_URL + "/questions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    addQuestion(title, text, tags) {
        return fetch(BASE_URL + "/questions", {
            method: "POST",
            body: JSON.stringify({title, text, tags}),
            headers: {
                "Authorization": this.authorization,
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    filterByTitle(titleFilter) {
        return fetch(BASE_URL + "/questions?titleFilter=" + titleFilter, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }
}

const client = new RestClient();

export default client;