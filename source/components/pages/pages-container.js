import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import actionCreators from 'action-creators';

import { connect } from 'react-redux';

import Pages from "./pages";

function mapStateToProps(state) {
    return { pages: state.pages };
}

const PagesContainer = React.createClass({
    propTypes: {
        pages: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Pages {...this.props} />
        );
    }
});

export default connect(mapStateToProps)(PagesContainer);
