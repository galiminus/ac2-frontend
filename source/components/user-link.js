import React, { PropTypes } from "react";
import { indigo600 } from "material-ui/styles/colors";

import { Link } from "react-router";

function getStyles() {
    const styles = {
        root: {
            textDecoration: "none",
            color: indigo600,
            padding: 0,
            marginBottom: 2
        }
    };
    return (styles);
}

const UserLink = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        style: PropTypes.object
    },

    render() {
        const styles = getStyles();

        return (
            <Link to={`/${this.props.page.id}`} style={Object.assign(styles.root, this.props.style)}>
                {this.props.page.data.personal_informations.full_name}
            </Link>
        );
    }
});

export default UserLink;
