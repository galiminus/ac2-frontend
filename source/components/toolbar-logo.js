import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import { ToolbarTitle } from 'material-ui';

import { Link } from 'react-router';

const style = {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    letterSpacing: 3,
    color: 'rgb(204, 150, 116)',
    paddingRight: 0,
    textDecoration: 'none'
};

function mapStateToProps(state) {
    if (state.settings && state.settings.data) {
        return ({
            title: state.settings.data.title
        });
    }
    return ({});
}

const ToolbarLogo = React.createClass({
    propTypes: {
        title: PropTypes.string.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            title: ''
        });
    },

    render() {
        return (
            <ToolbarTitle
                style={style}
                text={this.props.title}
                {...this.props}
            />
        );
    }
});

export default connect(mapStateToProps)(ToolbarLogo);
