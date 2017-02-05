var heroesManager;

(function() {

  var data = [{
    name: 'Wolverine',
    origin: 'Earth',
    age: '107',
    superpowers: ['immortal'],
    weaknesses: ['temper'],
    image: 'hero_1.png'
  }, {
    name: 'Captain America',
    origin: 'Earth',
    age: '97',
    superpowers: ['impenetrable shield', 'superhuman strength'],
    weaknesses: ['missed out on the 60s'],
    image: 'hero_2.png'
  }, {
    name: 'Hulk',
    origin: 'Earth',
    age: '36',
    superpowers: ['superhuman strength'],
    weaknesses: ['green', 'not very bright in hulk-mode'],
    image: 'hero_3.png'
  }, {
    name: 'Mystique',
    origin: 'Earth',
    age: '87',
    superpowers: ['shapeshifter'],
    weaknesses: [],
    image: 'hero_4.png'
  }, {
    name: 'Rogue',
    origin: 'Earth',
    age: '24',
    superpowers: ['immune to damage', 'superhuman strength', 'flight'],
    weaknesses: ['her touch will kill'],
    image: 'hero_5.png'
  }, {
    name: 'Deadpool',
    origin: 'Earth',
    age: '47',
    superpowers: ['immortal'],
    weaknesses: ['really needs that mask'],
    image: 'hero_6.png'
  }, {
    name: 'Iron Man',
    origin: 'Earth',
    age: '42',
    superpowers: ['hyperintelligent'],
    weaknesses: ['hyperarrogant'],
    image: 'hero_7.png'
  }, {
    name: 'Daredevil',
    origin: 'Earth',
    age: '37',
    superpowers: ['superhuman senses'],
    weaknesses: ['visually blind'],
    image: 'hero_8.png'
  }, {
    name: 'Thor',
    origin: 'Asgard',
    age: 'unknown',
    superpowers: ['immortal', 'flight', 'hammer of mass destruction'],
    weaknesses: ['his little brother'],
    image: 'hero_9.png'
  }, {
    name: 'Cyclops',
    origin: 'Earth',
    age: '39',
    superpowers: ['laser eyes'],
    weaknesses: ['needs glasses to control power'],
    image: 'hero_10.png'
  }, {
    name: 'Magneto',
    origin: 'Earth',
    age: '77',
    superpowers: ['controls all metals'],
    weaknesses: ['cranky old man'],
    image: 'hero_11.png'
  }, {
    name: 'Nick Fury',
    origin: 'Earth',
    age: '48',
    superpowers: ['nobody knows'],
    weaknesses: ['only has one eye'],
    image: 'hero_12.png'
  }, {
    name: 'Mr Sinister',
    origin: 'Earth',
    age: 'unknown',
    superpowers: [
		'telepathy', 'telekinesis', 'superhuman strength',
		'ability to project concussive energy from his hands',
		'control of his body at the molecular level'],
    weaknesses: [],
    image: 'hero_13.png'
  }, {
    name: 'Green Goblin',
    origin: 'Earth',
    age: '41',
    superpowers: ['athletic'],
    weaknesses: ['crazy'],
    image: 'hero_14.png'
  }, {
    name: 'Spiderman',
    origin: 'Earth',
    age: '37',
    superpowers: ['can walk on walls', 'shoots webbing from hands', 'spider senses'],
    weaknesses: ['Mary Jane'],
    image: 'hero_15.png'
  }, {
    name: 'Red Skull',
    origin: '?',
    age: 'unknown',
    superpowers: ['unarmed combatant', 'marksman', 'master of disguise'],
    weaknesses: [],
    image: 'hero_16.png'
  }];

  heroesManager = {
    fetch: fetch
  };

  function fetch(done) {
    if (!done) {
      throw 'Callback not defined';
    }
    setTimeout(function() {
      if (Math.floor(Math.random() * 20) === 2) {
		  console.log('fetch data error');
        done(new Error('Fetch data error'));
      } else {
        done(null, data);
      }
    }, 800);
  }

  if (typeof module !== 'undefined') {
    module.exports = heroesManager;
  }
})();
