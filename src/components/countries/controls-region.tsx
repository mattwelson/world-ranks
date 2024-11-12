import { useAtom } from "jotai";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { regionFilterAtom } from "./atoms";

export function ControlRegions() {
  const [regionFilter, setRegionFilter] = useAtom(regionFilterAtom);

  function handleRegionChange(values: string[]) {
    console.log(values);
    // set filters on the table
    setRegionFilter({ id: "region", value: values });
  }

  return (
    <ToggleGroup
      type="multiple"
      value={regionFilter.value as string[]}
      onValueChange={handleRegionChange}
      className="flex-wrap justify-start gap-4"
    >
      <ToggleGroupItem value="Americas">Americas</ToggleGroupItem>
      <ToggleGroupItem value="Antarctic">Antarctic</ToggleGroupItem>
      <ToggleGroupItem value="Africa">Africa</ToggleGroupItem>
      <ToggleGroupItem value="Asia">Asia</ToggleGroupItem>
      <ToggleGroupItem value="Europe">Europe</ToggleGroupItem>
      <ToggleGroupItem value="Oceania">Oceania</ToggleGroupItem>
    </ToggleGroup>
  );
}
