import { useState } from "react";
import style from "./roulette.module.css";
import { Modal } from "@/components";

const Roulette = () => {
  const [color, setColor] = useState<string>("");
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const startRoulette = () => {
    if (spinning) return; // 이미 돌아가고있으면 return

    setSpinning(true);

    let angle = rotation; // 현재 각도에서 시작
    let speed = 8; // 초기 속도 (클수록 빠름)
    let deceleration = 0.992; // 감속 비율 (1에 가까울수록 더 오래 회전)
    let minSpeed = 0.2; // 최소 속도 (너무 빨리 멈추지 않도록 설정)
    let finalAngle = 360 * 15 + Math.floor(Math.random() * 360); // 10바퀴 + 랜덤 각도

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
        <h1 className={style.h1}>펫네임 랜덤룰렛 🎡</h1>
        <div>
          <div>
            <p>나의 반려동물 색상은 ?</p>
            <p>{color}</p>
          </div>
          <div>
            <button onClick={startRoulette} disabled={spinning}>
              START!
            </button>
          </div>
        </div>
        <div className={style.button_wrap}>
          <button className={style.black}></button>
          <button className={style.white}></button>
          <button className={style.ivory}></button>
          <button className={style.gold}></button>
          <button className={style.brown}></button>
          <button className={style.gray}></button>
          <button className={style.colorBtn}></button>
        </div>
        <div className={style.roulette_container}>
          {/* <div className={style.pin}></div> */}
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
        <Modal.Root
          onCloseModal={handleCloseModal}
          onOpenModal={handleOpenModal}
          open={isOpen}
          className={style.modal}
        >
          <Modal.Backdrop className={style.backdrop} />
          <Modal.Content className={style.content}>반려동물 이름</Modal.Content>
        </Modal.Root>
      </div>
    </div>
  );
};

export default Roulette;
