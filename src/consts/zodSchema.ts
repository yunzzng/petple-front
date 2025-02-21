import { z } from "zod";

export const petSchema = z.object({
  name: z
    .string()
    .min(1, "이름을 입력해주세요")
    .max(10, "이름은 10글자 미만이어야 합니다."),
  age: z
    .string()
    .min(1, "나이를 입력해주세요")
    .max(3, "나이는 3글자 이하로 입력해주세요."),
  breed: z
    .string()
    .min(1, "품종을 입력해주세요")
    .max(10, "품종은 10글자 미만이어야 합니다."),
});

export const userSchema = z.object({
  nickName: z
    .string()
    .min(1, "닉네임을 입력해주세요.")
    .max(20, "닉네임은 10글자 이하로 입력해주세요."),
});
