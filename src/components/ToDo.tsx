import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Categories, IToDo, categoryList, toDoState } from '../atoms';

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryList);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);

      const newToDo: IToDo = { text, id, category: name as any };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onDelete = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);

      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  console.log(categories, category);

  return (
    <li>
      <span>{text}</span>
      {Object.values(categories).map((value, i) =>
        value !== category ? (
          <button key={i} name={value} onClick={onClick}>
            {value}
          </button>
        ) : null
      )}
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default ToDo;
