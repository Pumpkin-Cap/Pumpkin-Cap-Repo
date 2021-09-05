"use strict";

const {
  db,
  models: { User, Test, Level, Dialog, Tutorial },
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

  //Tutorial 1
  const Tutorial1 = await Tutorial.create({
    name: "Comments",
    prompt: "Tutorial: Comments",
    category: "Tutorials",
    password: "ro",
    startingJS: `/*
    If you've ever wanted to have a leisurely chat with no one in particular or perhaps even your future self, then "comments" is the feature you've been looking for. Simply by denoted code as a comment, the entire section will be ignored by the compiler and is there purely to be read by the programmer reading the code. In JavaScript, comments are made by:

    // Two forward slashes will denote an entire line as a comment, and

    /* forward slash - asterisk will open a comment block
    Which will then continue
    For as long as
    You want it to
    Until
    You close it was an asterisk - forward slash */

    You will see many comments throughout our missions. They will either provide direction, or denote the area where your code should be written.
*/

    const winCommand = "I win!!"

    function myTutorialFunction(){
    //make the function return winCommand to win

    return (/*winCommand*/)
    }`,
  });

  const TutorialOneTest = await Test.create({
    name: "tutorial test",
    description: 'To pass this test, you must read and understand this tutorial.',
    test: `describe('myTutorialFunction', function(){
      it('returns "I win!!" when given the win command', function(){
        expect(myTutorialFunction()).to.equal("I win!!");
      });
    });`,
    divId: "returns TRUE when given the win command",
  });

  await Tutorial1.addTests([
    TutorialOneTest
  ]);

  //Tutorial 2
  const Tutorial2 = await Tutorial.create({
    name: "Conventions",
    prompt: "Tutorial: Conventions",
    category: "Tutorials",
    password: "ck",
    startingJS: `/*
    I know what you’re thinking. You became a programmer because you’re unconventional! You’re here to invent new things by doing them your own way! Why would a field driven by creativity and individual thinking be preaching conventions?

    Think of it this way. The methods of many individual thinkers before you have been catalogued into an observation of common good practice. These conventions are meant as guidelines to help instill a strong foundation in your coding methods. The shoulders of giants are available to you - all you need is to stand upon them.

    As you're presented conventions both here and throughout your career, be sure to understand why they are before any consideration to break them.
*/

    const winCommand = "I win!!"

    function myTutorialFunction(){
    //make the function return winCommand to win

    return (/*winCommand*/)
    }`,
  });

  const TutorialTwoTest = await Test.create({
    name: "tutorial test",
    description: 'To pass this test, you must read and understand this tutorial.',
    test: `describe('myTutorialFunction', function(){
      it('returns "I win!!" when given the win command', function(){
        expect(myTutorialFunction()).to.equal("I win!!");
      });
    });`,
    divId: "returns TRUE when given the win command",
  });

  await Tutorial2.addTests([
    TutorialTwoTest
  ]);

  //Tutorial 3
  const Tutorial3 = await Tutorial.create({
    name: "Variable Types",
    prompt: "Tutorial: Variable Types",
    category: "Tutorials",
    password: "ma",
    startingJS: `/*
    Remember algebra when you’d solve for x? Now the power is in your hands! You get to declare what x is and have the computer deal with it! In JavaScript, we do this through variable declaration.

    let yourVariableName = aValue

    “let” is our declaration. We are “letting” this variable be a certain value. This variable can be reassigned at any time after, but only declared once. Use “let” when you have a variable that will be changing through your code. For example:

    let exampleVariable = ‘I am a string.’
    exampleVariable = ‘I am now a different string’
    exampleVariable = exampleVariable + ‘!!!’

    exampleVariable will now be ‘I am now a different string!!!’

    Another way to declare a variable is the “const” declaration. Standing for “constant,” this declaration makes a variable unable to be changed. For example:

    Const exampleConstant = ‘I am a string.’
    exampleConstant = ‘I am now a different string’

    This code will not compile, having an error when you try to reassign a constant.

    Why would you make something a constant when you can just use “let” instead? That’s a great question! While “let” does everything “const” can and more, by declaring something a “constant” that should be constant will work to error-proof your program.
*/

    const winCommand = "I win!!"

    function myTutorialFunction(){
    //make the function return winCommand to win

    return (/*winCommand*/)
    }`,
  });

  const TutorialThreeTest = await Test.create({
    name: "tutorial test",
    description: 'To pass this test, you must read and understand this tutorial.',
    test: `describe('myTutorialFunction', function(){
      it('returns "I win!!" when given the win command', function(){
        expect(myTutorialFunction()).to.equal("I win!!");
      });
    });`,
    divId: "returns TRUE when given the win command",
  });

  await Tutorial3.addTests([
    TutorialThreeTest
  ]);

  //Tutorial 4
  const Tutorial4 = await Tutorial.create({
    name: "Data Types",
    prompt: "Tutorial: Data Types",
    category: "Tutorials",
    password: "n",
    startingJS: `/*
    Number” and “string” are two examples of data types. A data type is the kind of data you’re working with. Different data types have different things that can be done to and with them, and there is a lot to explore. Knowing what you’re working with makes it easier to find these methods and execute what you’re trying to accomplish.

    Remember: if you can think to do it, then there’s a way to do it. Just look it up in the documentation!
*/

    const winCommand = "I win!!"

    function myTutorialFunction(){
    //make the function return winCommand to win

    return (/*winCommand*/)
    }`,
  });

  const TutorialFourTest = await Test.create({
    name: "tutorial test",
    description: 'To pass this test, you must read and understand this tutorial.',
    test: `describe('myTutorialFunction', function(){
      it('returns "I win!!" when given the win command', function(){
        expect(myTutorialFunction()).to.equal("I win!!");
      });
    });`,
    divId: "returns TRUE when given the win command",
  });

  await Tutorial4.addTests([
    TutorialFourTest
  ]);

  //Tutorial 5
  const Tutorial5 = await Tutorial.create({
    name: "Anatomy of a Function",
    prompt: "Tutorial: Anatomy of a Function",
    category: "Tutorials",
    password: "rockman",
    startingJS: `/*
    What are the pieces of a function? This is crucial - so listen closely!

    function myFunction(parameters) {

    Your code!

    return a value
    }

/////////////////////////////////////
    Let’s take a look at each of these pieces.


    function myFunction(parameters) {

    Your code!

    return a value
    }

    This is the declaration of your function. By declaring this a “function,” it tells the compiler to treat it as one: data goes in, things happen, and data comes out.

/////////////////////////////////////
    function myFunction(parameters) {

    Your code!

    return a value
    }

    This is the name of your function. It can be anything you want, but I’d recommend the convention of naming it something to do with what it does.

    You also may notice the capitalization. This convention is “camel case” where variable names begin lowercase and new words are distinguished with a capital (rather than a space as in common written language). For example:

    example
    forExample
    forExampleNumberTwo
    nameMeWhateverYouWantButRememberYouWillNeedToTypeMeWhenYouWantToUseMe

/////////////////////////////////////
    function myFunction(parameters) {

    Your code!

    return a value
    }

    This is the parameter field. When you call your function in your code, you feed data to your function for it to use. It can have any number of parameters; like your function’s name, they can be anything, but conventionally their names reflect the purpose or identity. Here are a few examples:

    Zero:		myFunction()
    One:		myFunction(paramOne)
    Two:		myFunction(paramOne, paramTwo)
    Three:		myFunction(integerOne, integerTwo, string)

/////////////////////////////////////
    function myFunction(parameters) {

    Your code!

    return a value
    }

    These brackets contain the code of your function. You’ll see these brackets for more than just functions - so get used to them!

/////////////////////////////////////
    function myFunction(parameters) {

    Your code!

    return a value
    }

    This is where the meat of your function is. Write whatever logic you need to get the job done! If you have parameters, you’ll likely want to use them in some fashion.


/////////////////////////////////////
    function myFunction(parameters){

    Your code!

    return aValue
    }

    Your function doesn’t need to return anything, but the return statement is often used in a function. This will “return” whatever value you choose (in this case “aValue”) - whether it be a number, string, boolean, or any other. This will likely be “why” your function exists in the first place.

    To obtain this return value, set your function equal to a variable:

    const myFunctionReturned = myFunction(paramOne, paramTwo)

    But be careful! Whether the return is at the end of your function or not, once you reach it your function will end.

*/

    const winCommand = "I win!!"

    function myTutorialFunction(){
    //make the function return winCommand to win

    return (/*winCommand*/)
    }`,
  });

  const TutorialFiveTest = await Test.create({
    name: "tutorial test",
    description: 'To pass this test, you must read and understand this tutorial.',
    test: `describe('myTutorialFunction', function(){
      it('returns "I win!!" when given the win command', function(){
        expect(myTutorialFunction()).to.equal("I win!!");
      });
    });`,
    divId: "returns TRUE when given the win command",
  });

  await Tutorial5.addTests([
    TutorialFiveTest
  ]);

  //Level 1
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
    When it’s 6 or higher, fire the grenade launcher!
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
      for (let i = /*replace me*/; i < /*replace me*/; i++){

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
Each bullet takes 1 second to fire.
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
    prompt: `Prove to me you understand how arrays work!`,
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
    prompt: `Given an array of duck types, write a program that will return a new array containing the “toughDuck” positions (indices). The duck types are given as strings (so you're looking for the elements "toughDuck").`,
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

      // return /*replace me!*/ === myObject["true"]
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
    prompt: `Given the data on an enemy duck, return an object representing the intel gathered. The first key value pair would be the type of duck it is. The second key value pair would be another object with the key of 'attributes' that will then have two more key value pairs to represent the duck's height and distance.
    `,
    category: "Objects",
    password: 'earthman',
    startingJS: `/*
    type: “toughDuck”
    attributes: (insert second object here)
    */

    function myBuildAnObjectFunction(duckHeight, duckDistance){

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
        expect(myBuildAnObjectFunction(50, 100)).to.eql({ type: 'toughDuck', attributes: { height: 50, distance: 100 } })
      });
    })`,
  divId: `return an object with the correct key value pairs`,
  })

  await Level16.addTests([
    levelSixteenTestOne
  ]);

  //level 17
  const Level17 = await Level.create({
    name: "Level 17",
    prompt: `Given an array where each duck is given as an object,

    - Find the index of each “squeaker” and which weapon to use based on how many are in a row and if they have shields.

    When the duck wave is 1-2, fire the rifle for precise shots. ("rifle")
    When the duck wave is 3-5, fire the cannon for broader hits. ("cannon")
    When it’s 6 or higher, fire the grenade launcher. ("grenade")
    And if there’s a shield you must use the grenade launcher regardless! ("grenade")

    Fire at the first of a cluster to hit all of them. Mark the remainder with “none”
    If any one duck in a cluster has a shield, it is the same as if all of them do.

    - Find the index of each “toughDuck” and how many guns will need to be focused on it based on its particular height and distance.

    A duck travels at half a meter per second.
    A duck one-foot tall takes one bullet.
    Each increase of one foot doubles the required hits from the previous height.
    Each bullet takes 1 second to fire.

    `,
    category: "Objects",
    password: 'wily',
    startingJS: `function myFinalFunction(arrayOfEnemies){
      //Do it. Do it.
      }
      `,
  });

// test specs for level 17 go here
  const levelSeventeenTestOne = await Test.create({
    name: "test one",
    description: 'The returned array successfully locates all \"squeakers\" and \"toughDucks\"',
    test: `describe('myFinalFunction', function(){

      const testArray = [
        { type: "squeaker", attributes: { hasShield: true } },
        { type: "toughDuck", attributes: { height: 10, distance: 20 } },
        { type: "toughDuck", attributes: { height: 15, distance: 22 } },
        { type: "normal" },
        { type: "normal" },
        { type: "normal" },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: true } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "normal" },
        { type: "normal" },
        { type: "toughDuck", attributes: { height: 10, distance: 30 } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "normal" },
        { type: "normal" },
        { type: "normal" },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "normal" },
        { type: "toughDuck", attributes: { height: 28, distance: 12 } },
        { type: "normal" },
        { type: "squeaker", attributes: { hasShield: true } },
        { type: "normal" },
        { type: "squeaker", attributes: { hasShield: true } },
        { type: "toughDuck", attributes: { height: 25, distance: 25 } },
        { type: "toughDuck", attributes: { height: 2, distance: 200 } },
        { type: "normal" }
      ]

      it("returns an array with objects with accurate index fields", function(){
        expect(myFinalFunction(testArray)
        .map((element) =>(element.attributes.index)))
        .to.eql( [0, 1, 2, 6, 7, 8, 9, 10, 11, 14, 15, 16, 20, 21, 22, 24, 26, 28, 29, 30] )
      });
    })`,
  divId: `returns an array with objects with accurate index fields`,
  });

  const levelSeventeenTestTwo = await Test.create({
    name: "test two",
    description: 'The returned array assigns appropriate weapons against all squeakers',
    test: `describe('myFinalFunction', function(){

      const testArray = [
        { type: "squeaker", attributes: { hasShield: true } },
        { type: "toughDuck", attributes: { height: 10, distance: 20 } },
        { type: "toughDuck", attributes: { height: 15, distance: 20 } },
        { type: "normal" },
        { type: "normal" },
        { type: "normal" },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: true } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "normal" },
        { type: "normal" },
        { type: "toughDuck", attributes: { height: 10, distance: 40 } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "normal" },
        { type: "normal" },
        { type: "normal" },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "normal" },
        { type: "toughDuck", attributes: { height: 20, distance: 10 } },
        { type: "normal" },
        { type: "squeaker", attributes: { hasShield: true } },
        { type: "normal" },
        { type: "squeaker", attributes: { hasShield: true } },
        { type: "toughDuck", attributes: { height: 20, distance: 50 } },
        { type: "toughDuck", attributes: { height: 2, distance: 200 } },
        { type: "normal" }
      ]

      it("returns an array with accurate weapon assignments for each squeaker", function(){
        expect(myFinalFunction(testArray)
        .filter((element) => (element.type === "squeaker"))
        .map((element) =>(element.attributes.weapon)))
        .to.eql( ['grenade', 'grenade', 'none', 'none', 'none', 'none', 'none', 'rifle', 'none', 'cannon', 'none', 'none', 'grenade', 'grenade'] )
      });
    })`,
  divId: `returns an array with accurate weapon assignments for each squeaker`,
  });

  const levelSeventeenTestThree = await Test.create({
    name: "test three",
    description: 'The returned array assigns an appropriate gun amount against each toughDuck',
    test: `describe('myFinalFunction', function(){

      const testArray = [
        { type: "squeaker", attributes: { hasShield: true } },
        { type: "toughDuck", attributes: { height: 10, distance: 20 } },
        { type: "toughDuck", attributes: { height: 15, distance: 20 } },
        { type: "normal" },
        { type: "normal" },
        { type: "normal" },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: true } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "normal" },
        { type: "normal" },
        { type: "toughDuck", attributes: { height: 10, distance: 40 } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "normal" },
        { type: "normal" },
        { type: "normal" },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "squeaker", attributes: { hasShield: false } },
        { type: "normal" },
        { type: "toughDuck", attributes: { height: 20, distance: 10 } },
        { type: "normal" },
        { type: "squeaker", attributes: { hasShield: true } },
        { type: "normal" },
        { type: "squeaker", attributes: { hasShield: true } },
        { type: "toughDuck", attributes: { height: 20, distance: 50 } },
        { type: "toughDuck", attributes: { height: 2, distance: 200 } },
        { type: "normal" }
      ]

      it("returns an array with accurate gun amounts for each toughDuck", function(){
        expect(myFinalFunction(testArray)
        .filter((element) => (element.type === "toughDuck"))
        .map((element) =>(element.attributes.guns)))
        .to.eql( [12.8, 409.6, 6.4, 26214.4, 5242.88, .005] )
      });
    })`,
  divId: `returns an array with accurate gun amounts for each toughDuck`,
  });

  await Level17.addTests([
    levelSeventeenTestOne,
    levelSeventeenTestTwo,
    levelSeventeenTestThree
  ]);

  //Tutorial 1
  const dialogueT1 = await Dialog.create({
    content: `/*
    General Joe:


    Let's get you up to speed on comments.
*/`
  })

  await Tutorial1.addDialogs([
    dialogueT1,
    dialogueT1
  ])

  //Tutorial 2
  const dialogueT2 = await Dialog.create({
    content: `/*
    General Joe:


    Let's get you up to speed on Conventions.
*/`
  })

  await Tutorial2.addDialogs([
    dialogueT2,
    dialogueT2
  ])

  //Tutorial 3
  const dialogueT3 = await Dialog.create({
    content: `/*
    General Joe:


    Let's get you up to speed on Variable Types.
*/`
  })

  await Tutorial3.addDialogs([
    dialogueT3,
    dialogueT3
  ])

  //Tutorial 4
  const dialogueT4 = await Dialog.create({
    content: `/*
    General Joe:


    Let's get you up to speed on Data Types.
*/`
  })

  await Tutorial4.addDialogs([
    dialogueT4,
    dialogueT4
  ])

  //Tutorial 5
  const dialogueT5 = await Dialog.create({
    content: `/*
    General Joe:


    Let's get you up to speed on Functions.
*/`
  })

  await Tutorial5.addDialogs([
    dialogueT5,
    dialogueT5
  ])

  //level 1
  const dialogue1 = await Dialog.create({
    content: `/*
    General Joe:


    It’s important to understand how to compare values. We will often want to do different things depending on if something is greater than, less than, or equal to another value.
*/`
  })

  const dialogue1_2 = await Dialog.create({
    content: `/*
    General Joe:


    In JavaScript, these conditional operators are written like this:

    Less than:                  <
    Less than or equal to:      <=
    Equal to:                   ===
    Not equal to:               !==
    Greater than:               >
    Greater than or equal to:   >=
*/`
  })

  const dialogue1_3 = await Dialog.create({
    content: `/*
    General Joe:


    And always remember the documentation is there if you need it!
*/`
  })

  await Level1.addDialogs([
    dialogue1,
    dialogue1_2,
    dialogue1_3,
    dialogue1_3
  ])

  //level2
  const dialogue2 = await Dialog.create({
    content: `/*
    General Joe:


    How do we use these values? Any way you can think to! But a common use is inserting them as if-conditions. We can divide our program logic into separate blocks based on the conditions at hand.
*/`
  })

  const dialogue2_2 = await Dialog.create({
    content: `/*
    General Joe:


    Normally I’d handle something important like this, but I need to go feed my dog; if I supply you with a template for an if-statement do you think you could take charge of issuing orders to the troops? GOOD!
*/`
  })

  const dialogue2_3 = await Dialog.create({
    content: `/*
    General Joe:


    And don’t forget to reference the documentation whenever needed!
*/`
  })

  await Level2.addDialogs([
    dialogue2,
    dialogue2_2,
    dialogue2_3,
    dialogue2_3
  ])

  //level3
  const dialogue3 = await Dialog.create({
    content: `/*
    General Joe:

    Well done!
*/`
  })

  const dialogue3_2 = await Dialog.create({
    content: `/*
    General Joe:


    But we’re going to need to be conscious of what weapon we’re using. Did you know we can chain conditions using an “else if” command? It will continue checking your conditions until it finds one that evaluates TRUE and enters that block. Refactor your orders to account for the following conditions.
*/`
  })

  const dialogue3_3 = await Dialog.create({
    content: `/*
    General Joe:


    And don’t forget to check the documentation!
*/`
  })

  await Level3.addDialogs([
    dialogue3,
    dialogue3_2,
    dialogue3_3,
    dialogue3_3
  ])

  //level4
  const dialogue4 = await Dialog.create({
    content: `/*
    General Joe:


    Excellent job! Those ducks didn’t know what hit ‘em! But you can bet things can get more complicated.
*/`
  })

  const dialogue4_2 = await Dialog.create({
    content: `/*
    General Joe:


    Did you know that you can join conditionals? In JavaScript you write these as:

    AND operator:	&&
    OR operator:	||

    With the AND operator, the condition returns TRUE if both sides are true. If either one or both sides are false, then the entire condition returns FALSE.

    With the OR operator, the entire condition returns TRUE if either one or both sides are true. If both sides are false, then the condition returns FALSE.
*/`
  })

  const dialogue4_3 = await Dialog.create({
    content: `/*
    General Joe:


    Let’s run a quick drill! And don’t forget the documentation!
*/`
  })

  await Level4.addDialogs([
    dialogue4,
    dialogue4_2,
    dialogue4_3,
    dialogue4_3
  ])

  //level5
  const dialogue5 = await Dialog.create({
    content: `/*
    General Joe:


    Great! I now know my faith was not misplaced!
*/`
  })

  const dialogue5_2 = await Dialog.create({
    content: `/*
    General Joe:


    They’re changing up their strategy. Some of their waves are being sent out with shields! If they’re using a shield, we’re going to need the grenade launcher no matter how many there are. We’re going to have to adapt!
*/`
  })

  const dialogue5_3 = await Dialog.create({
    content: `/*
    General Joe:


    Finish what you’ve started: take charge of rewriting the code!
*/`
  })

  const dialogue5_4 = await Dialog.create({
    content: `/*
    General Joe:


    The documentation is always there!
*/`
  })

  await Level5.addDialogs([
    dialogue5,
    dialogue5_2,
    dialogue5_3,
    dialogue5_4,
    dialogue5_4
  ])

  const dialogue6 = await Dialog.create({
    content: `/*
    General Joe:


    All right! Our defense against their type of attack is set! Now let’s tackle how to handle their continuous attacks.
*/`
  })

  const dialogue6_2 = await Dialog.create({
    content: `/*
    General Joe:


    In any system you’ll need to decide not only what to execute, but how many times to execute it. If you’re going to need a code block to execute more than two or three times - or perhaps a varying number of times - then you’re probably going to want to employ a loop.
*/`
  })

  const dialogue6_3 = await Dialog.create({
    content: `/*
    General Joe:


    There are many kinds of loops that are each ideal for different kinds of situations. While no loop is officially more important than another, you’ll get little argument from me that the “for-loop” is your go-to.
*/`
  })

  const dialogue6_4 = await Dialog.create({
    content: `/*
    General Joe:


    A for-loop declares a variable, changes that variable after each iteration of the code, and has an end condition for when that variable becomes a certain value. That variable can be called anything, but is conventionally “i.” The incrementation of that variable can be anything that makes sense for your function, but often it makes sense to increment it by 1 (i = i + 1, or i++ in shorter notation).
*/`
  })

  const dialogue6_5 = await Dialog.create({
    content: `/*
    General Joe:


    Don’t forget to consult your documentation!
*/`
  })

  await Level6.addDialogs([
    dialogue6,
    dialogue6_2,
    dialogue6_3,
    dialogue6_4,
    dialogue6_5,
    dialogue6_5
  ])

  const dialogue7 = await Dialog.create({
    content: `/*
    General Joe:


    Now let’s put that for-loop into action!
*/`
  })

  const dialogue7_2 = await Dialog.create({
    content: `/*
    General Joe:


    It looks like there are waves advancing, and we need to prepare for it. We need to deploy more troops depending on how many waves we get; design a function to deploy the right amount of troops.
*/`
  })

  const dialogue7_3 = await Dialog.create({
    content: `/*
    General Joe:


    We need 5 troops per wave, and each additional wave will require an extra troop. I’m counting on you!
*/`
  })

  const dialogue7_4 = await Dialog.create({
    content: `/*
    General Joe:

    Documentation: Use it!
*/`
  })

  await Level7.addDialogs([
    dialogue7,
    dialogue7_2,
    dialogue7_3,
    dialogue7_4,
    dialogue7_4
  ])

  //level 8
  const dialogue8 = await Dialog.create({
    content: `/*
    General Joe:

    Those ducks soon won’t stand a chance!
*/`
  })

  const dialogue8_2 = await Dialog.create({
    content: `/*
    General Joe:

    But there are other times a for-loop won’t work for the situation. For example, if we want to iterate on a block of code until a particular condition is met that can’t be reliably counted by the number of times we’ve looped (like a for-loop does), then perhaps a “while-loop” is appropriate.
*/`
  })

  const dialogue8_3 = await Dialog.create({
    content: `/*
    General Joe:

    To properly plan our strategy, we’ll need to know how long we’ve got until ducks reach our base. Given its distance, write us something that computes the time for one to reach us.
*/`
  })

  const dialogue8_4 = await Dialog.create({
    content: `/*
    General Joe:

    The documentation is there if you need it.
*/`
  })

  await Level8.addDialogs([
    dialogue8,
    dialogue8_2,
    dialogue8_3,
    dialogue8_4,
    dialogue8_4
  ])

  //level 9
  const dialogue9 = await Dialog.create({
    content: `/*
    General Joe:

    Now let’s bring it together. Based on how long it takes a big tough duck to reach us, we need to know how many guns at once we’ll need on it to bring it down in time.
*/`
  })

  const dialogue9_2 = await Dialog.create({
    content: `/*
    General Joe:

    And not a moment too soon! There’s some big tough poultry coming this way, and they can take a lot of pepper - write us something that tells the troops how many guns to fire at a duck given its height and distance!
*/`
  })

  const dialogue9_3 = await Dialog.create({
    content: `/*
    General Joe:

    The documentation is always with you.
*/`
  })

  await Level9.addDialogs([
    dialogue9,
    dialogue9_2,
    dialogue9_3,
    dialogue9_3
  ])

    //level 10
    const dialogue10 = await Dialog.create({
      content: `/*
      General Joe:

      You’ve done a great job. We now have systems in place to deal with any particular attack.
*/`
    })

    const dialogue10_2 = await Dialog.create({
      content: `/*
      General Joe:

      Let’s now have you work with arrays. An array is a data type that stores references to other data.
*/`
    })

    const dialogue10_3 = await Dialog.create({
      content: `/*
      General Joe:

      For example, you can have an array with 3 integers in it - each called an “element.” You can refer to each one of these integers, and the length of this array is considered 3. This is what that might look like:

      const myArray = [4, 10, -5]

      //the following are true statements; note we begin counting our elements (referred to as an element’s index) at 0 rather than 1.

      myArray[0] === 4
      myArray[1] === 10
      myArray[2] === -5
      myArray.length === 3
*/`
    })

    const dialogue10_4 = await Dialog.create({
      content: `/*
      General Joe:

      By the time you’re ready to take over my job it’ll be important to understand the difference between this array having these values and having references to these values, but for now I want you to focus on putting these arrays and values to use!
*/`
    })

    const dialogue10_5 = await Dialog.create({
      content: `/*
      General Joe:

      There is a lot to know about arrays. I’ll lay out the basics, but the documentation has everything you could ever need.
*/`
    })

    await Level10.addDialogs([
      dialogue10,
      dialogue10_2,
      dialogue10_3,
      dialogue10_4,
      dialogue10_5,
      dialogue10_5
    ])

    //11
    const dialogue11 = await Dialog.create({
      content: `/*
      General Joe:

      Excellent. I knew you would be the one I could trust with this next mission.
*/`
    })

    const dialogue11_2 = await Dialog.create({
      content: `/*
      General Joe:

      We have placed a spy in their ranks. It is time to recover our operative and add that wealth of knowledge to our intelligence.
*/`
    })

    const dialogue11_3 = await Dialog.create({
      content: `/*
      General Joe:

      Using arrays and any other tools you’ve learned, write a program to recover the spy. You will recognize our ally from the rest by the pizza/party hat.
*/`
    })

    const dialogue11_4 = await Dialog.create({
      content: `/*
      General Joe:

      Remember, referencing the documentation could save a life!!
*/`
    })

    await Level11.addDialogs([
      dialogue11,
      dialogue11_2,
      dialogue11_3,
      dialogue11_4,
      dialogue11_4
    ])

    //level12
    const dialogue12 = await Dialog.create({
      content: `/*
      General Joe:

      To make use of the critical information gathered, it will be useful to familiarize you with array methods. A method is a built-in function that you can apply to manipulate or access data you need.
*/`
    })

    const dialogue12_2 = await Dialog.create({
      content: `/*
      General Joe:

      We’ll go over some common array methods, but there are many, many more. Always remember the documentation is there to reference rather than trying to memorize them all.
*/`
    })

    await Level12.addDialogs([
      dialogue12,
      dialogue12_2,
      dialogue12_2
    ])

    //level 13
    const dialogue13 = await Dialog.create({
      content: `/*
      General Joe:

      You’re now ready to begin acting on the intelligence we’ve gathered. Sergeant Sarah will brief you.
*/`
    })

    const dialogue13_2 = await Dialog.create({
      content: `/*
      Sergeant Sarah:

      I’ve heard you’re the peak programming duck in our ranks. The King Duck. The peak king duck. You’re certainly piquing my interest, duck.
*/`
    })

    const dialogue13_3 = await Dialog.create({
      content: `/*
      Sergeant Sarah:

      Missiles are slow and expensive, but totally worth it against those tough ducks - the only problem is by the time we know where they are to target them it’s too late to use them. But I think we can use your skills to make this happen.
*/`
    })

    const dialogue13_4 = await Dialog.create({
      content: `/*
      Sergeant Sarah:

      I’ve discovered their deployment schema. I can give you this information in the form of an array; General Joe tells me you’ll be able to find where a tough duck will be, and what place it’ll be in their deployment. With these calculations we’ll be able to target our missiles from afar.
*/`
    })

    const dialogue13_5 = await Dialog.create({
      content: `/*
      Sergeant Sarah:

      And the documentation will fill in the gaps!
*/`
    })

    await Level13.addDialogs([
      dialogue13,
      dialogue13_2,
      dialogue13_3,
      dialogue13_4,
      dialogue13_5,
      dialogue13_5
    ])

    //level14
    const dialogue14 = await Dialog.create({
      content: `/*
      Sergeant Sarah:

      General Joe was right about you. I now see for myself that you are the one for this next mission.
*/`
    })

    const dialogue14_2 = await Dialog.create({
      content: `/*
      Sergeant Sarah:

      The decision to extract me was made because my partner was compromised. It was only a matter of time before they found me, too, so I was recovered; he is still in their custody.
*/`
    })

    const dialogue14_3 = await Dialog.create({
      content: `/*
      Sergeant Sarah:

      Knowing there was a spy, they began encrypting their orders. I got the information on where he’s being held, but the location must be extracted from this jumbled mess.
*/`
    })

    const dialogue14_4 = await Dialog.create({
      content: `/*
      Sergeant Sarah:

      General Joe says you’ll be able to figure out how to use “Array.isArray()” from the documentation. That is what they use to decrypt these orders.
*/`
    })

    await Level14.addDialogs([
      dialogue14,
      dialogue14_2,
      dialogue14_3,
      dialogue14_4,
      dialogue14_4
    ])

    //level 15
    const dialogue15 = await Dialog.create({
      content: `/*
      General Joe:

      You’ve done us all a great service with the rescue of Gary. He is invaluable to our operation; his name is Gary, and that’s all you need to know about him.
*/`
    })

    const dialogue15_2 = await Dialog.create({
      content: `/*
      General Joe:

      Once we get you up to speed on objects we will be primed for our final strike.
*/`
    })

    const dialogue15_3 = await Dialog.create({
      content: `/*
      General Joe:

      You, of course, know what an array looks like. Let’s take our original example:

      const myArray = [4, 10, -5]
*/`
    })

    const dialogue15_4 = await Dialog.create({
      content: `/*
      General Joe:

      Now what if I presented it to you like this?

      const myArray = {
        0: 4,
        1: 10,
        2: -5
      }
*/`
    })

    const dialogue15_5 = await Dialog.create({
      content: `/*
      General Joe:

      Do you see the relationship between them? We are explicitly stating the index and its value along with it rather than just the value. If you take this idea and “rename” the indices as any names you see fit, then you’ve got the concept of an object. In fact, an array is merely a special kind of object!
*/`
    })

    const dialogue15_6 = await Dialog.create({
      content: `/*
      General Joe:

      In the case of an object, we refer to them as “key-value pairs.” The “named” index is the key, and the value is its associated value. In the case of an array, the key is an integer; with an object it is a string.
*/`
    })

    const dialogue15_7 = await Dialog.create({
      content: `/*
      General Joe:

      When thinking of an array as an object, it becomes easy to figure out how to navigate an object.

      const myArray = [4, 10, -5]

      const myObject = {
        green: “turtle”,
        circle: true,
        cat: “cute”,
        dog: 10
      }

      //The following statements are true
      myArray[2] === -5
      myObject[“cat”] === “cute”
      myObject.cat === “cute”

      Note the ability to use dot notation with objects. This tells the code to assume the following word is a string, so it knows to find a string-type key. This will not work with arrays whose keys are integers.
*/`
    })

    const dialogue15_8 = await Dialog.create({
      content: `/*
      General Joe:

      Like arrays, there is much to know about objects. This is a solid basis, but the documentation has anything else you might need.
*/`
    })


    await Level15.addDialogs([
      dialogue15,
      dialogue15_2,
      dialogue15_3,
      dialogue15_4,
      dialogue15_5,
      dialogue15_6,
      dialogue15_7,
      dialogue15_8,
      dialogue15_8
    ])

    //level 16
    const dialogue16 = await Dialog.create({
      content: `/*
      General Joe:

      There’s just one more thing and you will be ready.
*/`
    })

    const dialogue16_2 = await Dialog.create({
      content: `/*
      General Joe:

      For our final attack, you must know how to “build” objects as well as read them. You can define an object’s key-value pairs outright when you declare it, but you also can add them (or change them) as you go along just as easily. Let’s take our last example:

      const myObject = {
        green: “turtle”,
        circle: true,
        cat: “cute”,
        dog: 10
      }
*/`
    })

    const dialogue16_3 = await Dialog.create({
      content: `/*
      General Joe:

      Now if you code:

      myObject.snake: “creepy”

      myObject will now have that key-value pair, looking like:

      {
        green: “turtle”,
        circle: true,
        cat: “cute”,
        dog: 10,
        snake: “creepy”
      }
*/`
    })

    const dialogue16_4 = await Dialog.create({
      content: `/*
      General Joe:

      In addition, you can make alterations at any point in your code:

      myObject.cat = “super, super cute”

      myObject will now have that change, looking like:

      {
        green: “turtle”,
        circle: true,
        cat: “super, super cute”,
        dog: 10,
        snake: “creepy”
      }
*/`
    })

    const dialogue16_5 = await Dialog.create({
      content: `/*
      General Joe:

      Let’s build an enemy blueprint! Look into your documentation when needed.
*/`
    })


    await Level16.addDialogs([
      dialogue16,
      dialogue16_2,
      dialogue16_3,
      dialogue16_4,
      dialogue16_5,
      dialogue16_5
    ])

    //level 17
    const dialogue17 = await Dialog.create({
      content: `/*
      General Joe:

      All right. You’re ready to perform the Special Ops mission. With the recovery of Gary, we have retrieved critical information that we can use to put an end to this invasion. It won’t be easy - you’re going to have to pull out all the tricks you’ve learned up to this point.
*/`
    })

    const dialogue17_2 = await Dialog.create({
      content: `/*
      General Joe:

      The key to our victory lies in severing their communication. Each of the enemy looks the same to the untrained eye; however, we have discovered a critical feature of those responsible for dispersing their orders: squeakers.
*/`
    })

    const dialogue17_3 = await Dialog.create({
      content: `/*
      General Joe:

      Given an array of the entire army where each duck is given as an object, we will need you to do the following:
*/`
    })

    const dialogue17_4 = await Dialog.create({
      content: `/*
      General Joe:

      Find where the ducks with squeakers are located, and which weapon to use based on how many are clustered together and if they have shields. You may fire a weapon at the first of a group to hit all of them. If any one duck in a cluster has a shield, it is the same as if all of them do.
*/`
    })

    const dialogue17_5 = await Dialog.create({
      content: `/*
      General Joe:

      Find where the toughDucks are located, and how many guns will need to be focused on them before they reach us based on each of their particular height and distance.
*/`
    })

    const dialogue17_6 = await Dialog.create({
      content: `/*
      General Joe:

      The enemy objects will appear with keys depending on what type it is:

      A squeaker will be:

      enemyObj = {
        type: “squeaker”,
        attributes: {
          hasShield: boolean
              }
      }

      A toughDuck will be:

      enemyObj = {
        type: “toughDuck”,
        attributes: {
          height: integer,
          distance: integer
            }
      }
*/`
    })

    const dialogue17_7 = await Dialog.create({
      content: `/*
      General Joe:

      Return your data as an array of objects. Each object should have the “type” key, and an “attributes” key whose value itself will be an object with keys of the necessary data. This is an example of what each kind would look like:

      yourSqueaker = {
        type: “squeaker”,
        attributes: {
          index: indexNumber,
          weapon: weaponToUse
            }
        }

        yourToughDuck = {
          type: “toughDuck”,
          attributes: {
            index: indexNumber,
            guns: gunsRequired
                }
        }
*/`
    })

    const dialogue17_8 = await Dialog.create({
      content: `/*
      General Joe:

      You can also bet it’ll be encrypted by now.
*/`
    })

    const dialogue17_9 = await Dialog.create({
      content: `/*
      General Joe:

      This is for all the marbles, kid. It’s gonna be tough, but when you come out the other side we will be victorious!
*/`
    })

    const dialogue17_10 = await Dialog.create({
      content: `/*
      General Joe:

      I’d wish you luck, but I wish you documentation instead!
*/`
    })

    await Level17.addDialogs([
      dialogue17,
      dialogue17_2,
      dialogue17_3,
      dialogue17_4,
      dialogue17_5,
      dialogue17_6,
      dialogue17_7,
      dialogue17_8,
      dialogue17_9,
      dialogue17_10,
      dialogue17_10
    ])

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
    Level17
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
