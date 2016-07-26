import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';
import ResponsiveMixin from 'react-responsive-mixin';

import Link from 'components/link';

import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import IconButton from 'material-ui/IconButton';

import PageAvatar from 'components/pages/page-avatar';
import { GridList, GridTile } from 'material-ui/GridList';

import Loader from 'components/loader';

const style = {
    gridList: {
        marginTop: 20,
        marginBottom: 20
    },
    gridListPadding: 4
};

const phoneScreenStyle = {
    ...style,
    gridList: {
        ...style.gridList,
        marginTop: 0,
        marginBottom: 0
    },
    gridListPadding: 0
};

const Profiles = React.createClass({
    propTypes: {
        resources: PropTypes.object,
        onLoadMore: PropTypes.func.isRequired,
        hasMore: PropTypes.bool.isRequired,
        loadingMore: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin, ResponsiveMixin],

    getInitialState() {
        return ({ style });
    },

    componentDidMount() {
        this.media({ minWidth: 480 }, () => this.setState({ style }));
        this.media({ maxWidth: 480 }, () => this.setState({ style: phoneScreenStyle }));
    },

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
                    style={this.state.style.gridList}
                    padding={this.state.style.gridListPadding}
                >
                    {this.renderProfiles()}
                </GridList>
            </Loader>
        );
    }
});

export default Profiles;
