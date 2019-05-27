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
        var today = new Date();
        var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        answerModel.addAnswer(answerModel.state.newAnswer.id, questionId, sOUserModel.state.loggedInUsername,
            answerModel.state.newAnswer.text, dateTime, answerModel.state.newAnswer.voteScore);
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

    onConfirmEditAnswer() {
        answerModel.editAnswer();
    }

    onDeleteAnswer() {
        answerModel.deleteAnswer();
    }
}

const answerListPresenter = new AnswerListPresenter();

export default answerListPresenter;