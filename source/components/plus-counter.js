import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';

import PageAvatar from 'components/pages/page-avatar';

function mapStateToProps(state) {
    return ({
        pages: state.pages
    });
}

const PlusCounter = React.createClass({
    propTypes: {
        likes: PropTypes.object.isRequired,
        pages: PropTypes.object.isRequired,
        style: PropTypes.object
    },

    getInitialState() {
        return ({ plusListOpen: false });
    },

    handleOpenPlusList() {
        this.setState({ plusListOpen: true });
    },

    handleClosePlusList() {
        this.setState({ plusListOpen: false });
    },

    renderZero() {
        return (
            `+${this.props.likes.size.toString()}`
        );
    },

    renderClickable() {
        return (
            <a
                onClick={this.handleOpenPlusList}
                style={{ cursor: 'pointer' }}
            >
                {`+${this.props.likes.size.toString()}`}
            </a>
        );
    },

    renderLikePages() {
        return (
            this.props.likes.valueSeq().map((like) => {
                const page = this.props.pages.get(like.page_id);
                return (
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={`/${page.slug}`}
                        key={like.page_id}
                    >
                        <ListItem>
                            <PageAvatar page={page} />
                            {page.title}
                        </ListItem>
                    </Link>
                );
            })
        );
    },

    render() {
        return (
            <span
                style={{
                    fontSize: 12,
                    marginLeft: 8,
                    color: '#666',
                    fontWeight: 500
                }}
            >
                {this.props.likes.size === 0 ? this.renderZero() : this.renderClickable()}
                <Dialog
                    open={this.state.plusListOpen}
                    modal={false}
                    onRequestClose={this.handleClosePlusList}
                    bodyStyle={{ padding: '8px 16px' }}
                >
                    <List>
                        {this.renderLikePages()}
                    </List>
                </Dialog>
            </span>
        );
    }
});

export default connect(mapStateToProps)(PlusCounter);
