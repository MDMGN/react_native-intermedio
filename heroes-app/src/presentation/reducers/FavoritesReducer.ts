import { Hero } from "../../domain/models/heroe";
export enum Actions {
  ADD = "ADD",
  DELETE = "DELETE",
}
type ActionType = {
  action: Actions;
  payload: Hero;
};

export const FavoriteReducer = (state: Hero[], type: ActionType) => {
  switch (type.action) {
    case Actions.ADD:
      return [...state, type.payload];
    case Actions.DELETE:
      return state.filter((hero) => hero.id !== type.payload.id);
    default:
      return state;
  }
};
