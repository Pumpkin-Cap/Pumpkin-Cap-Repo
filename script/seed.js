'use strict'

const {db, models: {User, Test, Level} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
    User.create({ username: 'duane', password: '123' })
  ])

  //nameless user generator
  for (let i = 1; i < 401; i++) {
    let randoUsername = 'Anonymous_Soldier_';
    let currentNum = i;

    while (currentNum >= 100) {
      randoUsername += 'C';
      currentNum -= 100;
    }
    if (currentNum >= 90) {
      randoUsername += 'XC';
      currentNum -= 90;
    }
    if (currentNum >= 50) {
      randoUsername += 'L';
      currentNum -= 50;
    }
    if (currentNum >= 40) {
      randoUsername += 'XL';
      currentNum -= 40;
    }
    while (currentNum>= 10) {
      randoUsername += 'X';
      currentNum -= 10;
    }
    if (currentNum === 9) {
      randoUsername += 'IX';
      currentNum -= 9;
    }
    if (currentNum === 4) {
      randoUsername += 'IV';
      currentNum -= 4;
    }
    if (currentNum >= 5) {
      randoUsername += 'V';
      currentNum -= 5;
    }
    while (currentNum > 0) {
      randoUsername += 'I';
      currentNum--;
    }

    //const randoMail = 'fake' + (i) + '@fake.com';

    users.push({
      username: randoUsername,
      password: '123',
      //email: randoMail
    });
  }

  const Level1 = await Level.create({name:'Level One', category: 'Functions', password: 'megaman'})

  const test1 = await Test.create({
    name: 'test one',
    test: `describe('myFunction', function() {
      it('this is a duck', function() {
        var callback = sinon.spy();

        myFunction(true, callback);

        assert(callback.calledOnce);

      })
    });`,
    divId: "this is a duck"
  })

  const test2 = await Test.create({
    name: 'test one',
    test: `describe('myFunction', function() {
      it('this is another duck', function() {
        var callback = sinon.spy();

        myFunction(true, callback);

        assert(callback.calledOnce);

      })
    });`,
    divId: "this is another duck"
  })

  await Level1.addTests( [ test1, test2 ] )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      duane: users[2]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
