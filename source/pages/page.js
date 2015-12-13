import React from "react"
import { connect } from 'react-redux'

import { pages } from "api"
import { InfoBanner } from "components"

function mapStateToProps(state, props) {
    return {
        page: state.pages.get(props.params.pageId)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPage: (id, query) => pages.get(id, query)
    }
}

const Page = React.createClass({
    componentDidMount() {
        this.loadPage(this.props.params.pageId)
    },

    componentWillReceiveProps(newProps) {
        if (this.props.params.pageId != newProps.params.pageId) {
            this.loadPage(newProps.params.pageId)
        }
    },

    loadPage(pageId) {
        if (pageId) {
            this.props.getPage(pageId, { include: "owner" })
        }
    },

    render: function() {
        return (
            <div style={{perspective: 1, transformStyle: "preserve-3d", overflowX: "hidden", overflowY: "scroll", "height": "100vh"}}>
                <InfoBanner page={this.props.params.pageId} />
                <div className="container-fluid" style={{zIndex: 2, background: "white", height: "100%", paddingTop: 12}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)
