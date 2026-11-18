const techCareers = require('./techCareers');
const newTechCareers = require('./newTechCareers');
const specialistCareers = require('./specialistCareers');
const coreSplitCareers = require('./coreSplitCareers');
const businessCareers = require('./businessCareers');
const financeCareers = require('./financeCareers');
const healthCareers = require('./healthCareers');
const lawGovCareers = require('./lawGovCareers');
const builtCareers = require('./builtCareers');
const creativeCareers = require('./creativeCareers');
const aviationMaritimeCareers = require('./aviationMaritimeCareers');
const eduHospitalitySportsCareers = require('./eduHospitalitySportsCareers');
const newExtensionCareers = require('./newExtensionCareers');
const newRolesCareers = require('./newRolesCareers');

const allCareers = [
  ...coreSplitCareers,
  ...newTechCareers,
  ...specialistCareers,
  ...techCareers,
  ...businessCareers,
  ...financeCareers,
  ...healthCareers,
  ...lawGovCareers,
  ...builtCareers,
  ...creativeCareers,
  ...aviationMaritimeCareers,
  ...eduHospitalitySportsCareers,
  ...newExtensionCareers,
  ...newRolesCareers,
];

module.exports = { allCareers };

