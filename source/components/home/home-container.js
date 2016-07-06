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
        leftNav: state.leftNav,
        translation: state.translations.get(state.currentLocale)
    };
}

const HomeContainer = React.createClass({
    propTypes: {
        toggleLeftNav: PropTypes.func.isRequired,
        setCurrentUser: PropTypes.func.isRequired,
        addResource: PropTypes.func.isRequired,
        removeJSONAPIResource: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object,
        leftNav: PropTypes.bool.isRequired,
        children: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        currentToken: PropTypes.object,
        currentUser: PropTypes.object
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
        return ([
            'PagesChannel', 'MessagesChannel', 'CommentsChannel', 'LikesChannel', 'MessagesChannel'
        ]);
    },

    handleMessage(message) {
        if (message) {
            switch (message.meta.action) {
            case 'create':
            case 'update':
                this.props.addResource(message);
                break;
            case 'destroy':
                this.props.removeJSONAPIResource(message.data);
                break;
            default:
                break;
            }
        }
    },

    render() {
        return (
            <Home
                toggleLeftNav={this.props.toggleLeftNav}
                children={this.props.children}
                leftNav={this.props.leftNav}
                isDisconnected={!this.props.currentToken}
                currentUserPage={this.props.currentUserPage}
                translation={this.props.translation}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(connectToCable(HomeContainer));
