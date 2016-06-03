import React from 'react';

import { updatePath } from 'redux-simple-router';
import { dispatch } from 'store';

import { ToolbarTitle } from 'material-ui';
import { title } from 'config';

import { Link } from 'react-router';

const style = {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    letterSpacing: 3,
    color: 'rgb(204, 150, 116)',
    paddingRight: 0,
    textDecoration: 'none'
};

export default React.createClass({
    goToMainFeed(e) {
        dispatch(updatePath('/'));
        e.preventDefault();
    },

    render() {
        return (
            <ToolbarTitle
                text={
                    <Link style={style} to="/">{title}</Link>
                }
                {...this.props}
            />
        );
    }
});
