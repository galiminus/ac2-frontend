import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';

import ResourceContainer from 'components/resource-container';

import api from 'api';

function mapStateToProps(state, props) {
    return ({
        page: state.pages.get(props.id)
    });
}

const PageContainer = React.createClass({
    propTypes: {
        id: PropTypes.string.isRequired,
        factory: PropTypes.func.isRequired,
        page: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ResourceContainer
                promises={[
                    api.pages.get(this.props.id)
                ]}
                factory={this.props.factory}
                resource={this.props.page}
                {...this.props}
            />
        );
    }
});

export default connect(mapStateToProps)(PageContainer);
