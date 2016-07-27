import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import MoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import CheckIcon from 'material-ui/svg-icons/navigation/check';

import LoaderIcon from 'components/loader-icon';

const defaultProps = {
    style: {},
    loaderTop: false,
    endIconThreshold: 20
};

const Loader = React.createClass({
    propTypes: {
        resources: PropTypes.object.isRequired,
        loaderTop: PropTypes.bool.isRequired,
        loadingMore: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        hasMore: PropTypes.bool.isRequired,
        endIconThreshold: PropTypes.number.isRequired,
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

        const loadingStyle = {
            marginTop: border / 2,
            marginBottom: border / 2,
            width: size,
            display: 'inline-block'
        };

        const {
            resources, endIconThreshold, hasMore, loadingMore, onLoadMore, style, children, loaderTop
        } = this.props;

        let marginTop = 0;
        if (resources.size === 0 && !loaderTop) {
            marginTop = `calc(38% - ${(size / 2)}px)`;
        }

        return (
            <div style={{ width: '100%' }}>
                <div style={style}>
                    {children}
                </div>
                <div style={{ textAlign: 'center', marginTop }}>
                    {resources.size === 0 && !hasMore && !loadingMore &&
                        <LoaderIcon
                            size={size}
                            border={border}
                            comment={this.context.translation.t('labels.noRecords')}
                            onTouchTap={onLoadMore}
                            icon={<RefreshIcon />}
                        />
                    }
                    {hasMore && !loadingMore &&
                        <LoaderIcon
                            size={size}
                            border={border}
                            onTouchTap={onLoadMore}
                            icon={<MoreIcon />}
                        />
                    }
                    {resources.size > endIconThreshold && !hasMore && !loadingMore &&
                        <LoaderIcon
                            size={size}
                            border={border}
                            icon={<CheckIcon />}
                        />
                    }
                    {resources.size <= endIconThreshold && !hasMore && !loadingMore &&
                        <div style={{ height: border + size }} />
                    }
                    {loadingMore &&
                        <div style={loadingStyle}>
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
