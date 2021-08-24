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
    name: "Level One",
    category: "Functions",
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
    test: `describe('myLessThanFunction', function(){
      it('returns TRUE when given valueOne is less than valueTwo', function(){
        expect(myLessThanFunction()).to.equal(true);
      });
    });`,
    divId: "returns TRUE when given valueOne is less than valueTwo",
  });

  const levelOneTestTwo = await Test.create({
    name: "test two",
    test: `describe('myGreaterThanFunction', function(){
      it('returns TRUE when valueOne is greater than valueTwo', function(){
        expect(myGreaterThanFunction()).to.equal(true);
      });
    });`,
    divId: "returns TRUE when valueOne is greater than valueTwo",
  });

  const levelOneTestThree = await Test.create({
    name: "test three",
    test: `describe('myEqualToFunction', function(){
      it('returns TRUE when both values are the same', function(){
        expect(myEqualToFunction()).to.equal(true);
      });
    });`,
    divId: "returns TRUE when both values are the same",
  });

  const levelOneTestFour = await Test.create({
    name: "test four",
    test: `describe('myNotEqualToFunction', function(){
      it('returns TRUE when both values are NOT the same', function(){
        expect(myNotEqualToFunction()).to.equal(false);
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
    name: "Level Two",
    category: "Functions",
    password: "protoman",
    startingJS: `function myIfFunction(duckCount){

    const fire = “Fire!!”
    const hold = “Hold your fire!!”


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
    test: `describe('myIfFunction', function(){
      it('returns Hold your fire!! when no ducks are advancing', function(){
        expect(myIfFunction(0)).to.equal('Hold your fire!!');
        expect(myIfFunction(1)).to.not.equal('Hold your fire!!');
        expect(myIfFunction(100)).to.not.equal('Hold your fire!!');
      });`,
    divId: `returns Hold your fire!! when no ducks are advancing`,
  });

  const levelTwoTestTwo = await Test.create({
    name: "test two",
    test: `it('returns Fire!! when ducks are advancing', function(){
      expect(myIfFunction(0)).to.not.equal('Fire!!');
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
    name: "Level Three",
    category: "Functions",
    password: "sandman",
    startingJS: `function myIfElseFunction(duckCount){

      const hold = “Hold your fire!!”
      const rifle = “Fire the rifle!!”
      const cannon = “Fire the cannon!!”
      const grenade = “Fire the grenade launcher!!”


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
    test: `describe('myIfElseFunction', function(){
      it('returns Hold your fire!! when no ducks are advancing', function(){
        expect(myIfElseFunction(0)).to.equal('Hold your fire!!');
        expect(myIfElseFunction(1)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(2)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(3)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(5)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(8)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(100)).to.not.equal('Hold your fire!!');
      });`,
    divId: `returns Hold your fire!! when no ducks are advancing`,
  });

  const levelThreeTestTwo = await Test.create({
    name: "test two",
    test: `it('returns Fire the rifle!! when 1-2 ducks are advancing', function(){
      expect(myIfElseFunction(0)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(1)).to.equal('Fire the rifle!!');
      expect(myIfElseFunction(2)).to.equal('Fire the rifle!!');
      expect(myIfElseFunction(3)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(5)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(8)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(100)).to.not.equal('Fire the rifle!!');
    });`,
    divId: `returns Fire the rifle!! when 1-2 ducks are advancing`,
  });

  const levelThreeTestThree = await Test.create({
    name: "test three",
    test: `it('returns Fire the cannon!! when 3-5 ducks are advancing', function(){
      expect(myIfElseFunction(0)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(1)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(2)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(3)).to.equal('Fire the cannon!!');
      expect(myIfElseFunction(5)).to.equal('Fire the cannon!!');
      expect(myIfElseFunction(8)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(100)).to.not.equal('Fire the cannon!!');
    });`,
    divId: `returns Fire the cannon!! when 3-5 ducks are advancing`,
  });

  const levelThreeTestFour = await Test.create({
    name: "test four",
    test: `it('returns Fire the grenade launcher!! when 6+ ducks are advancing', function(){
      expect(myIfElseFunction(0)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(1)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(2)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(3)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(5)).to.not.equal('Fire the grenade launcher!!');
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
    name: "Level Four",
    category: "Functions",
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
    test: `describe('myAndFunction', function(){
      it('returns TRUE when given correct input', function(){
        expect(myAndFunction()).to.equal(true);
      });
    });`,
    divId: "returns TRUE when given correct input",
  });

  const levelFourTestTwo = await Test.create({
    name: "test two",
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
    name: "Level Five",
    category: "Functions",
    password: "roll",
    startingJS: `function myIfElseFunction(duckCount, hasShield){

      const hold = “Hold your fire!!”
      const rifle = “Fire the rifle!!”
      const cannon = “Fire the cannon!!”
      const grenade = “Fire the grenade launcher!!”

      //write your code here!
      }
      `
  });

  const levelFiveTestOne = await Test.create({
    name: "test one",
    test: `describe('myIfElseFunction', function(){
      it('returns Hold your fire!! when no ducks are advancing', function(){
        expect(myIfElseFunction(0, false)).to.equal('Hold your fire!!');
        expect(myIfElseFunction(0, true)).to.equal('Hold your fire!!');
        expect(myIfElseFunction(1, false)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(1, true)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(2, false)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(2, true)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(3, false)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(3, true)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(5, false)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(5, true)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(8, false)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(8, true)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(100, false)).to.not.equal('Hold your fire!!');
        expect(myIfElseFunction(100, true)).to.not.equal('Hold your fire!!');
      });`,
    divId: `returns Hold your fire!! when no ducks are advancing`,
  });

  const levelFiveTestTwo = await Test.create({
    name: "test two",
    test: `it('returns Fire the rifle!! when 1-2 ducks are advancing without a shield', function(){
      expect(myIfElseFunction(0, false)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(0, true)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(1, false)).to.equal('Fire the rifle!!');
      expect(myIfElseFunction(1, true)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(2, false)).to.equal('Fire the rifle!!');
      expect(myIfElseFunction(2, true)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(3, false)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(3, true)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(5, false)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(5, true)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(8, false)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(8, true)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(100, false)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(100, true)).to.not.equal('Fire the rifle!!');
    });`,
    divId: `returns Fire the rifle!! when 1-2 ducks are advancing without a shield`,
  });

  const levelFiveTestThree = await Test.create({
    name: "test three",
    test: `it('returns Fire the cannon!! when 3-5 ducks are advancing without a shield', function(){
      expect(myIfElseFunction(0, false)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(0, true)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(1, false)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(1, true)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(2, false)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(2, true)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(3, false)).to.equal('Fire the cannon!!');
      expect(myIfElseFunction(3, true)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(5, false)).to.equal('Fire the cannon!!');
      expect(myIfElseFunction(5, true)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(8, false)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(8, true)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(100, false)).to.not.equal('Fire the cannon!!');
      expect(myIfElseFunction(100, true)).to.not.equal('Fire the cannon!!');
    });`,
    divId: `returns Fire the cannon!! when 3-5 ducks are advancing without a shield`,
  });

  const levelFiveTestFour = await Test.create({
    name: "test four",
    test: `it('returns Fire the grenade launcher!! when 6+ ducks are advancing without a shield', function(){
      expect(myIfElseFunction(0, false)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(0, true)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(1, false)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(1, true)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(2, false)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(2, true)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(3, false)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(3, true)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(5, false)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(5, true)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(8, false)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(100, false)).to.equal('Fire the grenade launcher!!');
    });`,
    divId: `returns Fire the grenade launcher!! when 6+ ducks are advancing without a shield`,
  });

  const levelFiveTestFive = await Test.create({
    name: "test five",
    test: `it('returns Fire the grenade launcher!! when any amount of ducks are advancing with a shield', function(){
      expect(myIfElseFunction(0, false)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(0, true)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(1, false)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(1, true)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(2, false)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(2, true)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(3, false)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(3, true)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(5, false)).to.not.equal('Fire the grenade launcher!!');
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
