import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import { Card, CardText } from 'material-ui/Card';

import Marked from 'components/marked/marked';

const StaticPage = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired
    },

    componentWillMount() {
        this.props.setTitle(this.props.page.title);
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

export default connect(undefined, { setTitle })(StaticPage);
