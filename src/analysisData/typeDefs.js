
export const analysisDataTypeDef = `
type ViolenceEvent {
    _id: Int!
    vio_place: String
    vio_type: String
    vio_victime_id: Int
}
input ViolenceEventInput {
    _id: Int! 
    vio_place: String
    vio_type: String
    vio_victime_id: Int
}`;

export const analysisDataQueries = `
    allViolenceEvents: [ViolenceEvent]!
    ViolenceEventById(id: Int!): ViolenceEvent!
`;

export const analysisDataMutations = `
    createViolenceEvent(ViolenceEvent: ViolenceEventInput!): ViolenceEvent!
    deleteViolenceEvent(id: Int!): ViolenceEvent!
    updateViolenceEvent(id: Int!, ViolenceEvent: ViolenceEventInput!): ViolenceEvent!
`;
