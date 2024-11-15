"use client";

import type { countryListSchema } from "@/lib/fetchers";
import { type ColumnDef } from "@tanstack/react-table";
import type { z } from "zod";

export const columns: ColumnDef<z.infer<typeof countryListSchema>[0]>[] = [
  {
    accessorKey: "flags.svg",
    header: "Flag",
    cell({ row }) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={row.getValue("flags_svg")}
          alt={row.original.flags.alt ?? ""}
          className="w-16 rounded"
        />
      );
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "name.common",
    header: "Name",
  },
  {
    accessorKey: "population",
    header: () => <div className="text-right"> Population</div>,
    cell({ row }) {
      const population = parseFloat(row.getValue("population"));
      const formatted = new Intl.NumberFormat("en-US").format(population);

      return <div className="text-right font-medium">{formatted}</div>;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "area",
    header: () => (
      <div className="text-right">
        Area(km<sup>2</sup>)
      </div>
    ),
    cell({ row }) {
      const area = parseFloat(row.getValue("area"));
      const formatted = new Intl.NumberFormat("en-US").format(area);

      return <div className="text-right font-medium">{formatted}</div>;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "region",
    header: "Region",
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "subregion",
  },
  {
    accessorKey: "independent",
  },
  {
    accessorKey: "unMember",
  },
];
