'use strict';
const assert = require('assert');

// This is an object that has types of jobs and the values each provide.
const jobTypes = {
	pilot: 'MAV',
	mechanic: 'Repair Ship',
	commander: 'Main Ship',
	programmer: 'Any Ship!',
};

// Your code will go here
class CrewMember {
	// Name of the crew member
	name;
	// Job of the crew member
	job;
	// Any special skill the crew member may have
	specialSkill;
	// The ship the crew member is assigned to.  Currently no ship has been assigned.
	ship;
	constructor(name, job, specialSkill) {
		this.name = name;
		this.job = job;
		this.specialSkill = specialSkill;
		this.ship = null;
	}
	// Create a method that assigns the ship name and a crew
	// member to the particular ship's crew
	enterShip(shipName) {
		this.ship = shipName;
		this.ship.crew.push(this);
	}
}

class Ship {
	// The name of the ship
	name;
	// Description of the type of ship it is
	type;
	// Determines if the ship can go the flight path
	// of the mission
	ability;
	// The crew member that is assigned to the ship.  No crew member 
	// at the build of the ship
	crew;
	constructor(name, type, ability) {
		this.name = name;
		this.type = type;
		this.ability = ability;
		this.crew = [];
	}
	// Creates a method that determines if a ship can do a mission
	// If it does not have a crew member that can enter it, it cannot 
	// leave for a mission. Else it will be able to leave on the mission 
	// according to the ship's ability
	missionStatement() {
		if (this.crew == 0) {
			return "Can't perform a mission yet.";
		} else {
			return this.ability;
		}
	};
}

// Begin by reading the tests and building a function that will full each one.
// As you build, you might not have to build them in order, maybe you do...
// These are the tests
if (typeof describe === 'function') {
	describe('CrewMember', function () {
		it('should have a name, a job, a specialSkill and ship upon instantiation', function () {
			// this creates a CrewMember and passes the following arguments into its constructor:
			// 'Rick Martinez', 'pilot', 'chemistry'
			const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
			assert.equal(crewMember1.name, 'Rick Martinez');
			assert.equal(crewMember1.job, 'pilot');
			assert.equal(crewMember1.specialSkill, 'chemistry');
			assert.equal(crewMember1.ship, null);
		});

		it('can enter a ship', function () {
			// this creates a new Ship. Can you build a class that can be called so that this Ship can be built?
			let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
			const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
			crewMember1.enterShip(mav);
			assert.equal(crewMember1.ship, mav);
			assert.equal(mav.crew.length, 1);
			assert.equal(mav.crew[0], crewMember1);
		});
	});

	describe('Ship', function () {
		it('should have a name, a type, an ability and an empty crew upon instantiation', function () {
			let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
			assert.equal(mav.name, 'Mars Ascent Vehicle');
			assert.equal(mav.type, 'MAV');
			assert.equal(mav.ability, 'Ascend into low orbit');
			assert.equal(mav.crew.length, 0);
		});

		it('can return a mission statement correctly', function () {
			let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
			const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
			let hermes = new Ship(
				'Hermes',
				'Main Ship',
				'Interplanetary Space Travel'
			);
			const crewMember2 = new CrewMember(
				'Commander Lewis',
				'commander',
				'geology'
			);
			assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
			assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

			crewMember1.enterShip(mav);
			assert.equal(mav.missionStatement(), 'Ascend into low orbit');

			crewMember2.enterShip(hermes);
			assert.equal(hermes.missionStatement(), 'Interplanetary Space Travel');
		});
	});
}
