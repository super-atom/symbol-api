'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'user',
            [
                {
                    user_id: 'c866faaf-f968-4c4f-805f-20e54d1e50f1',
                    user_login_id: 'seeder1',
                    user_email: 'seeder1@gmail.com',
                    user_password: bcrypt.hashSync('123456', 10),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    user_contribute_point: 0,
                    user_type: 1,
                    // human_id: 'ea51ba34-8ee7-4106-9d18-0c671a24d1dc',
                },
            ],
            { validate: false },
        );
    },

    down: (queryInterface, Sequelize) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    },
};
