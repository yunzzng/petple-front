import { useState } from "react";
import style from "./roulette.module.css";
import { Button, Modal } from "@/components";
import { getRandomName } from "./roulleteName";
import { RoulleteName } from "./roulleteName";

const Roulette = () => {
  const [color, setColor] = useState<keyof typeof RoulleteName>("black");
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [randomName, setRandomName] = useState<string>("");

  const startRoulette = (color: keyof typeof RoulleteName) => {
    if (spinning) return; // 이미 돌아가고있으면 return
    const name = getRandomName(color);
    if (name) {
      setRandomName(name);
    }
    setSpinning(true);

    let angle = rotation; // 현재 각도에서 시작
    let speed = 20; // 초기 속도 (클수록 빠름)
    let deceleration = 0.98; // 감속 비율 (1에 가까울수록 더 오래 회전)
    let minSpeed = 0.2; // 최소 속도 (너무 빨리 멈추지 않도록 설정)

    const spin = () => {
      if (speed <= minSpeed) {
        setSpinning(false);
        setIsOpen(true);
        return;
      }

      angle += speed;
      speed *= deceleration; // 점점 느려지게

      setRotation(angle);

      requestAnimationFrame(spin); // 계속 실행
    };

    requestAnimationFrame(spin);
  };

  const handleOpenModal = () => {
    if (!spinning) {
      setIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={style.roulette_total_wrap}>
      <div className={style.roulette_content}>
        <h1 className={style.h1}>🫧 펫네임 랜덤룰렛 🫧</h1>
        <div>
          <p className={style.description}>
            나의 반려동물은 어떤 이름이 어울릴까? 🤔
            <br />
            펫플이 추천하는 이름을 확인해보세요!
            <br />
            선택한 색상에 어울리는 이름 or 펫플이 엄선한 랜덤이름을 추천해드려요
            🌈
          </p>
        </div>
        <div className={style.color_wrap}>
          <div className={style.colorPick}>
            <p>나의 반려동물 색상 선택하기 👉</p>
            <p>{color}</p>
          </div>
          <div className={style.button_wrap}>
            <button
              className={style.black}
              onClick={() => setColor("black")}
            ></button>
            <button
              className={style.white}
              onClick={() => setColor("white")}
            ></button>
            <button
              className={style.ivory}
              onClick={() => setColor("ivory")}
            ></button>
            <button
              className={style.gold}
              onClick={() => setColor("gold")}
            ></button>
            <button
              className={style.brown}
              onClick={() => setColor("brown")}
            ></button>
            <button
              className={style.gray}
              onClick={() => setColor("gray")}
            ></button>
            <button
              className={style.triColor}
              onClick={() => setColor("triColor")}
            ></button>
          </div>
        </div>
        <div className={style.startBtn}>
          <Button onClick={() => startRoulette(color)} disabled={spinning}>
            START!
          </Button>
        </div>
        <div className={style.roulette_wrap}>
          <div className={style.roulette_container}>
            <div className={style.pin}></div>
            <div
              className={style.roulette}
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className={style.line_1}></div>
              <div className={style.line_2}></div>
              <div className={style.line_3}></div>
              <div className={style.line_4}></div>
              <div className={style.line_5}></div>
              <div className={style.line_6}></div>
            </div>
          </div>
        </div>
        <Modal.Root
          onCloseModal={handleCloseModal}
          onOpenModal={handleOpenModal}
          open={isOpen}
          className={style.modal}
        >
          <Modal.Backdrop className={style.backdrop} />
          <Modal.Content className={style.content}>
            <Modal.Close className={style.close}>
              <p>x</p>
            </Modal.Close>
            <p> 펫플이 추천하는 반려동물 이름은 🐾 </p>
            <p className={style.name}>{randomName}</p>
          </Modal.Content>
        </Modal.Root>
      </div>
    </div>
  );
};

export default Roulette;
