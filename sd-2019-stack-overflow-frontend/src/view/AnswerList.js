import React from "react";
import AnswerDetails from "./AnswerDetails";

const AnswerList = ( {question, onUpvoteQuestion, onDownvoteQuestion, answers, onUpvoteAnswer, onDownvoteAnswer,
    newAnswer, onChangeNewAnswerText, onCreateAnswer, onEditQuestion, onEditAnswer} ) => (
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
                        <p>
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
                                question.tags.map((tag) => (
                                    <span className="tag">{tag}</span>
                                ))
                            }
                            </div>
                        </p>
                    </div>
                    {
                        answers.length !== 0
                        ?
                        answers.map((answer) => (
                            <AnswerDetails
                                answer={answer}
                                onUpvoteAnswer={onUpvoteAnswer}
                                onDownvoteAnswer={onDownvoteAnswer}
                                onEditAnswer={onEditAnswer}
                            />
                        ))
                        :
                        <article className="media"><p><strong>No answers yet.</strong></p></article>
                    }
                </div>
                <div className="media-right">
                    <button className="button is-white" onClick={() => onEditQuestion(question)}>
                        <span className="icon">
                            <i className="fa fa-edit"></i>
                        </span>
                    </button>
                </div>
            </article>
            <article class="media">
                <div class="media-content">
                    <div class="field">
                        <p class="control">
                            <textarea class="textarea" placeholder="Add an answer..." value={newAnswer.text}
                                onChange={e => onChangeNewAnswerText(e.target.value)} />
                        </p>
                    </div>
                    <div class="field">
                        <p class="control">
                            <button class="button" onClick={() => onCreateAnswer(question.id)}>Post answer</button>
                        </p>
                    </div>
                </div>
            </article>
        </div>
    </section>
);

export default AnswerList;