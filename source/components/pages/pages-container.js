import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import api from 'api';

import ResourcesContainer from 'components/resources-container';

function mapStateToProps(state, props) {
    if (props.model) {
        return ({ state: state.pagesByType.get(props.model) });
    }
    return (state.pages);
}

const PagesContainer = React.createClass({
    propTypes: {
        pages: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ResourcesContainer {...this.props} find={api.pages.find} resources={this.props.pages} />
        );
    }
});

export default connect(mapStateToProps)(PagesContainer);
