import React, { PropTypes } from "react";
import { connect } from "react-redux";
import actionCreators from "action-creators";

import api from "api";

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
        page: PropTypes.object,
        children: PropTypes.node.isRequired
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
            this.props.setCurrentPage("main");
        }
    },

    render() {
        return (this.props.children);
    }
});

export default connect(mapStateToProps, actionCreators)(Page);
