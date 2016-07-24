import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ResourceContainer from 'components/resource-container';

import api from 'api';

const PageContainer = React.createClass({
    propTypes: {
        id: PropTypes.string.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ResourceContainer {...this.props} get={api.pages.get} id={this.props.id} />
        );
    }
});

export default PageContainer;
