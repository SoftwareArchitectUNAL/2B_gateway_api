import { generalRequest, getRequest } from '../utilities';
import { url, port } from './server';

const URL = `http://${url}:${port}`;

const resolvers = {
	Query: {
		allMurders: (_) =>
		    getRequest(`${URL}/murders`, ''),
		murderById: (_, { id }) =>
			generalRequest(`${URL}/murders/${id}`, 'GET'),

		allStreets: (_) =>
		    getRequest(`${URL}/streets`, ''),
		streetById: (_, { id }) =>
			generalRequest(`${URL}/streets/${id}`, 'GET'),

		allGenders: (_) =>
		    getRequest(`${URL}/genders`, ''),
		genderById: (_, { id }) =>
			generalRequest(`${URL}/genders/${id}`, 'GET'),

		allIntrafamilies: (_) =>
		    getRequest(`${URL}/intrafamilies`, ''),
		intrafamilyById: (_, { id }) =>
		    generalRequest(`${URL}/intrafamilies/${id}`, 'GET'),

	},
	Mutation: {
		createMurder: (_, { murder }) =>
		    generalRequest(`${URL}/murders`, 'POST', murder),
	    updateMurder: (_, { id, murder }) =>
		    generalRequest(`${URL}/murders/${id}`, 'PUT', murder),
	    deleteMurder: (_, { id }) =>
			generalRequest(`${URL}/murders/${id}`, 'DELETE'),
			
		createStreet: (_, { street }) =>
		    generalRequest(`${URL}/streets`, 'POST', street),
	    updateStreet: (_, { id, street }) =>
		    generalRequest(`${URL}/streets/${id}`, 'PUT', street),
	    deleteStreet: (_, { id }) =>
			generalRequest(`${URL}/streets/${id}`, 'DELETE'),
			
		createGender: (_, { gender }) =>
		    generalRequest(`${URL}/genders`, 'POST', gender),
	    updateGender: (_, { id, gender }) =>
		    generalRequest(`${URL}/genders/${id}`, 'PUT', gender),
	    deleteGender: (_, { id }) =>
			generalRequest(`${URL}/genders/${id}`, 'DELETE'),
			
		createIntrafamily: (_, { intrafamily }) =>
		    generalRequest(`${URL}/intrafamilies`, 'POST', intrafamily),
	    updateIntrafamily: (_, { id, intrafamily }) =>
		    generalRequest(`${URL}/intrafamilies/${id}`, 'PUT', intrafamily),
	    deleteIntrafamily: (_, { id }) =>
		    generalRequest(`${URL}/intrafamilies/${id}`, 'DELETE')
	}
};

export default resolvers;
