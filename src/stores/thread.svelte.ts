import type { IThread } from "@/interfaces";

export const storeThreads = $state<{ 
  threads: IThread[]
  loaded: boolean 
}>({
  threads: [],
  loaded: false
});