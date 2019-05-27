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

    filterByTags(tagFilters) {
        var tfs = "";
        if (tagFilters.length !== 0) {
            for (var i = 0; i < tagFilters.length - 1; i++) {
                tfs = tfs.concat("tagFilters=" + tagFilters[i] + "&");
            }
            tfs = tfs.concat("tagFilters=" + tagFilters[i]);
        }
        return fetch(BASE_URL + "/questions?" + tfs, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    getQuestionAnswers(questionId) {
        return fetch(BASE_URL + "/questions/" + questionId + "/answers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    addAnswer(questionId, text) {
        return fetch(BASE_URL + "/questions/" + questionId + "/answers", {
            method: "POST",
            body: JSON.stringify({text}),
            headers: {
                "Authorization": this.authorization,
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    editAnswer(questionId, answerId, text) {
        return fetch(BASE_URL + "/questions/" + questionId + "/answers/" + answerId, {
            method: "PUT",
            body: JSON.stringify({text}),
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
}

const client = new RestClient();

export default client;