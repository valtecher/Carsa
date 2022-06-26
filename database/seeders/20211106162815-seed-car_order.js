const cars = require('./20211106103041-seed-car');
const orders = require('./20211106160000-seed-order');

const statuses = ['Reserved', 'Accepted', 'Declined', 'Expired', 'Bought'];
const records = [];

let i = 0;
while (records.length < 10) {
  records.push({
    order_id: orders.orders[i].id,
    car_id: cars.cars[i].id,
    start_reservation: new Date(),
    status: statuses[randomInteger(0, statuses.length - 1)]
  });
  i++;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Car_Order', records, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Car_Order', null, {});
  }
};
