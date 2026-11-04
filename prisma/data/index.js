const techCareers = require('./techCareers');
const businessCareers = require('./businessCareers');
const financeCareers = require('./financeCareers');
const healthCareers = require('./healthCareers');
const lawGovCareers = require('./lawGovCareers');
const builtCareers = require('./builtCareers');
const creativeCareers = require('./creativeCareers');
const aviationMaritimeCareers = require('./aviationMaritimeCareers');
const eduHospitalitySportsCareers = require('./eduHospitalitySportsCareers');

const allCareers = [
  ...techCareers,
  ...businessCareers,
  ...financeCareers,
  ...healthCareers,
  ...lawGovCareers,
  ...builtCareers,
  ...creativeCareers,
  ...aviationMaritimeCareers,
  ...eduHospitalitySportsCareers,
];

module.exports = { allCareers };
