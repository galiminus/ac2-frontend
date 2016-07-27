import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import moment from 'moment-twitter';

const CreationDate = React.createClass({
    propTypes: {
        date: PropTypes.object.isRequired,
        style: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        return (<div style={this.props.style}>{moment(this.props.date).twitter()}</div>);
    }
});

export default CreationDate;
