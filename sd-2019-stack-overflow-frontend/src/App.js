import React from 'react';
import './App.css';
import {HashRouter, Switch, Route} from "react-router-dom";
import SmartQuestionList from './view/SmartQuestionList';
import SmartAnswerList from './view/SmartAnswerList';

const App = () => (
  <div className="App">
    <HashRouter>
      <Switch>
        <Route exact={true} component={SmartQuestionList} path="/:titleFilter?" />
        <Route exact={true} component={SmartAnswerList} path="/questions/:questionId/answers" />
      </Switch>
    </HashRouter>
  </div>
);

export default App;