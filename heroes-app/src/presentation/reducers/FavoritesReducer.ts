import { Hero } from "../../domain/models/heroe";

export enum Actions {
  ADD_FAVORITES,
  DELETE_FAVORITES,
  ADD_STATE_INITIAL,
}

export type Action = {
  type: Actions;
  payload: Hero;
};

export const FavoriteReducer = (state: Hero[], action: Action) => {
  switch (action.type) {
    /*     case Actions.ADD_STATE_INITIAL:
      if (action.payload instanceof Array) return action.payload; */
    case Actions.ADD_FAVORITES:
      return [...state, action.payload];
    case Actions.DELETE_FAVORITES:
      if (typeof action.payload === "object") {
        return state.filter((hero) => hero.id !== action.payload.id);
      }
    default:
      return state;
  }
};
