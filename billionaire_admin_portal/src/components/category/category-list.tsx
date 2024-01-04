import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { getIcon } from "@utils/get-icon";
import * as categoriesIcon from "@components/icons/category";
import { ROUTES } from "@utils/routes";
import { CategoryPaginator, SortOrder } from "@ts-types/generated";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { useState } from "react";
import TitleWithSort from "@components/ui/title-with-sort";
import { AlignType } from "rc-table/lib/interface";
import truncate from "lodash/truncate";
import Tooltip from "../ui/tooltip";

export type IProps = {
  categories: CategoryPaginator | undefined | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const CategoryList = ({
  categories,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  const { t } = useTranslation();
  const { data, paginatorInfo } = categories!;
  const rowExpandable = (record: any) => record.children?.length;

  const { alignLeft } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "_id",
      key: "_id",
      align: "center" as AlignType,
      width: 60,
      render: (id: string) => {
        return (
          <Tooltip
            clickable
            place="top"
            effect="solid"
            tootltipText={id}
          >
          <span>
            {truncate(id, {
              length: 5,
            })}
          </span>
          </Tooltip>
        );
      },
    },
    {
      title: (
        <TitleWithSort
          title={t("table:table-item-title")}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === "name"
          }
          isActive={sortingObj.column === "name"}
        />
      ),
      className: "cursor-pointer",
      dataIndex: "name",
      key: "name",
      align: alignLeft as AlignType,
      width: 150,
      onHeaderCell: () => onHeaderClick("name"),
    },
    {
      title: t("table:table-item-details"),
      dataIndex: "details",
      key: "details",
      align: alignLeft as AlignType,
      width: 200,
    },
    {
      title: t("table:table-item-image"),
      dataIndex: "image",
      key: "image",
      align: "center" as AlignType,

      render: (image: any, { name }: { name: string }) => {
        if (!image?.thumbnail) return null;

        return (
          <Image
            src={image?.thumbnail ?? "/"}
            alt={name}
            layout="fixed"
            width={24}
            height={24}
            className="rounded overflow-hidden"
          />
        );
      },
    },
    {
      title: t("table:table-item-icon"),
      dataIndex: "icon",
      key: "icon",
      align: "center" as AlignType,
      render: (icon: string) => {
        if (!icon) return null;
        return (
          <span className="flex items-center justify-center">
            {getIcon({
              iconList: categoriesIcon,
              iconName: icon,
              className: "w-5 h-5 max-h-full max-w-full",
            })}
          </span>
        );
      },
    },
    {
      title: t("table:table-item-slug"),
      dataIndex: "slug",
      key: "slug",
      align: "center" as AlignType,
      ellipsis: true,
      width: 150,
      render: (slug: any) => (
        <div
          className="whitespace-nowrap truncate overflow-hidden"
          title={slug}
        >
          {slug}
        </div>
      ),
    },
    {
      title: t("table:table-item-group"),
      dataIndex: "type",
      key: "type",
      align: alignLeft as AlignType,
      width: 120,
      render: (type: any) => (
        <div
          className="whitespace-nowrap truncate overflow-hidden"
          title={type?.name}
        >
          {type?.name}
        </div>
      ),
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "_id",
      key: "actions",
      align: "center" as AlignType,
      width: 90,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.CATEGORIES}/edit/${id}`}
          deleteModalView="DELETE_CATEGORY"
        />
      ),
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
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => "",
            rowExpandable: rowExpandable,
            expandedRowKeys: ["_id"],
          }}
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

export default CategoryList;
