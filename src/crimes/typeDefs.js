export const crimesTypeDef = `
type Crime {
    _id: String!
    date: String!
    state: Int!
}
input CrimesInput {
    date: String!
    state: Int!
}`;

export const crimesQueries = `
    allCrimes: [Crime]!
    crimeById(_id: String!): Crime!
`;

export const crimesMutations = `
    createCrime(crime: CrimeInput!): Crime!
    deleteCrime(_id: Int!): Int
    updateCrime(_id: Int!, crime: CrimeInput!): Crime!
`;
