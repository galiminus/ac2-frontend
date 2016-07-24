import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import InfiniteScroll from 'redux-infinite-scroll';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import CSSModules from 'react-css-modules';
import styles from './loader';

import List from 'material-ui/List';

const Loader = React.createClass({
    propTypes: {
        loadingMore: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        hasMore: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <List>
                <InfiniteScroll
                    elementIsScrollable={false}
                    loadMore={this.props.onLoadMore}
                    hasMore={this.props.hasMore}
                    loadingMore={this.props.loadingMore}
                    styleName="loader"
                    loader={
                        <div
                            style={{
                                position: 'relative',
                                margin: '60px auto 30px auto',
                                width: 50
                            }}
                        >
                            <RefreshIndicator
                                size={50}
                                top={0}
                                left={0}
                                loadingColor="#ff9800"
                                status="loading"
                                style={{
                                    position: 'relative',
                                    display: 'inline-block'
                                }}
                            />
                        </div>
                    }
                >
                    {this.props.children}
                </InfiniteScroll>
            </List>
        );
    }
});

export default CSSModules(Loader, styles);
