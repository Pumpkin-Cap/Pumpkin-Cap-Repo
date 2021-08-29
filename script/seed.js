"use strict";

const {
  db,
  models: { User, Test, Level },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
    User.create({ username: "duane", password: "123" }),
  ]);

  for (let i = 1; i <= 400; i++) {
    let randoUsername = "Anonymous_Soldier_";
    let currentNum = i;

    while (currentNum >= 100) {
      randoUsername += "C";
      currentNum -= 100;
    }
    if (currentNum >= 90) {
      randoUsername += "XC";
      currentNum -= 90;
    }
    if (currentNum >= 50) {
      randoUsername += "L";
      currentNum -= 50;
    }
    if (currentNum >= 40) {
      randoUsername += "XL";
      currentNum -= 40;
    }
    while (currentNum >= 10) {
      randoUsername += "X";
      currentNum -= 10;
    }
    if (currentNum === 9) {
      randoUsername += "IX";
      currentNum -= 9;
    }
    if (currentNum === 4) {
      randoUsername += "IV";
      currentNum -= 4;
    }
    if (currentNum >= 5) {
      randoUsername += "V";
      currentNum -= 5;
    }
    while (currentNum > 0) {
      randoUsername += "I";
      currentNum--;
    }

    //const randoMail = 'fake' + (i) + '@fake.com';

    users.push({
      username: randoUsername,
      password: "123",
      //email: randoMail
    });
  }

  //WILL HAVE TO CHANGE ALL DIV IDS BELOW TO BE UNIQUE FOR OUR SUCCESS MOVING FORWARD - test it have to match divID
  //Might have to refactor
  const Level1 = await Level.create({
    name: "Level 1",
    prompt: "Prove to me you understand how to write conditional statements!",
    category: "Control Flow",
    password: "megaman",
    startingJS: `function myLessThanFunction(){
    //insert appropriate numbers to make it TRUE
    return (/*replace me!*/ < /*replace me!*/)
    }

    function myGreaterThanFunction(){
    //insert appropriate numbers to make it TRUE
    return (/*replace me!*/ > /*replace me!*/)
    }

    function myEqualToFunction(){
    //insert appropriate numbers to make it TRUE
    return (/*replace me!*/ === /*replace me!*/)
    }

    function myNotEqualToFunction(){
    //insert appropriate numbers to make it TRUE
    return (/*replace me!*/ !== /*replace me!*/)
    }`,
  });

  const levelOneTestOne = await Test.create({
    name: "test one",
    description: 'To pass this test, you must insert your choice of approriate numbers where it says "/*replace me!*/" on line 3. Hint - "x is less than y"',
    test: `describe('myLessThanFunction', function(){
      it('returns TRUE when given valueOne is less than valueTwo', function(){
        expect(myLessThanFunction()).to.equal(true);
      });
    });`,
    divId: "returns TRUE when given valueOne is less than valueTwo",
  });

  const levelOneTestTwo = await Test.create({
    name: "test two",
    description: 'To pass this test, you must insert your choice of approriate numbers where it says "/*replace me!*/" on line 8. Hint - "x is greater than y"',
    test: `describe('myGreaterThanFunction', function(){
      it('returns TRUE when valueOne is greater than valueTwo', function(){
        expect(myGreaterThanFunction()).to.equal(true);
      });
    });`,
    divId: "returns TRUE when valueOne is greater than valueTwo",
  });

  const levelOneTestThree = await Test.create({
    name: "test three",
    description: 'To pass this test, you must insert your choice of approriate numbers where it says "/*replace me!*/" on line 13. Hint - "x is strictly equal to y"',
    test: `describe('myEqualToFunction', function(){
      it('returns TRUE when both values are the same', function(){
        expect(myEqualToFunction()).to.equal(true);
      });
    });`,
    divId: "returns TRUE when both values are the same",
  });

  const levelOneTestFour = await Test.create({
    name: "test four",
    description: 'To pass this test, you must insert your choice of approriate numbers where it says "/*replace me!*/" on line 18. Hint - "x does not equal y"',
    test: `describe('myNotEqualToFunction', function(){
      it('returns TRUE when both values are NOT the same', function(){
        expect(myNotEqualToFunction()).to.equal(true);
      });
    });`,
    divId: "returns TRUE when both values are NOT the same",
  });

  await Level1.addTests([
    levelOneTestOne,
    levelOneTestTwo,
    levelOneTestThree,
    levelOneTestFour,
  ]);

  // Level 2
  const Level2 = await Level.create({
    name: "Level 2",
    prompt: 'Following this condition, write a program that will aid in the quick delivery of orders to our troops. If a wave of ducks is advancing: fire!',
    category: "Control Flow",
    password: "protoman",
    startingJS: `function myIfFunction(duckCount){

    const fire = 'Fire!!'
    const hold = 'Hold your fire!!'


    if (/*replace me with your condition!*/){

    return /*replace me with your order!*/
    }
    else{

    return /*replace me with your order!*/
    }
  }
    `,
  });

  const levelTwoTestOne = await Test.create({
    name: "test one",
    description: 'We want to return hold when the duck count is less than 1',
    test: `describe('myIfFunction', function(){
      it('returns Hold your fire!! when no ducks are advancing', function(){
        expect(myIfFunction(0)).to.equal('Hold your fire!!');
      });`,
    divId: `returns Hold your fire!! when no ducks are advancing`,
  });

  const levelTwoTestTwo = await Test.create({
    name: "test two",
    description: 'We want to return fire when the duck count is greater than 0',
    test: `it('returns Fire!! when ducks are advancing', function(){
      expect(myIfFunction(1)).to.equal('Fire!!');
      expect(myIfFunction(100)).to.equal('Fire!!');
    });
  });`,
    divId: `returns Fire!! when ducks are advancing`,
  });

  await Level2.addTests([
    levelTwoTestOne,
    levelTwoTestTwo
  ]);

  // Level 3
  const Level3 = await Level.create({
    name: "Level 3",
    prompt: `Following these conditions, write a program that will aid in the quick delivery of orders to our troops.
    When there are no ducks advancing, order a hold.
    When the duck wave is 1-2, fire the rifle for precise shots.
    When the duck wave is 3-5, fire the cannon for broader hits.
    Otherwise, fire the grenade launcher!`,
    category: "Control Flow",
    password: "sandman",
    startingJS: `function myIfElseFunction(duckCount){

      const hold = 'Hold your fire!!'
      const rifle = 'Fire the rifle!!'
      const cannon = 'Fire the cannon!!'
      const grenade = 'Fire the grenade launcher!!'


      if (/*replace me with your condition!*/){

      return /*replace me with your order!*/
      }
      else if (/*replace me with your next condition!*/){

      return /*replace me with your order!*/
      }
      else if (/*replace me with your next condition!*/){

      return /*replace me with your order!*/
      }
      else{

      return /*replace me with your order!*/
      }
    }`
  });

  const levelThreeTestOne = await Test.create({
    name: "test one",
    description: 'When there are no ducks advancing, order a hold',
    test: `describe('myIfElseFunction', function(){
      it('returns Hold your fire!! when no ducks are advancing', function(){
        expect(myIfElseFunction(0)).to.equal('Hold your fire!!');
        expect(myIfElseFunction(-10)).to.equal('Hold your fire!!');
      });`,
    divId: `returns Hold your fire!! when no ducks are advancing`,
  });

  const levelThreeTestTwo = await Test.create({
    name: "test two",
    description: 'When 1 or 2 ducks are approaching, fire the rifle for precise shots',
    test: `it('returns Fire the rifle!! when 1-2 ducks are advancing', function(){
      expect(myIfElseFunction(1)).to.equal('Fire the rifle!!');
      expect(myIfElseFunction(2)).to.equal('Fire the rifle!!');
    });`,
    divId: `returns Fire the rifle!! when 1-2 ducks are advancing`,
  });

  const levelThreeTestThree = await Test.create({
    name: "test three",
    description: 'When 3 to 5 ducks are approaching, fire the cannon for broader hits',
    test: `it('returns Fire the cannon!! when 3-5 ducks are advancing', function(){
      expect(myIfElseFunction(3)).to.equal('Fire the cannon!!');
      expect(myIfElseFunction(5)).to.equal('Fire the cannon!!');
    });`,
    divId: `returns Fire the cannon!! when 3-5 ducks are advancing`,
  });

  const levelThreeTestFour = await Test.create({
    name: "test four",
    description: 'When all else fails, fire the grenade launcher!!',
    test: `it('returns Fire the grenade launcher!! when 6+ ducks are advancing', function(){
      expect(myIfElseFunction(6)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(8)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(100)).to.equal('Fire the grenade launcher!!');
    });
  });`,
  divId: `returns Fire the grenade launcher!! when 6+ ducks are advancing`,
});

  await Level3.addTests([
    levelThreeTestOne,
    levelThreeTestTwo,
    levelThreeTestThree,
    levelThreeTestFour
  ]);

  // Level 4
  const Level4 = await Level.create({
    name: "Level 4",
    prompt: 'Prove to me you understand how to JOIN conditional statements!',
    category: "Control Flow",
    password: "gutsman",
    startingJS: `function myAndFunction(){

      //insert appropriate numbers to make it TRUE
      return (/*replace me!*/ <= /*replace me!*/ && /*replace me!*/ >= /*replace me!*/)
      }

      function myOrFunction(){

      //insert appropriate numbers to make it FALSE
      return (/*replace me!*/ <= /*replace me!*/ || /*replace me!*/ >= /*replace me!*/)
      }
      `
  });

  const levelFourTestOne = await Test.create({
    name: "test one",
    description: 'Insert the appropriate conditional statements that\'ll make line 4 evaluate to true',
    test: `describe('myAndFunction', function(){
      it('returns TRUE when given correct input', function(){
        expect(myAndFunction()).to.equal(true);
      });
    });`,
    divId: "returns TRUE when given correct input",
  });

  const levelFourTestTwo = await Test.create({
    name: "test two",
    description: 'Insert the appropriate conditional statements that\'ll make line 10 evaluate to false. Hint - an || will return true if at least one side evaluate to true',
    test: `describe('myOrFunction', function(){
      it('returns FALSE when given appropriate input', function(){
        expect(myOrFunction()).to.equal(false);
      });
    });`,
    divId: "returns FALSE when given appropriate input",
  });

  await Level4.addTests([
    levelFourTestOne,
    levelFourTestTwo]);

  // Level 5
  const Level5 = await Level.create({
    name: "Level 5",
    prompt: `Following these conditions, write a program that will aid in the quick delivery of orders to our troops.
    As before,
    When there are no ducks advancing, order a hold.
    When the duck wave is 1-2, fire the rifle for precise shots.
    When the duck wave is 3-5, fire the cannon for broader hits.
    When it’s 5 or higher, fire the grenade launcher!
    But now,If there’s a shield you must use the grenade launcher regardless!`,
    category: "Control Flow",
    password: "roll",
    startingJS: `function myIfElseFunction(duckCount, hasShield){

      const hold = 'Hold your fire!!'
      const rifle = 'Fire the rifle!!'
      const cannon = 'Fire the cannon!!'
      const grenade = 'Fire the grenade launcher!!'

      //write your code here!
      }
      `
  });

  const levelFiveTestOne = await Test.create({
    name: "test one",
    description: 'When there are no ducks advancing, order a hold.',
    test: `describe('myIfElseFunction', function(){
      it('returns Hold your fire!! when no ducks are advancing', function(){
        expect(myIfElseFunction(0, false)).to.equal('Hold your fire!!');
        expect(myIfElseFunction(0, true)).to.equal('Hold your fire!!');
      });`,
    divId: `returns Hold your fire!! when no ducks are advancing`,
  });

  const levelFiveTestTwo = await Test.create({
    name: "test two",
    description: 'When the duck wave is 1-2, fire the rifle for precise shots.',
    test: `it('returns Fire the rifle!! when 1-2 ducks are advancing without a shield', function(){
      expect(myIfElseFunction(1, false)).to.equal('Fire the rifle!!');
      expect(myIfElseFunction(2, false)).to.equal('Fire the rifle!!');
    });`,
    divId: `returns Fire the rifle!! when 1-2 ducks are advancing without a shield`,
  });

  const levelFiveTestThree = await Test.create({
    name: "test three",
    description: 'When the duck wave is 3-5, fire the cannon for broader hits.',
    test: `it('returns Fire the cannon!! when 3-5 ducks are advancing without a shield', function(){
      expect(myIfElseFunction(3, false)).to.equal('Fire the cannon!!');
      expect(myIfElseFunction(4, false)).to.equal('Fire the cannon!!');
      expect(myIfElseFunction(5, false)).to.equal('Fire the cannon!!');
    });`,
    divId: `returns Fire the cannon!! when 3-5 ducks are advancing without a shield`,
  });

  const levelFiveTestFour = await Test.create({
    name: "test four",
    description: 'When it’s 5 or higher, fire the grenade launcher!',
    test: `it('returns Fire the grenade launcher!! when 6+ ducks are advancing without a shield', function(){
      expect(myIfElseFunction(8, false)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(100, false)).to.equal('Fire the grenade launcher!!');
    });`,
    divId: `returns Fire the grenade launcher!! when 6+ ducks are advancing without a shield`,
  });

  const levelFiveTestFive = await Test.create({
    name: "test five",
    description: 'If there is a shield, you must use the grenade launcher regardless!',
    test: `it('returns Fire the grenade launcher!! when any amount of ducks are advancing with a shield', function(){
      expect(myIfElseFunction(1, true)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(2, true)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(3, true)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(5, true)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(8, false)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(8, true)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(100, false)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(100, true)).to.equal('Fire the grenade launcher!!');
    });
  });`,
  divId: `returns Fire the grenade launcher!! when any amount of ducks are advancing with a shield`,
});

  await Level5.addTests([
    levelFiveTestOne,
    levelFiveTestTwo,
    levelFiveTestThree,
    levelFiveTestFour,
    levelFiveTestFive
  ]);

  await users[2].addLevels([
    Level1,
    Level2,
    Level3,
    Level4,
    Level5
  ])

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      duane: users[2],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
