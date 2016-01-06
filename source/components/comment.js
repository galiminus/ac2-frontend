import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import Colors from "material-ui/lib/styles/colors";

import UserAvatar from "components/user-avatar";

function mapStateToProps(state, props) {
    return {
        sender: state.pages.get(props.comment.sender_id)
    };
}

const Comment = React.createClass({
    propTypes: {
        sender: PropTypes.object.isRequired,
        comment: PropTypes.object.isRequired
    },

    getDefaultProps() {
        return {
            sender: { id: null }
        };
    },

    render() {
        const userLinkStyle = {
            textDecoration: "none",
            fontWeight: "bold",
            color: Colors.indigo600,
            display: "block",
            padding: 0,
            marginBottom: 2
        };

        switch (this.props.sender.data_type) {
        case "user":
            return (
                <div className="row middle-xs">
                    <div>
                        <UserAvatar page={this.props.sender} />
                    </div>
                    <div className="col-xs">
                        <p>
                            <Link to={`/${this.props.sender.id}`} style={userLinkStyle} className="col-xs-2">
                                {this.props.sender.data.personal_informations.full_name}
                            </Link>
                            {this.props.comment.data.body}
                        </p>
                    </div>
                </div>
            );

        default:
            return (<div />);
        }
    }
});

export default connect(mapStateToProps)(Comment);
