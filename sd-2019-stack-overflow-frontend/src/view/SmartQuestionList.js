import React, {Component} from "react";
import questionModel from "../model/questionModel";
import questionListPresenter from "../presenter/questionListPresenter";
import QuestionList from "./QuestionList";
import QuestionOperations from "./QuestionOperations";
import AskQuestionModal from "./AskQuestionModal";
import Footer from "./Footer";
import SmartNavbar from "./SmartNavbar";

const mapModelStateToComponentState = (questionModelState, props) => (
    {
        questions: questionModelState.questions,
        askQuestionModalActive: questionModelState.askQuestionModalActive,
        newQuestion: questionModelState.newQuestion,
        newTag: questionModelState.newTag,
        titleFilter: questionModelState.titleFilter,
        tagFilter: questionModelState.tagFilter,
        appliedTagFilters: questionModelState.appliedTagFilters
    }
);

export default class SmartQuestionList extends Component {
    constructor(props) {
        super(props);
        this.state = mapModelStateToComponentState(questionModel.state, this.props);
        this.listener = () => this.setState(mapModelStateToComponentState(questionModel.state, this.props));
        questionModel.addListener("QuestionModelChange", this.listener);
        questionListPresenter.onInit();
    }

    componentWillUnmount() {
        questionModel.removeListener("QuestionModelChange", this.listener);
    }

    componentDidUpdate(prev) {
        if (prev.match.params.titleFilter !== this.props.match.params.titleFilter) {
            questionModel.filterByTitle((this.props.match.params.titleFilter === undefined) ? "" :
            this.props.match.params.titleFilter);
            this.setState(mapModelStateToComponentState(questionModel.state, this.props));
        }
    }

    render() {
        return (
            <div>
                <SmartNavbar />
                {
                    this.state.askQuestionModalActive === true
                        ?
                        <AskQuestionModal
                            active={true}
                            onCloseAskQuestionModal={questionListPresenter.onCloseAskQuestionModal}
                            newQuestion={this.state.newQuestion}
                            newTag={this.state.newTag}
                            onChangeNewQuestionProperty={questionListPresenter.onChangeNewQuestionProperty}
                            onChangeNewTag={questionListPresenter.onChangeNewTag}
                            onCreateNewTag={questionListPresenter.onCreateNewTag}
                            onDeleteNewTag={questionListPresenter.onDeleteNewTag}
                            onCreateQuestion={questionListPresenter.onCreateQuestion}
                        />
                        :
                        <AskQuestionModal active={false} newQuestion={this.state.newQuestion} newTag={this.state.newTag} />
                }
                <QuestionOperations
                    onAskQuestion={questionListPresenter.onAskQuestion}
                    titleFilter={this.state.titleFilter}
                    tagFilter={this.state.tagFilter}
                    onChangeTitleFilter={questionListPresenter.onChangeTitleFilter}
                    onChangeTagFilter={questionListPresenter.onChangeTagFilter}
                    onFilterTitle={questionListPresenter.onFilterTitle}
                    appliedTagFilters={this.state.appliedTagFilters}
                    onFilterTag={questionListPresenter.onFilterTag}
                    onClearFilterTag={questionListPresenter.onClearFilterTag}
                />
                <QuestionList
                    questions={this.state.questions}
                    onUpvoteQuestion={questionListPresenter.onUpvoteQuestion}
                    onDownvoteQuestion={questionListPresenter.onDownvoteQuestion}
                    onExpandQuestion={questionListPresenter.onExpandQuestion}
                />
                <Footer />
            </div>
        );
    }
}