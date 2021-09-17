import { Reducer } from "react";
import createPersistedReducer from "use-persisted-reducer";

export type Favorite = {
  productId: string;
  amount: number;
};
export type AddFavoriteAction = {
  type: "ADD_FAVORITE";
  payload: Favorite;
};
export type UpdateFavoriteAction = {
  type: "UPDATE_FAVORITE";
  payload: {
    productId: Favorite["productId"];
    amount: number;
  };
};
export type RemoveFavoriteAction = {
  type: "REMOVE_FAVORITE";
  payload: Favorite["productId"];
};
export type FavoritesState = Favorite[];
export type FavoritesAction =
  | AddFavoriteAction
  | UpdateFavoriteAction
  | RemoveFavoriteAction;

export const addFavorite = (
  productId: string,
  amount: number = 1
): FavoritesAction => {
  return {
    type: "ADD_FAVORITE",
    payload: {
      productId,
      amount,
    },
  };
};

export const updateFavorite = (
  productId: string,
  amount: number
): FavoritesAction => {
  return {
    type: "UPDATE_FAVORITE",
    payload: {
      productId,
      amount,
    },
  };
};

export const removeFavorite = (productId: string): FavoritesAction => {
  return {
    type: "REMOVE_FAVORITE",
    payload: productId,
  };
};

const initialState: Favorite[] = [];
export const favoritesReducer: Reducer<FavoritesState, FavoritesAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "ADD_FAVORITE":
    case "UPDATE_FAVORITE": {
      const { productId, amount } = action.payload;
      const favorite: Favorite = { productId, amount };

      const newState = [...state];
      const favoriteInStateIndex = newState.findIndex(
        (favorite) => favorite.productId === productId
      );
      if (favoriteInStateIndex > -1) {
        newState[favoriteInStateIndex] = favorite;
        return newState;
      }
      return [...newState, favorite];
    }

    case "REMOVE_FAVORITE": {
      const productId = action.payload;
      const index = state.findIndex(
        (favorite) => favorite.productId === productId
      );
      const newState = [...state];
      if (index > -1) {
        newState.splice(index, 1);
      }
      return newState;
    }

    default:
      return state;
  }
};

const PERSISTED_FAVORITES_KEY = "favorites";
const usePersistedReducer = createPersistedReducer(PERSISTED_FAVORITES_KEY);
export const useFavorites = (initialState: FavoritesState = []) => {
  return usePersistedReducer(favoritesReducer, initialState);
};
