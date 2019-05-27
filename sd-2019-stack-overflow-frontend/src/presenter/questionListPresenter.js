import sOUserModel from "../model/sOUserModel";
import questionModel from "../model/questionModel";
import answerModel from "../model/answerModel";

class QuestionListPresenter {
    onInit() {
        questionModel.loadQuestions();
    }

    onAskQuestion() {
        if (sOUserModel.state.loggedInUsername === null) {
            window.alert("You must be logged in to ask questions!");
            return;
        }
        questionModel.activateAskQuestionModal();
    }

    onCloseAskQuestionModal() {
        questionModel.deactivateAskQuestionModal();
    }

    onChangeNewQuestionProperty(property, value) {
        questionModel.changeNewQuestionProperty(property, value);
    }

    onChangeNewTag(newValue) {
        questionModel.changeNewTag(newValue);
    }

    onCreateNewTag(newTag) {
        questionModel.addNewTag(newTag);
    }

    onDeleteNewTag(index) {
        questionModel.deleteNewTag(index);
    }

    onCreateQuestion() {
        questionModel.addQuestion(questionModel.state.newQuestion.title, questionModel.state.newQuestion.text,
            questionModel.state.newQuestion.tags);
    }

    onChangeTitleFilter(newValue) {
        questionModel.changeTitleFilter(newValue);
    }

    onFilterTitle() {
        var titleFilter = questionModel.state.titleFilter;
        questionModel.filterByTitle(titleFilter).then(() => {
            window.location.assign("#/" + titleFilter);
        });
    }

    onChangeTagFilter(newValue) {
        questionModel.changeTagFilter(newValue);
    }

    onFilterTag() {
        var tagFilter = questionModel.state.tagFilter;
        questionModel.filterByTag(tagFilter);
    }

    onClearFilterTag(index) {
        questionModel.clearFilterByTag(index);
    }

    onUpvoteQuestion(questionId) {
        if (sOUserModel.state.loggedInUsername === null) {
            window.alert("You must be logged in to vote questions!");
            return;
        }
        questionModel.upvoteQuestion(questionId);
    }

    onDownvoteQuestion(questionId) {
        if (sOUserModel.state.loggedInUsername === null) {
            window.alert("You must be logged in to vote questions!");
            return;
        }
        questionModel.downvoteQuestion(questionId);
    }

    onExpandQuestion(questionId) {
        answerModel.loadQuestionAnswers(questionId).then(() => {
            window.location.assign("#/questions/" + questionId + "/answers");
        });
    }
}

const questionListPresenter = new QuestionListPresenter();

export default questionListPresenter;