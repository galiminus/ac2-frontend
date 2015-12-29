import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

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
        switch (this.props.sender.data_type) {
        case "user":
            return (
                <div className="row middle-xs">
                    <div>
                        <UserAvatar page={this.props.sender} />
                    </div>
                    <p className="col-xs">
                        <Link to={`/${this.props.sender.id}`}>{this.props.sender.data.full_name}</Link> {this.props.comment.data.body}
                    </p>
                </div>
            );

        default:
            return (<div />);
        }
    }
});

export default connect(mapStateToProps)(Comment);
