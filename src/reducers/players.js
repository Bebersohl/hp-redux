/* eslint-env node*/
const { shuffle, mapValues } = require('lodash');
const merge = require('lodash/fp/merge');
const { randomInt } = require('../utils');
const {
  ADD_PLAYER,
  ADD_TO_GRAVEYARD,
  BURN_CARD,
  DRAW_CARD,
  GAIN_MANA,
  SHUFFLE_CARD,
  SHUFFLE_DECKS,
  SUMMON,
} = require('../actions');

const initialState = {
  allPlayers: [],
  activePlayer: 0,
  playersById: {},
};

const players = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER: {
      if (Object.keys(state.playersById).length === 2) {
        return state;
      }
      const { playerId, heroId, deck, name } = action;
      return merge(state, {
        allPlayers: [...state.allPlayers, playerId],
        activePlayer: 0,
        playersById: {
          [playerId]: {
            id: playerId,
            hero: heroId,
            deck,
            hand: [],
            graveyard: [],
            secrets: [],
            effects: [],
            auras: [],
            minions: [],
            mana: 0,
            maxMana: 10,
            name,
          },
        },
      });
    }
    case ADD_TO_GRAVEYARD:
      return merge(state, {
        playersById: {
          [action.playerId]: {
            graveyard: [...state.playersById[action.playerId].graveyard, action.cardId],
          },
        },
      });
    case BURN_CARD: {
      const { deck } = state.playersById[action.playerId];
      return Object.assign({}, state, {
        playersById: Object.assign({}, state.playersById, {
          [action.playerId]: Object.assign({}, state.playersById[action.playerId], {
            deck: [
              ...deck.slice(0, deck.length - 1),
            ],
            graveyard: [
              ...deck.slice(-1),
              ...state.playersById[action.playerId].graveyard,
            ],
          }),
        }),
      });
    }
    case DRAW_CARD: {
      const { deck } = state.playersById[action.playerId];
      return Object.assign({}, state, {
        playersById: Object.assign({}, state.playersById, {
          [action.playerId]: Object.assign({}, state.playersById[action.playerId], {
            deck: [
              ...deck.slice(0, deck.length - 1),
            ],
            hand: [
              ...deck.slice(-1),
              ...state.playersById[action.playerId].hand,
            ],
          }),
        }),
      });
    }
    case GAIN_MANA: {
      let newMana = action.mana + state.playersById[action.playerId].mana;
      if (newMana > 10) {
        newMana = 10;
      }

      return merge(state, {
        playersById: {
          [action.playerId]: {
            mana: newMana,
          },
        },
      });
    }
    case SHUFFLE_CARD: {
      const newIndex = randomInt(0, state.playersById[action.playerId].deck.length);
      let handIndex = state.playersById[action.playerId].hand.length;
        // by default the slice returns a copy of hand

      if (action.removeFromHand === true) {
        handIndex = state.playersById[action.playerId].hand.indexOf(action.cardId);
          // sets up the removal logic in the return statement
      }

      return merge(state, {
        playersById: {
          [action.playerId]: {
            deck: [
              ...state.playersById[action.playerId].deck.slice(0, newIndex),
              action.cardId,
              ...state.playersById[action.playerId].deck.slice(newIndex),
            ],
            hand: [
              ...state.playersById[action.playerId].hand.slice(0, handIndex),
              ...state.playersById[action.playerId].hand.slice(handIndex + 1),
            ],
          },
        },
      });
    }
    case SHUFFLE_DECKS:
      return Object.assign({}, state, {
        playersById: mapValues(state.playersById, player =>
          merge(player, {
            deck: shuffle(player.deck),
          })
        ),
      });
    case SUMMON:
      return merge(state, {
        playersById: {
          [action.playerId]: {
            minions: [
              ...state.playersById[action.playerId].minions.slice(0, action.position),
              action.minionId,
              ...state.playersById[action.playerId].minions.slice(action.position),
            ],
          },
        },
      });

    default:
      return state;
  }
};

module.exports = players;
