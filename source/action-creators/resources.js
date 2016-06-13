import { batchActions } from 'redux-batched-actions';

function getActionsType(record, action) {
    const classes = record.type.split('::').map((klass) => klass.toUpperCase());

    const actionNames = [];
    for (let i = 0; i < classes.length; i++) {
        actionNames[i] = classes.slice(0, i + 1).join('_') + '_' + action;
    }

    return (actionNames);
}

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

    return (
        getActionsType(normalizedRecord, 'ADD').map((type) => {
            return (
                {
                    type,
                    data: { ...normalizedRecord.attributes, ...options }
                }
            );
        })
    );
}

export default {
    addResource: (resource, options = { commited: true, error: false }) => {
        let actions = [];

        if (Array.isArray(resource.data)) {
            if (resource.included) {
                for (const record of resource.included) {
                    actions = actions.concat(addRecord(record, options));
                }
            }
            for (const record of resource.data) {
                actions = actions.concat(addRecord(record, options));
            }
        } else if (typeof(resource.data) === 'object') {
            if (resource.included) {
                for (const record of resource.included) {
                    actions = actions.concat(addRecord(record, options));
                }
            }
            actions = actions.concat(addRecord(resource.data, options));
        }
        return (batchActions(actions));
    },

    removeJSONAPIResource: (record) => {
        const normalizedRecord = normalizeRecord(record);

        return (batchActions(
            getActionsType(normalizedRecord, 'REMOVE').map((type) => {
                return (
                    {
                        type,
                        data: normalizedRecord.attributes
                    }
                );
            })
        ));
    },

    removeResource: (record) => {
        return (batchActions(
            getActionsType(record, 'REMOVE').map((type) => {
                return (
                    {
                        type,
                        data: record
                    }
                );
            })
        ));
    }
};
