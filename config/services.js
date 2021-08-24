const venueServices = [
  "electricity",
  "security",
  "cleaning service",
  "outdoor venue",
  "indoor venue",
];

const organizerServices = ["planner", "organizer"];

const locations = [
  "bandung",
  "jakarta",
  "singapore",
  "johor",
  "batam",
  "malang",
  "depok",
  "pyongyang",
];

const samplePrices = [
  10000000, 15000000, 25000000, 30000000, 35000000, 40000000, 50000000,
  75000000, 80000000, 90000000, 100000000, 120000000, 130000000, 150000000,
];

const samplePriceRanges = [
  "25000000-50000000",
  "35000000-75000000",
  "50000000-100000000",
  "75000000-125000000",
  "10000000-80000000",
  "50000000-1500000000",
  "15000000-300000000",
  "20000000-50000000",
];

const sampleCapacity = [
  { min: 50, max: 250 },
  { min: 500, max: 1500 },
  { min: 250, max: 500 },
  { min: 500, max: 750 },
  { min: 500, max: 2500 },
  { min: 1500, max: 3000 },
  { min: 0, max: 500 },
  { min: 1000, max: 2500 },
];

const sampleCapacityRanges = [
  "50-250",
  "500-1500",
  "250-500",
  "500-750",
  "500-2500",
  "1500-3000",
  "0-500",
  "1000-2500",
];

module.exports = {
  venueServices,
  organizerServices,
  locations,
  samplePrices,
  sampleCapacity,
  samplePriceRanges,
  sampleCapacityRanges,
};
