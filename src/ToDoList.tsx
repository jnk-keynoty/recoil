import { useRecoilState, useRecoilValue } from 'recoil';
import CreatToDo from './components/CreateToDo';
import {
  Categories,
  categoryList,
  categoryState,
  toDoSelector,
  toDoState,
} from './atoms';
import ToDo from './components/ToDo';
import CreateCategory from './components/CreateCategory';

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoryList);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <CreateCategory />
      <hr />
      <select value={category} onInput={onInput}>
        {Object.values(categories).map((value, i) => (
          <option key={i} value={value}>
            {value}
          </option>
        ))}
      </select>
      <CreatToDo />
      {toDos.map((aToDo) => (
        <ToDo key={aToDo.id} {...aToDo} />
      ))}
    </div>
  );
}

export default ToDoList;
