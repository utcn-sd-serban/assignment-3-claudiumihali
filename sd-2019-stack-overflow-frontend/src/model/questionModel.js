import { EventEmitter } from "events";
import client from "../rest/RestClient";
import webSocketEmitter from "../ws/WebSocketEmitter";

const createQuestion = (id, author, title, text, creationDateTime, tags, voteScore) => (
    {id, author, title, text, creationDateTime, tags, voteScore}
)

class QuestionModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            questions: [],
            newQuestion: createQuestion(null, "", "", "", "", [], 0),
            newTag: "",
            titleFilter: "",
            appliedTagFilters: [],
            tagFilter: "",
            askQuestionModalActive: false
        };
        webSocketEmitter.addListener("event", event => {
            switch (event.type) {
                case "QUESTION_ADDED":
                    this.addQuestionLocal(event.dto);
                    break;
                case "QUESTION_VOTED":
                    this.voteQuestionLocal(event.dto);
                    break;
                default:
            }
        });
    }

    loadQuestions() {
        return client.getAllQuestions().then((questions) => {
            this.state = {
                ...this.state,
                questions: questions
            };
            this.emit("QuestionModelChange", this.state);
        });
    }

    activateAskQuestionModal() {
        this.state = {
            ...this.state,
            askQuestionModalActive: true
        };
        this.emit("QuestionModelChange", this.state);
    }

    deactivateAskQuestionModal() {
        this.state = {
            ...this.state,
            askQuestionModalActive: false
        };
        this.emit("QuestionModelChange", this.state);
    }

    changeNewQuestionProperty(property, value) {
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                [property]: value
            }
        };
        this.emit("QuestionModelChange", this.state);
    }

    changeNewTag(newValue) {
        this.state = {
            ...this.state,
            newTag: newValue
        };
        this.emit("QuestionModelChange", this.state);
    }

    addNewTag(newTag) {
        if (newTag === "") {
            return;
        }
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                tags: this.state.newQuestion.tags.concat([newTag])
            },
            newTag: ""
        };
        this.emit("QuestionModelChange", this.state);
    }

    deleteNewTag(index) {
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                tags: this.state.newQuestion.tags.filter(t => t !== this.state.newQuestion.tags[index])
            }
        };
        this.emit("QuestionModelChange", this.state);
    }

    addQuestionLocal(question) {
        this.state = {
            ...this.state,
            questions: [question].concat(this.state.questions),
            newQuestion: createQuestion(null, "", "", "", "", [], 0),
            askQuestionModalActive: false
        };
        this.emit("QuestionModelChange", this.state);
    }

    addQuestion(title, text, tags) {
        return client.addQuestion(title, text, tags);
    }

    changeTitleFilter(newValue) {
        this.state = {
            ...this.state,
            titleFilter: newValue
        };
        this.emit("QuestionModelChange", this.state);
    }

    filterByTitle(titleFilter) {
        return client.filterByTitle(titleFilter).then((questions) => {
            this.state = {
                ...this.state,
                questions: questions,
                titleFilter: ""
            };
            this.emit("QuestionModelChange", this.state);
        });
    }

    changeTagFilter(newValue) {
        this.state = {
            ...this.state,
            tagFilter: newValue
        };
        this.emit("QuestionModelChange", this.state);
    }

    filterByTag(tagFilter) {
        var appliedTagFilters = this.state.appliedTagFilters.concat([tagFilter]);
        return client.filterByTags(appliedTagFilters).then((questions) => {
            this.state = {
                ...this.state,
                questions: questions,
                appliedTagFilters: appliedTagFilters,
                tagFilter: ""
            };
            this.emit("QuestionModelChange", this.state);
        });
    }

    clearFilterByTag(index) {
        var appliedTagFilters = this.state.appliedTagFilters.filter(t => t !== this.state.appliedTagFilters[index]);
        return client.filterByTags(appliedTagFilters).then((questions) => {
            this.state = {
                ...this.state,
                questions: questions,
                appliedTagFilters: appliedTagFilters
            };
            this.emit("QuestionModelChange", this.state);
        });
    }

    voteQuestionLocal(vote) {
        switch (vote.voteType) {
            case "upvote":
                this.state = {
                    ...this.state,
                    questions: this.state.questions.map(q => q.id === vote.questionId ? {...q, voteScore: q.voteScore + 1} : q)
                };
                break;
            case "upvotex2":
                this.state = {
                    ...this.state,
                    questions: this.state.questions.map(q => q.id === vote.questionId ? {...q, voteScore: q.voteScore + 2} : q)
                };
                break;
            case "downvote":
                this.state = {
                    ...this.state,
                    questions: this.state.questions.map(q => q.id === vote.questionId ? {...q, voteScore: q.voteScore - 1} : q)
                };
                break;
            case "downvotex2":
                this.state = {
                    ...this.state,
                    questions: this.state.questions.map(q => q.id === vote.questionId ? {...q, voteScore: q.voteScore - 2} : q)
                };
                break;
            default:
        }
        this.emit("QuestionModelChange", this.state);
    }

    upvoteQuestion(questionId) {
        return client.voteQuestion(questionId, "upvote");
    }

    downvoteQuestion(questionId) {
        return client.voteQuestion(questionId, "downvote");
    }
}

const questionModel = new QuestionModel();

export default questionModel;