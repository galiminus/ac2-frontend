import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import ReactDOM from "react-dom";

import { Router, Route, IndexRoute, browserHistory } from "react-router";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
    indigo400,
    cyan700,
    grey400,
    orangeA700,
    grey100,
    grey500,
    darkBlack,
    white,
    grey300
} from "material-ui/styles/colors";
import { fade } from "material-ui/utils/colorManipulator";
import Spacing from "material-ui/styles/spacing";

import { syncReduxAndRouter } from "redux-simple-router";

import HomeContainer from "pages/home/home-container";
import WelcomePage from "pages/welcome";
import LoginForm from "pages/login-form";
import SignupForm from "pages/signup-form";
import RecoverForm from "pages/recover-form";
import Page from "pages/page";
import Profile from "pages/profile";
import Posts from "pages/posts";
import Account from "pages/account";
import Messages from "pages/messages";

import { Provider } from "react-redux";

import store from "store";

import actions from "action-creators";

import { frFR } from "translations";

syncReduxAndRouter(browserHistory, store);

function redirectToHomePage(_nextState, replaceState) {
    if (store.getState().currentToken) {
        replaceState(null, "/");
    }
}

function redirectToLoginPage(_nextState, replaceState) {
    if (!store.getState().currentToken) {
        replaceState(null, "/welcome/login");
    }
}

store.dispatch(actions.translations.add("fr-FR", frFR));

const Application = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object,
        translation: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: getMuiTheme({
                spacing: Spacing,
                fontFamily: "Roboto, sans-serif",
                palette: {
                    primary1Color: indigo400,
                    primary2Color: cyan700,
                    primary3Color: grey400,
                    accent1Color: orangeA700,
                    accent2Color: grey100,
                    accent3Color: grey500,
                    textColor: darkBlack,
                    alternateTextColor: white,
                    canvasColor: white,
                    borderColor: grey300,
                    disabledColor: fade(darkBlack, 0.3)
                }
            }),
            translation: store.getState().translations.get("fr-FR")
        };
    },

    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/welcome" component={WelcomePage} onEnter={redirectToHomePage}>
                    <Route path="login" component={LoginForm} />
                    <Route path="recover" component={RecoverForm} />
                    <Route path="signup" component={SignupForm} />
                </Route>

                <Route path="/" component={HomeContainer} onEnter={redirectToLoginPage}>
                    <Route component={Page}>
                        <IndexRoute component={Posts} />
                    </Route>

                    <Route path="/account" component={Account} />
                    <Route path="/messages" component={Messages} />
                    <Route path=":pageId" component={Page}>
                        <IndexRoute component={Posts} />

                        <Route path="profile" component={Profile} />
                    </Route>
                </Route>
            </Router>
        );
    }
});

ReactDOM.render(
    <Provider store={store}>
        <Application />
    </Provider>
, document.getElementById("application"));
