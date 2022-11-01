const {faker} = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const people = require('./20211106084607-seed-person');

const clients = [];

for (let i = 0; i < 10; i++) {
  clients.push({
    person_id: people.people[i].id,
    email: faker.internet.email(),
    password: bcrypt.hashSync('qwerty123', 10),
    phone: faker.phone.number('+(48) ### ### ###'),
    creationDate: new Date()
  });
}

module.exports = {
  clients: clients,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Client', clients, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Client', null, {});
  }
};
