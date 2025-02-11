import styles from "./home.module.css";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import { useState } from "react";

const Home = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <h1 className={styles.text}>cicd test5</h1>
      <Button label="펫톡 이야기 보러 가기" />
      <Button label="펫톡 이야기 보러 가기" />
      <Input.Box>
      <Input.Label htmlFor="username">사용자 이름</Input.Label>
      <Input
        type="text"
        id="username"
        name="username"
        placeholder="이름을 입력하세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Input.Box>
    <Footer />
    </>
  );
};

export default Home;
