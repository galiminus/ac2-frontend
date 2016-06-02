import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import actionCreators from 'action-creators';

import api from 'api';

import PostsContainer from 'pages/posts/posts-container';
import Static from 'pages/static';

function mapStateToProps(state, props) {
    return {
        page: state.pages.get(props.params.pageId)
    };
}

const Page = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        setCurrentPage: PropTypes.func.isRequired,
        page: PropTypes.object
    },

    getDefaultProps() {
        return ({
            page: { type: 'main-pages' }
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
        switch (this.props.page.type) {
        case 'main-pages':
        case 'user-pages':
            return (<PostsContainer {...this.props} />);

        case 'static-pages':
            return (<Static { ...this.props} />);

        default:
            return (<div />);
        }
    }
});

export default connect(mapStateToProps, actionCreators)(Page);
