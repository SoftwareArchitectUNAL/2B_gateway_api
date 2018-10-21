export const entitiesTypeDef = `
type Entity {
    idEntity: Int!
    typeEntity: String!
    description: String!
    address: String!
    coordinates: String!
    zone: String!
    name: String!
}
input EntityInput {
    typeEntity: String!
    description: String!
    address: String!
    coordinates: String!
    zone: String!
    name: String!
}

type Score {
    idScore: Int!
    scoreEntity: Float!
    commentary: String!
    entity_idEntity: Int!

}
input ScoreInput {
    scoreEntity: Float!
    commentary: String!
    
}`;

export const entitiesQueries = `
    allEntities: [Entity]!
    entityById(idEntity: Int!): Entity!
    entityByType(TypeEntity: String!):[Entity]!
    entityByZone(Zone: String!):[Entity]!
    entitiesByScore(idEntity: Int!): [Score]!
    entityByScore(idEntity: Int!): Score!
`;

export const entitiesMutations = `
    createEntity(entity: EntityInput!): Entity!
    createScore(idEntity: Int!, score: ScoreInput!): Score!
    deleteEntity(idEntity: Int!): Int
`;
