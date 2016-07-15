import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from './floating-action-button.css';

import MaterialFloatingActionButton from 'material-ui/FloatingActionButton';

function mapStateToProps(state) {
    return ({
        visible: !state.formFocused
    });
}

const FloatingActionButton = React.createClass({
    propTypes: {
        children: PropTypes.node.isRequired,
        onMouseUp: PropTypes.func.isRequired,
        visible: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <MaterialFloatingActionButton
                styleName={`floatingActionButton ${this.props.visible ? 'visible' : 'invisible'}`}
                onMouseUp={this.props.onMouseUp}
            >
                {this.props.children}
            </MaterialFloatingActionButton>
        );
    }
});

export default connect(mapStateToProps)(CSSModules(FloatingActionButton, styles, { allowMultiple: true }));
