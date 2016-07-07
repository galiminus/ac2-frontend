import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';

import { syncReduxAndRouter } from 'redux-simple-router';

import HomeContainer from 'components/home/home-container';

import WelcomePage from 'components/welcome/welcome';
import LoginForm from 'components/welcome/login-form';
import SignupForm from 'components/welcome/signup-form';
import RecoverForm from 'components/welcome/recover-form';

import PageContainer from 'components/pages/page-container';
import Profile from 'components/profile/profile';
import MessagesContainer from 'components/messages/messages-container';
import ProfilePages from 'components/pages/profile-pages';
import EventPages from 'components/pages/event-pages';
import FriendPages from 'components/pages/friend-pages';

import { Provider } from 'react-redux';

import store from 'store';
import api from 'api';

import actionCreators from 'action-creators';

syncReduxAndRouter(browserHistory, store);

function redirectToHomePage(_nextState, replace) {
    if (store.getState().currentToken) {
        replace('/');
    }
}

function redirectToLoginPage(_nextState, replace) {
    if (!store.getState().currentToken) {
        replace('/welcome/login');
    }
}

function mapStateToProps(state) {
    return ({
        settings: state.settings
    });
}

const Application = React.createClass({
    propTypes: {
        settings: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired
    },

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    mixins: [PureRenderMixin],

    getChildContext() {
        return {
            muiTheme: getMuiTheme({
                spacing: Spacing,
                fontFamily: 'Roboto, sans-serif',
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
            })
        };
    },

    componentWillMount() {
        api.settings.getCurrent()
            .then((settings) => {
                this.props.addResource(settings);
            });
    },

    render() {
        if (!this.props.settings.data) {
            return (<div />)
        }

        return (
            <Router history={browserHistory}>
                <Route path="/welcome" component={WelcomePage} onEnter={redirectToHomePage}>
                    <Route path="login" component={LoginForm} />
                    <Route path="recover" component={RecoverForm} />
                    <Route path="signup" component={SignupForm} />
                </Route>

                <Route path="/" component={HomeContainer} onEnter={redirectToLoginPage}>
                    <Route component={PageContainer}>
                        <IndexRoute component={MessagesContainer} />
                    </Route>

                    <Route path="members" component={ProfilePages} />
                    <Route path="events" component={EventPages} />

                    <Route path=":pageId/profile" component={PageContainer}>
                        <IndexRoute component={Profile} />
                    </Route>

                    <Route path=":pageId" component={PageContainer}>
                        <IndexRoute component={MessagesContainer} />
                        <Route path="friends" component={FriendPages} />
                    </Route>
                </Route>
            </Router>
        );
    }
});

const ConnectedApplication = connect(mapStateToProps, actionCreators)(Application);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApplication />
    </Provider>
, document.getElementById('application'));
