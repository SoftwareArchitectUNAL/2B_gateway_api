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


import livingcostsResolvers from './livingcosts/resolvers';


import crimesResolvers from './crimes/resolvers';


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
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		livingcostsResolvers, crimesResolvers
	)
});
