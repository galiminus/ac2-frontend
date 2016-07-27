import React, { PropTypes } from 'react';

import Group from 'components/groups/group';
import PageContainer from 'components/pages/page-container';

const GroupFactory = React.createFactory(Group);

const GroupPage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    render() {
        return (
            <PageContainer
                {...this.props}
                factory={GroupFactory}
                id={this.props.params.resourceId}
                storeName="pages"
            />
        );
    }
});

export default GroupPage;
