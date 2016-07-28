import React, { PropTypes } from 'react';

const InputTitle = React.createClass({
    propTypes: {
        children: PropTypes.object.isRequired
    },

    render() {
        return (
            <span
                style={{
                    fontSize: 12,
                    color: 'rgba(0, 0, 0, 0.498039)'
                }}
            >
                {this.props.children}
            </span>
        );
    }
});

export default InputTitle;
