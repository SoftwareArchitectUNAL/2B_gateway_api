import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allCrimes: (_) =>
			getRequest(URL, ''),
		crimeById: (_, { _id }) =>
			generalRequest(`${URL}/${_id}`, 'GET'),
	},
	Mutation: {
		createCrime: (_, { crime }) =>
			generalRequest(`${URL}`, 'POST', crime),
		updateCrime: (_, { _id, crime }) =>
			generalRequest(`${URL}/${_id}`, 'PUT', crime),
		deleteCrime: (_, { _id }) =>
			generalRequest(`${URL}/${_id}`, 'DELETE')
	}
};

export default resolvers;
