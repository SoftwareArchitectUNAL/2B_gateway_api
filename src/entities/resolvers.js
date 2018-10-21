import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allEntities: (_) =>
			getRequest(URL, ''),
		entityById: (_, { idEntity }) =>
			generalRequest(`${URL}/${idEntity}`, 'GET'),
		entityByType: (_, { TypeEntity }) =>
			generalRequest(`${URL}/Type/${TypeEntity}`, 'GET'),
		entityByZone: (_, { Zone }) => 
			generalRequest(`${URL}/Zone/${Zone}`, 'GET'),
		entitiesByScore: (_, { idEntity }) => 
			generalRequest(`${URL}/EntitiesByScore/${idEntity}`, 'GET'),
		entityByScore: (_, { idEntity }) => 
			generalRequest(`${URL}/score/${idEntity}`, 'GET'),

	},
	Mutation: {
		createEntity: (_, { entity }) =>
			generalRequest(`${URL}`, 'POST', entity),
		createScore: (_, { idEntity, score }) =>
			generalRequest(`${URL}/Postscore/${idEntity}`, 'POST', score),
		deleteEntity: (_, { idEntity }) =>
			generalRequest(`${URL}/Delete/${idEntity}`, 'DELETE')
	}
};

export default resolvers;
