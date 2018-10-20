'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const livingcostsTypeDef = `
type Livingcost {
    id: String!
    zone: String!
    stratification: Int!
    locality: String!
    costm2: Int!
    costbasketgoods: Int!
}
input LivingcostInput {
    zone: String!
    stratification: Int!
    locality: String!
    costm2: Int!
    costbasketgoods: Int!
}`;

const livingcostsQueries = `
    allLivingcosts: [Livingcost]!
    livingcostById(id: String!): Livingcost!
    livingcostByZone(zone: String!): Livingcost!
    livingcostByLocality(locality: String!): [Livingcost]!
`;

const livingcostsMutations = `
    createLivingcost(livingcost: LivingcostInput!): Livingcost!
    deleteLivingcost(id: String!): Int
    updateLivingcost(id: String!, livingcost: LivingcostInput!): Livingcost!
`;

const crimesTypeDef = `
type Crime {
    _id: String!
    date: String!
    state: String!
}
input CrimeInput {
    date: String!
    state: String!
}`;

const crimesQueries = `
    allCrimes: [Crime]!
    crimeById(_id: String!): Crime!
`;

const crimesMutations = `
    createCrime(crime: CrimeInput!): Crime!
    deleteCrime(_id: Int!): Int
    updateCrime(_id: Int!, crime: CrimeInput!): Crime!
`;

const url = process.env.LIVINGCOSTS_URL || '0.0.0.0';
const port = process.env.LIVINGCOSTS_PORT || '4001';
const entryPoint = process.env.LIVINGCOSTS_ENTRY || 'livingcosts';

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

const url$1 = process.env.CRIMES_URL || '192.168.0.12';
const port$1 = process.env.CRIMES_PORT || '3001';
const entryPoint$1 = process.env.CRIMES_ENTRY || 'crimes';

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const resolvers$1 = {
	Query: {
		allCrimes: (_) =>
			getRequest(URL$1, ''),
		crimeById: (_, { _id }) =>
			generalRequest(`${URL$1}/${_id}`, 'GET'),
	},
	Mutation: {
		createCrime: (_, { crime }) =>
			generalRequest(`${URL$1}`, 'POST', crime),
		updateCrime: (_, { _id, crime }) =>
			generalRequest(`${URL$1}/${_id}`, 'PUT', crime),
		deleteCrime: (_, { _id }) =>
			generalRequest(`${URL$1}/${_id}`, 'DELETE')
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		livingcostsTypeDef, crimesTypeDef
	],
	[
		livingcostsQueries, crimesQueries
	],
	[
		livingcostsMutations, crimesMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers, resolvers$1
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
