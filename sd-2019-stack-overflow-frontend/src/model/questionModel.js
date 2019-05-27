import { EventEmitter } from "events";
import client from "../rest/RestClient";

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

    addQuestion(title, text, tags) {
        return client.addQuestion(title, text, tags).then((question) => {
            this.state = {
                ...this.state,
                questions: [question].concat(this.state.questions),
                newQuestion: createQuestion(null, "", "", "", "", [], 0),
                askQuestionModalActive: false
            };
            this.emit("QuestionModelChange", this.state);
        });
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

    upvoteQuestion(questionId) {
        this.state = {
            ...this.state,
            questions: this.state.questions.map(q => q.id === questionId ? {...q, voteScore: q.voteScore + 1} : q)
        };
        this.emit("QuestionModelChange", this.state);
    }

    downvoteQuestion(questionId) {
        this.state = {
            ...this.state,
            questions: this.state.questions.map(q => q.id === questionId ? {...q, voteScore: q.voteScore - 1} : q)
        };
        this.emit("QuestionModelChange", this.state);
    }

    activateEditQuestionModal(question) {
        this.state = {
            ...this.state,
            newQuestion: {...question},
            askQuestionModalActive: true
        }
        this.emit("QuestionModelChange", this.state);
    }

    editQuestion() {
        this.state = {
            ...this.state,
            questions: this.state.questions.map(q => q.id === this.state.newQuestion.id ? {...this.state.newQuestion} : q),
            newQuestion: createQuestion(this.state.questions[this.state.questions.length - 1].id + 1, "", "", "", "", [], 0),
            askQuestionModalActive: false
        }
        this.emit("QuestionModelChange", this.state);
    }
}

const questionModel = new QuestionModel();

export default questionModel;