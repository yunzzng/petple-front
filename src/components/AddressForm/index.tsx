import { FC } from "react";
import Modal from "../Modal";
import style from "./addressForm.module.css";
import DaumPostcode from "react-daum-postcode";
import { AddressType } from "@/types/user.type";
import { Address } from "react-daum-postcode";
import Button from "../Button";
import { getCoordinate } from "@/apis/profile.api";

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
    const coordinate = await getCoordinate(data.address);

    if (!coordinate) {
      alert("좌표를 가져오지 못했습니다.");
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
        <Modal.Close>
          <div>
            <a href="#">x</a>
          </div>
        </Modal.Close>

        <DaumPostcode onComplete={handleComplete} />
      </Modal.Content>
    </Modal.Root>
  );
};

export default AddressForm;
