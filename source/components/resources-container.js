import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';
import Immutable from 'immutable';

import { connect } from 'react-redux';
import connectToCable from 'components/action-cable';

import actionCreators from 'action-creators';

const defaultProps = {
    filters: {},
    sort: [],
    include: [],
    channels: []
};

function mapStateToProps(state, props) {
    return ({ resources: state[props.storeName] });
}

const ResourcesContainer = React.createClass({
    propTypes: {
        resources: PropTypes.object.isRequired,
        storeName: PropTypes.string.isRequired,
        find: PropTypes.func.isRequired,
        filters: PropTypes.object.isRequired,
        sort: PropTypes.array.isRequired,
        include: PropTypes.array.isRequired,
        channels: PropTypes.array.isRequired,
        pushNotification: PropTypes.func.isRequired,
        addResource: PropTypes.func.isRequired,
        factory: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    getInitialState() {
        return {
            page: 1,
            loadingMore: false,
            hasMore: false,
            hasNew: false,
            ids: []
        };
    },

    componentWillMount() {
        this.load(1);
    },

    getChannels() {
        return (this.props.channels);
    },

    handleMessage(message) {
        if (message && message.meta.action === 'create') {
            this.setState({ hasNew: true });
        }
    },

    load(pageNum) {
        const query = {};

        for (const filter of Object.keys(this.props.filters)) {
            if (this.props.filters[filter]) {
                query[`filter[${filter}]`] = this.props.filters[filter];
            }
        }
        query['page[number]'] = pageNum;
        query['page[size]'] = 20;
        query.include = this.props.include.join(',');
        query.sort = this.props.sort.join(',');

        this.setState({ loadingMore: true });

        this.props.find(query)
            .then(
                (response) => {
                    this.props.addResource(response);

                    const ids = response.data.map((resource) => resource.id);
                    this.setState({
                        ids: this.state.ids.concat(ids),
                        hasMore: !!response.links.last,
                        loadingMore: false,
                        page: (!!response.links.last ? pageNum + 1 : pageNum)
                    });
                },
                () => {
                    this.props.pushNotification('resources_find_fatal_error');
                }
            );
    },

    handleLoadMore() {
        this.load(this.state.page);
    },

    handleReload() {
        this.setState(this.getInitialState);
        this.load(1);
    },

    render() {
        const resources = this.props.resources.reduce((accumulator, resource) => {
            return (accumulator.set(resource.id, resource));
        }, Immutable.Map({}))
        .filter((resource) => {
            return (this.state.ids.indexOf(resource.id) >= 0);
        }).sort((resource1, resource2) => {
            return (this.state.ids.indexOf(resource1.id) > this.state.ids.indexOf(resource2.id) ? 1 : -1);
        });
        return (
            this.props.factory(
                {
                    ...this.props,
                    resources,
                    onLoadMore: this.handleLoadMore,
                    onReload: this.handleReload,
                    hasMore: this.state.hasMore,
                    hasNew: this.state.hasNew,
                    loadingMore: this.state.loadingMore
                }
            )
        );
    }
});

export default connect(mapStateToProps, actionCreators)(connectToCable(ResourcesContainer));
