import React, { PropTypes } from 'react';

import Static from 'components/static/static';
import PageContainer from './page-container';

const StaticFactory = React.createFactory(Static);

const StaticPage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    render() {
        return (
            <PageContainer factory={StaticFactory} id={this.props.params.resourceId} {...this.props} />
        );
    }
});

export default StaticPage;
