import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from './floating-action-button.css';

import { Link } from 'react-router';

import MaterialFloatingActionButton from 'material-ui/FloatingActionButton';

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
        visible: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    renderLink() {
        return (
            <Link to={this.props.href}>
                <MaterialFloatingActionButton
                    styleName={`floatingActionButton ${this.props.visible ? 'visible' : 'invisible'}`}
                >
                    {this.props.children}
                </MaterialFloatingActionButton>
            </Link>
        );
    },

    renderButton() {
        return (
            <MaterialFloatingActionButton
                styleName={`floatingActionButton ${this.props.visible ? 'visible' : 'invisible'}`}
                onMouseUp={this.props.onMouseUp}
                href={this.props.href}
            >
                {this.props.children}
            </MaterialFloatingActionButton>
        );
    },

    render() {
        return (this.props.href ? this.renderLink() : this.renderButton());
    }
});

export default connect(mapStateToProps)(CSSModules(FloatingActionButton, styles, { allowMultiple: true }));
