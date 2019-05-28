import React from "react";
import AnswerDetails from "./AnswerDetails";

const AnswerList = ( {question, onUpvoteQuestion, onDownvoteQuestion, answers, onUpvoteAnswer, onDownvoteAnswer,
    newAnswer, onChangeNewAnswerText, onCreateAnswer, onEditAnswer} ) => (
    <section className="container">
        <div className="box content">
            <article className="media">
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
                            <a className="postitle"><strong>{question.title}</strong></a>
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
                    {
                        answers.length !== 0
                        ?
                        answers.map((answer, index) => (
                            <AnswerDetails
                                key={index}
                                answer={answer}
                                questionId={question.id}
                                onUpvoteAnswer={onUpvoteAnswer}
                                onDownvoteAnswer={onDownvoteAnswer}
                                onEditAnswer={onEditAnswer}
                            />
                        ))
                        :
                        <article className="media"><p><strong>No answers yet.</strong></p></article>
                    }
                </div>
            </article>
            <article className="media">
                <div className="media-content">
                    <div className="field">
                        <p className="control">
                            <textarea className="textarea" placeholder="Add an answer..." value={newAnswer.text}
                                onChange={e => onChangeNewAnswerText(e.target.value)} />
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <button className="button" onClick={() => onCreateAnswer(question.id)}>Post answer</button>
                        </p>
                    </div>
                </div>
            </article>
        </div>
    </section>
);

export default AnswerList;