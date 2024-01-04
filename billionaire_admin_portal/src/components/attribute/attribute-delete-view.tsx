import { useDeleteAttributeMutation } from "@data/attributes/use-attribute-delete.mutation";
import ConfirmationCard from "../common/confirmation-card";
import { useModalAction, useModalState } from "../ui/modal/modal.context";

const AttributeDeleteView = () => {
  const { mutate: deleteAttributeByID, isLoading: loading } =
    useDeleteAttributeMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();
  async function handleDelete() {
    deleteAttributeByID(data);
    closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default AttributeDeleteView;
