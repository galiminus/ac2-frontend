import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import FloatingActionButton from 'components/floating-action-button';
import CreateContentIcon from 'material-ui/svg-icons/action/note-add';

import Loader from 'components/loader';

const Groups = React.createClass({
    propTypes: {
        resources: PropTypes.object,
        onLoadMore: PropTypes.func.isRequired,
        hasMore: PropTypes.bool.isRequired,
        loadingMore: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    renderGroups() {
        return (
            this.props.resources.valueSeq().map((page) => {
                return (
                    <div />
                );
            })
        );
    },

    render() {
        return (
            <div>
                <Loader
                    onLoadMore={this.props.onLoadMore}
                    hasMore={this.props.hasMore}
                    loadingMore={this.props.loadingMore}
                >
                    {this.renderGroups()}
                </Loader>
                <FloatingActionButton
                    href={`/pages/new?model=Page::Group`}
                >
                    <CreateContentIcon />
                </FloatingActionButton>
            </div>
        );
    }
});

export default Groups;
