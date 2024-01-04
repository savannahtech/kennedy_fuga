import Image from "next/image";
import { CheckMarkFill } from "@components/icons/checkmark-circle-fill";
import { CloseFillIcon } from "@components/icons/close-fill";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ROUTES } from "@utils/routes";
// import Loader from "@components/ui/loader/loader";
// import { useMeQuery } from "@data/user/use-me.query";
import { getAuthCredentials } from "@/utils/auth-utils";

const UserDetails: React.FC = () => {
  const { t } = useTranslation("common");
  // const { data, isLoading: loading } = useMeQuery();
  const { meData } = getAuthCredentials();
  const { first_name, email, profile, is_active } = meData!;

  return (
    <div className="h-full p-5 flex flex-col items-center">
      <div className="w-32 h-32 relative rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
        <Image
          src={profile?.avatar?.thumbnail ?? "/avatar-placeholder.svg"}
          style={{objectFit: 'cover'}}
          width={100}
          height={100}
          alt={""}
          priority={true}
        />
      </div>
      <h3 className="text-lg font-semibold text-heading mt-4">{first_name}</h3>
      <p className="text-sm text-muted mt-1">{email}</p>
      {!profile ? (
        <p className="text-sm text-muted mt-0.5">
          {t("text-add-your")}{" "}
          <Link href={ROUTES.PROFILE_UPDATE} className="text-accent underline">
            {t("authorized-nav-item-profile")}
          </Link>
        </p>
      ) : (
        <>
          <p className="text-sm text-muted mt-0.5">{profile.contact}</p>
        </>
      )}
      <div className="border border-gray-200 rounded flex items-center justify-center text-sm text-body-dark py-2 px-3 mt-6">
        {is_active ? (
          <CheckMarkFill width={16} className="me-2 text-accent" />
        ) : (
          <CloseFillIcon width={16} className="me-2 text-red-500" />
        )}
        {is_active ? "Enabled" : "Disabled"}
      </div>
    </div>
  );
};
export default UserDetails;
