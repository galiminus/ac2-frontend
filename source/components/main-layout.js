import React, { PropTypes } from 'react';

import PureRenderMixin from 'components/pure-render-mixin';
import ResponsiveMixin from 'react-responsive-mixin';

import { Tabs, Tab } from 'material-ui/Tabs';

import browserHistory from 'react-router/lib/browserHistory';

import SettingsMenu from 'components/settings-menu';
import AdditionalLinksContainer from 'components/static/additional-links-container';

const style = {
    root: {
        width: '100%'
    },

    mainContent: {
        marginTop: 68,
        width: 660,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 240,
        paddingRight: 310,
        overflow: 'hidden'
    },

    leftNav: {
        paddingRight: 0,
        zIndex: 2,
        position: 'fixed',
        width: 240,
        maxWidth: 240,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
};

const smallScreenStyle = {
    ...style,

    mainContent: {
        ...style.mainContent,
        maxWidth: '90%',
        width: 'auto'
    },

    leftNav: {
        ...style.leftNav,
        maxWidth: 200
    }
};

const tabletScreenStyle = {
    ...smallScreenStyle,

    mainContent: {
        ...smallScreenStyle.mainContent,
        marginTop: 55,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 10
    },

    leftNav: {
        ...smallScreenStyle.leftNav,
        display: 'none'
    }
};

const phoneScreenStyle = {
    ...tabletScreenStyle,

    root: {
    },

    mainContent: {
        ...tabletScreenStyle.mainContent,
        paddingLeft: 0,
        paddingRight: 0,
        maxWidth: '100%'
    }
};

const MainLayout = React.createClass({
    propTypes: {
        children: PropTypes.node,
        tabs: PropTypes.object,
        location: PropTypes.object,
        leftNav: PropTypes.array,
        baseUrl: PropTypes.string
    },

    mixins: [PureRenderMixin, ResponsiveMixin],

    getDefaultProps() {
        return ({
            leftNav: [],
            baseUrl: ''
        });
    },

    getInitialState() {
        return ({ style });
    },

    componentDidMount() {
        this.media({ minWidth: 1230 }, () => this.setState({ style }));
        this.media({ maxWidth: 1230 }, () => this.setState({ style: smallScreenStyle }));
        this.media({ maxWidth: 1010 }, () => this.setState({ style: tabletScreenStyle }));
        this.media({ maxWidth: 800 }, () => this.setState({ style: phoneScreenStyle }));
    },

    handleActive(path) {
        browserHistory.push(this.props.baseUrl + path);
    },

    activeIndex() {
        const tabNames = Object.keys(this.props.tabs);

        for (let index = 0; index < tabNames.length; index++) {
            if (this.props.location.pathname.match(new RegExp(`${tabNames[index]}$$`))) {
                return (index);
            }
        }

        return (0);
    },

    render() {
        return (
            <div style={this.state.style.root}>
                <div style={this.state.style.leftNav}>
                    {
                        this.props.leftNav.length > 0 ? this.props.leftNav : <div />
                    }
                    <div>
                        <AdditionalLinksContainer />

                        {this.context.settings.permissions.update &&
                            <SettingsMenu />
                        }
                    </div>
                </div>
                <div style={this.state.style.mainContent}>
                    {this.props.tabs &&
                        <Tabs
                            tabItemContainerStyle={{
                                backgroundColor: 'transparent'
                            }}
                            contentContainerStyle={{
                                marginTop: 12
                            }}
                            inkBarStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.6)'
                            }}
                            initialSelectedIndex={this.activeIndex()}
                        >
                            {
                                Object.keys(this.props.tabs).map((tab, index) => {
                                    return (
                                        <Tab
                                            key={index}
                                            label={this.context.translation.t(`tabs.${tab}`)}
                                            onActive={() => this.handleActive(`/${tab}`)}
                                        >
                                            {this.props.tabs[tab]}
                                        </Tab>
                                    );
                                })
                            }
                        </Tabs>
                    }
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default MainLayout;
