import React from "react";

const AnswerDetails = ( {answer, onUpvoteAnswer, onDownvoteAnswer, onEditAnswer} ) => (
    <article className="media" key={answer.id}>
        <figure className="media-left">
            <div>
                <p className="heading">Vote score</p>
                <p className="title">{answer.voteScore}</p>
            </div>
        </figure>
        <div className="media-content">
            <div className="content">
                {answer.text}
                <br />
                <br />
                {
                    // eslint-disable-next-line
                    <small><a onClick={() => onUpvoteAnswer(answer.id)}>Up</a>  ·  <a onClick={() => onDownvoteAnswer(answer.id)}>Down</a>  ·  {answer.author}  ·  {answer.creationDateTime}</small>
                }
            </div>
        </div>
        <div className="media-right">
            <button className="button is-white" onClick={() => onEditAnswer(answer)}>
                <span className="icon">
                    <i className="fa fa-edit"></i>
                </span>
            </button>
        </div>
    </article>
);

export default AnswerDetails;