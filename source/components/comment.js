import React, { PropTypes } from "react";
import { connect } from "react-redux";
import {
    ToolbarTitle
} from "material-ui";

import UserAvatar from "components/user-avatar";

function mapStateToProps(state, props) {
    return {
        sender: state.pages.get(props.comment.sender_id)
    };
}

const Comment = React.createClass({
    propTypes: {
        sender: PropTypes.object,
        comment: PropTypes.object.isRequired
    },

    render() {
        let senderInfos;
        if (this.props.sender) {
            switch (this.props.sender.type) {
            case "user_pages":
                senderInfos = (
                    <div>
                        <UserAvatar page={this.props.sender} />
                        <ToolbarTitle text={this.props.sender.data.full_name} />
                    </div>
                );
                break;

            default:
                senderInfos = <div />;
                break;
            }
        }

        return (
            <div style={{ padding: 24 }}>
                {senderInfos}
                {this.props.comment.data.body}
            </div>
        );
    }
});

export default connect(mapStateToProps)(Comment);
