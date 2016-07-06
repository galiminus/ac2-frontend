import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import actionCreators from 'action-creators';

import api from 'api';

import MessagePage from './message-page';
import StaticPage from './static-page';

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

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            page: { type: 'Page::Main' }
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
        if (this.props.page.type === 'Page::Main' ||
            this.props.page.type.match(/^Page::Profile/)) {
            return (<MessagePage {...this.props} />);
        } else if (this.props.page.type.match(/^Page::Static/)) {
            return (<StaticPage { ...this.props} />);
        }

        return (<div />);
    }
});

export default connect(mapStateToProps, actionCreators)(PageContainer);
