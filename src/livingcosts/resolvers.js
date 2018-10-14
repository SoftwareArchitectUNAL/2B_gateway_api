import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;


const resolvers = {
	Query: {
		allLivingcosts: (_) =>
			getRequest(URL, ''),
		livingcostById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
		livingcostByLocality: (_, { locality }) =>
			generalRequest(`${URL}/locality/${locality}`, 'GET'),
		livingcostByZone: (_, { zone }) =>
			generalRequest(`${URL}/zone/${zone}`, 'GET')
	},
	Mutation: {
		createLivingcost: (_, { livingcost }) =>
			generalRequest(`${URL}/`, 'POST', livingcost),
		updateLivingcost: (_, { id, livingcost }) =>
			generalRequest(`${URL}/${id}`, 'PUT', livingcost),
		deleteLivingcost: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
