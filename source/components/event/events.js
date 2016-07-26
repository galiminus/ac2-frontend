import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import FloatingActionButton from 'components/floating-action-button';
import CreateContentIcon from 'material-ui/svg-icons/action/note-add';

import EventBanner from 'components/event/event-banner';
import Loader from 'components/loader';

const Events = React.createClass({
    propTypes: {
        resources: PropTypes.object,
        onLoadMore: PropTypes.func.isRequired,
        hasMore: PropTypes.bool.isRequired,
        loadingMore: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    renderEvents() {
        return (
            this.props.resources.valueSeq().map((page) => {
                return (
                    <EventBanner
                        key={page.id}
                        page={page}
                    />
                );
            })
        );
    },

    render() {
        return (
            <div>
                <Loader
                    onLoadMore={this.props.onLoadMore}
                    hasMore={this.props.hasMore}
                    loadingMore={this.props.loadingMore}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}
                >
                    {this.renderEvents()}
                </Loader>
                <FloatingActionButton
                    href={`/pages/new?model=Page::Event`}
                >
                    <CreateContentIcon />
                </FloatingActionButton>
            </div>
        );
    }
});

export default Events;
