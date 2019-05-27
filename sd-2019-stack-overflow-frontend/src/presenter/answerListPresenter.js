import sOUserModel from "../model/sOUserModel";
import questionModel from "../model/questionModel";
import answerModel from "../model/answerModel";

class AnswerListPresenter {
    onUpvoteAnswer(answerId) {
        if (sOUserModel.state.loggedInUsername === null) {
            window.alert("You must be logged in to vote answers!");
            return;
        }
        answerModel.upvoteAnswer(answerId);
    }

    onDownvoteAnswer(answerId) {
        if (sOUserModel.state.loggedInUsername === null) {
            window.alert("You must be logged in to vote answers!");
            return;
        }
        answerModel.downvoteAnswer(answerId);
    }

    onChangeNewAnswerText(newText) {
        answerModel.changeNewAnswerText(newText);
    }

    onCreateAnswer(questionId) {
        if (sOUserModel.state.loggedInUsername === null) {
            window.alert("You must be logged in to add answers!");
            return;
        }
        answerModel.addAnswer(questionId, answerModel.state.newAnswer.text);
    }

    onEditQuestion(question) {
        if (sOUserModel.state.loggedInUsername === null) {
            window.alert("You must be logged in to edit questions!");
            return;
        }
        questionModel.activateEditQuestionModal(question);
    }

    onConfirmEditQuestion() {
        questionModel.editQuestion();
    }

    onEditAnswer(answer) {
        if (sOUserModel.state.loggedInUsername === null) {
            window.alert("You must be logged in to edit answers!");
            return;
        }
        answerModel.activateEditAnswerModal(answer);
    }

    onCloseEditAnswerModal() {
        answerModel.deactivateEditAnswerModal();
    }

    onChangeEditedAnswerText(newText) {
        answerModel.changeEditedAnswerText(newText);
    }

    onConfirmEditAnswer(questionId) {
        answerModel.editAnswer(questionId, answerModel.state.editedAnswer.id, answerModel.state.editedAnswer.text)
            .then((success) => {
                if (!success) {
                    window.alert("You can edit only your own answers!");
                }
            });
    }

    onDeleteAnswer() {
        answerModel.deleteAnswer();
    }
}

const answerListPresenter = new AnswerListPresenter();

export default answerListPresenter;