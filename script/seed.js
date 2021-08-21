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

  //Level 1
  const Level1 = await Level.create({name:'Level One', category: 'Functions', password: 'megaman'})

  //changed naming convention for test instance
  const levelOneTestOne = await Test.create({
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

  const levelOneTestTwo = await Test.create({
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

  await Level1.addTests( [ levelOneTestOne, levelOneTestTwo ] )

  // Level 2
  const Level2 = await Level.create({name:'Level Two', category: 'Functions', password: 'protoman'})

  const levelTwoTestOne = await Test.create({
    name: 'test one',
    test: `describe('myFunction', function() {
      it('this is a third duck', function() {
        var callback = sinon.spy();

        myFunction(true, callback);

        assert(callback.calledOnce);

      })
    });`,
    divId: "this is a third duck"
  })

  const levelTwoTestTwo = await Test.create({
    name: 'test two',
    test: `describe('myFunction', function() {
      it('this is a fourth duck', function() {
        var callback = sinon.spy();

        myFunction(true, callback);

        assert(callback.calledOnce);

      })
    });`,
    divId: "this is a fourth duck"
  })

  await Level2.addTests( [ levelTwoTestOne, levelTwoTestTwo ] )

  // Level 3
  const Level3 = await Level.create({name:'Level Three', category: 'Functions', password: 'sandman'})

  const levelThreeTestOne = await Test.create({
    name: 'test one',
    test: `describe('myFunction', function() {
      it('this is a fifth duck', function() {
        var callback = sinon.spy();

        myFunction(true, callback);

        assert(callback.calledOnce);

      })
    });`,
    divId: "this is a fifth duck"
  })

  const levelThreeTestTwo = await Test.create({
    name: 'test two',
    test: `describe('myFunction', function() {
      it('this is a sixth duck', function() {
        var callback = sinon.spy();

        myFunction(true, callback);

        assert(callback.calledOnce);

      })
    });`,
    divId: "this is a sixth duck"
  })

  await Level3.addTests( [ levelThreeTestOne, levelThreeTestTwo ] )

  // Level 4
  const Level4 = await Level.create({name:'Level Four', category: 'Functions', password: 'gutsman'})

  const levelFourTestOne = await Test.create({
    name: 'test one',
    test: `describe('myFunction', function() {
      it('this is a seventh duck', function() {
        var callback = sinon.spy();

        myFunction(true, callback);

        assert(callback.calledOnce);

      })
    });`,
    divId: "this is a seventh duck"
  })

  const levelFourTestTwo = await Test.create({
    name: 'test two',
    test: `describe('myFunction', function() {
      it('this is an eighth duck', function() {
        var callback = sinon.spy();

        myFunction(true, callback);

        assert(callback.calledOnce);

      })
    });`,
    divId: "this is an eighth duck"
  })

  await Level4.addTests( [ levelFourTestOne, levelFourTestTwo ] )

    // Level 5
    const Level5 = await Level.create({name:'Level Five', category: 'Functions', password: 'roll'})

    const levelFiveTestOne = await Test.create({
      name: 'test one',
      test: `describe('myFunction', function() {
        it('this is a ninth duck', function() {
          var callback = sinon.spy();

          myFunction(true, callback);

          assert(callback.calledOnce);

        })
      });`,
      divId: "this is a ninth duck"
    })

    const levelFiveTestTwo = await Test.create({
      name: 'test two',
      test: `describe('myFunction', function() {
        it('this is a tenth duck', function() {
          var callback = sinon.spy();

          myFunction(true, callback);

          assert(callback.calledOnce);

        })
      });`,
      divId: "this is a tenth duck"
    })

    await Level5.addTests( [ levelFiveTestOne, levelFiveTestTwo ] )

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
