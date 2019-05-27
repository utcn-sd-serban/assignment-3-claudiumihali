import React from "react";

const AskQuestionModal = ( {active, onCloseAskQuestionModal, newQuestion, newTag,
    onChangeNewQuestionProperty, onChangeNewTag, onCreateNewTag, onDeleteNewTag, onCreateQuestion} ) => (
    <div className={"modal" + (active ? " is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Ask a question</p>
                <button className="delete" aria-label="close" onClick={() => onCloseAskQuestionModal()}></button>
            </header>
            <section className="modal-card-body">
                <div className="field">
                    <label className="label">Title:</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Enter a descriptive title"
                            value={newQuestion.title} onChange={e => onChangeNewQuestionProperty("title", e.target.value)} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Text:</label>
                    <div className="control">
                        <textarea className="textarea" placeholder="Question text..." value={newQuestion.text}
                            onChange={e => onChangeNewQuestionProperty("text", e.target.value)} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Tags:</label>
                    <div className="field has-addons">
                        <p className="control">
                            <input className="input" type="text" placeholder="Tag" value={newTag}
                                onChange={e => onChangeNewTag(e.target.value)} />
                        </p>
                        <p className="control">
                            <button className="button" onClick={() => onCreateNewTag(newTag)}>
                                Add tag
                            </button>
                        </p>
                    </div>
                </div>
                <div className="field">
                    <div className="tags">
                    {
                        newQuestion.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}<button className="delete is-small"
                                onClick={() => onDeleteNewTag(index)}></button></span>
                        ))
                    }
                    </div>
                </div>
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={() => onCreateQuestion()}>Ask</button>
            </footer>
        </div>
    </div>
);

export default AskQuestionModal;