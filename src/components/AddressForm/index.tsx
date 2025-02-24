import { FC } from "react";
import Modal from "../Modal";
import style from "./addressForm.module.css";
import DaumPostcode from "react-daum-postcode";
import { AddressType } from "@/types/user.type";
import { Address } from "react-daum-postcode";
import Button from "../Button";

interface AddressFormProps {
  closeModal: () => void;
  openModal: () => void;
  isOpen: boolean;
  onSelectAddress: (address: AddressType) => void;
}

const AddressForm: FC<AddressFormProps> = ({
  closeModal,
  openModal,
  isOpen,
  onSelectAddress,
}) => {
  const handleComplete = async (data: Address) => {
    const coordinate = await fetchCoordinate(data.roadAddress);

    if (!coordinate) {
      return;
    }

    const address: AddressType = {
      jibunAddress: data.address,
      location: {
        type: "Point",
        coordinates: [coordinate.x, coordinate.y],
      },
    };
    onSelectAddress(address);
    closeModal();
  };

  const fetchCoordinate = async (address: string) => {
    try {
      const apiKey = "70FE45AE-5BBB-3DB6-B189-0BD818A5B020";
      const encodedAddress = encodeURIComponent(address);

      const response = await fetch(
        `/vworld/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${encodedAddress}&refine=true&simple=false&format=json&type=road&key=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();

        const x = data.response.result.point.x;
        const y = data.response.result.point.y;

        return { x, y };
      } else {
        alert("위경도 좌표 불러오기 실패");
        return;
      }
    } catch (err) {
      console.error("위경도 불러오기 실패", err);
    }
  };
  return (
    <Modal.Root
      onCloseModal={closeModal}
      onOpenModal={openModal}
      open={isOpen}
      className={style.modal}
    >
      <Modal.Backdrop className={style.backdrop} />
      <Modal.Trigger className={style.address_button}>
        <Button
          type="button"
          className={style.address_button}
          label="주소검색"
        />
      </Modal.Trigger>
      <Modal.Content className={style.content}>
        <div>
          <Modal.Close>
            <a href="#">x</a>
          </Modal.Close>
        </div>
        <DaumPostcode onComplete={handleComplete} />
      </Modal.Content>
    </Modal.Root>
  );
};

export default AddressForm;
