import React from "react";

const EditAnswerModal = ( {active, onCloseEditAnswerModal, editedAnswer, onChangeEditedAnswerText,
    onConfirmEditAnswer, onDeleteAnswer, questionId} ) => (
    <div className={"modal" + (active ? " is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Edit or delete your answer</p>
                <button className="delete" aria-label="close" onClick={() => onCloseEditAnswerModal()}></button>
            </header>
            <section className="modal-card-body">
                <div className="field">
                    <label className="label">New answer text:</label>
                    <div className="control">
                        <textarea className="textarea" placeholder="New answer..." value={editedAnswer.text}
                            onChange={e => onChangeEditedAnswerText(e.target.value)} />
                    </div>
                </div>
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={() => onConfirmEditAnswer(questionId)}>Edit</button>
                <button className="button is-danger" onClick={() => onDeleteAnswer(questionId)}>Delete</button>
            </footer>
        </div>
    </div>
);

export default EditAnswerModal;