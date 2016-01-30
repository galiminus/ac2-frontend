import React, { PropTypes } from "react";
import { connect } from "react-redux";
import actionCreators from "action-creators";

import api from "api";
import { InfoBanner } from "components";

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
        return (
            <div>
                <InfoBanner page={this.props.page} main={this.props.params.pageId === undefined} />
                <div style={{ paddingTop: 90 }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Page);
