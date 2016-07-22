import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import actionCreators from 'action-creators';

import api from 'api';

import MessagePage from './message-page';
import StaticPage from './static-page';
import MainPage from './main-page';

function mapStateToProps(state) {
    return {
        page: state.pages.get(state.currentPage)
    };
}

const PageContainer = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        setCurrentPage: PropTypes.func.isRequired,
        translation: PropTypes.object.isRequired,
        pushNotification: PropTypes.func.isRequired,
        setTitle: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object,
        page: PropTypes.object
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            page: {
                type: 'Page::Main'
            }
        });
    },

    componentWillMount() {
        this.loadPage(this.props.params.pageId);
    },

    componentWillReceiveProps(newProps) {
        if (newProps.params.pageId !== this.props.params.pageId) {
            this.loadPage(newProps.params.pageId);
        }
    },

    loadPage(pageId) {
        if (pageId) {
            api.pages.get(pageId, { include: 'schema' })
                .then(
                    (response) => {
                        this.props.addResource(response);
                        this.props.setCurrentPage(response.data.id);
                    },
                    () => {
                        this.props.pushNotification('pages_get_fatal_error');
                    }
                );
        } else {
            this.props.setCurrentPage('main');
        }
    },

    render() {
        if (this.props.params.pageId && this.props.page.type === 'Page::Main') {
            return (<div />);
        }

        if (this.props.page.type === 'Page::Main') {
            return (<MainPage {...this.props} />);
        } else if (this.props.page.type.match(/^Page::Profile/)) {
            return (<MessagePage {...this.props} />);
        } else if (this.props.page.type.match(/^Page::Static/)) {
            return (<StaticPage { ...this.props} />);
        }

        return (<div />);
    }
});

export default connect(mapStateToProps, actionCreators)(PageContainer);
