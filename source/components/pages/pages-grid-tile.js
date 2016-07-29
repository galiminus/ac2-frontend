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
        return ({
            actionIcons: [],
            featured: false
        });
    },

    render() {
        const { page, banner, relationshipStatus, actionIcons, ...props } = this.props;

        return (
            <GridTile
                {...props}
                titleBackground="rgba(0, 0, 0, 0.9)"
                actionIcon={
                    <div>
                        {
                            actionIcons.map((actionIcon, index) =>
                                React.cloneElement(actionIcon, { key: index })
                            )
                        }
                    </div>
                }
            >
                <div
                    style={{
                        ...style.banner,
                        backgroundImage: `url(${banner})`
                    }}
                >
                    <div style={style.relationChip}>
                        <RelationChip
                            proposer={this.context.currentUserPage}
                            recipient={page}
                            relationshipStatus={relationshipStatus}
                        />
                    </div>
                </div>
            </GridTile>
        );
    }
});

export default PagesGridTile;
