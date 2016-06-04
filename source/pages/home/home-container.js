import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import actionCreators from 'action-creators';
import api from 'api';
import connectToCable from 'components/action-cable';

import Home from './home';

function mapStateToProps(state) {
    let currentUser;
    if (state.currentUser) {
        currentUser = state.users.get(state.currentUser);
    }

    let currentUserPage;
    if (currentUser) {
        currentUserPage = state.pages.get(currentUser.page_id);
    }

    return {
        currentUser,
        currentUserPage,
        currentToken: state.tokens.get(state.currentToken),
        leftNav: state.leftNav
    };
}

const HomeContainer = React.createClass({
    propTypes: {
        toggleLeftNav: PropTypes.func.isRequired,
        setCurrentUser: PropTypes.func.isRequired,
        addResource: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        leftNav: PropTypes.bool.isRequired,
        children: PropTypes.object.isRequired,
        currentToken: PropTypes.object,
        currentUser: PropTypes.object
    },

    childContextTypes: {
        currentUserPage: PropTypes.object
    },

    getDefaultProps() {
        return {
            currentUserPage: {
                presence: 'connected',
                data: {
                    personal_informations: {
                        full_name: '',
                        user_name: ''
                    }
                }
            }
        };
    },

    getChildContext() {
        return ({
            currentUserPage: this.props.currentUserPage
        });
    },

    componentDidMount() {
        api.users.me({ include: 'page' }).then((response) => {
            this.props.setCurrentUser(response.data.id);
            this.props.addResource(response);
        });
    },

    componentWillReceiveProps(props) {
        if (props.currentUser && (props.currentUser !== this.props.currentUser)) {
            api.pages.update(props.currentUser.page_id, { presence: 'available' });
        }
    },

    getChannels() {
        return (['PagesChannel']);
    },

    handleMessage(message) {
        if (message) {
            this.props.addResource(message);
        }
    },

    render() {
        return (
            <Home
                toggleLeftNav={this.props.toggleLeftNav}
                children={this.props.children}
                leftNav={this.props.leftNav}
                isDisconnected={!this.props.currentToken}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(connectToCable(HomeContainer));
