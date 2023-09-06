import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { categoryList } from '../atoms';

interface IForm {
  newCategory: string;
}

function CreateCategory() {
  const setCategories = useSetRecoilState(categoryList);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ newCategory }: IForm) => {
    setCategories((oldList) => ({ ...oldList, [newCategory]: newCategory }));
    setValue('newCategory', '');
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register('newCategory', { required: 'Please write here' })}
        placeholder='New category name'
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;
