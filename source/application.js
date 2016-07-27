import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import ReactDOM from 'react-dom';

import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import browserHistory from 'react-router/lib/browserHistory';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';

import Spacing from 'material-ui/styles/spacing';

import HomeContainer from 'components/home/home-container';

import WelcomePage from 'components/welcome/welcome';
import LoginForm from 'components/welcome/login-form';
import SignupForm from 'components/welcome/signup-form';
import RecoverForm from 'components/welcome/recover-form';

import MainPage from 'components/pages/main-page';
import QuizzPage from 'components/pages/quizz-page';
import PollsPage from 'components/pages/polls-page';

import ProfileMessagesPage from 'components/pages/profile-messages-page';
import EventMessagesPage from 'components/pages/event-messages-page';

import ProfilePage from 'components/pages/profile-page';
import StaticPage from 'components/pages/static-page';
import ProfilePages from 'components/pages/profile-pages';
import EventPages from 'components/pages/event-pages';
import GroupPages from 'components/pages/group-pages';
import PageForm from 'components/pages/page-form';
import Settings from 'components/settings';

import { Provider } from 'react-redux';

import store from 'store';
import api from 'api';

import actionCreators from 'action-creators';

/* this doesn't seem to work with import */
const colors = require('material-ui/styles/colors');

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
        muiTheme: React.PropTypes.object,
        settings: React.PropTypes.object
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
            }),
            settings: this.props.settings
        };
    },

    componentWillMount() {
        api.settings.getCurrent({ include: 'schema' })
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
                    <IndexRoute component={MainPage} />

                    <Route path="quizz" component={QuizzPage} />
                    <Route path="polls" component={PollsPage} />

                    <Route path="profiles" component={ProfilePages} />
                    <Route path="profiles/new" component={PageForm} />
                    <Route path="profiles/:resourceId" component={ProfileMessagesPage} />
                    <Route path="profiles/:resourceId/infos" component={ProfilePage} />

                    <Route path="events" component={EventPages} />
                    <Route path="events/new" component={EventPages} />
                    <Route path="events/:resourceId" component={EventMessagesPage} />
                    <Route path="events/:resourceId/infos" component={ProfileMessagesPage} />

                    <Route path="groups" component={GroupPages} />
                    <Route path="groups/new" component={EventPages} />
                    <Route path="groups/:resourceId" component={EventPages} />
                    <Route path="groups/:resourceId/infos" component={EventPages} />

                    <Route path="settings/:category" component={Settings} />

                    <Route path="statics/:resourceId" component={StaticPage} />
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
