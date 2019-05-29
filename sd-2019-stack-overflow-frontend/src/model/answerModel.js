import { EventEmitter } from "events";
import client from "../rest/RestClient";
import webSocketEmitter from "../ws/WebSocketEmitter";

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
        webSocketEmitter.addListener("event", event => {
            switch (event.type) {
                case "ANSWER_ADDED":
                    this.addAnswerLocal(event.dto);
                    break;
                case "ANSWER_EDITED":
                    this.editAnswerLocal(event.dto);
                    break;
                case "ANSWER_DELETED":
                    this.deleteAnswerLocal(event.dto);
                    break;
                case "ANSWER_VOTED":
                    this.voteAnswerLocal(event.dto);
                    break;
                default:
            }
        });
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

    voteAnswerLocal(vote) {
        switch (vote.voteType) {
            case "upvote":
                this.state = {
                    ...this.state,
                    answers: this.state.answers.map(a => a.id === vote.answerId ? {...a, voteScore: a.voteScore + 1} : a)
                };
                break;
            case "upvotex2":
                this.state = {
                    ...this.state,
                    answers: this.state.answers.map(a => a.id === vote.answerId ? {...a, voteScore: a.voteScore + 2} : a)
                };
                break;
            case "downvote":
                this.state = {
                    ...this.state,
                    answers: this.state.answers.map(a => a.id === vote.answerId ? {...a, voteScore: a.voteScore - 1} : a)
                };
                break;
            case "downvotex2":
                this.state = {
                    ...this.state,
                    answers: this.state.answers.map(a => a.id === vote.answerId ? {...a, voteScore: a.voteScore - 2} : a)
                };
                break;
            default:
        }
        this.emit("AnswerModelChange", this.state);
    }

    upvoteAnswer(questionId, answerId) {
        return client.voteAnswer(questionId, answerId, "upvote");
    }

    downvoteAnswer(questionId, answerId) {
        return client.voteAnswer(questionId, answerId, "downvote");
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

    addAnswerLocal(answer) {
        this.state = {
            ...this.state,
            answers: this.state.answers.concat([answer]),
            newAnswer: createAnswer(null, null, "", "", "", 0)
        };
        this.emit("AnswerModelChange", this.state);
    }

    addAnswer(questionId, text) {
        return client.addAnswer(questionId, text);
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

    editAnswerLocal(answer) {
        this.state = {
            ...this.state,
            answers: this.state.answers.map(a => a.id === answer.id ? {...answer} : a),
            editAnswerModalActive: false
        };
        this.emit("AnswerModelChange", this.state);
    }

    editAnswer(questionId, answerId, text) {
        return client.editAnswer(questionId, answerId, text);
    }

    deleteAnswerLocal(answer) {
        this.state = {
            ...this.state,
            answers: this.state.answers.filter(a => a.id !== answer.id),
            editAnswerModalActive: false
        };
        this.emit("AnswerModelChange", this.state);
    }

    deleteAnswer(questionId, answerId) {
        return client.deleteAnswer(questionId, answerId);
    }
}

const answerModel = new AnswerModel();

export default answerModel;