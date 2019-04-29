import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import * as serviceWorker from './serviceWorker';

import App from './App';
import AutorBox from './Autor';

ReactDOM.render(
    (<BrowserRouter history={createBrowserHistory}>
        <div>
            <App>
                <Route exact path='/' component={AutorBox} />
                <Route path='/autor' component={AutorBox} />
            </App>
        </div>
    </BrowserRouter>),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
