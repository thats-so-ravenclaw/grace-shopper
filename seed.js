const db = require('./server/db');
const { green, red } = require('chalk');
const faker = require('faker');

const User = require('./server/db/models/user');

let users = [];
for (let i = 1; i < 101; i++) {
  let newUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    salt: faker.lorem.word(),
    googleId: faker.name.firstName()
  };
  users.push(newUser);
}

async function seed() {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map(user => {
        return User.create(user);
      })
    );
    console.log(green('Seeding success!'));
    db.close();
  } catch (error) {
    console.error(red('Oh noes! That was weird...'));
    console.error(error);
    db.close();
  }
}

seed();
