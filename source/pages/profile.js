import React from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"

import {
    Tabs,
    Tab,
    List,
    ListItem
} from "material-ui"

import { pages } from "api"
import { userPageFields } from "config"

function mapStateToProps(state, props) {
    return {
        page: state.pages.get(props.params.pageId) || { data : {} }
    }
}

const Profile = React.createClass({
    renderField(field, type) {
        let value = this.props.page.data[field];

        let secondaryText;
        if (value) {
            switch (type) {
                case "string":
                secondaryText = <p>{this.props.page.data[field]}</p>

                default:
            }
        }
        else {
            secondaryText = <p><FormattedMessage id="texts.emptyField" /></p>
        }

        return (
            <ListItem
                key={`labels.userPageFields.${field}`}
                primaryText={<FormattedMessage id={`labels.userPageFields.${field}`} />}
                secondaryText={secondaryText} />
        )
    },

    render() {
        const style = {
            fontFamily: "Roboto, sans-serif",
            zIndex: 2,
            background: "white",
            height: "100%",
        }

        let tabs = []
        for (let category in userPageFields) {
            let fields = []

            for (let field in userPageFields[category]) {
                fields.push(this.renderField(field, userPageFields[category][field]))
            }

            tabs.push(
                <Tab key={`titles.userPageFields.${category}`} label={<FormattedMessage id={`titles.userPageFields.${category}`} />}>
                    <List>
                        {fields}
                    </List>
                </Tab>
            )
        }
        return (
            <div style={style}>
                <Tabs className="col-xs-12 col-sm-12 col-md-8" style={{padding: 0}}>{tabs}</Tabs>
            </div>
        )
    }
})

export default connect(mapStateToProps)(Profile)
