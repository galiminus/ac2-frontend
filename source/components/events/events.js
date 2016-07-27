import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Link from 'components/link';

import InfoButton from 'material-ui/svg-icons/action/info';
import IconButton from 'material-ui/IconButton';

import FloatingActionButton from 'components/floating-action-button';
import CreateContentIcon from 'material-ui/svg-icons/action/note-add';

import PageAvatar from 'components/pages/page-avatar';
import PagesGridList from 'components/pages/pages-grid-list';
import PagesGridTile from 'components/pages/pages-grid-tile';

import Loader from 'components/loader';

const Events = React.createClass({
    propTypes: {
        resources: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    renderResources() {
        return (
            this.props.resources.valueSeq().map(page =>
                <PagesGridTile
                    key={page.id}
                    page={page}
                    banner={"https://placeimg.com/640/480/any"}
                    title={
                        <Link to={`/events/${page.slug}`} onBlack>
                            <PageAvatar page={page} />
                            {page.title}
                        </Link>
                    }
                    actionIcons={[
                        <Link to={`/events/${page.slug}/infos`} onBlack>
                            <IconButton>
                                <InfoButton color="#fff" />
                            </IconButton>
                        </Link>
                    ]}
                />
            )
        );
    },

    render() {
        return (
            <Loader {...this.props}>
                <PagesGridList>
                    {this.renderResources()}
                </PagesGridList>
                <FloatingActionButton href={`/pages/new?model=Page::Event`}>
                    <CreateContentIcon />
                </FloatingActionButton>
            </Loader>
        );
    }
});

export default Events;
