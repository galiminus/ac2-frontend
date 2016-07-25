import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import MoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

const defaultProps = {
    style: {}
};

const Loader = React.createClass({
    propTypes: {
        loadingMore: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        hasMore: PropTypes.bool.isRequired,
        style: PropTypes.object
    },

    contextTypes: {
        muiTheme: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    render() {
        const border = 40;
        const size = 60;

        return (
            <div style={{ width: '100%' }}>
                <List style={this.props.style}>
                    {this.props.children}
                </List>
                <div style={{ textAlign: 'center' }}>
                    {this.props.hasMore && !this.props.loadingMore &&
                        <IconButton
                            onTouchTap={this.props.onLoadMore}
                            style={{
                                width: border + size,
                                height: border + size
                            }}
                            iconStyle={{
                                width: size,
                                height: size,
                                background: '#fff',
                                borderRadius: size / 2,
                                boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
                            }}
                        >
                            <MoreIcon />
                        </IconButton>
                    }
                    {this.props.loadingMore &&
                        <div
                            style={{
                                position: 'relative',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: border / 2,
                                marginBottom: border / 2,
                                width: size
                            }}
                        >
                            <RefreshIndicator
                                size={size}
                                top={0}
                                left={0}
                                loadingColor={this.context.muiTheme.palette.accent1Color}
                                status="loading"
                                style={{
                                    position: 'relative',
                                    display: 'inline-block'
                                }}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }
});

export default Loader;
