import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';

import { ToolbarTitle } from 'material-ui';

function mapStateToProps(state) {
    if (state.settings && state.settings.data) {
        return ({
            title: state.settings.data.site.title
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
        return ({ title: '' });
    },

    render() {
        return (
            <ToolbarTitle
                style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    color: 'rgb(204, 150, 116)',
                    paddingRight: 0,
                    textDecoration: 'none'
                }}
                text={this.props.title}
            />
        );
    }
});

export default connect(mapStateToProps)(ToolbarLogo);
