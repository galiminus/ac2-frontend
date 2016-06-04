import React, { PropTypes } from 'react';

import moment from 'moment-twitter';

const CreationDate = React.createClass({
    propTypes: {
        date: PropTypes.object.isRequired
    },

    render() {
        return (<div {...this.props}>{moment(this.props.date).twitter()}</div>);
    }
});

export default CreationDate;
