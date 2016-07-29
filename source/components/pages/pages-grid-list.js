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
        const hasFeatured = (React.Children.count(this.props.children) % 2);

        return (
            <GridList
                style={this.state.style.gridList}
                padding={this.state.style.gridListPadding}
                cols={2}
            >
                {
                    React.Children.toArray(this.props.children).map((child, index) => {
                        if (hasFeatured && index === 0) {
                            return (React.cloneElement(child, { cols: 2, rows: 2 }));
                        }
                        return (child);
                    })
                }
            </GridList>
        );
    }
});

export default PagesGridList;
