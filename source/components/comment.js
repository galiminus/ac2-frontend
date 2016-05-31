import React, { PropTypes } from "react";
import { connect } from "react-redux";
import Immutable from "immutable";

import { ListItem } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import PlusOneIcon from "material-ui/svg-icons/social/plus-one";

import api from "api";
import PageAvatar from "components/page-avatar";
import PageLink from "components/page-link";
import PlusCounter from "components/plus-counter";

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
        switch (this.props.sender.type) {
        case "user-pages":
            return (
                <ListItem
                    leftAvatar={<PageAvatar page={this.props.sender} />}
                    primaryText={
                        <div>
                            <PageLink page={this.props.sender} />
                            <PlusCounter count={this.props.likes.size} />
                        </div>
                    }
                    secondaryText={this.props.comment.data.body}
                    rightIconButton={
                        <IconButton
                            onClick={this.handleLike}
                            iconStyle={{
                                width: 16,
                                height: 16,
                                background: "#cacaca",
                                borderRadius: 24,
                                padding: 4
                            }}
                        >
                            <PlusOneIcon />
                        </IconButton>
                    }
                />
            );

        default:
            return (<div />);
        }
    }
});

export default connect(mapStateToProps)(Comment);
