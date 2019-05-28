import React, {Component} from "react";
import questionModel from "../model/questionModel";
import answerModel from "../model/answerModel";
import questionListPresenter from "../presenter/questionListPresenter";
import answerListPresenter from "../presenter/answerListPresenter";
import SmartNavbar from "./SmartNavbar";
import Footer from "./Footer";
import AnswerList from "./AnswerList";
import EditAnswerModal from "./EditAnswerModal";

const mapModelStateToComponentState = (questionModelState, answerModelState, props) => (
    {
        question: questionModelState.questions.filter(q => q.id === Number(props.match.params.questionId))[0],
        answers: answerModelState.answers,
        newAnswer: answerModelState.newAnswer,
        editAnswerModalActive: answerModelState.editAnswerModalActive,
        editedAnswer: answerModelState.editedAnswer
    }
);

export default class SmartAnswerList extends Component {
    constructor(props) {
        super(props);
        this.state = mapModelStateToComponentState(questionModel.state, answerModel.state, this.props);
        this.listener = () => this.setState(mapModelStateToComponentState(questionModel.state, answerModel.state, this.props));
        answerModel.addListener("AnswerModelChange", this.listener);
        questionModel.addListener("QuestionModelChange", this.listener);
    }

    componentWillUnmount() {
        answerModel.removeListener("AnswerModelChange", this.listener);
        questionModel.removeListener("QuestionModelChange", this.listener);
    }

    componentDidUpdate(prev) {
        if (prev.match.params.questionId !== this.props.match.params.questionId) {
            this.setState(mapModelStateToComponentState(questionModel.state, answerModel.state, this.props));
        }
    }

    render() {
        return (
            <div>
                <SmartNavbar />
                {
                    this.state.editAnswerModalActive === true
                    ?
                    <EditAnswerModal
                        active={true}
                        onCloseEditAnswerModal={answerListPresenter.onCloseEditAnswerModal}
                        editedAnswer={this.state.editedAnswer}
                        onChangeEditedAnswerText={answerListPresenter.onChangeEditedAnswerText}
                        onConfirmEditAnswer={answerListPresenter.onConfirmEditAnswer}
                        onDeleteAnswer={answerListPresenter.onDeleteAnswer}
                        questionId={this.state.question.id}
                    />
                    :
                    <EditAnswerModal active={false} editedAnswer={this.state.editedAnswer} />
                }
                <AnswerList
                    question={this.state.question}
                    onUpvoteQuestion={questionListPresenter.onUpvoteQuestion}
                    onDownvoteQuestion={questionListPresenter.onDownvoteQuestion}
                    answers={this.state.answers}
                    onUpvoteAnswer={answerListPresenter.onUpvoteAnswer}
                    onDownvoteAnswer={answerListPresenter.onDownvoteAnswer}
                    newAnswer={this.state.newAnswer}
                    onChangeNewAnswerText={answerListPresenter.onChangeNewAnswerText}
                    onCreateAnswer={answerListPresenter.onCreateAnswer}
                    onEditAnswer={answerListPresenter.onEditAnswer}
                />
                <Footer />
            </div>
        );
    }
}