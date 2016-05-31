import React, { PropTypes } from "react";
import { connect } from "react-redux";
import Immutable from "immutable";
import { dispatch } from "store";

import actionCreators from "action-creators";

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

    contextTypes: {
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    getDefaultProps() {
        return {
            sender: { id: null },
            likes: Immutable.Map({})
        };
    },

    myLike() {
        return (this.props.likes.find((like) => like.page_id === this.context.currentUserPage.id))
    },

    handleLikeCreate() {
        api.likes.create({
            liked_id: this.props.comment.id,
            liked_type: "Comment"
        }).then((response) => {
            this.props.addResource(response);
        });
    },

    handleLikeDestroy() {
        const id = this.myLike().id;
        api.likes.destroy(id).then((response) => {
            this.props.removeResource(id)
        });
    },

    render() {
        const isLiked = !!this.myLike();

        switch (this.props.sender.type) {
        case "user-pages":
            return (
                <ListItem
                    leftAvatar={<PageAvatar page={this.props.sender} />}
                    primaryText={
                        <div>
                            <PageLink page={this.props.sender} />
                            <PlusCounter likes={this.props.likes} />
                        </div>
                    }
                    secondaryText={this.props.comment.data.body}
                    rightIconButton={
                        <IconButton
                            onClick={isLiked ? this.handleLikeDestroy : this.handleLikeCreate}
                            iconStyle={{
                                width: 16,
                                height: 16,
                                background: (isLiked ? "#999" : "#cacaca"),
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

export default connect(mapStateToProps, actionCreators)(Comment);
