export const violenceTypeDef = `

type Murder {
    id: Int!
    locality: String!
    body_count: Int!
    description: String!
}
input MurderInput {
    locality: String!
    body_count: Int!
    description: String!
}

type Street {
    id: String!
    locality: String!
    stype: String!
    body_count: Int!
    description: String!
}
input StreetInput {
    locality: String!
    stype: String!
    body_count: Int!
    description: String!
}

type Gender {
    id: String!
    locality: String!
    gtype: String!
    criminal_complaint: String!
    body_count: Int!
}
input GenderInput {
    locality: String!
    gtype: String!
    criminal_complaint: String!
    body_count: Int!
}

type Intrafamily {
    id: String!
    locality: String!
    victim: String!
    aggressor: String!
    criminal_complaint: String!
}
input IntrafamilyInput {
    locality: String!
    victim: String!
    aggressor: String!
    criminal_complaint: String!
}`;

export const violenceQueries = `
    allMurders: [Murder]!
    murderById(id: String!): Murder!

    allGenders: [Gender]!
    genderById(id: String!): Gender!

    allStreets: [Street]!
    streetById(id: String!): Street!

    allIntrafamilies: [Intrafamily]!
    intrafamilyById(id: String!): Intrafamily!
`;

export const violenceMutations = `
    createMurder(murder: MurderInput!): Murder!
    deleteMurder(id: Int!): Int
    updateMurder(id: Int!, murder: MurderInput!): Murder!

    createGender(gender: GenderInput!): Gender!
    deleteGender(id: Int!): Int
    updateGender(id: Int!, gender: GenderInput!): Gender!

    createStreet(street: StreetInput!): Street!
    deleteStreet(id: Int!): Int
    updateStreet(id: Int!, street: StreetInput!): Street!

    createIntrafamily(intrafamily: IntrafamilyInput!): Intrafamily!
    deleteIntrafamily(id: Int!): Int
    updateIntrafamily(id: Int!, intrafamily: IntrafamilyInput!): Intrafamily!
`;
