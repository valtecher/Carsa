const uuid = require('uuid');
const {faker} = require('@faker-js/faker');
const clients = require('./20211106085323-seed-client');
const selectors = require('./20211106093024-seed-car-selector');

const statuses = ['Created', 'Approved', 'Awaiting payment', 'Paid', 'In work', 'Finished', 'Delivered'];
const orders = [];

let i = 0;
while (i < 20) {
  orders.push({
    id: uuid.v4(),
    type: Math.random() > 0.5 ? 'Configuration' : 'Single_Car',
    status: statuses[randomInteger(0, statuses.length - 1)],
    date: faker.date.recent(),
    client_id: clients.clients[randomInteger(0, clients.clients.length - 1)].person_id,
    selector_id: selectors.selectors[randomInteger(0, selectors.selectors.length - 1)].person_id,
    sum: randomInteger(300, 2000)
  });
  i++;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  orders: orders,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Order', orders, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Order', null, {});
  }
};
