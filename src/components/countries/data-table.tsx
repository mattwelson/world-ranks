"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Controls } from "./controls";
import { columnFiltersAtom, globalFilterAtom, sortingAtom } from "./atoms";
import { useAtom, useAtomValue } from "jotai";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useAtom(sortingAtom);
  const [globalFilter, setGlobalFilter] = useAtom(globalFilterAtom);
  const columnFilters = useAtomValue(columnFiltersAtom);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    initialState: {
      columnVisibility: {
        subregion: false,
        unMember: false,
        independent: false,
      },
    },
  });

  console.log(table.getColumn("region")?.getFacetedUniqueValues());
  console.log(table.getState().columnFilters);

  return (
    <div className="px-8">
      <Card className="-mt-16 mx-auto max-w-7xl z-10 relative">
        <CardHeader className="flex md:flex-row justify-between items-center">
          <CardDescription className="font-semibold text-base text-muted-foreground">
            Found {table.getRowCount()} countries
          </CardDescription>
          <div className="relative">
            <Search className="absolute select-none top-2 left-2 text-muted-foreground" />
            <Input
              placeholder="Search by Name, Region or Subregion"
              className="w-80 pl-12"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-[minmax(200px,250px)_1fr] gap-8">
          <Controls />
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
