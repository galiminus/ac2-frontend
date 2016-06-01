import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';

function getStyles() {
    const styles = {
        root: {
            fontSize: 12,
            marginLeft: 8,
            color: '#666',
            fontWeight: 500
        }
    };
    return (styles);
}

const PlusCounter = React.createClass({
    propTypes: {
        likes: PropTypes.object.isRequired,
        style: PropTypes.object
    },

    getInitialState() {
        return ({
            plusListOpen: false
        });
    },

    handleOpenPlusList() {
        this.setState({ plusListOpen: true });
    },

    handleClosePlusList() {
        this.setState({ plusListOpen: false });
    },

    render() {
        const styles = getStyles();

        return (
            <span style={Object.assign(styles.root, this.props.style)}>
                <a onClick={this.handleOpenPlusList}>{`+${this.props.likes.size.toString()}`}</a>
                <Dialog
                    open={this.state.plusListOpen}
                    contentStyle={{ width: 500 }}
                    modal={false}
                    onRequestClose={this.handleClosePlusList}
                >
                    <List>
                        {
                            this.props.likes.map((like) => {
                                return (<ListItem key={like.id} primaryText={like.page_id} />);
                            })
                        }
                    </List>
                </Dialog>
            </span>
        );
    }
});

export default PlusCounter;
