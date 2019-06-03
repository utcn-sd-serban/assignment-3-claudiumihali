import React from "react";

const QuestionOperations = ( {onAskQuestion, titleFilter, tagFilter, onChangeTitleFilter, onChangeTagFilter,
    onFilterTitle, appliedTagFilters, onFilterTag, onClearFilterTag} ) => (
    <div className="operations">
        <section className="container">
            <nav className="level">
                <div className="level-left">
                    <div className="level-item">
                        <p className="subtitle is-5">
                            Question filtering:
                        </p>
                    </div>
                    <div className="level-item">
                        <div className="field has-addons">
                            <p className="control">
                                <input className="input" type="text" placeholder="Filter by title" value={titleFilter}
                                    onChange={e => onChangeTitleFilter(e.target.value)} />
                            </p>
                            <p className="control">
                                <button className="button" onClick={() => onFilterTitle()}>
                                    Search
                                </button>
                            </p>
                        </div>
                    </div>
                    <div className="level-item">
                        <div className="field has-addons">
                            <p className="control">
                                <input className="input" type="text" placeholder="Filter by tag" value={tagFilter}
                                    onChange={e => onChangeTagFilter(e.target.value)} />
                            </p>
                            <p className="control">
                                <button className="button" onClick={() => onFilterTag()}>
                                    Search
                                </button>
                            </p>
                        </div>
                    </div>
                    <div className="level-item">
                        <div className="tags">
                        {
                            appliedTagFilters.map((tag, index) => (
                                <span className="tag">{tag}<button class="delete is-small"
                                onClick={() => onClearFilterTag(index)}></button></span>
                            ))
                        }
                        </div>
                    </div>
                </div>
                <div className="level-right">
                    <button className="button is-info" onClick={() => onAskQuestion()}>Ask a question</button>
                </div>
            </nav>
        </section>
    </div>
);

export default QuestionOperations;