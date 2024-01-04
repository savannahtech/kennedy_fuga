import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { useForm } from "react-hook-form";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useCreateUserMutation } from "@data/user/use-user-create.mutation";
import { useTranslation } from "next-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import { customerValidationSchema } from "./user-validation-schema";
import { Permission } from "@/ts-types/generated";
import Label from "@components/ui/label";
import SelectInput from "@components/ui/select-input";
import ValidationError from "@components/ui/form-validation-error";

const PERMISSIONS = [
  {
    label: "Super Admin",
    value: Permission.SuperAdmin,
  },
  {
    label: "Store Owner",
    value: Permission.StoreOwner,
  },
  {
    label: "Staff",
    value: Permission.Staff,
  },
  {
    label: "Customer",
    value: Permission.Customer,
  },
];

interface SelectOptions {
  label: string;
  value: Permission;
}
type FormValues = {
  first_name: string;
  last_name: string;
  other_names: string;
  email: string;
  password: string;
  permission: SelectOptions | SelectOptions[];
};

const defaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  permission: PERMISSIONS.find((p) => p.value === Permission.Customer),
};

const CustomerCreateForm = () => {
  const { t } = useTranslation();
  const { mutate: registerUser, isLoading: loading } = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(customerValidationSchema),
  });

  async function onSubmit({
    first_name,
    last_name,
    other_names,
    email,
    password,
    permission,
  }: FormValues) {
    registerUser(
      {
        variables: {
          first_name,
          last_name,
          other_names,
          email,
          password,
          permission: Array.isArray(permission)
            ? permission.map((p) => p.value)
            : [permission.value],
        },
      },
      {
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: "manual",
              message: error?.response?.data[field][0],
            });
          });
        },
      }
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:form-title-information")}
          details={t("form:customer-form-info-help-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("form:input-label-firstname")}
            {...register("first_name")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.first_name?.message!)}
          />
          <Input
            label={t("form:input-label-lastname")}
            {...register("last_name")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.last_name?.message!)}
          />
          <Input
            label={t("form:input-label-othernames")}
            {...register("other_names")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.other_names?.message!)}
          />
          <Input
            label={t("form:input-label-email")}
            {...register("email")}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
          <PasswordInput
            label={t("form:input-label-password")}
            {...register("password")}
            error={t(errors.password?.message!)}
            variant="outline"
            className="mb-4"
          />
          <div className="mb-5">
            <Label>{t("form:input-label-permissions")}</Label>
            <SelectInput
              name="permission"
              control={control}
              getOptionLabel={(option: any) => option.label}
              getOptionValue={(option: any) => option.value}
              options={PERMISSIONS}
            />
            <ValidationError message={errors.permission?.message} />
          </div>
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={loading} disabled={loading}>
          {t("form:button-label-create-customer")}
        </Button>
      </div>
    </form>
  );
};

export default CustomerCreateForm;
