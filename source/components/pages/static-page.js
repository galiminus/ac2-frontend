import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Static from 'components/static/static';
import PageContainer from './page-container';

const StaticFactory = React.createFactory(Static);

const StaticPage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <PageContainer
                factory={StaticFactory}
                id={this.props.params.resourceId}
                {...this.props}
            />
        );
    }
});

export default StaticPage;
