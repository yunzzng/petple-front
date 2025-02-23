import { FC } from "react";
import Modal from "../Modal";
import style from "./addressForm.module.css";
import DaumPostcode from "react-daum-postcode";
import { AddressType } from "@/types/user.type";
import { Address } from "react-daum-postcode";

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
    const coordinates = await fetchCoordinate(data.roadAddress);

    const address: AddressType = {
      jibunAddress: data.address,
      x: coordinates?.x || "",
      y: coordinates?.y || "",
    };
    onSelectAddress(address);
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
        console.log("위경도 api요청실패");
        alert("위경도 좌표 불러오기 실패");
        return;
      }
    } catch (err) {
      console.log("위경도 불러오기 실패", err);
    }
  };
  return (
    <div>
      <Modal.Root
        onCloseModal={closeModal}
        onOpenModal={openModal}
        open={isOpen}
      >
        <Modal.Backdrop className={style.backdrop} />
        <Modal.Trigger className={style.address_button}>
          <button type="button" className={style.address_button}>
            주소검색
          </button>
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
    </div>
  );
};

export default AddressForm;
