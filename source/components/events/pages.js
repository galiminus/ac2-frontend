import React from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import browserHistory from 'react-router/lib/browserHistory';

import PagesContainer from 'components/pages/pages-container';
import PageCreateForm from 'components/pages/page-create-form';
import Events from 'components/events/events';
import MainLayout from 'components/main-layout';

const EventsFactory = React.createFactory(Events);

const EventPages = React.createClass({
    mixins: [PureRenderMixin],

    handleSubmit(resource) {
        browserHistory.push(`/events/${resource.data.attributes.slug}`);
    },

    render() {
        return (
            <MainLayout
                {...this.props}
                baseUrl="/events"
                leftNav={[]}
                tabs={{
                    incoming: (
                        <PagesContainer
                            filters={{ type: 'Page::Event' }}
                            factory={EventsFactory}
                        />
                    ),
                    past: (
                        <PagesContainer
                            filters={{
                                type: 'Page::Event',
                                owner_id: this.context.currentUser.id
                            }}
                            factory={EventsFactory}
                        />
                    ),
                    new: (
                        <PageCreateForm
                            type="Page::Event"
                            onSubmit={this.handleSubmit}
                        />
                    )
                }}
            />
        );
    }
});

export default EventPages;
