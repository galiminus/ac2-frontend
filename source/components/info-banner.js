import React from "react"
import { connect } from 'react-redux'

import DefaultRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import { FormattedMessage } from "react-intl"

let bannerImage = "http://d.facdn.net/art/phorque/1397922715/1397922715.phorque_p51mustang_mini.jpg"

const style = {
    banner: {
        minHeight: "40vw",
    },
    bannerBefore: {
        background: "center / cover",
        backgroundImage: `url(${bannerImage})`,
        position: "relative",
        transformOrigin: "center center 0",
        transform: "translateZ(-1px) scale(2)",
        zIndex: -1,
        minHeight: "100vh",
        marginTop: "-20vw"
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
}

function mapStateToProps(state, props) {
  return {
    owner: state.users.get(props.page.owner_id)
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
                        ownerInfos = <h1>{this.props.owner.profile.name}</h1>
                }
            }
        }
        else {
            return (<div />)
        }

        let ownerInfosContainer = "";
        if (ownerInfos) {
            ownerInfosContainer =
            <aside style={style.infos}>
                <div style={{padding: "16px 32px"}}>{ownerInfos}</div>
            </aside>
        }

        return (
            <div style={{position: "relative", maxHeight: "50vw"}}>
                <div style={style.bannerBefore}>
                </div>
                <div style={style.banner}>
                </div>
                {ownerInfosContainer}
            </div>
        )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoBanner)
