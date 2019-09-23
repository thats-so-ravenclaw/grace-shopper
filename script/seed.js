'use strict';

const db = require('../server/db');
const { User, Wig } = require('../server/db/models');
const { green, red } = require('chalk');
const faker = require('faker');

//creates an array to seed the database with faker data for users
let usersArr = [];
for (let i = 1; i < 101; i++) {
  let newUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    salt: faker.lorem.word(),
    googleId: faker.name.firstName(),
    isAdmid: false
  };
  usersArr.push(newUser);
}

//creates an array to seed the databse with faker data for wigs
let wigsArr = [];
for (let i = 1; i < 51; i++) {
  let newWig = {
    name: `The ${faker.address.city()}`,
    image: faker.image.imageUrl(),
    price: faker.random.number(),
    quantity: 25,
    description: faker.name.jobDescriptor(),
    length: 'medium',
    material: 'human',
    color: 'brown'
  };
  wigsArr.push(newWig);
}

async function seed() {
  await db.sync({ force: true });
  console.log(green('db synced!'));

  const users = await Promise.all(
    usersArr.map(user => {
      return User.create(user);
    })
  );

  const wigs = await Promise.all(
    wigsArr.map(wig => {
      return Wig.create(wig);
    })
  );
  console.log(green(`seeded ${users.length} users`));
  console.log(green(`seeded ${wigs.length} wigs`));

  console.log(green(`seeded successfully`));
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(red('Oh noes! That was weird...'));
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
