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
        page: PropTypes.object,
        children: PropTypes.node.isRequired
    },

    componentDidMount() {
        this.loadPage(this.props.params.pageId);
    },

    componentWillReceiveProps(newProps) {
        if (this.props.params.pageId !== newProps.params.pageId) {
            this.loadPage(newProps.params.pageId);
        }
    },

    loadPage(pageId) {
        if (pageId) {
            api.pages.get(pageId, { include: "owner" }).then(this.props.addResource);
        }
    },

    render() {
        return (<div>{this.props.children}</div>);
    }
});

export default connect(mapStateToProps, actionCreators)(Page);
