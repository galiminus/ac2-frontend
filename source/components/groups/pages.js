import React from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import browserHistory from 'react-router/lib/browserHistory';

import PagesContainer from 'components/pages/pages-container';
import PageCreateForm from 'components/pages/page-create-form';
import Groups from 'components/groups/groups';
import MainLayout from 'components/main-layout';

const GroupsFactory = React.createFactory(Groups);

const GroupPages = React.createClass({
    mixins: [PureRenderMixin],

    handleSubmit(resource) {
        browserHistory.push(`/groups/${resource.data.attributes.slug}`);
    },

    render() {
        return (
            <MainLayout
                {...this.props}
                baseUrl="/groups"
                tabs={{
                    all: (
                        <PagesContainer
                            filters={{ type: 'Page::Group' }}
                            factory={GroupsFactory}
                        />
                    ),
                    new: (
                        <PageCreateForm
                            type="Page::Group"
                            onSubmit={this.handleSubmit}
                        />
                    )
                }}
            />
        );
    }
});

export default GroupPages;
