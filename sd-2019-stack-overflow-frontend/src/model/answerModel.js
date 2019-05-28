import { EventEmitter } from "events";
import client from "../rest/RestClient";

const createAnswer = (id, questionId, author, text, creationDateTime, voteScore) => (
    {id, questionId, author, text, creationDateTime, voteScore}
)

class AnswerModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            answers: [],
            newAnswer: createAnswer(null, null, "", "", "", 0),
            editedAnswer: createAnswer(null, null, "", "", "", null),
            editAnswerModalActive: false
        };
    }

    loadQuestionAnswers(questionId) {
        return client.getQuestionAnswers(questionId).then((answers) => {
            this.state = {
                ...this.state,
                answers: answers
            };
            this.emit("AnswerModelChange", this.state);
        });
    }

    upvoteAnswer(questionId, answerId) {
        return client.voteAnswer(questionId, answerId, "upvote").then((vote) => {
            if (vote === null) {
                return false;
            }
            this.state = {
                ...this.state,
                answers: this.state.answers.map(a => a.id === answerId ? {...a, voteScore:
                    (vote.voteType === "upvotex2") ? a.voteScore + 2 : a.voteScore + 1} : a)
            };
            this.emit("AnswerModelChange", this.state);
            return true;
        });
    }

    downvoteAnswer(questionId, answerId) {
        return client.voteAnswer(questionId, answerId, "downvote").then((vote) => {
            if (vote === null) {
                return false;
            }
            this.state = {
                ...this.state,
                answers: this.state.answers.map(a => a.id === answerId ? {...a, voteScore:
                    (vote.voteType === "downvotex2") ? a.voteScore - 2 : a.voteScore - 1} : a)
            };
            this.emit("AnswerModelChange", this.state);
            return true;
        });
    }

    changeNewAnswerText(newText) {
        this.state = {
            ...this.state,
            newAnswer: {
                ...this.state.newAnswer,
                text: newText
            }
        };
        this.emit("AnswerModelChange", this.state);
    }

    addAnswer(questionId, text) {
        return client.addAnswer(questionId, text).then((answer) => {
            this.state = {
                ...this.state,
                answers: this.state.answers.concat([answer]),
                newAnswer: createAnswer(null, null, "", "", "", 0)
            };
            this.emit("AnswerModelChange", this.state);
        });
    }

    activateEditAnswerModal(answer) {
        this.state = {
            ...this.state,
            editedAnswer: {...answer},
            editAnswerModalActive: true
        };
        this.emit("AnswerModelChange", this.state);
    }

    deactivateEditAnswerModal() {
        this.state = {
            ...this.state,
            editAnswerModalActive: false
        };
        this.emit("AnswerModelChange", this.state);
    }

    changeEditedAnswerText(newText) {
        this.state = {
            ...this.state,
            editedAnswer: {
                ...this.state.editedAnswer,
                text: newText
            }
        };
        this.emit("AnswerModelChange", this.state);
    }

    editAnswer(questionId, answerId, text) {
        return client.editAnswer(questionId, answerId, text).then((answer) => {
            if (answer === null) {
                return false;
            }
            this.state = {
                ...this.state,
                answers: this.state.answers.map(a => a.id === answer.id ? {...answer} : a),
                editAnswerModalActive: false
            };
            this.emit("AnswerModelChange", this.state);
            return true;
        });
    }

    deleteAnswer(questionId, answerId) {
        return client.deleteAnswer(questionId, answerId).then((bool) => {
            if (bool.value === false) {
                return false;
            } else {
                this.state = {
                    ...this.state,
                    answers: this.state.answers.filter(a => a.id !== answerId),
                    editAnswerModalActive: false
                };
                this.emit("AnswerModelChange", this.state);
                return true;
            }
        });
    }
}

const answerModel = new AnswerModel();

export default answerModel;