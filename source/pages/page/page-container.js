import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import actionCreators from 'action-creators';

import api from 'api';

import PageRouter from './page-router';

function mapStateToProps(state, props) {
    let currentUser;
    if (state.currentUser) {
        currentUser = state.users.get(state.currentUser);
    }

    let currentUserPage;
    if (currentUser) {
        currentUserPage = state.pages.get(currentUser.page_id);
    }

    return {
        currentUserPage,
        page: state.pages.get(props.params.pageId)
    };
}

const PageContainer = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        setCurrentPage: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object,
        page: PropTypes.object
    },

    getDefaultProps() {
        return ({
            page: { type: 'main_pages' }
        });
    },

    componentDidMount() {
        this.loadPage(this.props.params.pageId);
    },

    componentWillReceiveProps(newProps) {
        if (newProps.params.pageId !== this.props.params.pageId) {
            this.loadPage(newProps.params.pageId);
        }
    },

    loadPage(pageId) {
        if (pageId) {
            api.pages.get(pageId).then((response) => {
                this.props.setCurrentPage(response.data.id);
                this.props.addResource(response);
            });
        } else {
            this.props.setCurrentPage('main');
        }
    },

    render() {
        return (<PageRouter {...this.props} />);
    }
});

export default connect(mapStateToProps, actionCreators)(PageContainer);
