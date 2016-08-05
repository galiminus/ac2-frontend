import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { Tabs, Tab } from 'material-ui/Tabs';

import browserHistory from 'react-router/lib/browserHistory';

import PagesContainer from 'components/pages/pages-container';
import PageCreateForm from 'components/pages/page-create-form';
import Events from 'components/events/events';

const EventsFactory = React.createFactory(Events);

const EventPages = React.createClass({
    propTypes: {
        location: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    handleSubmit(resource) {
        browserHistory.push(`/events/${resource.data.attributes.slug}`);
    },

    handleActive(path) {
        browserHistory.push('/events' + path);
    },

    activeIndex() {
        if (this.props.location.pathname.match(/\/past$/)) {
            return (1);
        }

        if (this.props.location.pathname.match(/\/new$/)) {
            return (2);
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
                    label={this.context.translation.t('links.events.incoming')}
                    onActive={() => this.handleActive('/')}
                >
                    <PagesContainer
                        filters={{ type: 'Page::Event' }}
                        factory={EventsFactory}
                    />
                </Tab>
                <Tab
                    label={this.context.translation.t('links.events.past')}
                    onActive={() => this.handleActive('/past')}
                >
                    <PagesContainer
                        filters={{
                            type: 'Page::Event',
                            owner_id: this.context.currentUser.id
                        }}
                        factory={EventsFactory}
                    />
                </Tab>
                <Tab
                    label={this.context.translation.t('links.events.new')}
                    onActive={() => this.handleActive('/new')}
                >
                    <PageCreateForm
                        type="Page::Event"
                        onSubmit={this.handleSubmit}
                    />
                </Tab>
            </Tabs>
        );
    }
});

export default EventPages;
