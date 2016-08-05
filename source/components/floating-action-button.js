import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';
import ResponsiveMixin from 'react-responsive-mixin';

import RefreshIndicator from 'material-ui/RefreshIndicator';

import Link from 'components/link';

import MaterialFloatingActionButton from 'material-ui/FloatingActionButton';

const baseStyle = {
    position: 'fixed',
    bottom: 24,
    right: 328,
    animation: 'slideup 2s'
};

const phoneScreenStyle = {
    ...baseStyle,
    right: 28
};

const FloatingActionButton = React.createClass({
    propTypes: {
        children: PropTypes.node.isRequired,
        style: PropTypes.object,
        onMouseUp: PropTypes.func,
        href: PropTypes.string,
        loading: PropTypes.bool
    },

    mixins: [PureRenderMixin, ResponsiveMixin],

    getInitialState() {
        return ({ style: baseStyle });
    },

    componentDidMount() {
        this.media({ minWidth: 800 }, () => this.setState({ style: baseStyle }));
        this.media({ maxWidth: 800 }, () => this.setState({ style: phoneScreenStyle }));
    },

    renderLink(style) {
        return (
            <Link to={this.props.href}>
                <MaterialFloatingActionButton
                    style={style}
                >
                    {this.props.children}
                </MaterialFloatingActionButton>
            </Link>
        );
    },

    renderButton(style) {
        return (
            <MaterialFloatingActionButton
                tooltip="Ligature"
                style={style}
                onMouseUp={this.props.onMouseUp}
                href={this.props.href}
            >
                {this.props.children}
            </MaterialFloatingActionButton>
        );
    },

    renderLoading(style) {
        return (
            <div style={style}>
                <RefreshIndicator
                    top={0}
                    left={0}
                    size={56}
                    loadingColor="#fff"
                    status="loading"
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        backgroundColor: this.context.muiTheme.palette.primary1Color
                    }}
                />
            </div>
        );
    },

    render() {
        const style = {
            ...this.state.style,
            ...this.props.style
        };

        if (this.props.loading) {
            return (this.renderLoading(style));
        }

        if (this.props.href) {
            return (this.renderLink(style));
        }
        return (this.renderButton(style));
    }
});

export default FloatingActionButton;
