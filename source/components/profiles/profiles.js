import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Link from 'components/link';

import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import IconButton from 'material-ui/IconButton';

import PageAvatar from 'components/pages/page-avatar';
import PagesGridList from 'components/pages/pages-grid-list';
import PagesGridTile from 'components/pages/pages-grid-tile';

import Loader from 'components/loader';

const Profiles = React.createClass({
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
                        <Link to={`/profiles/${page.slug}`} onBlack>
                            <PageAvatar page={page} />
                            {page.title}
                        </Link>
                    }
                    actionIcons={[
                        <Link to={`/profiles/${page.slug}/infos`} onBlack>
                            <IconButton>
                                <AccountIcon color="#fff" />
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
            </Loader>
        );
    }
});

export default Profiles;
