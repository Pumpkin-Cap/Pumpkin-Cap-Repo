// describe('myWhileLoopFunction', function(){
//   it("returns the appropriate time that it'll take for a duck to reach us", function(){
//     expect(myWhileLoopFunction(20)).to.equal(10);
//     expect(myWhileLoopFunction(10)).to.equal(5);
//     expect(myWhileLoopFunction(4)).to.equal(2);
//     expect(myWhileLoopFunction(9)).to.equal(5);
//   });
// });

// describe('myForLoopFunction', function(){
//   it('returns 10', function(){
//     expect(myForLoopFunction()).to.equal(10);
//   });
// });

// //level3
// Well done!

// But we’re going to need to be conscious of what weapon we’re using. Did you know we can chain conditions using an “else if” command? It will continue checking your conditions until it finds one that evaluates TRUE and enter that block. Refactor your orders to account for the following conditions.

// And don’t forget to check the documentation!

// //level4
// Excellent job! Those ducks didn’t know what hit ‘em! But you can bet things can get more complicated.

// Did you know that you can join conditionals? In JavaScript you write these as:

// AND operator:	&&
// OR operator:	||

// With the AND operator, the condition returns TRUE if both sides are true. If either one or both sides are false, then the entire condition returns FALSE.

// With the OR operator, the entire condition returns TRUE if either one or both sides are true. If both sides are false, then the condition returns FALSE.

// Let’s run a quick drill! And don’t forget the documentation!


// //level5
// Great! I now know my faith was not misplaced!

// They’re changing up their strategy. Some of their waves are being sent out with shields! If they’re using a shield, we’re going to need the grenade launcher no matter how many they have. We’re going to have to adapt!

// Finish what you’ve started. Take charge of rewriting the code!

// The documentation is always there!

// //level6
// All right! Our defense against their type of attack is set! Now let’s tackle how to handle their continuous attacks.

// In any system you’ll need to decide not only what to execute, but how many times to execute it. If you’re going to need a code block to execute more than two or three times - or perhaps a varying number of times - then you’re probably going to want to employ a loop.

// There are many kinds of loops that are each ideal for different kinds of situations. While no loop is officially more important than another, you’ll get little argument from me that the “for-loop” is your go-to.

// A for-loop declares a variable, changes that variable after each iteration of the code, and has an end condition for when that variable becomes a certain value. That variable can be called anything, but is conventionally “i.” The incrementation of that variable can be anything that makes sense for your function, but often it makes sense to increment it by 1 (i = i + 1, or i++ in shorter notation).

// Don’t forget to consult your documentation!

// //level 7
// Now let’s put that for-loop into action!

// It looks like there are waves advancing, and we need to prepare for it. We need to deploy more troops depending on how many waves we get; design a function to deploy the right amount of troops.

// We need 5 troops per wave, and each additional wave will require an extra troop. I’m counting on you!

// Documentation: Use it!

// //level 8
// Those ducks soon won’t stand a chance!

// But there are other times a for-loop won’t work for the situation. For example, if we want to iterate on a block of code until a particular condition is met that can’t be reliably counted by the number of times we’ve looped (like a for-loop does), then perhaps a “while-loop” is appropriate.

// To properly plan our strategy, we’ll need to know how long we’ve got until ducks reach our base. Given its distance, write us something that computes the time for one to reach us!

// The documentation is there if you need it.

// // level 9
// Now let’s bring it together. Based on how long it takes a big tough duck to reach us, we need to know how many guns at once we’ll need on it to bring it down in time.

// And not a moment too soon! There’s some big tough poultry coming this way, and they can take a lot of pepper - write us something that tells the troops how many guns to fire at a duck given its height and distance!

// The documentation is always with you.

// //10
// You’ve done a great job. We now have systems in place to deal with any particular attack.

// Let’s now have you work with arrays. An array is a data type that stores references to other data.

// For example, you can have an array with 3 integers in it - each called an “element.” You can refer to each one of these integers, and the length of this array is considered 3. This is what that might look like:

// const myArray = [4, 10, -5]

// //the following are true statements; note we begin counting our elements (referred to as an element’s index) at 0 rather than 1.
// myArray[0] === 4
// myArray[1] === 10
// myArray[2] === -5
// myArray.length === 3

// By the time you’re ready to take over my job it’ll be important to understand the difference between this array having these values and having references to these values, but for now I want you to focus on putting these arrays and values to use!

// There is a lot to know about arrays. I’ll lay out the basics, but the documentation has everything you could ever need.

// //11
// Excellent. I knew you would be the one I could trust with this next mission.

// We have placed a spy in their ranks. It is time to recover our operative and add that wealth of knowledge to our intelligence.

// Using arrays and any other tools you’ve learned, write a program to recover the spy. You will recognize our ally from the rest by the pizza/party hat.

// Remember, referencing the documentation could save a life!!

// //12
// To make use of the critical information gathered, it will be useful to familiarize you with array methods. A method is a built-in function that you can apply to manipulate or access data you need.

// We’ll go over some common array methods, but there are many, many more. Always remember the documentation is there to reference rather than trying to memorize them all.

// //13
// You’re now ready to begin acting on the intelligence we’ve gathered. Sergeant Sarah will brief you.

// I’ve heard you’re the peak programming duck in our ranks. The King Duck. The peak king duck. You’re certainly piquing my interest, duck.

// Missiles are slow and expensive, but totally worth it against those tough ducks - the only problem is by the time we know where they are to target them it’s too late to use them. But I think we can use your skills to make this happen.

// I’ve discovered their deployment schema. I can give you this information in the form of an array: General Joe tells me you’ll be able to find where a tough duck will be, and what place it’ll be in their deployment. With these calculations we’ll be able to target our missiles from afar.

// And the documentation will fill in the gaps!

// //14
// General Joe was right about you. I now see for myself that you are the one for this next mission.

// The decision to extract me now was made because my partner was compromised. It was only a matter of time before they found me, too, and I was recovered; he is still in their custody.

// Knowing there was a spy, they began encrypting their orders. I got the information on where he’s being held before I was recovered, but the clear location must be extracted from this jumbled mess.

// General Joe says you’ll be able to figure out how to use “Array.isArray()” from the documentation. That is what they use to decrypt these orders.

// //15
// You’ve done us all a great service with the rescue of Gary. He is invaluable to our operation; his name is Gary, and that’s all you need to know about him.

// Once we get you up to speed on objects we will be primed for our final strike.

// You, of course, know what an array looks like. Let’s take our original example:

// const myArray = [4, 10, -5]

// Now what if I presented it to you like this?

// const myArray = {
// 0: 4,
// 1: 10,
// 2: -5
// }

// Do you see the relationship between them? We are explicitly stating the index and its value along with it rather than just the value. If you take this idea and “rename” the indices as any names you see fit, then you’ve got the concept of an object. In fact, an array is merely a special kind of object!

// In the case of an object, we refer to them as “key-value pairs.” The “named” index is the key, and the value is its associated value. In the case of an array, the key is an integer; with an object it is a string.

// When thinking of an array as an object, it becomes easy to figure out how to navigate an object.

// const myArray = [4, 10, -5]

// const myObject = {
// green: “turtle”,
// circle: true,
// cat: “cute”,
// dog: 10
// }

// //The following statements are true
// myArray[2] === -5
// myObject[“cat”] === “cute”
// myObject.cat === “cute”

// Note the ability to use dot notation with objects. This tells the code to assume the following word is a string, so it knows to find a string-type key. This will not work with arrays whose keys are integers.

// Like arrays, there is much to know about objects. This is a solid basis, but the documentation has anything else you might need.

// //16
// There’s just one more thing and you will be ready.

// For our final attack, you must know how to “build” objects as well as read them. You can define an object’s key-value pairs outright when you declare it, but you also can add them (or change them) as you go along just as easily. Let’s take our last example:

// const myObject = {
// green: “turtle”,
// circle: true,
// cat: “cute”,
// dog: 10
// }

// Now if you code:

// myObject.snake: “creepy”

// myObject will now have that key-value pair, looking like:

// {
// green: “turtle”,
// circle: true,
// cat: “cute”,
// dog: 10,
// snake: “creepy”
// }

// In addition, you can make alterations at any point in your code:

// myObject.cat = “super, super cute”

// myObject will now have that change, looking like:

// {
// green: “turtle”,
// circle: true,
// cat: “super, super cute”,
// dog: 10,
// snake: “creepy”
// }

// Let’s build an enemy blueprint! Look into your documentation when needed.

// //17
// All right. You’re ready to perform the Special Ops mission. With the recovery of Gary, we have retrieved critical information that we can use to put an end to this invasion. It won’t be easy - you’re going to have to pull out all the tricks you’ve learned up to this point.

// The key to our victory lies in severing their communication. Each of the enemy looks the same to the untrained eye; however, we have discovered a critical feature of those responsible for dispersing their orders: squeakers.

// Given an array of the entire army where each duck is given as an object, we will need you to do the following:

// Find where the ducks with squeakers are located, and which weapon to use based on how many are clustered together and if they have shields. You may fire a weapon at the first of a group to hit all of them. If any one duck in a cluster has a shield, it is the same as if all of them do.

// Where the toughDucks are located, and how many guns will need to be focused on them based on their particular height and distance.

// The enemy objects will appear with keys depending on what type it is:

// A squeaker will be:

// enemyObj = {
// 	type: “squeaker”,
// attributes: {
// 		hasShield: boolean
// 				}
// 	}

// A toughDuck will be:

// enemyObj = {
// type: “toughDuck”,
// attributes: {
// 		height: integer,
// distance: integer
// 				}
// 	}


// Return your data as an array of objects. Each object should have the “type” key, and an “attributes” key whose value itself will be an object with keys of the necessary data. This is an example of what each kind would look like:

// yourSqueaker = {
// type: “squeaker”,
// attributes: {
// 			index: indexNumber,
// 			weapon: weaponToUse
// 					}
// }

// yourToughDuck = {
// type: “toughDuck”,
// attributes: {
// index: indexNumber,
// guns: gunsRequired
// 		}
// }

// You can also bet it’ll be encrypted by now.

// This is for all the marbles, kid. It’s gonna be tough, but when you come out the other side we will be victorious!

// I’d wish you luck, but I wish you documentation instead!
