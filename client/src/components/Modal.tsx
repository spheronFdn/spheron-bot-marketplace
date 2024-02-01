import { FC } from "react";
import { ModalEnum } from "../config";
import AddModal from "./modals/AddModal";
import UpdateModal from "./modals/UpdateModal";
import DeleteModal from "./modals/DeleteModal";

export interface IModal {
  type: ModalEnum;
  setIsModalVisible: (isModalVisible: boolean) => void;
  botId?: string;
}

const Modal: FC<IModal> = ({ type, setIsModalVisible, botId }) => {
  const modalComponents: { [key in ModalEnum]: React.FC<IModal> } = {
    [ModalEnum.ADD]: ({ type, setIsModalVisible }) => (
      <AddModal type={type} setIsModalVisible={setIsModalVisible} />
    ),
    [ModalEnum.UPDATE]: ({ type, setIsModalVisible }) => (
      <UpdateModal type={type} setIsModalVisible={setIsModalVisible} />
    ),
    [ModalEnum.DELETE]: ({ type, setIsModalVisible }) => (
      <DeleteModal
        type={type}
        setIsModalVisible={setIsModalVisible}
        botId={botId}
      />
    ),
  };

  const SelectedModal = modalComponents[type];

  return SelectedModal ? (
    <SelectedModal type={type} setIsModalVisible={setIsModalVisible} />
  ) : null;
};

export default Modal;
