import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';
import { ToolbarTitle } from 'material-ui';

function mapStateToProps(state) {
    return ({
        title: state.title
    });
}

const CurrentPageTitle = React.createClass({
    propTypes: {
        title: PropTypes.string.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        const style = {
            fontFamily: this.context.muiTheme.fontFamily,
            fontWeight: 400,
            color: '#ffffff'
        };
        return (
            <ToolbarTitle style={style} text={this.props.title} />
        );
    }
});

export default connect(mapStateToProps)(CurrentPageTitle);
