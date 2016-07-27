import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';
import ResponsiveMixin from 'react-responsive-mixin';

import RefreshIndicator from 'material-ui/RefreshIndicator';

import { connect } from 'react-redux';

import Link from 'components/link';

import MaterialFloatingActionButton from 'material-ui/FloatingActionButton';

const style = {
    button: {
        position: 'fixed',
        bottom: 24,
        right: 328,
        animation: 'slideup 2s'
    },

    visible: {
        opacity: 1
    },

    invisible: {
        opacity: 0,
        visibility: 'hidden'
    }
};

const phoneScreenStyle = {
    ...style,
    button: {
        ...style.button,
        right: 28
    }
};

function mapStateToProps(state) {
    return ({
        visible: !state.formFocused
    });
}

const FloatingActionButton = React.createClass({
    propTypes: {
        children: PropTypes.node.isRequired,
        onMouseUp: PropTypes.func,
        href: PropTypes.string,
        visible: PropTypes.bool.isRequired,
        loading: PropTypes.bool
    },

    mixins: [PureRenderMixin, ResponsiveMixin],

    getInitialState() {
        return ({ style });
    },

    componentDidMount() {
        this.media({ minWidth: 800 }, () => this.setState({ style }));
        this.media({ maxWidth: 800 }, () => this.setState({ style: phoneScreenStyle }));
    },

    renderLink() {
        return (
            <Link to={this.props.href}>
                <MaterialFloatingActionButton
                    style={{
                        ...this.state.style.button,
                        ...(this.props.visible ? this.state.style.visible : this.state.style.invisible)
                    }}
                >
                    {this.props.children}
                </MaterialFloatingActionButton>
            </Link>
        );
    },

    renderButton() {
        return (
            <MaterialFloatingActionButton
                style={{
                    ...this.state.style.button,
                    ...(this.props.visible ? this.state.style.visible : this.state.style.invisible)
                }}
                onMouseUp={this.props.onMouseUp}
                href={this.props.href}
            >
                {this.props.children}
            </MaterialFloatingActionButton>
        );
    },

    renderLoading() {
        return (
            <div style={this.state.style.button}>
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
        if (this.props.loading) {
            return (this.renderLoading());
        }

        if (this.props.href) {
            return (this.renderLink());
        }

        return (this.renderButton());
    }
});

export default connect(mapStateToProps)(FloatingActionButton);
