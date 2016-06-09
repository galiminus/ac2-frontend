import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { CardTitle } from 'material-ui/Card';

import PageAvatar from 'components/page-avatar';

const PageCardTitle = React.createClass({
    propTypes: {
        page: PropTypes.object,
        children: PropTypes.node
    },

    mixins: [PureRenderMixin],

    render() {
        if (this.props.page.type.match(/^pages.profile_pages/)) {
            return (
                <CardTitle
                    titleColor="#fff"
                    style={{ padding: 8 }}
                    title={
                        <div>
                            <PageAvatar
                                page={this.props.page}
                                style={{
                                    width: 80,
                                    height: 80,
                                    lineHeight: '80px',
                                    border: '2px solid #fff',
                                    fontSize: 30
                                }}
                            />
                            {this.props.page.data.personal_informations.full_name}
                        </div>
                    }
                    {...this.props}
                />
            );
        }
        return (<div />);
    }
});

export default PageCardTitle;
