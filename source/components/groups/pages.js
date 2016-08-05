import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { Tabs, Tab } from 'material-ui/Tabs';

import browserHistory from 'react-router/lib/browserHistory';

import PagesContainer from 'components/pages/pages-container';
import PageCreateForm from 'components/pages/page-create-form';
import Groups from 'components/groups/groups';

const GroupsFactory = React.createFactory(Groups);

const GroupPages = React.createClass({
    propTypes: {
        location: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    handleSubmit(resource) {
        browserHistory.push(`/groups/${resource.data.attributes.slug}`);
    },

    handleActive(path) {
        browserHistory.push('/groups' + path);
    },

    activeIndex() {
        if (this.props.location.pathname.match(/\/new$/)) {
            return (1);
        }

        return (0);
    },

    render() {
        return (
            <Tabs
                tabItemContainerStyle={{
                    backgroundColor: 'transparent'
                }}
                contentContainerStyle={{
                    marginTop: 12
                }}
                inkBarStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.6)'
                }}
                initialSelectedIndex={this.activeIndex()}
            >
                <Tab
                    label={this.context.translation.t('links.groups.all')}
                    onActive={() => this.handleActive('/')}
                >
                    <PagesContainer
                        filters={{ type: 'Page::Group' }}
                        factory={GroupsFactory}
                    />
                </Tab>
                <Tab
                    label={this.context.translation.t('links.groups.new')}
                    onActive={() => this.handleActive('/new')}
                >
                    <PageCreateForm
                        type="Page::Group"
                        onSubmit={this.handleSubmit}
                    />
                </Tab>
            </Tabs>
        );
    }
});

export default GroupPages;
