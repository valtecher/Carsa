const {faker} = require('@faker-js/faker');
const uuid = require('uuid');
const brands = require('./20211105180820-seed-car-brand');
const models = require('./20211105190655-seed-car-model');
const generations = require('./20211105192344-seed-car-generation');
const orders = require('./20211106160000-seed-order');
const locations = require('./20211105194523-seed-location');

const transmissionTypes = ['Manual', 'Automatic', 'CVT', 'DCT'];
const configurations = [];

for (let i = 0; i < 20; i++) {
  const brand = brands.brands[randomInteger(0, brands.brands.length - 1)];
  const model = brand ? models.models.find((model) => model.brand_id === brand.id) || null : null;
  const generation = model ? generations.generations.find((gen) => gen.model === model.id) || null : null;
  const yearFrom = randomInteger(2005, 2015);
  const yearUntil = randomInteger(yearFrom, 2021);
  const volumeFrom = 0.9 + Math.random() * 2;
  const volumeUntil = volumeFrom + Math.random() * 2;
  const priceFrom = randomInteger(3_000, 10_000);
  const priceUntil = randomInteger(priceFrom, priceFrom + 10_000);
  const mileageFrom = randomInteger(20_000, 100_000);
  const mileageUntil = randomInteger(mileageFrom, mileageFrom + 100_000);
  const order_id = orders.orders[randomInteger(0, orders.orders.length - 1)].id;

  configurations.push({
    id: uuid.v4(),
    brand_id: brand ? brand.id : null,
    model_id: model ? model.id : null,
    generation_id: generation ? generation.id : null,
    year_from: yearFrom,
    year_until: yearUntil,
    engine_volume_from: volumeFrom,
    engine_volume_until: Math.random() > 0.5 ? volumeUntil : null,
    price_from: Math.random() > 0.7 ? priceFrom : null,
    price_until: priceUntil,
    type: Math.random() > 0.75 ? faker.vehicle.type() : null,
    transmission: Math.random() > 0.3 ? transmissionTypes[randomInteger(0, transmissionTypes.length - 1)] : null,
    mileage_from: Math.random() > 0.7 ? mileageFrom : null,
    mileage_until: mileageUntil,
    location_id: Math.random() > 0.8 ? locations.locations[randomInteger(0, locations.locations.length - 1)].id : null,
    order_id: order_id
  });
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  configurations: configurations,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Configuration', configurations, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Configuration', null, {});
  }
};
