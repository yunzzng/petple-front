import { useForm } from "react-hook-form";
import style from "./petForm.module.css";
import Button from "../Button";

type petFormFields = {
  name: string | null;
  age: number | null;
  breed: string | null;
  gender: string | null;
};

const defaultValuesPetForm = {
  name: null,
  age: null,
  breed: null,
  gender: null,
};

const PetForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<petFormFields>({ defaultValues: defaultValuesPetForm });

  const onSubmit = async () => {
    try {
    } catch (error) {
      console.error("반려동물 정보 저장 실패", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Button type="submit">저장</Button>
          <Button type="button">삭제</Button>
        </div>
        <ul className={style.pet_ul}>
          <li>
            <label>이름</label>
            <input
              className={style.input}
              placeholder="이름"
              {...register("name", { required: true })}
            />
          </li>
          <li>
            <label>나이</label>
            <input
              className={style.input}
              placeholder="나이"
              {...register("age", { required: true })}
            />
          </li>
          <li>
            <label>품종</label>
            <input
              className={style.input}
              placeholder="품종"
              {...register("breed", { required: true })}
            />
          </li>
          <li>
            <label>성별</label>
            <input {...register("gender", { required: true })} />
            <div>
              <Button onClick={() => setValue("gender", "남")}>남아</Button>
              <Button onClick={() => setValue("gender", "여")}>여아</Button>
            </div>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default PetForm;
