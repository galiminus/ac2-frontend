import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';

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
import Settings from 'components/settings';

import { Provider } from 'react-redux';

import store from 'store';
import api from 'api';

import actionCreators from 'action-creators';

/* this doesn't seem to work with import */
const colors = require('material-ui/styles/colors');

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
        const palette = {};

        if (this.props.settings.data) {
            const paletteSettings = this.props.settings.data.palette || {};
            for (const category of Object.keys(paletteSettings)) {
                palette[category] = colors[paletteSettings[category]];
            }
        }

        return {
            muiTheme: getMuiTheme({
                spacing: Spacing,
                fontFamily: 'Roboto, sans-serif',
                palette
            })
        };
    },

    componentWillMount() {
        api.settings.getCurrent()
            .then((settings) => {
                this.props.addResource(settings);
            });
    },

    componentWillReceiveProps(props) {
        /* side effect here */
        if (props.settings.data) {
            document.title = props.settings.data.site.title;
        }
    },

    renderRouter() {
        if (this.router) {
            return (this.router);
        }

        this.router = (
            <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
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
                    <Route path="settings/:category" component={Settings} />

                    <Route path=":pageId/profile" component={PageContainer}>
                        <IndexRoute component={Profile} />
                    </Route>

                    <Route path=":pageId" component={PageContainer}>
                        <IndexRoute component={MessagesContainer} />
                    </Route>
                </Route>
            </Router>
        );
        return (this.router);
    },

    render() {
        if (!this.props.settings.data) {
            return (<CircularProgress style={{ position: 'absolute', top: '40%', left: '50%', marginLeft: -25 }} />);
        }

        return (
            this.renderRouter()
        );
    }
});

const ConnectedApplication = connect(mapStateToProps, actionCreators)(Application);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApplication />
    </Provider>
, document.getElementById('application'));
