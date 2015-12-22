import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import {
    Tabs,
    Tab,
    List
} from "material-ui";

import { pages } from "api";
import { userPageFields } from "config";
import fieldCreator from "components/field-creator";

function mapStateToProps(state, props) {
    return {
        page: state.pages.get(props.params.pageId) || { data: {} }
    };
}

const Profile = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired
    },

    handleChange(field, value) {
        const data = Object.assign({}, this.props.page.data);
        data[field] = value;

        pages.update(this.props.page.id, { data });
    },

    render() {
        const style = {
            fontFamily: "Roboto, sans-serif",
            zIndex: 2,
            background: "white",
            height: "100%"
        };

        const tabs = [];
        for (const category of Object.keys(userPageFields)) {
            const fields = [];

            for (const field of Object.keys(userPageFields[category])) {
                const fieldForm = fieldCreator(field, this.props.page.data[field], userPageFields[category][field]);

                fields.push(
                    React.createElement(fieldForm, {
                        key: field,
                        onChange: this.handleChange
                    })
                );
            }

            tabs.push(
                <Tab key={`titles.userPageFields.${category}`} label={<FormattedMessage id={`titles.userPageFields.${category}`} />}>
                    <List>
                        {fields}
                    </List>
                </Tab>
            );
        }
        return (
            <div style={style}>
                <Tabs className="col-xs-12 col-sm-12 col-md-8" style={{ padding: 0 }}>{tabs}</Tabs>
            </div>
        );
    }
});

export default connect(mapStateToProps)(Profile);
