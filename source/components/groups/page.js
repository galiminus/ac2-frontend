import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Group from 'components/groups/group';
import PageContainer from 'components/pages/page-container';

const GroupFactory = React.createFactory(Group);

const GroupPage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <PageContainer
                {...this.props}
                factory={GroupFactory}
                id={this.props.params.resourceId}
                storeName="groups"
            />
        );
    }
});

export default GroupPage;