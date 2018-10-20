export const violenceTypeDef = `

type Murder {
    id: Int!
    neighborhood: String!
    body_count: Int!
    description: String!
}
input MurderInput {
    neighborhood: String!
    body_count: Int!
    description: String!
}

type Street {
    id: String!
    neighborhood: String!
    stype: String!
    body_count: Int!
    description: String!
}
input StreetInput {
    neighborhood: String!
    stype: String!
    body_count: Int!
    description: String!
}

type Gender {
    id: String!
    neighborhood: String!
    gtype: String!
    criminal_complaint: String!
    body_count: Int!
}
input GenderInput {
    neighborhood: String!
    gtype: String!
    criminal_complaint: String!
    body_count: Int!
}

type Intrafamily {
    id: String!
    neighborhood: String!
    victim: String!
    aggressor: String!
    criminal_complaint: String!
}
input IntrafamilyInput {
    neighborhood: String!
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
