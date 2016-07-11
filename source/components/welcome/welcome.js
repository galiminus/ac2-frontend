import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import CSSModules from 'react-css-modules';
import styles from './welcome.css';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import ToolbarLogo from 'components/toolbar-logo';
import Notifier from 'components/notifier';

function mapStateToProps(state) {
    const props = {
        translation: state.translations.get(state.currentLocale)
    };

    if (state.settings && state.settings.data) {
        props.welcomePageIllustrations = state.settings.data.welcomePageIllustrations;
    }

    return (props);
}

const defaultProps = {
    welcomePageIllustrations: []
};

const WelcomePage = React.createClass({
    propTypes: {
        children: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        welcomePageIllustrations: PropTypes.array.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    render() {
        return (
            <div styleName="root">
                <Toolbar styleName="headerBar">
                    <ToolbarGroup key={0}>
                        <ToolbarLogo />
                    </ToolbarGroup>
                </Toolbar>
                <div styleName="illustration" style={{ backgroundImage: this.props.welcomePageIllustrations[0] }}>
                </div>
                <div styleName="formContainer">
                    <div styleName="formPaper">
                        {React.cloneElement(this.props.children, { translation: this.props.translation })}
                    </div>
                </div>
                <Notifier translation={this.props.translation} />
            </div>
        );
    }
});

export default connect(mapStateToProps)(CSSModules(WelcomePage, styles));
