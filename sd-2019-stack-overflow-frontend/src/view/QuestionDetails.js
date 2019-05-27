import React from "react";

const QuestionDetails = ( {question, onUpvoteQuestion, onDownvoteQuestion, onExpandQuestion} ) => (
    <article className="media" key={question.id}>
        <figure className="media-left">
            <div>
                <p className="heading">Vote score</p>
                <p className="title">{question.voteScore}</p>
            </div>
        </figure>
        <div className="media-content">
            <div className="content">
                {
                    // eslint-disable-next-line
                    <a className="postitle" onClick={() => onExpandQuestion(question.id)}><strong>{question.title}</strong></a>
                }
                <br/>{question.text}<br/>
                {
                    // eslint-disable-next-line
                    <small><a onClick={() => onUpvoteQuestion(question.id)}>Up</a>  ·  <a onClick={() => onDownvoteQuestion(question.id)}>Down</a>  ·  {question.author}  ·  {question.creationDateTime}</small>
                }
                <br/>
                <div className="tags">
                {
                    question.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))
                }
                </div>
            </div>
        </div>
    </article>
);

export default QuestionDetails;