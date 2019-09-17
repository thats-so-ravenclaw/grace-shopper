const { db } = require('./server/db');
const { green, red } = require('chalk');
const faker = require('faker');

const Users = require('./server/db/models/user');

const users = [];
for (let i = 1; i < 101; i++) {
  let newUser = {
    email: faker.internet.email()
    // password:
    // salt:,
    // googleId:
  };
}

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map(user => {
        return Users.create(user);
      })
    );
    console.log(green('Seeding success!'));
    db.close();
  } catch (error) {
    console.error(red('Oh noes! That was weird...'));
    console.error(error);
    db.close();
  }
};

seed();
