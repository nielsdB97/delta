declare module "use-persisted-reducer" {
  import { useReducer } from "react";

  declare function createPersistedReducer(storeKey: string): typeof useReducer;

  export default createPersistedReducer;
}
