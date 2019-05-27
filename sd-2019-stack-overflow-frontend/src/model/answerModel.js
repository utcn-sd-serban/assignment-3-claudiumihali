import { EventEmitter } from "events";

const createAnswer = (id, questionId, author, text, creationDateTime, voteScore) => (
    {id, questionId, author, text, creationDateTime, voteScore}
)

class AnswerModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            answers: [
                createAnswer(1, 1, "u2", "a1", "11/11/11 11:11:11", -4),
                createAnswer(2, 1, "u1", "a2", "11/11/11 11:11:11", 4),
                createAnswer(3, 2, "u3", "a3", "11/11/11 11:11:11", 7)
            ],
            newAnswer: createAnswer(4, null, "", "", "", 0),
            editedAnswer: createAnswer(null, null, "", "", "", null),
            editAnswerModalActive: false
        };
    }

    upvoteAnswer(answerId) {
        this.state = {
            ...this.state,
            answers: this.state.answers.map(a => a.id === answerId ? {...a, voteScore: a.voteScore + 1} : a)
        };
        this.emit("AnswerModelChange", this.state);
    }

    downvoteAnswer(answerId) {
        this.state = {
            ...this.state,
            answers: this.state.answers.map(a => a.id === answerId ? {...a, voteScore: a.voteScore - 1} : a)
        };
        this.emit("AnswerModelChange", this.state);
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

    addAnswer(id, questionId, author, text, creationDateTime, voteScore) {
        this.state = {
            ...this.state,
            answers: this.state.answers.concat([createAnswer(id, questionId, author, text, creationDateTime, voteScore)]),
            newAnswer: createAnswer(id + 1, null, "", "", "", 0)
        };
        this.emit("AnswerModelChange", this.state);
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

    editAnswer() {
        this.state = {
            ...this.state,
            answers: this.state.answers.map(a => a.id === this.state.editedAnswer.id ? {...this.state.editedAnswer} : a),
            editAnswerModalActive: false
        };
        this.emit("AnswerModelChange", this.state);
    }

    deleteAnswer() {
        this.state = {
            ...this.state,
            answers: this.state.answers.filter(a => a.id !== this.state.editedAnswer.id),
            editAnswerModalActive: false
        };
        this.emit("AnswerModelChange", this.state);
    }
}

const answerModel = new AnswerModel();

export default answerModel;