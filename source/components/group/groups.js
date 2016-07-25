import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import CSSModules from 'react-css-modules';
import styles from './groups.css';

import FloatingActionButton from 'components/floating-action-button';
import CreateContentIcon from 'material-ui/svg-icons/action/note-add';

import Loader from 'components/loader';

const Groups = React.createClass({
    propTypes: {
        resources: PropTypes.object,
        translation: PropTypes.object.isRequired,
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
                    styles={styles}
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

export default CSSModules(Groups, styles);
