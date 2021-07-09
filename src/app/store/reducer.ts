import { ItemStateAction } from "../shared/constant/ItemStateAction";
import { ActionUnion } from "./action";
import { Item } from '../shared/interface/item';
import { Action } from "@ngrx/store";

export const initialState = {
  items: [] as Item[],
};

export function ItemReducer(state = initialState, action:any) {
  switch (action.type) {
    case ItemStateAction.Add:
      return {
        ...state,
        items: [...state.items, action["payload"]]
      };
    case ItemStateAction.Remove:
      return {
        ...state,
        items: [...state.items.filter(item => item.id !== action["payload"].id)]
      };
    default:
      return {
        ...state,
        items: [...state.items]
      }
  }
}

