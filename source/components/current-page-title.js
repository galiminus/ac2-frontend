import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';
import { ToolbarTitle } from 'material-ui';

function mapStateToProps(state) {
    return ({
        title: state.title
    });
}

const style = {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    color: '#ffffff'
};

const CurrentPageTitle = React.createClass({
    propTypes: {
        title: PropTypes.string.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ToolbarTitle style={style} text={this.props.title} />
        );
    }
});

export default connect(mapStateToProps)(CurrentPageTitle);
