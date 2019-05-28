import sOUserModel from "../model/sOUserModel";
import answerModel from "../model/answerModel";

class AnswerListPresenter {
    onUpvoteAnswer(questionId, answerId) {
        if (sOUserModel.state.loggedInUsername === null) {
            window.alert("You must be logged in to vote answers!");
            return;
        }
        answerModel.upvoteAnswer(questionId, answerId).then((success) => {
            if (!success) {
                window.alert("You cannot vote your own answers or twice!");
            }
        });
    }

    onDownvoteAnswer(questionId, answerId) {
        if (sOUserModel.state.loggedInUsername === null) {
            window.alert("You must be logged in to vote answers!");
            return;
        }
        answerModel.downvoteAnswer(questionId, answerId).then((success) => {
            if (!success) {
                window.alert("You cannot vote your own answers or twice!");
            }
        });
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

    onDeleteAnswer(questionId) {
        answerModel.deleteAnswer(questionId, answerModel.state.editedAnswer.id)
            .then((success) => {
                if (!success) {
                    window.alert("You can delete only your own answers!");
                }
            });
    }
}

const answerListPresenter = new AnswerListPresenter();

export default answerListPresenter;