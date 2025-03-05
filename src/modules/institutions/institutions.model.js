import { model, Schema } from "mongoose";

const CountrySchema = new Schema({
    displayName: String,
    countryCode2: String, 
})
const InstitutionSchema = new Schema({
  id: String,
  name: String,
  fullName: String,
  countries: [CountrySchema],
  environmentType: String,
  credentialsType: String,
  features: [String], 
})

const Institution = model('Institution', InstitutionSchema);

export { Institution }