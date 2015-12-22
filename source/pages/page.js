import React, { PropTypes } from "react";
import { connect } from "react-redux";

import { pages } from "api";
import { InfoBanner } from "components";

function mapStateToProps(state, props) {
    return {
        page: state.pages.get(props.params.pageId)
    };
}

function mapDispatchToProps() {
    return {
        getPage: (id, query) => pages.get(id, query)
    };
}

const Page = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired,
        getPage: PropTypes.func.isRequired,
        page: PropTypes.object.isRequired,
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
            this.props.getPage(pageId, { include: "owner" });
        }
    },

    render() {
        return (
            <div>
                <InfoBanner page={this.props.page} main={this.props.params.pageId === undefined} />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
