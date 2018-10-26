export const crimesTypeDef = `
type Crime {
   _id: String
   date: String
   state: String
   day: String
   city: String
   hour: String
   neighbourhood: String
   zone: String
   site_class: String
   weapon_used: String
   mobility_agresor: String
   mobility_victim: String
   age: String
   gender: String
   marital_status: String
   country_origin:String
   kind_employee: String
   occupation: String
   scholarship: String

}
input CrimeInput {
  date: String
  state: String
  day: String
  city: String
  hour: String
  neighbourhood: String
  zone: String
  site_class: String
  weapon_used: String
  mobility_agresor: String
  mobility_victim: String
  age: String
  gender: String
  marital_status: String
  country_origin:String
  kind_employee: String
  occupation: String
  scholarship: String
}`;

export const crimesQueries = `
    allCrimes: [Crime]!
    crimeById(_id: String!): Crime!
    crimeByState(state: String!): Crime
`;

export const crimesMutations = `
    createCrime(crime: CrimeInput!): Crime!
    deleteCrime(_id: String!): Int
    updateCrime(_id: String!, crime: CrimeInput!): Crime!
`;
