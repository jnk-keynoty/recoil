import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

interface StringObj {
  [index: string]: string;
}

export const categoryList = atom<StringObj>({
  key: 'categoryList',
  default: {...Categories},
  effects_UNSTABLE: [persistAtom]
})

export interface IToDo {
  text: string;
  id: number;
  category: Categories | string;
}

export const categoryState = atom<Categories | string>({
  key: 'category',
  default: Categories.TO_DO
})

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({get}) => {
    const toDos = get(toDoState)
    const category = get(categoryState)
    return toDos.filter((toDo) => toDo.category === category)
  }
}) 