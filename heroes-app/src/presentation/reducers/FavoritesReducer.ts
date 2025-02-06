import { Hero } from "../../domain/models/heroe";

export enum Actions {
  ADD_FAVORITES,
  DELETE_FAVORITES,
  ADD_STATE_INITIAL,
}

export type Action = {
  type: Actions;
  payload: ActionPayload;
};

type ActionPayload = Hero | Hero[];

function isHero(payload: ActionPayload): payload is Hero {
  return !Array.isArray(payload);
}

export const FavoriteReducer = (state: Hero[], action: Action) => {
  switch (action.type) {
    case Actions.ADD_STATE_INITIAL:
      if (!isHero(action.payload)) return action.payload;
      return state;
    case Actions.ADD_FAVORITES:
      if (isHero(action.payload)) return [...state, action.payload];
      return state;
    case Actions.DELETE_FAVORITES:
      if (isHero(action.payload))
        return state.filter(
          (hero) => isHero(action.payload) && hero.id !== action.payload.id
        );
      return state;
    default:
      return state;
  }
};
