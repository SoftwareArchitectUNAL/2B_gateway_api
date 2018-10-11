
export const livingcostsTypeDef = `
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

export const livingcostsQueries = `
    allLivingcosts: [Livingcost]!
    livingcostById(id: String!): Livingcost!
    livingcostByZone(zone: String!): Livingcost!
    livingcostByLocality(locality: String!): [Livingcost]!
`;

export const livingcostsMutations = `
    createLivingcost(livingcost: LivingcostInput!): Livingcost!
    deleteLivingcost(id: String!): Int
    updateLivingcost(id: String!, livingcost: LivingcostInput!): Livingcost!
`;
