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

import StaticPage from 'components/pages/static-page';
import Settings from 'components/settings';

import NotFoundPage from 'components/not-found-page';

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
        settings: state.settings,
        schemas: state.schemas
    });
}

const Application = React.createClass({
    propTypes: {
        settings: PropTypes.object.isRequired,
        schemas: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        pages: PropTypes.array.isRequired
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
        api.settings.getCurrent({ include: 'schema' }).then((settings) => {
            this.props.addResource(settings);
        });

        api.schemas.find().then((resources) => {
            this.props.addResource(resources);
        });
    },

    componentWillReceiveProps(props) {
        /* side effect here */
        if (props.settings.data) {
            document.title = props.settings.data.site.title;
        }
    },

    renderPagesRoutes() {
        return (
            this.props.pages.map(resource => {
                const pages = require(`components/${resource}/pages`);
                return (
                    <Route key={`${resource}-pages`} path={resource} component={pages} />
                );
            })
        );
    },

    renderPageNewRoutes() {
        return (
            this.props.pages.map(resource => {
                const pageNew = require(`components/${resource}/new`);
                return (
                    <Route key={`${resource}-new`} path={`${resource}/new`} component={pageNew} />
                );
            })
        );
    },

    renderMessagePagesRoutes() {
        return (
            this.props.pages.map(resource => {
                const messagesPage = require(`components/${resource}/messages-page`);
                return (
                    <Route key={`${resource}-messages-page`} path={`${resource}/:resourceId`} component={messagesPage} />
                );
            })
        );
    },

    renderPageRoutes() {
        return (
            this.props.pages.map(resource => {
                const page = require(`components/${resource}/page`);
                return (
                    <Route key={`${resource}-page`} path={`${resource}/:resourceId/infos`} component={page} />
                );
            })
        );
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

                    <Route path="settings/:category" component={Settings} />
                    <Route path="statics/:resourceId" component={StaticPage} />

                    {this.renderPagesRoutes()}
                    {this.renderPageNewRoutes()}
                    {this.renderMessagePagesRoutes()}
                    {this.renderPageRoutes()}

                    <Route path="*" component={NotFoundPage} />
                </Route>
            </Router>
        );

        return (this.router);
    },

    render() {
        if (!this.props.settings.data || this.props.schemas.size === 0) {
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
        <ConnectedApplication pages={['profiles', 'events', 'groups']} />
    </Provider>
, document.getElementById('application'));
