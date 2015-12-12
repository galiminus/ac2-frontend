import React from "react"
import { connect } from 'react-redux'

import DefaultRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import { FormattedMessage } from "react-intl"

let bannerImage = "http://d.facdn.net/art/phorque/1397922715/1397922715.phorque_p51mustang_mini.jpg"

const style = {
    parallax: {
        banner: {
            background: "center / cover",
            backgroundImage: `url(${bannerImage})`,
            position: "relative",
            transformOrigin: "center center 0",
            transform: "translateZ(-1px) scale(2)",
            zIndex: -1,
            minHeight: "100vh",
            marginTop: "-25vw"
        },
        infos: {
            fontFamily: DefaultRawTheme.fontFamily,
            width: "100%",
            background: DefaultRawTheme.palette.textColor,
            opacity: 0.8,
            position: "absolute",
            bottom: 0,
            zIndex: 1,
            color: DefaultRawTheme.palette.alternateTextColor
        }
    },
    classic: {
        infos: {
            fontFamily: DefaultRawTheme.fontFamily,
            width: "100%",
            opacity: 0.8,
            background: DefaultRawTheme.palette.textColor,
            color: DefaultRawTheme.palette.alternateTextColor
        }
    }
}

function mapStateToProps(state, props) {
  return {
      page: state.pages.get(props.pageId) || { owner_type: "Main", data: { name: "" } }
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

const InfoBanner = React.createClass({
    render() {
        let ownerInfos;
        if (this.props.page) {
            if (this.props.page.owner_type == "Main") {
                ownerInfos = <h1><FormattedMessage id="links.mainFeed" /></h1>
            }
            else if (this.props.owner) {
                switch (this.props.page.owner_type) {
                    case "User":
                        ownerInfos = <h1>{this.props.page.data.name}</h1>
                }
            }
        }
        else {
            return (<div />)
        }

        return (
            <div>
                <div style={{position: "relative", maxHeight: "100vh"}} className="hide-xs hide-sm">
                    <div style={style.parallax.banner}></div>
                    <aside style={style.parallax.infos}>
                        <div style={{padding: "16px 32px"}}>{ownerInfos}</div>
                    </aside>
                </div>
                <div className="hide-md hide-lg" style={{marginTop: 56}}>
                    <aside style={style.classic.infos}>
                        <div style={{padding: "16px 32px"}}>{ownerInfos}</div>
                    </aside>
                </div>
            </div>
        )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoBanner)
