import { typeToShortPluralType } from 'utils/types';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Immutable from 'immutable';

import { connect } from 'react-redux';
import actionCreators from 'action-creators';

import Chip from 'material-ui/Chip';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import api from 'api';

function mapStateToProps(state, props) {
    return {
        relationships: state.relationshipsByProposer.get(props.proposer.id)
    };
}

const defaultProps = {
    relationships: Immutable.Map({})
};

const RelationChip = React.createClass({
    propTypes: {
        recipient: PropTypes.object.isRequired,
        proposer: PropTypes.object.isRequired,
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
        return this.props.relationships.find((relationship) => relationship.recipient_id === this.props.recipient.id);
    },

    handleRelationshipDestroy(relationship) {
        api.relationships.destroy(relationship.id).then(
            () => {
                this.props.removeResource(relationship);
            },
            () => {
                this.props.pushNotification('relationshipDestroy');
            }
        );
    },

    handleRelationshipCreate(value) {
        api.relationships.create({
            recipient_id: this.props.recipient.id,
            value
        }).then(
            (resource) => {
                this.props.addResource(resource);
            },
            () => {
                this.props.pushNotification('relationshipCreate');
            }
        );
    },

    handleRelationshipUpdate(relationship, value) {
        api.relationships.update(relationship.id, {
            value
        }).then(
            (resource) => {
                this.props.addResource(resource);
            },
            () => {
                this.props.pushNotification('relationshipUpdate');
            }
        );
    },

    render() {
        const relationship = this.findRelationship();
        const labelPrefix = `labels.relationshipStatus.${typeToShortPluralType(this.props.recipient.type)}`;

        if (this.props.recipient.id === this.props.proposer.id) {
            return (
                <div />
            );
        }

        const currentLabel = relationship ? relationship.value : 'none';
        return (
            <IconMenu
                useLayerForClickAway
                iconButtonElement={
                    <Chip>
                        {this.context.translation.t(`${labelPrefix}.${currentLabel}`)}
                    </Chip>
                }
            >
                <MenuItem
                    style={{ cursor: 'pointer' }}
                    onTouchTap={() => this.handleRelationshipDestroy(relationship)}
                    primaryText={this.context.translation.t(`${labelPrefix}.none`)}
                />
                {
                    this.props.relationshipStatus.map((value) => {
                        return (
                            <MenuItem
                                key={value}
                                style={{ cursor: 'pointer' }}
                                onTouchTap={() => {
                                    if (relationship) {
                                        this.handleRelationshipUpdate(relationship, value);
                                    } else {
                                        this.handleRelationshipCreate(value);
                                    }
                                }}
                                primaryText={this.context.translation.t(`${labelPrefix}.${value}`)}
                            />
                        );
                    })
                }
           </IconMenu>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(RelationChip);
