exports.initialMinionState = {
  currentSequenceId: 0,
  minionsById: {
    minionId1: {
      id: 'minionId1',
      cardId: 'CS2_231',
      name: 'Wisp',
      sequenceId: 1,
      maxHealth: 1,
      health: 1,
      attack: 1,
      divineShield: false,
      exhausted: true,
      alreadyAttacked: false,
      windfuryUsed: false,
      frozenFor: 0,
      effects: [],
      auras: [],
    },
  },
};

exports.initialPlayerState = {
  playerId1: {
    id: 'playerId1',
    hero: 'heroId1',
    deck: [
      'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10',
      'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20',
      'c21', 'c22', 'c23', 'c24', 'c25', 'c26', 'c27', 'c28', 'c29', 'c30',
    ],
    hand: [],
    graveyard: [],
    secrets: [],
    effects: [],
    auras: [],
    minions: [],
    mana: 0,
    maxMana: 10,
    name: 'Jimmy',
  },
  playerId2: {
    id: 'playerId2',
    hero: 'heroId2',
    deck: [
      'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10',
      'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20',
      'c21', 'c22', 'c23', 'c24', 'c25', 'c26', 'c27', 'c28', 'c29', 'c30',
    ],
    hand: [],
    graveyard: [],
    secrets: [],
    effects: [],
    auras: [],
    minions: [],
    mana: 0,
    maxMana: 10,
    name: 'Walker',
  },
};

exports.initialHeroState = {
  heroId1: {
    id: 'heroId1',
    playerClass: 'Mage',
    weapon: null,
    maxHealth: 30,
    health: 30,
    fatigue: 0,
    armor: 0,
    attack: 0,
    immune: false,
    frozenFor: 0,
    usedWindfury: false,
    alreadyAttacked: false,
    effects: [],
    auras: [],
  },
  heroId2: {
    id: 'heroId2',
    playerClass: 'Hunter',
    weapon: null,
    maxHealth: 30,
    health: 30,
    fatigue: 0,
    armor: 0,
    attack: 0,
    immune: false,
    frozenFor: 0,
    usedWindfury: false,
    alreadyAttacked: false,
    effects: [],
    auras: [],
  },
};
