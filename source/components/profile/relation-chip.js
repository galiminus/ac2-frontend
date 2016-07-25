import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Immutable from 'immutable';

import { connect } from 'react-redux';
import actionCreators from 'action-creators';

import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import RelationshipIcon from 'material-ui/svg-icons/social/people-outline';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import api from 'api';

function mapStateToProps(state) {
    let currentUser;
    if (state.currentUser) {
        currentUser = state.users.get(state.currentUser);
    }

    let currentUserPage;
    if (currentUser) {
        currentUserPage = state.pages.get(currentUser.page_id);
    }
    const relationships = state.relationshipsByProposer.get(currentUserPage.id);

    return {
        currentUserPage,
        relationships,
        relationshipStatus: state.settings.data.profile.relationshipStatus
    };
}

const defaultProps = {
    relationships: Immutable.Map({}),
    relationshipStatus: []
};

const RelationChip = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        relationshipStatus: PropTypes.array.isRequired,
        relationships: PropTypes.object,
        addResource: PropTypes.func.isRequired,
        removeResource: PropTypes.func.isRequired,
        pushNotification: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    findRelationship() {
        return this.props.relationships.find((relationship) => relationship.recipient_id === this.props.page.id);
    },

    createRelationship(value) {
        return (
            api.relationships.create({
                recipient_id: this.props.page.id,
                value
            })
        );
    },

    updateRelationship(id, value) {
        return (
            api.relationships.update(id, {
                value
            })
        );
    },

    destroyRelationship(id) {
        return (api.relationships.destroy(id));
    },

    handleRelationshipChange(relationship, value) {
        let promise;

        if (relationship && relationship.id) {
            if (value === 'none') {
                promise = this.destroyRelationship(relationship.id).then(() => {
                    this.props.removeResource(relationship);
                });
            } else {
                promise = this.updateRelationship(relationship.id, value).then((response) => {
                    this.props.addResource(response);
                });
            }
        } else if (value !== 'none') {
            promise = this.createRelationship(value).then((response) => {
                this.props.addResource(response);
            });
        } else {
            return;
        }

        promise.catch(
            () => {
                this.props.pushNotification('relationship_change_fatal_error');
            }
        );
    },

    render() {
        const relationship = this.findRelationship();

        if (this.props.page.id === this.props.currentUserPage.id) {
            return (
                <div />
            );
        }

        return (
            <IconMenu
                iconButtonElement={
                    <Chip>
                        <Avatar icon={<RelationshipIcon />} />
                        {this.context.translation.t(`labels.relationships.${relationship ? relationship.value : 'none'}`)}
                    </Chip>
                }
            >
                {
                    this.props.relationshipStatus.map((value) => {
                        return (
                            <MenuItem
                                key={value}
                                style={{ cursor: 'pointer' }}
                                onTouchTap={() => this.handleRelationshipChange(relationship, value)}
                                primaryText={this.context.translation.t(`labels.relationships.${value}`)}
                            />
                        );
                    })
                }
           </IconMenu>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(RelationChip);
