export default {
    add: (record, options = { commited: true, error: false }) => {
        record.attributes = { ...(record.attributes || {}), id: record.id, type: record.type };

        if (record.attributes.created_at) {
            record.attributes.created_at = new Date(record.attributes.created_at);
        }

        if (record.attributes.updated_at) {
            record.attributes.updated_at = new Date(record.attributes.updated_at);
        }

        if (record.relationships) {
            for (const name of Object.keys(record.relationships)) {
                if (record.relationships[name].data) {
                    record.attributes[`${name}_id`] = record.relationships[name].data.id;
                    record.attributes[`${name}_type`] = record.relationships[name].data.type;
                } else {
                    record.attributes[`${name}_id`] = null;
                }
            }
        }

        return ({
            type: `${record.type.toUpperCase()}_ADD`,
            data: { ...record, ...options }
        });
    }
};
