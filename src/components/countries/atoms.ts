import {
  type ColumnFilter,
  type ColumnFiltersState,
  type ColumnSort,
  type SortingState,
} from "@tanstack/react-table";
import { atom } from "jotai";

export const sortOptions = [
  {
    id: "area",
    desc: true,
    name: "Area",
  },
  {
    id: "name_common",
    desc: false,
    name: "Name",
  },
  {
    id: "population",
    desc: true,
    name: "Population",
  },
] satisfies (ColumnSort & { name: string })[];

// default to population for sort order
export const sortingAtom = atom<SortingState>([sortOptions[2]]);

export const globalFilterAtom = atom<string | undefined>();

// TODO: split out each control into its own atom, recombine in a read only atom that will help us make changes simply
export const regionFilterAtom = atom<ColumnFilter>({
  id: "region",
  value: ["Antarctic", "Americas", "Europe", "Africa", "Asia", "Oceania"],
});

export const unMemberAtom = atom(false);
export const independentAtom = atom(false);

export const columnFiltersAtom = atom<ColumnFiltersState>((get) => {
  return [
    get(regionFilterAtom),
    get(unMemberAtom) ? { id: "unMember", value: true } : undefined,
    get(independentAtom) ? { id: "independent", value: true } : undefined,
  ].filter((filter) => !!filter) satisfies ColumnFiltersState;
});
