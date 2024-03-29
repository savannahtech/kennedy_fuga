import Pagination from "@components/ui/pagination";
import Image from "next/image";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { siteSettings } from "@settings/site.settings";
import { UserPaginator, SortOrder, Permission } from "@ts-types/generated";
import { useMeQuery } from "@data/user/use-me.query";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { useState } from "react";
import TitleWithSort from "@components/ui/title-with-sort";
import { getAuthCredentials } from "@/utils/auth-utils";
import { AlignType } from "rc-table/lib/interface";

type IProps = {
  customers: UserPaginator | null | undefined;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const CustomerList = ({ customers, onPagination, onSort, onOrder }: IProps) => {
  const { data, paginatorInfo } = customers!;
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: any | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: any | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );

      onOrder(column);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns = [
    {
      title: t("table:table-item-avatar"),
      dataIndex: "profile",
      key: "profile",
      align: "center" as AlignType,
      width: 74,
      render: (profile: any, record: any) => (
        <Image
          src={profile?.avatar?.thumbnail ?? siteSettings.avatar.placeholder}
          alt={record?.name || 'user-image'}
          width={42}
          height={42}
          className="rounded overflow-hidden"
        />
      ),
    },
    {
      title: t("table:table-item-title"),
      dataIndex: "first_name",
      key: "name",
      align: alignLeft as AlignType,
    },
    {
      title: t("table:table-item-email"),
      dataIndex: "email",
      key: "email",
      align: alignLeft as AlignType,
    },
    // {
    //   title: t("table:table-item-available_wallet_points"),
    //   dataIndex: ["wallet", "available_points"],
    //   key: "available_wallet_points",
    //   align: alignLeft as AlignType,
    // },
    {
      title: t("table:table-item-permissions"),
      dataIndex: ["permission"],
      key: "permission",
      align: alignLeft as AlignType,
      render: (permission: Permission[]) => <span>{permission.join(', ')}</span>
    },
    {
      title: (
        <TitleWithSort
          title={t("table:table-item-status")}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === "is_active"
          }
          isActive={sortingObj.column === "is_active"}
        />
      ),
      className: "cursor-pointer",
      dataIndex: "is_active",
      key: "is_active",
      align: "center" as AlignType,
      onHeaderCell: () => onHeaderClick("is_active"),
      render: (is_active: boolean) => (is_active ? "Active" : "Inactive"),
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "_id",
      key: "actions",
      align: "center" as AlignType,
      render: (id: string, { is_active }: any) => {
        const { meData } = getAuthCredentials();
        return (
          <>
            {meData?._id != id && (
              <ActionButtons
                id={id}
                userStatus={true}
                isUserActive={is_active}
                showAddWalletPoints={true}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={data}
          rowKey="_id"
          scroll={{ x: 800 }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default CustomerList;
