import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { Card, CardText } from 'material-ui/Card';

import Marked from 'components/marked/marked';

const Static = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Card style={{ minHeight: '100%', marginTop: 16 }}>
                <CardText>
                    <Marked body={this.props.resource.data.body} />
                </CardText>
            </Card>
        );
    }
});

export default Static;
