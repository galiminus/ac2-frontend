import React, { PropTypes } from 'react';

import moment from 'moment-twitter';

const CreationDate = React.createClass({
    propTypes: {
        date: PropTypes.object.isRequired,
        style: PropTypes.object
    },

    render() {
        return (<div style={this.props.style}>{moment(this.props.date).twitter()}</div>);
    }
});

export default CreationDate;
