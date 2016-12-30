/* eslint-env node*/
const { KILL, SUMMON } = require('../actions');
const merge = require('lodash/fp/merge');
const cards = require('../../data/cards.json');

const initialState = {
  currentSequenceId: 0,
  minionsById: {},
};

const minions = (state = initialState, action) => {
  switch (action.type) {
    case KILL: {
      const copy = Object.assign({}, state);
      delete copy.minionsById[action.characterId];
      return copy;
    }
    case SUMMON: {
      const card = cards[action.cardId];
      const newSequenceId = state.currentSequenceId + 1;
      return merge(state, {
        currentSequenceId: newSequenceId,
        minionsById: {
          [action.minionId]: {
            id: action.minionId,
            cardId: card.id,
            name: card.name,
            sequenceId: newSequenceId,
            attack: card.attack,
            maxHealth: card.health,
            health: card.health,
            divineShield: false,
            exhausted: true,
            alreadyAttacked: false,
            windfuryUsed: false,
            frozenFor: 0,
            effects: [],
            auras: [],
          },
        },
      });
    }
    default:
      return state;
  }
};

module.exports = minions;
