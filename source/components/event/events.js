import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import CSSModules from 'react-css-modules';
import styles from './events.css';

import FloatingActionButton from 'components/floating-action-button';
import CreateContentIcon from 'material-ui/svg-icons/action/note-add';

import EventBanner from 'components/event/event-banner';
import Loader from 'components/loader';

const ProfilePagesPage = React.createClass({
    propTypes: {
        pages: PropTypes.object,
        translation: PropTypes.object.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        hasMore: PropTypes.bool.isRequired,
        loadingMore: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    renderEvents() {
        return (
            this.props.pages.valueSeq().map((page) => {
                return (
                    <EventBanner
                        key={page.id}
                        page={page}
                        translation={this.props.translation}
                        compact
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
                    styles={styles}
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

export default CSSModules(ProfilePagesPage, styles);
