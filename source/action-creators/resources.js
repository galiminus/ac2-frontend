import { batchActions } from 'redux-batched-actions';

function normalizeRecord(record) {
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
    return (record);
}

function addRecord(record, options = { commited: true, error: false }) {
    const normalizedRecord = normalizeRecord(record);

    return ({
        type: `${normalizedRecord.type.replace('-', '_').toUpperCase()}_ADD`,
        data: { ...normalizedRecord.attributes, ...options }
    });
}

export default {
    addResource: (resource, options = { commited: true, error: false }) => {
        const actions = [];

        if (Array.isArray(resource.data)) {
            if (resource.included) {
                for (const record of resource.included) {
                    actions.push(addRecord(record, options));
                }
            }
            for (const record of resource.data) {
                actions.push(addRecord(record, options));
            }
        } else if (typeof(resource.data) === 'object') {
            if (resource.included) {
                for (const record of resource.included) {
                    actions.push(addRecord(record, options));
                }
            }
            actions.push(addRecord(resource.data, options));
        }

        return (batchActions(actions));
    },

    removeJSONAPIResource: (record) => {
        const normalizedRecord = normalizeRecord(record);

        return ({
            type: `${normalizedRecord.type.replace('-', '_').toUpperCase()}_REMOVE`,
            data: normalizedRecord.attributes
        });
    },

    removeResource: (record) => {
        return ({
            type: `${record.type.replace('-', '_').toUpperCase()}_REMOVE`,
            data: record
        });
    }
};
