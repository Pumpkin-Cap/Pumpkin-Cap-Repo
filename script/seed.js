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
    when there are no ducks advancing, order a hold.
    When the duck wave is 1-2, fire the rifle for precise shots.
    When the duck wave is 3-5, fire the cannon for broader hits.
    When it’s 5 or higher, fire the grenade launcher!
    But now, if there’s a shield you must use the grenade launcher regardless!`,
    category: "Control Flow",
    password: "roll",
    startingJS: `function myIfElseFunction(duckCount, hasShield){

      const hold = 'Hold your fire!!'
      const rifle = 'Fire the rifle!!'
      const cannon = 'Fire the cannon!!'
      const grenade = 'Fire the grenade launcher!!'

      //Your code below


      //Your code above
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
      expect(myIfElseFunction(1, true)).to.not.equal('Fire the rifle!!');
      expect(myIfElseFunction(2, false)).to.equal('Fire the rifle!!');
      expect(myIfElseFunction(2, true)).to.not.equal('Fire the rifle!!');
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
      expect(myIfElseFunction(5, true)).to.not.equal('Fire the cannon!!');

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
      expect(myIfElseFunction(0, true)).to.not.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(1, true)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(2, true)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(3, true)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(5, true)).to.equal('Fire the grenade launcher!!');
      expect(myIfElseFunction(8, true)).to.equal('Fire the grenade launcher!!');
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

  // Level 6
  const Level6 = await Level.create({
    name: "Level 6",
    prompt: 'Prove to me you understand how a for-loop works!',
    category: "Loops",
    password: 'elecman',
    startingJS: `function myForLoopFunction(){

      let counter = 0

      //Insert starting and ending points to have the function return 10
      for (let i = */replace me*/; i < */replace me*/; i++){

      counter++
      }

      return counter
      }
    `,
  });

  // test specs for level6 go here
  const levelSixTestOne = await Test.create({
    name: "test one",
    description: `When we return counter with the correct code, it should evaluate to 10`,
    test: `describe('myForLoopFunction', function(){
      it('returns 10', function(){
        expect(myForLoopFunction()).to.equal(10);
      });
    });`,
  divId: 'returns 10',
  })

  await Level6.addTests([
    levelSixTestOne
  ]);

// Level 7
  const Level7 = await Level.create({
    name: "Level 7",
    prompt: `Accounting for an unknown number of waves, write a program that will let us know how many troops will be required.
    1 wave needs 5 troops. Each wave in addition will require an additional troop, e.g., 4 waves will require 26 troops (wave 1: 5 troops, wave 2: 6 troops, wave 3: 7 troops, wave 4: 8 troops).
    `,
    category: "Loops",
    password: 'roboman',
    startingJS: `function myForLoopFunction(duckWaves){

      let requiredTroops = 0

      for (let i = 0; i < duckWaves; i++){

      //Your code below this line


      //Your code above this line
        }
      return requiredTroops
      }
    `,
  });

// test specs for level 7 go here
  const levelSevenTestOne = await Test.create({
    name: "test one",
    description: `Return the correct number of troops to fight off the duckWave(s)`,
    test: `describe('myForLoopFunction', function(){
      it('returns the correct number of troops', function(){
        expect(myForLoopFunction(1)).to.equal(5);
        expect(myForLoopFunction(2)).to.equal(11);
        expect(myForLoopFunction(4)).to.equal(26);
      });
    });`,
  divId: `returns the correct number of troops`,
  })

  await Level7.addTests([
    levelSevenTestOne
  ]);

  // Level 8
  const Level8 = await Level.create({
    name: "Level 8",
    prompt: `Write a program that will calculate the time before a duck reaches us, given the following information:
    A duck travels at half a meter per second.
    Knowing its starting distance, we’ll need to know the time to the nearest second, rounded up.
    `,
    category: "Loops",
    password: 'iceman',
    startingJS: `function myWhileLoopFunction(duckDistance){

      let duckIsWaddling = true
      let time = 0

      while (duckIsWaddling){
      //Your code below this line


      //Your code above this line
      if (duckDistance <= 0){
      duckIsWaddling = false
      }
      }

      return time
    }
    `,
  });

// test specs for level 8 go here
  const levelEightTestOne = await Test.create({
    name: "test one",
    description: `When time is returned, it should evalute to an output corresponding to the known duckDistance`,
    test: `describe('myWhileLoopFunction', function(){
      it("returns the appropriate time that it will take for a duck to reach us", function(){
        expect(myWhileLoopFunction(20)).to.equal(40);
        expect(myWhileLoopFunction(10)).to.equal(20);
        expect(myWhileLoopFunction(4)).to.equal(8);
        expect(myWhileLoopFunction(7)).to.equal(14)
      });
    });
    `,
  divId: "returns the appropriate time that it will take for a duck to reach us",
  })

  await Level8.addTests([
    levelEightTestOne
  ]);

  // Level 9
  const Level9 = await Level.create({
    name: "Level 9",
    prompt: `Write a program that will calculate the amount of guns required to take down a tough duck, given the following information:

    A duck travels at half a meter per second.
A duck one-foot tall takes one bullet.
Each increase of one foot doubles the required hits from the previous height.
Each bullet takes 1 second to fire, and a gun takes 5 seconds to reload (maximum 10 shots per load).
    `,
    category: "Loops",
    password: 'fireman',
    startingJS: `function myIfWhileForLoopFunction(duckHeight, duckDistance){

      //boolean to track when duck reaches us
      let duckIsWaddling = true

      //time required for duck to reach us
      let time = 0

      //total shots taken at a duck
      let shotCount = 1

      //total guns required to take a duck down in time
      let gunsRequired = 0

      //Provided is a set of two loops suggested for use, but you may solve it any way you can come up with!

      while(duckIsWaddling) {
        //Your code below this line


        //Your code above this line
      if (duckDistance <= 0) {
        duckIsWaddling = false
      }
      }

      for (let i = 0; i < duckHeight; i++){
        //Your code below this line

      }

        //Do not edit below here
      return gunsRequired
    }
    `,
  });

// test specs for level 9 go here
  const levelNineTestOne = await Test.create({
    name: "test one",
    description: 'When gunsRequired is returned, it should evaluate to the appropriate amount on guns needed to take down a tough duck',
    test: `describe('myIfWhileForLoopFunction', function(){
      it("returns the appropriate time that it will take for a duck to reach us", function(){
        expect(myIfWhileForLoopFunction(2, 4)).to.equal(2);
        expect(myIfWhileForLoopFunction(4, 24)).to.equal(3);
        expect(myIfWhileForLoopFunction(1, 5)).to.equal(5);
      });
    });`,
  divId: `returns the appropriate time that it will take for a duck to reach us`,
  })

  await Level9.addTests([
    levelNineTestOne
  ]);

  // Level 10
  const Level10 = await Level.create({
    name: "Level 10",
    prompt: `Prove to me you understand how arrays work!
    `,
    category: "Arrays",
    password: 'beautyman',
    startingJS: `const myArray = [20, 15, 300, 45, -50, 0, 15]

    //make all functions return true

    function myFirstArrayFunction(){

    return (20 === myArray[/*replace me!*/])
    }

    function mySecondArrayFunction(){

    return (345 === (myArray[/*replace me!*/] + myArray[/*replace me!*/]))
    }

    // For the following questions, I expect you to use integers to solve for true. THERE IS NO ROOM FOR LAZINESS!
    function myThirdArrayFunction(){

    return ((/*replace me!*/ === myArray[1]) && (/*replace me!*/ === myArray[6]))
    }

    function myFourthArrayFunction(){

    return (myArray.length === /*replace me!*/)
    }

    function myFifthArrayFunction(){

    return (/*replace me!*/ === (myArray[/*replace me!*/] + myArray[/*replace me!*/]))
    }
    `,
  });

// test specs for level 10 go here
  const levelTenTestOne = await Test.create({
    name: "test one",
    description: "To pass this test, you must insert the appropriate values or indeces wherever there is a replace me. Hint - both values must be equal to 20",
    test: `describe('myFirstArrayFunction', function(){
      it('return TRUE when both values are equal to 20', function(){
        expect(myFirstArrayFunction()).to.equal(true)
      });
    })`,
  divId: `return TRUE when both values are equal to 20`,
  })

  const levelTenTestTwo = await Test.create({
    name: "test two",
    description: "To pass this test, you must insert the appropriate values or indeces wherever there is a replace me. Hint - both values must be equal to 345",
    test: `describe('mySecondArrayFunction', function(){
      it('return TRUE when both values are equal to 345', function(){
        expect(mySecondArrayFunction()).to.equal(true)
      });
    })`,
  divId: `return TRUE when both values are equal to 345`,
  })

  const levelTenTestThree = await Test.create({
    name: "test three",
    description: "To pass this test, you must insert the appropriate values or indeces wherever there is a replace me. Hint - both conditional statements must evaluate to true",
    test: `describe('myThirdArrayFunction', function(){
      it('return TRUE when both conditional statements evaluate to true', function(){
        expect(myThirdArrayFunction()).to.equal(true)
      });
    })`,
  divId: `return TRUE when both conditional statements evaluate to true`,
  })

  const levelTenTestFour = await Test.create({
    name: "test four",
    description: "To pass this test, you must insert the appropriate values or indeces wherever there is a replace me. Hint - you must plug in the correct array length",
    test: `describe('myFourthArrayFunction', function(){
      it('return TRUE when the correct array length is plugged in', function(){
        expect(myFourthArrayFunction()).to.equal(true)
      });
    })`,
  divId: `return TRUE when the correct array length is plugged in`,
  })

  const levelTenTestFive = await Test.create({
    name: "test five",
    description: "To pass this test, you must insert the appropriate values or indeces wherever there is a replace me. Hint - the integer must be equal to the sum to the two array values",
    test: `describe('myFifthArrayFunction', function(){
      it("return TRUE when the integer is equal to the sum of the two array values", function(){
        expect(myFifthArrayFunction()).to.equal(true)
      });
    })`,
  divId: `return TRUE when the integer is equal to the sum of the two array values`,
  })


  await Level10.addTests([
    levelTenTestOne
  ]);
  await Level10.addTests([
    levelTenTestTwo,
  ]);
  await Level10.addTests([
    levelTenTestThree,
  ]);
  await Level10.addTests([
    levelTenTestFour,
  ]);
  await Level10.addTests([
    levelTenTestFive
  ]);

// level 11
  const Level11 = await Level.create({
    name: "Level 11",
    prompt: `By using an array to reference the enemy ranks, use the pizza/party hat to identify and extract our operative.`,
    category: "Arrays",
    password: 'beautywoman',
    startingJS: `function myArrayFunction(arrayOfEnemies){

      let extraction = 0

      //Each element in the input array is a boolean, each reflecting if the duck is wearing a pizza/party hat

      //Your code below


      //Your code above

      return arrayOfEnemies[extraction]
      }
    `,
  });

// test specs for level 11 go here
  const levelElevenTestOne = await Test.create({
    name: "test one",
    description: 'To pass this test, you must extract our operative by returning the true value within the array',
    test: `describe('myArrayFunction', function(){
      it("return TRUE when you find our operative", function(){
        expect(myArrayFunction([false, false, true, false, false])).to.equal(true)
      });
    })`,
  divId: `return TRUE when you find our operative`,
  })

  await Level11.addTests([
    levelElevenTestOne
  ]);

  //level 12
  const Level12 = await Level.create({
    name: "Level 12",
    prompt: `Show me you understand how to use these array methods!`,
    category: "Arrays",
    password: 'Colonel',
    startingJS: `//make all functions return true

    function myLengthFunction(){

    const myArray = [8, 7]

    //We’ve already dealt with .length, but it’s so important it’s here again!
    //myArray.length will set a variable equal to the length.

    return (myArray.length === /*replace me!*/)
    }


    function myPushFunction(){

    const myArray = [8, 7]

    //myArray.push(x) will add x to the end of the array

    //Your code below


    //Your code above

    return (myArray[2] === 6)
    }

    function myPopFunction(){

    const myArray = [8, 7]

    //myArray.pop() will remove the last element of the array
    //In addition, this will set a variable equal to that removed element (let popped = myArray.pop())
    //Your code below


    //Your code above

    return (myArray[myArray.length - 1] === 8)
    }

    function myIncludesFunction(){

    const myArray = [8, 7]

    //myArray.includes(x) will return a boolean: true if x is found in the array, and false if not.

    return (myArray.includes(/*replace me!*/))
    }

    function myIndexOfFunction(){

    const myArray = [8, 7]

    //myArray.indexOf(x) will return the index of the first instance of x (or -1 if it’s not there)

    return (myArray.indexOf(/*replace me!*/) === 1)
    }

    `,
  });

// test specs for level 12 go here
const levelTwelveTestOne = await Test.create({
  name: "test one",
  description: 'To pass this test, you must enter the correct integer in the replace me.',
  test: `describe('myLengthFunction', function(){
    it("return TRUE when both values are equal", function(){
      expect(myLengthFunction()).to.equal(true)
    });
  })`,
divId: `return TRUE when both values are equal`,
})

const levelTwelveTestTwo = await Test.create({
  name: "test two",
  description: 'To pass this test, you must implement the .push method so that the function can return true.',
  test: `describe('myPushFunction', function(){
    it("return TRUE when .push is correctly implemented", function(){
      expect(myPushFunction()).to.equal(true)
    });
  })`,
divId: `return TRUE when .push is correctly implemented`,
})

const levelTwelveTestThree = await Test.create({
  name: "test three",
  description: 'To pass this test, you must implement the .pop method so that the function can return true.',
  test: `describe('myPopFunction', function(){
    it("return TRUE when .pop is correctly implemented", function(){
      expect(myPopFunction()).to.equal(true)
    });
  })`,
divId: `return TRUE when .pop is correctly implemented`,
})

const levelTwelveTestFour = await Test.create({
  name: "test four",
  description: 'To pass this test, you must insert an appropriate integer in the replace me for it to evaluate to true',
  test: `describe('myIncludesFunction', function(){
    it("return TRUE when .includes is correctly implemented", function(){
      expect(myIncludesFunction()).to.equal(true)
    });
  })`,
divId: `return TRUE when .includes is correctly implemented`,
})

const levelTwelveTestFive = await Test.create({
  name: "test five",
  description: 'To pass this test, you must insert the appropriate integer in the replace me for it to evaluate to true',
  test: `describe('myIndexOfFunction', function(){
    it("return TRUE when .indexOf is correctly implemented", function(){
      expect(myIndexOfFunction()).to.equal(true)
    });
  })`,
divId: `return TRUE when .indexOf is correctly implemented`,
})

  await Level12.addTests([
    levelTwelveTestOne,
    levelTwelveTestTwo,
    levelTwelveTestThree,
    levelTwelveTestFour,
    levelTwelveTestFive
  ]);

  //level 13
  const Level13 = await Level.create({
    name: "Level 13",
    prompt: `Given an array of duck types, write a program that will return a new array containing the “toughDuck” positions (indices). The duck types are given as strings.`,
    category: "Arrays",
    password: 'waterman',
    startingJS: `function mySeekingFunction(deploymentArray){
      //Enter your code
      } `,
  });

// test specs for level 13 go here
  const levelThirteenTestOne = await Test.create({
    name: "test one",
    description: 'Return a new array that contains the indices that represents where the toughDuck(s) are positioned.',
    test: `describe('mySeekingFunction', function(){
      it("return the indices in a new array", function(){
        expect(mySeekingFunction(['hi', 'happy', 'toughDuck', 'toughDuck', 'sure'])).to.eql([2, 3])
      });
    })`,
  divId: `return the indices in a new array`,
  })

  await Level13.addTests([
    levelThirteenTestOne
  ]);

  //level 14
  const Level14 = await Level.create({
    name: "Level 14",
    prompt: `Given an array where each element could be an array of elements itself, return the location of “gary” so he can be rescued. All individual values will be strings.`,
    category: "Arrays",
    password: 'waterwoman',
    startingJS: `function myFindingFunction(encryptedArray){
      //Enter your code
      }`,
  });

// test specs for level 14 go here
  const levelFourteenTestOne = await Test.create({
    name: "test one",
    description: 'You must find the position of Gary. He can either be a string in array, or a string in a nested array (yes, you can have an array within an array). The world is counting on you!',
    test: `describe('myFindingFunction', function(){
      it("return the index of where Gary is within the array", function(){
        expect(myFindingFunction(['hi', 'so', ['gary'], 'toughDuck', 'sure'])).to.equal(2)
      });
    })`,
  divId: `return the index of where Gary is within the array`,
  })

  await Level14.addTests([
    levelFourteenTestOne
  ]);

  //level 15
  const Level15 = await Level.create({
    name: "Level 15",
    prompt: `Prove to me you understand how objects work!`,
    category: "Objects",
    password: 'icewoman',
    startingJS: `const myObject = {
      duck: "rubber",
      wizard: "Harry",
      3: 55,
      true: false
      }


      //make all functions return true

      function myFirstObjectFunction(){

      return "rubber" === myObject./*replace me!*/
      }

      function mySecondObjectFunction(){

      return "rubber" === myObject[/*replace me!*/]

      }

      function myThirdObjectFunction(){

      return 55 === myObject[/*replace me!*/]
      }

      function myFourthObjectFunction(){

      return /*replace me!*/ === myObject["true"]
      }

      function myFifthObjectFunction(){

      return myObject[((!myObject.true).toString())] === /*replace me!*/
      }
      `,
  });

// test specs for level 15 go here
  const levelFifteenTestOne = await Test.create({
    name: "test one",
    description: 'By this point, you know what to do when you see a replace me. REPLACE IT! Hint - both sides must equal the string rubber',
    test: `describe('myFirstObjectFunction', function(){
      it("return true when both values evaluate to the string rubber", function(){
        expect(myFirstObjectFunction()).to.equal(true)
      });
    })`,
  divId: `return true when both values evaluate to the string rubber`,
  })

  const levelFifteenTestTwo = await Test.create({
    name: "test two",
    description: 'By this point you know what to do when you see a replace me. REPLACE IT! Hint - both sides must equal the string rubber',
    test: `describe('mySecondObjectFunction', function(){
      it("return true when both values evaluate to the string rubber again", function(){
        expect(mySecondObjectFunction()).to.equal(true)
      });
    })`,
  divId: `return true when both values evaluate to the string rubber again`,
  })

  const levelFifteenTestThree = await Test.create({
    name: "test three",
    description: 'By this point you know what to do when you see a replace me. REPLACE IT! Hint - both sides must equal the number 55',
    test: `describe('myThirdObjectFunction', function(){
      it("return true when both values evaluate to 55", function(){
        expect(myThirdObjectFunction()).to.equal(true)
      });
    })`,
  divId: `return true when both values evaluate to 55`,
  })

  const levelFifteenTestFour = await Test.create({
    name: "test four",
    description: 'By this point you know what to do when you see a replace me. REPLACE IT! Hint - No hint for this one.',
    test: `describe('myFourthObjectFunction', function(){
      it("return true when both values evaluate to false", function(){
        expect(myFourthObjectFunction()).to.equal(true)
      });
    })`,
  divId: `return true when both values evaluate to false`,
  })

  const levelFifteenTestFive = await Test.create({
    name: "test five",
    description: 'By this point you know what to do when you see a replace me. REPLACE IT! Hint - No hint for this one.',
    test: `describe('myFifthObjectFunction', function(){
      it("return true when both values evaluate to false again", function(){
        expect(myFifthObjectFunction()).to.equal(true)
      });
    })`,
  divId: `return true when both values evaluate to false again`,
  })

  await Level15.addTests([
    levelFifteenTestOne,
    levelFifteenTestTwo,
    levelFifteenTestThree,
    levelFifteenTestFour,
    levelFifteenTestFive
  ]);

  //level 16
  const Level16 = await Level.create({
    name: "Level 16",
    prompt: `Given the data on an enemy duck, return an object representing the intel gathered. The first key value pair would be the type of duck it is. The second key value pair would be another object with the key of 'attributes' that will then have two more key value pairs to represent the ducks height and distance
    `,
    category: "Objects",
    password: 'earthman',
    startingJS: `/*
    type: “toughDuck”
    attributes: (insert second object here)
    */

    function myBuildAnObjectFunction(){
    //Your code below


    //Your code above
    }
    `,
  });

// test specs for level 16 go here
  const levelSixteenTestOne = await Test.create({
    name: "test one",
    description: 'When you return your object, note that your value for attributes will be another object containing the height and distance key value pairs respectively',
    test: `describe('myBuildAnObjectFunction', function(){
      it("return an object with the correct key value pairs", function(){
        expect(myBuildAnObjectFunction()).to.eql({ type: 'toughDuck', attributes: { height: 50, distance: 100 } })
      });
    })`,
  divId: `return an object with the correct key value pairs`,
  })

  await Level16.addTests([
    levelSixteenTestOne
  ]);

//   //level 17
//   const Level17 = await Level.create({
//     name: "Level 17",
//     prompt: `Given an array where each duck is given as an object,

//     Find the index of each 'squeaker' and which weapon to use based on how many are in a row and if they have shields.
//     Fire at the first of a cluster to hit all of them.
//     If any one duck in a cluster has a shield, it is the same as if all of them do.

//     Find the index of each “toughDuck” and how many guns will need to be focused on them based on their particular height and distance.
//     `,
//     category: "Objects",
//     startingJS: `myFinalFunction(arrayOfEnemies){
//       //Do it. Do it.
//       }
//       `,
//   });

// // test specs for level 17 go here
//   const levelSeventeenTestOne = await Test.create({
//     name: "test one",
//     description: '',
//     test: ``,
//   divId: ``,
//   })

//   await Level17.addTests([
//     levelSeventeenTestOne
//   ]);

  await users[2].addLevels([
    Level1,
    Level2,
    Level3,
    Level4,
    Level5,
    Level6,
    Level7,
    Level8,
    Level9,
    Level10,
    Level11,
    Level12,
    Level13,
    Level14,
    Level15,
    Level16,
    // Level17
  ])

  await users[0].addFriends([
    users[1],
    users[2]
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
