import { destroy } from 'api/http';

export default (id) =>
    destroy(`/relationships/${id}`);
