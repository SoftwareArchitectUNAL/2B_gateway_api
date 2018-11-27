import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';



import {
	livingcostsMutations,
	livingcostsQueries,
	livingcostsTypeDef
} from './livingcosts/typeDefs';

import {
	usersMutations,
	usersQueries,
	usersTypeDef
} from './users/typeDefs';

import {
		authMutations,
		authTypeDef
} from './auth/typeDefs';

import {
	crimesMutations,
	crimesQueries,
	crimesTypeDef
} from './crimes/typeDefs';

import {
	violenceMutations,
	violenceQueries,
	violenceTypeDef
} from './violence/typeDefs';


import {
	entitiesMutations,
	entitiesQueries,
	entitiesTypeDef
} from './entities/typeDefs';

import {
	analysisDataMutations,
	analysisDataQueries,
	analysisDataTypeDef
} from './analysisData/typeDefs';

import livingcostsResolvers from './livingcosts/resolvers';
import usersResolvers from './users/resolvers';
import authResolvers from './auth/resolvers';

import crimesResolvers from './crimes/resolvers';

import violenceResolvers from './violence/resolvers';

import entitiesResolvers from './entities/resolvers';

import analysisDataResolvers from './analysisData/resolvers';
// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		livingcostsTypeDef, usersTypeDef, authTypeDef, crimesTypeDef, violenceTypeDef, entitiesTypeDef, analysisDataTypeDef,
	],
	[
		livingcostsQueries, usersQueries, crimesQueries, violenceQueries, entitiesQueries, analysisDataQueries,
	],
	[
		livingcostsMutations, usersMutations, authMutations, crimesMutations, violenceMutations, entitiesMutations, analysisDataMutations,
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		livingcostsResolvers, usersResolvers, authResolvers, crimesResolvers, violenceResolvers, entitiesResolvers, analysisDataResolvers
	)
});
