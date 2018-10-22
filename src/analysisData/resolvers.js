import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;


const resolvers = {
	Query: {
		allViolenceEvents: (_) =>
			getRequest(URL, ''),
		ViolenceEventById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET')
/*		ViolenceEventByLocality: (_, { locality }) =>
			generalRequest(`${URL}/locality/${locality}`, 'GET'),
		livingcostByZone: (_, { zone }) =>
			generalRequest(`${URL}/zone/${zone}`, 'GET')*/
	},
	Mutation: {
		createViolenceEvent: (_, { ViolenceEventInput }) =>
			generalRequest(`${URL}/`, 'POST', ViolenceEventInput),
		updateViolenceEvent: (_, { id, violence_event }) =>
			generalRequest(`${URL}/${id}`, 'PUT', violence_event),
		deleteViolenceEvent: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')

	}

};

export default resolvers;
