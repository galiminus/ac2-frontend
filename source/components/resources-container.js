import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

import { connect } from 'react-redux';

import actionCreators from 'action-creators';

const defaultProps = {
    filters: {},
    include: []
};

function mapStateToProps(state, props) {
    return ({ resources: state[props.storeName] });
}

const ResourcesContainer = React.createClass({
    propTypes: {
        resources: PropTypes.object.isRequired,
        storeName: PropTypes.string.isRequired,
        find: PropTypes.func.isRequired,
        filters: PropTypes.object,
        include: PropTypes.array,
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
            ids: []
        };
    },

    componentWillMount() {
        this.load(1);
    },

    load(pageNum) {
        const query = {};

        for (const filter of Object.keys(this.props.filters)) {
            query[`filter[${filter}]`] = this.props.filters[filter];
        }
        query['page[number]'] = pageNum;
        query['page[size]'] = 20;
        query.include = this.props.include.join(',');

        this.setState({ loadingMore: true });

        this.props.find(query)
            .then(
                (response) => {
                    this.props.addResource(response);

                    const ids = response.data.map((resource) => resource.id);
                    this.setState({
                        ids: this.state.ids.concat(ids),
                        hasMore: !!response.links.last,
                        loadingMore: false
                    });
                },
                () => {
                    this.props.pushNotification('resources_find_fatal_error');
                }
            );
    },

    handleLoadMore() {
        const nextPage = this.state.page + 1;

        this.setState({ page: nextPage });
        this.load(nextPage);
    },

    render() {
        let resources = [];

        resources = this.props.resources.reduce((accumulator, resource) => {
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
                    hasMore: this.state.hasMore,
                    loadingMore: this.state.loadingMore
                }
            )
        );
    }
});

export default connect(mapStateToProps, actionCreators)(ResourcesContainer);
