import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { GridTile } from 'material-ui/GridList';

import RelationChip from 'components/relation-chip';

const style = {
    banner: {
        width: '100%',
        height: '100%',
        background: 'transparent no-repeat center center',
        backgroundSize: 'cover',
        position: 'relative'
    },

    relationChip: {
        position: 'absolute',
        top: 8,
        right: 8
    }
};

const defaultProps = {
    actionIcons: []
};

const PagesGridTile = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        banner: PropTypes.string.isRequired,
        title: PropTypes.node.isRequired,
        relationshipStatus: PropTypes.array.isRequired,
        actionIcons: PropTypes.array
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    render() {
        return (
            <GridTile
                titleBackground="rgba(0, 0, 0, 0.9)"
                title={this.props.title}
                actionIcon={
                    <div>
                        {
                            this.props.actionIcons.map((actionIcon, index) =>
                                React.cloneElement(actionIcon, { key: index })
                            )
                        }
                    </div>
                }
            >
                <div
                    style={{
                        ...style.banner,
                        backgroundImage: `url(${this.props.banner})`
                    }}
                >
                    <div style={style.relationChip}>
                        <RelationChip
                            proposer={this.context.currentUserPage}
                            recipient={this.props.page}
                            relationshipStatus={this.props.relationshipStatus}
                        />
                    </div>
                </div>
            </GridTile>
        );
    }
});

export default PagesGridTile;
