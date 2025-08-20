/* eslint-disable @typescript-eslint/no-explicit-any */
// ReservationTable.tsx
"use client";

import React, { FC, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
  Button,
  Pagination,
} from "flowbite-react";

import { Icon } from "@iconify/react";

/**
 * Replace these imports with your actual paths.
 * You supplied the Reservation interface & enums in your prompt — import them from your project.
 */
import Allergen from "../../enums/Allergen";
import Diet from "../../enums/Diet";
import ReservationStatus from "../../enums/ReservationStatus";
import Reservation from "../../types/Reservation";
import toDate from "../../utils/toDate";
import convert24ToAmPm from "../../utils/convert24ToAmPm";
import formatDatePretty from "../../utils/formatDatePretty";
import AllergenVisual from "../molecules/AllergenVisual";
import DietVisual from "../molecules/DietVisual";
import { Link } from "@tanstack/react-router";
type ReservationTableProps = {
  reservations: Reservation[];

  /**
   * Callback whenever edit is called
   */
  onEdit: (reservation: Reservation) => void;
  exclude?: (keyof Reservation | string)[];
};

const DEFAULT_PAGE_SIZE = 2;

const ReservationTable: FC<ReservationTableProps> = ({
  reservations,
  exclude,
  onEdit,
}) => {
  // Controlled global filter (TextInput)
  const [globalFilter, setGlobalFilter] = useState<string>("");

  // Table: create columns
  const columns = useMemo<ColumnDef<Reservation, any>[]>(() => {
    const columns: ColumnDef<Reservation, any>[] = [
      // Actions column (rightmost) — NOT sortable
      {
        id: "actions",
        header: () => <span className="sr-only">Edit</span>,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.status !== ReservationStatus.CANCELED && (
            <Button
              color="alternative"
              size="sm"
              onClick={() => onEdit(row.original)}
              pill={false}
            >
              Edit
            </Button>
          ),
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          // if ReservationStatus is an enum, indexing back will give label
          const label: string =
            typeof info.getValue() === "number"
              ? ReservationStatus[info.getValue() as unknown as number]
              : String(info.getValue());

          if (label === ReservationStatus[ReservationStatus.CONFIRMED]) {
            return <span className="text-emerald-700 font-bold">{label}</span>;
          }

          if (label === ReservationStatus[ReservationStatus.CANCELED]) {
            return (
              <span className="text-red-700 font-bold line-through">
                {label}
              </span>
            );
          }

          return <span className="font-bold">{label}</span>;
        },
      },
      {
        id: "restaurantName",
        accessorKey: "restaurantName",
        header: "Restaurant",
        cell: (info) => (
          <Link to="/restaurants/lomans-pizza">
            <abbr title="go to restaurant page">
              <div className="w-full flex items-center gap-1">
                <strong className="text-primary-700 text-nowrap">
                  {info.getValue()}
                </strong>
                <Icon icon="carbon:link" className="text-primary-700" />
              </div>
            </abbr>
          </Link>
        ),
      },
      {
        id: "partySize",
        accessorKey: "partySize",
        header: "Party Size",
        cell: (info) => <strong>{info.getValue()}</strong>,
      },
      {
        id: "date",
        accessorKey: "startDate",

        header: "Date",
        cell: ({ row }) => (
          <span>{formatDatePretty(toDate(row.original.startDate) ?? "")}</span>
        ),
      },
      {
        id: "time",
        accessorFn: (r) => r.startTimeISO,
        header: "Time",
        cell: (info) => convert24ToAmPm(info.getValue()) ?? "—",
      },
      {
        id: "guest",
        accessorFn: (r) => `${r.firstName} ${r.lastName}`,
        header: "Guest",
        cell: (info) => info.getValue() ?? "—",
      },
      {
        id: "phone",
        accessorKey: "phone",
        header: "Phone",
        cell: (info) => info.getValue() ?? "—",
      },
      {
        id: "email",
        accessorKey: "email",
        header: "Email",
        cell: (info) => info.getValue() ?? "—",
      },
      {
        id: "allergies",
        accessorFn: (r) =>
          Array.isArray(r.allergies)
            ? r.allergies.map((a) => Allergen[a]).join(",")
            : "",
        header: "Allergies",
        cell: (info) => (
          <>
            {[...info.getValue().replaceAll(" ", "").split(",")].map(
              (allergen) => (
                <AllergenVisual
                  displayName
                  allergen={Allergen[allergen] as unknown as Allergen}
                  key={allergen}
                />
              )
            )}
          </>
        ),
      },
      {
        id: "diets",
        accessorFn: (r) =>
          Array.isArray(r.diets) ? r.diets.map((d) => Diet[d]).join(", ") : "",
        header: "Diets",
        cell: (info) => (
          <>
            {[...info.getValue().replaceAll(" ", "").split(",")].map((diet) => (
              <DietVisual
                displayName
                diet={Diet[diet] as unknown as Diet}
                key={diet}
              />
            ))}
          </>
        ),
      },

      {
        id: "id",
        accessorKey: "id",
        header: "Confirmation Number",
        cell: (info) => String(info.getValue()),
      },
    ];
    const filteredCols = columns.filter(
      (column) => !(exclude ?? [])?.includes(column.id as keyof Reservation)
    );

    return filteredCols;
  }, [exclude]);

  // Custom global filter function: search firstName, lastName, restaurantName (case-insensitive substring)
  const globalFilterFn = (row: any, _columnId: string, filterValue: any) => {
    if (!filterValue) return true;
    const q = String(filterValue).toLowerCase();
    const r = row.original as Reservation;
    const hay = [r.firstName ?? "", r.lastName ?? "", r.restaurantName ?? ""]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  };

  // Create table instance
  const table = useReactTable({
    data: reservations ?? [],
    columns,
    state: {
      globalFilter,
      // pagination state will be controlled by the table instance via initialState below
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE },
    },
  });

  const filteredTotal = table.getFilteredRowModel().rows.length;

  return (
    <div className="w-full min-w-full">
      {/* Search + counts */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1">
          <TextInput
            placeholder="Search Reservations"
            value={globalFilter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGlobalFilter(e.target.value)
            }
            type="text"
            aria-label="Search Reservations"
            sizing="md"
          />
        </div>

        <div className="text-sm text-surface-950 mt-2 sm:mt-0">
          {filteredTotal} reservation{filteredTotal !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* If no rows after filtering, show empty centered message */}
      {filteredTotal === 0 ? (
        <div className="w-full h-48 flex items-center justify-center">
          <div className="text-center text-surface-950">
            No reservations found.
          </div>
        </div>
      ) : (
        <>
          {/* Responsive table */}
          <div className="overflow-x-auto rounded-lg border border-surface-200 ">
            <Table striped={false}>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const canSort = header.column.getCanSort();
                      return (
                        <TableHeadCell
                          key={header.id}
                          className={
                            canSort ? "cursor-pointer select-none" : undefined
                          }
                          onClick={
                            canSort
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                        >
                          <div className="flex items-center">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {/* Sort icon uses header (has getIsSorted) */}
                            {header.column.getCanSort()
                              ? (() => {
                                  const s = header.column.getIsSorted(); // 'asc' | 'desc' | false
                                  if (s === "asc") {
                                    return (
                                      <Icon
                                        icon="mdi:arrow-up-bold"
                                        className="ml-2 inline-block h-4 w-4"
                                        aria-hidden
                                      />
                                    );
                                  }
                                  if (s === "desc") {
                                    return (
                                      <Icon
                                        icon="mdi:arrow-down-bold"
                                        className="ml-2 inline-block h-4 w-4"
                                        aria-hidden
                                      />
                                    );
                                  }
                                  return (
                                    <Icon
                                      icon="mdi:sort-variant"
                                      className="ml-2 inline-block h-4 w-4 text-surface-950"
                                      aria-hidden
                                    />
                                  );
                                })()
                              : null}
                          </div>
                        </TableHeadCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHead>

              <TableBody className="divide-y">
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="bg-white ">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-normal">
                        {flexRender(
                          cell.column.columnDef.cell as any,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination (Flowbite) */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <Pagination
                layout="table"
                currentPage={table.getState().pagination.pageIndex + 1}
                itemsPerPage={table.getState().pagination.pageSize}
                totalItems={table.getFilteredRowModel().rows.length}
                onPageChange={(page) => table.setPageIndex(page - 1)}
                showIcons
              />
            </div>

            {/* Rows per page */}
            <div className="flex items-center gap-2 text-sm text-surface-950">
              <label htmlFor="pageSize" className="whitespace-nowrap">
                Rows per page:
              </label>
              <select
                id="pageSize"
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="w-20 rounded border px-2 py-1"
              >
                {[2, 5, 10, 20, 50].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReservationTable;
