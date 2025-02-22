import { FC } from "react";
import Modal from "../Modal";
import style from "./addressForm.module.css";

interface AddressFormProps {
  closeModal: () => void;
  openModal: () => void;
  isOpen: boolean;
}

const AddressForm: FC<AddressFormProps> = ({
  closeModal,
  openModal,
  isOpen,
}) => {
  return (
    <div>
      <Modal.Root
        onCloseModal={closeModal}
        onOpenModal={openModal}
        open={isOpen}
      >
        <Modal.Backdrop className={style.backdrop} />
        <Modal.Trigger>
          <p>open</p>
        </Modal.Trigger>
        <Modal.Content className={style.content}>
          <Modal.Close>
            <a href="#">x</a>
            <button>close</button>
          </Modal.Close>
          <div>Modal Content</div>
          <div>Modal Content</div>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
};

export default AddressForm;
