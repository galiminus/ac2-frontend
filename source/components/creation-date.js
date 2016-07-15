import React, { PropTypes } from 'react';

import moment from 'moment-twitter';

const style = {};

const CreationDate = React.createClass({
    propTypes: {
        date: PropTypes.object.isRequired,
        style: PropTypes.object
    },

    render() {
        return (<div style={Object.assign(style, this.props.style)}>{moment(this.props.date).twitter()}</div>);
    }
});

export default CreationDate;
