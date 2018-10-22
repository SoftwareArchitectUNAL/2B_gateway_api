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

import crimesResolvers from './crimes/resolvers';

import violenceResolvers from './violence/resolvers';

import entitiesResolvers from './entities/resolvers';

import analysisDataResolvers from './analysisData/resolvers';
// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		livingcostsTypeDef, crimesTypeDef, violenceTypeDef, entitiesTypeDef, analysisDataTypeDef,
	],
	[
		livingcostsQueries, crimesQueries, violenceQueries, entitiesQueries, analysisDataQueries,
	],
	[
		livingcostsMutations, crimesMutations, violenceMutations, entitiesMutations, analysisDataMutations,
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		livingcostsResolvers, crimesResolvers, violenceResolvers, entitiesResolvers, analysisDataResolvers
	)
});
