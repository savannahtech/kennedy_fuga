import Input from "@components/ui/input";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";

type IProps = {
  initialValues: any;
};

export default function ProductSimpleForm({ initialValues }: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap my-5 sm:my-8">
      <Description
        title={t("form:form-title-simple-product-info")}
        details={`${
          initialValues
            ? t("form:item-description-edit")
            : t("form:item-description-add")
        } ${t("form:form-description-simple-product-info")}`}
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Input
          label={`${t("form:input-label-price")}*`}
          {...register("price")}
          type="number"
          error={typeof errors.price?.message! === 'string' ? t(errors.price?.message!) : undefined}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t("form:input-label-sale-price")}
          type="number"
          {...register("sale_price")}
          error={typeof errors.sale_price?.message! === 'string' ? t(errors.sale_price?.message!) : undefined}
          variant="outline"
          className="mb-5"
        />

        <Input
          label={`${t("form:input-label-quantity")}*`}
          type="number"
          {...register("quantity")}
          error={typeof errors.quantity?.message! === 'string' ? t(errors.quantity?.message!): undefined}
          variant="outline"
          className="mb-5"
        />

        <Input
          label={`${t("form:input-label-sku")}*`}
          {...register("sku")}
          error={typeof errors.sku?.message! === 'string' ? t(errors.sku?.message!): undefined}
          variant="outline"
          className="mb-5"
        />

        <Input
          label={t("form:input-label-width")}
          {...register("width")}
          error={typeof errors.width?.message! === 'string' ? t(errors.width?.message!): undefined}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t("form:input-label-height")}
          {...register("height")}
          error={typeof errors.height?.message! === 'string' ? t(errors.height?.message!): undefined}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t("form:input-label-length")}
          {...register("length")}
          error={typeof errors.length?.message! === 'string' ? t(errors.length?.message!): undefined}
          variant="outline"
          className="mb-5"
        />
      </Card>
    </div>
  );
}
