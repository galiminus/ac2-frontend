import React, { PropTypes } from "react";

function getStyles() {
    const styles = {
        root: {
            fontSize: 12,
            marginLeft: 8,
            color: "#666",
            fontWeight: 500
        }
    };
    return (styles);
}

const PlusCounter = React.createClass({
    propTypes: {
        count: PropTypes.number.isRequired,
        style: PropTypes.object
    },

    render() {
        const styles = getStyles();

        return (
            <span style={Object.assign(styles.root, this.props.style)}>
                {`+${this.props.count.toString()}`}
            </span>
        );
    }
});

export default PlusCounter;
