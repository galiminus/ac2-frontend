import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import Colors from "material-ui/lib/styles/colors";
import Immutable from "immutable";

import { Checkbox } from "material-ui";
import ThumbUpIcon from "material-ui/lib/svg-icons/action/thumb-up";

import api from "api";
import UserAvatar from "components/user-avatar";

function mapStateToProps(state, props) {
    return {
        sender: state.pages.get(props.comment.sender_id),
        likes: state.likes.filter((like) => like.liked_id === props.comment.id)
    };
}

const Comment = React.createClass({
    propTypes: {
        sender: PropTypes.object.isRequired,
        comment: PropTypes.object.isRequired,
        likes: PropTypes.object
    },

    getDefaultProps() {
        return {
            sender: { id: null },
            likes: Immutable.Map({})
        };
    },

    handleLike() {
        api.likes.create({
            liked_id: this.props.comment.id,
            liked_type: "Comment"
        });
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
                <div>
                    <div className="row middle-xs">
                        <div className="col-xs-1 top-xs">
                            <UserAvatar page={this.props.sender} />
                        </div>
                        <div className="col-xs">
                            <p>
                                <Link to={`/${this.props.sender.id}`} style={userLinkStyle}>
                                    {this.props.sender.data.personal_informations.full_name}
                                </Link>
                                {this.props.comment.data.body}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-1"></div>
                        <div className="col-xs">
                            <Checkbox
                                name="checkboxName4"
                                value="checkboxValue4"
                                label={this.props.likes.size.toString()}
                                labelPosition="left"
                                labelStyle={{ marginRight: 8, paddingTop: 3 }}
                                checkedIcon={<ThumbUpIcon />}
                                unCheckedIcon={<ThumbUpIcon />}
                                onCheck={this.handleLike}
                            />

                        </div>
                    </div>
                </div>
            );

        default:
            return (<div />);
        }
    }
});

export default connect(mapStateToProps)(Comment);
