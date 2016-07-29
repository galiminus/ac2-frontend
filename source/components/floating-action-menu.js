import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import CloseIcon from 'material-ui/svg-icons/navigation/close';

import FloatingActionButton from 'components/floating-action-button';

const FloatingActionMenu = React.createClass({
    propTypes: {
        children: PropTypes.node.isRequired,
        icon: PropTypes.node.isRequired
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return ({ open: false });
    },

    render() {
        return (
            <div>
                {
                    React.Children.toArray(this.props.children).map((child, index) => {
                        return (
                            React.cloneElement(child, {
                                style: {
                                    transform: (this.state.open ? 'scale(1)' : 'scale(0)'),
                                    bottom: (this.state.open ? 24 + (index + 1) * 64 : 24),
                                    opacity: (this.state.open ? 1 : 0),
                                    transition: '0.2s ease-in-out'
                                }
                            })
                        );
                    })
                }
                <FloatingActionButton
                    style={{
                        transform: (this.state.open ? 'rotate(180deg)' : 'rotate(0deg)'),
                        opacity: (this.state.open ? 0 : 1),
                        transition: '0.2s ease-in-out'
                    }}
                    onMouseUp={() => this.setState({ open: !this.state.open })}
                >
                    {this.props.icon}
                </FloatingActionButton>
                <FloatingActionButton
                    style={{
                        transform: (this.state.open ? 'rotate(0deg)' : 'rotate(180deg)'),
                        opacity: (this.state.open ? 1 : 0),
                        transition: '0.2s ease-in-out'
                    }}
                    onMouseUp={() => this.setState({ open: !this.state.open })}
                >
                    <CloseIcon />
                </FloatingActionButton>
            </div>
        );
    }
});

export default FloatingActionMenu;
