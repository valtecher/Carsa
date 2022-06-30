const faker = require('faker');
const bcrypt = require('bcryptjs');
const people = require('./20211106084607-seed-person');

const clients = [];

for (let i = 0; i < 10; i++) {
  const userCard = faker.helpers.userCard();

  clients.push({
    person_id: people.people[i].id,
    email: userCard.email,
    password: bcrypt.hashSync('qwerty123', 10),
    phone: faker.phone.phoneNumber('+(48) ### ### ###'),
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
