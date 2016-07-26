import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import CSSModules from 'react-css-modules';
import styles from './profiles.css';

import Link from 'components/link';

import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import IconButton from 'material-ui/IconButton';

import PageAvatar from 'components/pages/page-avatar';
import { GridList, GridTile } from 'material-ui/GridList';

import Loader from 'components/loader';

const Profiles = React.createClass({
    propTypes: {
        resources: PropTypes.object,
        onLoadMore: PropTypes.func.isRequired,
        hasMore: PropTypes.bool.isRequired,
        loadingMore: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    renderProfiles() {
        return (
            this.props.resources.valueSeq().map(page =>
                <GridTile
                    key={page.id}
                    titleBackground="rgba(0, 0, 0, 0.9)"
                    title={
                        <Link to={`/messages/${page.slug}`} onBlack>
                            <PageAvatar page={page} />
                            {page.title}
                        </Link>
                    }
                    actionIcon={
                        <div>
                            <Link to={`/profiles/${page.slug}`} onBlack>
                                <IconButton>
                                    <AccountIcon color="#fff" />
                                </IconButton>
                            </Link>
                        </div>
                    }
                >
                    <img src="https://placeimg.com/640/480/any" />
                </GridTile>
            )
        );
    },

    render() {
        return (
            <Loader
                onLoadMore={this.props.onLoadMore}
                hasMore={this.props.hasMore}
                loadingMore={this.props.loadingMore}
            >
                <GridList
                    style={{ marginTop: 20, marginBottom: 20 }}
                >
                    {this.renderProfiles()}
                </GridList>
            </Loader>
        );
    }
});

export default CSSModules(Profiles, styles);
