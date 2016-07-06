import React, { PropTypes } from 'react';

import { Card, CardText } from 'material-ui/Card';

import Marked from 'components/marked/marked';

const Messages = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired
    },

    render() {
        return (
            <Card style={{ minHeight: '100%', marginTop: 48 }}>
                <CardText>
                    <Marked body={this.props.page.data.body} />
                </CardText>
            </Card>
        );
    }
});

export default Messages;
