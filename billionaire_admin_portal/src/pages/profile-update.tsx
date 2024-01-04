import Layout from "@components/layouts/app";
import ProfileUpdateFrom from "@components/auth/profile-update-form";
import ChangePasswordForm from "@components/auth/change-password-from";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAuthCredentials } from "@/utils/auth-utils";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { meData } = getAuthCredentials();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-profile-settings")}
        </h1>
      </div>

      <ProfileUpdateFrom me={meData} />
      <ChangePasswordForm />
    </>
  );
}
ProfilePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
