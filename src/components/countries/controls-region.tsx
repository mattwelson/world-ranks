import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export function ControlRegions() {
  return (
    <ToggleGroup
      type="multiple"
      value={["americas", "africa", "asia", "europe"]}
      className="flex-wrap justify-start gap-4"
    >
      <ToggleGroupItem value="americas">Americas</ToggleGroupItem>
      <ToggleGroupItem value="antarctic">Antarctic</ToggleGroupItem>
      <ToggleGroupItem value="africa">Africa</ToggleGroupItem>
      <ToggleGroupItem value="asia">Asia</ToggleGroupItem>
      <ToggleGroupItem value="europe">Europe</ToggleGroupItem>
      <ToggleGroupItem value="oceania">Oceania</ToggleGroupItem>
    </ToggleGroup>
  );
}
