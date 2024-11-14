import type { countryListSchema } from "@/lib/fetchers";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { z } from "zod";
import { DataTable } from "./data-table";
import { columns } from "./columns";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const exampleCountries = [
  {
    name: {
      common: "South Georgia",
      official: "South Georgia and the South Sandwich Islands",
    },
    cca3: "GS",
    independent: false,
    unMember: false,
    region: "Antarctic",
    subregion: "",
    area: 65432,
    population: 30,
    flags: { svg: "https://flagcdn.com/gs.svg", alt: "" },
  },
  {
    name: {
      common: "New Zealand",
      official: "Aoteroa",
    },
    cca3: "nz",
    independent: true,
    unMember: true,
    region: "Oceania",
    subregion: "New Zealand",
    area: 12345,
    population: 6000000,
    flags: { svg: "https://flagcdn.com/nz.svg", alt: "" },
  },
] satisfies z.infer<typeof countryListSchema>;

describe("controls", () => {
  it("renders count", async () => {
    render(<DataTable columns={columns} data={exampleCountries} />);

    const count = await screen.findByText(/Found \d+ countries/);
    expect(count.textContent).toEqual("Found 2 countries");
  });

  describe("sorts by population by default", () => {
    it("sort by control", async () => {
      render(<DataTable columns={columns} data={exampleCountries} />);
      expect(
        await screen.findByText("Population", { selector: "span" })
      ).not.toBeNull();
    });

    it("table is sorted", async () => {
      render(<DataTable columns={columns} data={exampleCountries} />);

      // Get all rows
      const rows = await screen.findAllByRole("row");
      // Skip header row
      const dataRows = rows.slice(1);

      // Check if New Zealand (6000000) comes before South Georgia (30)
      expect(dataRows[0]).toHaveTextContent("New Zealand");
      expect(dataRows[1]).toHaveTextContent("South Georgia");
    });

    it.skip("change sort to area", async () => {
      render(<DataTable columns={columns} data={exampleCountries} />);
      const sortBy = await screen.findByText("Population", {
        selector: "span",
      });
      await userEvent.click(sortBy.parentElement!);
      userEvent.click((await screen.findAllByRole("option"))[0]);

      // Get all rows
      const rows = await screen.findAllByRole("row");
      // Skip header row
      const dataRows = rows.slice(1);

      expect(dataRows[0]).toHaveTextContent("New Zealand");
      expect(dataRows[1]).toHaveTextContent("South Georgia");
    });
  });

  it("checkbox - UN", async () => {
    render(<DataTable columns={columns} data={exampleCountries} />);
    await userEvent.click(
      await screen.findByLabelText(/Member of the United Nations/)
    );
    // Get all rows
    const rows = await screen.findAllByRole("row");
    // Skip header row
    const dataRows = rows.slice(1);

    expect(dataRows[0]).toHaveTextContent("New Zealand");
    expect(dataRows[1]).toBeUndefined();
  });

  it("checkbox - Independent", async () => {
    render(<DataTable columns={columns} data={exampleCountries} />);
    await userEvent.click(await screen.findByLabelText(/Independent/));
    // Get all rows
    const rows = await screen.findAllByRole("row");
    // Skip header row
    const dataRows = rows.slice(1);

    expect(dataRows[0]).toHaveTextContent("New Zealand");
    expect(dataRows[1]).toBeUndefined();
  });

  it("regions - regions present show on state", async () => {
    render(<DataTable columns={columns} data={exampleCountries} />);

    const controls = await screen.findByText("Region", { selector: "label" });
    const regions = await within(controls.parentElement!).findAllByRole(
      "button"
    );

    expect(regions.map((regionButton) => regionButton.textContent)).toEqual([
      "Americas",
      "Antarctic",
      "Africa",
      "Asia",
      "Europe",
      "Oceania",
    ]);
  });

  it.skip("regions - on click remove results", async () => {
    render(<DataTable columns={columns} data={exampleCountries} />);

    const controls = await screen.findByText("Region", { selector: "label" });
    await userEvent.click(
      await within(controls.parentElement!).findByRole("button", {
        name: "Oceania",
      })
    );

    // Get all rows
    const rows = await screen.findAllByRole("row");
    // Skip header row
    const dataRows = rows.slice(1);

    expect(dataRows[0]).toHaveTextContent("Anything");
    expect(dataRows[1]).toBeUndefined();
  });
});
