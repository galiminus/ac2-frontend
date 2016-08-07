import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Group from 'components/groups/group';
import PageContainer from 'components/pages/page-container';
import MainLayout from 'components/main-layout';

const GroupFactory = React.createFactory(Group);

const GroupPage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <MainLayout>
                <PageContainer
                    factory={GroupFactory}
                    id={this.props.params.resourceId}
                    {...this.props}
                />
            </MainLayout>
        );
    }
});

export default GroupPage;
