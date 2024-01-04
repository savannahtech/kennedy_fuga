import { CreateTypeInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Type from "@repositories/type";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
export interface ITypeUpdateVariables {
  variables: {
    id: string;
    input: CreateTypeInput;
  };
}

export const useUpdateTypeMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const updateMsg = t("common:successfully-updated")
  return useMutation(
    ({ variables: { id, input } }: ITypeUpdateVariables) =>
      Type.update(`${API_ENDPOINTS.TYPES}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(updateMsg);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.TYPES);
      },
    }
  );
};
