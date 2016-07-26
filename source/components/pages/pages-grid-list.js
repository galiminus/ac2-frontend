import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';
import ResponsiveMixin from 'react-responsive-mixin';

import { GridList } from 'material-ui/GridList';

const style = {
    gridList: {
        marginTop: 8,
        marginBottom: 8
    },
    gridListPadding: 16
};

const phoneScreenStyle = {
    ...style,
    gridList: {
        ...style.gridList,
        marginTop: 2,
        marginBottom: 2
    },
    gridListPadding: 4
};

const PagesGridList = React.createClass({
    propTypes: {
        children: PropTypes.node.isRequired
    },

    mixins: [PureRenderMixin, ResponsiveMixin],

    getInitialState() {
        return ({ style });
    },

    componentDidMount() {
        this.media({ minWidth: 480 }, () => this.setState({ style }));
        this.media({ maxWidth: 480 }, () => this.setState({ style: phoneScreenStyle }));
    },

    render() {
        return (
            <GridList
                style={this.state.style.gridList}
                padding={this.state.style.gridListPadding}
            >
                {this.props.children}
            </GridList>
        );
    }
});

export default PagesGridList;
