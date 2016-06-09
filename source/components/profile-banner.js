import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Link } from 'react-router';

import { Card, CardActions, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import PageCardTitle from 'components/page-card-title';

const ProfileBanner = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Card style={{ marginTop: 32 }}>
                <CardMedia
                    overlay={<PageCardTitle page={this.props.page} />}
                >
                    <img src="http://lorempixel.com/600/337/nature/" />
                </CardMedia>
                <CardActions style={{ textAlign: 'right' }}>
                    {
                        (() => {
                            if (this.props.page.permissions.update) {
                                return (
                                    <FlatButton label={this.context.translation.t('labels.editProfile')} />
                                );
                            }
                        })()
                    }
                    <Link to={`/${this.props.page.id}/profile`}>
                        <FlatButton label={this.context.translation.t('labels.about')} />
                    </Link>
                </CardActions>
            </Card>
        );
    }
});

export default ProfileBanner;
