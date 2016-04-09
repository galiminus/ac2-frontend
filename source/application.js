import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import ReactDOM from "react-dom";

import { Router, Route, IndexRoute, browserHistory } from "react-router";

import ThemeManager from "material-ui/lib/styles/theme-manager";
import Colors from "material-ui/lib/styles/colors";
import ColorManipulator from "material-ui/lib/utils/color-manipulator";
import Spacing from "material-ui/lib/styles/spacing";

import { syncReduxAndRouter } from "redux-simple-router";

import HomePage from "pages/home";
import WelcomePage from "pages/welcome";
import LoginForm from "pages/login-form";
import SignupForm from "pages/signup-form";
import RecoverForm from "pages/recover-form";
import Page from "pages/page";
import Profile from "pages/profile";
import Posts from "pages/posts";
import Account from "pages/account";
import Messages from "pages/messages";

import _FlexBoxGrid from "flexboxgrid-with-hide";

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
            muiTheme: ThemeManager.getMuiTheme({
                spacing: Spacing,
                fontFamily: "Roboto, sans-serif",
                palette: {
                    primary1Color: Colors.indigo400,
                    primary2Color: Colors.cyan700,
                    primary3Color: Colors.grey400,
                    accent1Color: Colors.orangeA700,
                    accent2Color: Colors.grey100,
                    accent3Color: Colors.grey500,
                    textColor: Colors.darkBlack,
                    alternateTextColor: Colors.white,
                    canvasColor: Colors.white,
                    borderColor: Colors.grey300,
                    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
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

                <Route path="/" component={HomePage} onEnter={redirectToLoginPage}>
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
, document.getElementsByTagName("main")[0]);
