import store from "store"

export default {
    dispatchRecord: (record) => {
        record.attributes = { ...(record.attributes || {}), id: record.id, type: record.type }

        if (record.attributes.created_at) {
            record.attributes.created_at = new Date(record.attributes.created_at)
        }

        if (record.attributes.updated_at) {
            record.attributes.updated_at = new Date(record.attributes.updated_at)
        }

        for (let name of Object.keys(record.relationships)) {
            if (record.relationships[name].data) {
                record.attributes[`${name}_id`] = record.relationships[name].data.id
                record.attributes[`${name}_type`] = record.relationships[name].data.type
            }
        }
        store.dispatch({
            type: `${record.type.toUpperCase()}_ADD`,
            data: record
        })
    }
}
