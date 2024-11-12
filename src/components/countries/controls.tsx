import { useAtom } from "jotai";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  independentAtom,
  sortingAtom,
  sortOptions,
  unMemberAtom,
} from "./atoms";
import { ControlRegions } from "./controls-region";

export function Controls() {
  const [sorting, setSorting] = useAtom(sortingAtom);
  const [unMember, setUnMember] = useAtom(unMemberAtom);
  const [independent, setIndependent] = useAtom(independentAtom);

  function handleSortChange(id: string) {
    setSorting(sortOptions.filter((o) => o.id === id));
  }

  function handleFilterChange(setAtom: (checked: boolean) => void) {
    return function (checked: boolean) {
      setAtom(checked);
    };
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label>Sort by</Label>
        <Select value={sorting[0].id} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Region</Label>
        <ControlRegions />
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-4">
            <Checkbox
              onCheckedChange={handleFilterChange(setUnMember)}
              checked={unMember}
              id="unMember"
            />
            <label htmlFor="unMember">Member of the United Nations</label>
          </div>
          <div className="flex items-center gap-4">
            <Checkbox
              onCheckedChange={handleFilterChange(setIndependent)}
              checked={independent}
              id="independent"
            />
            <label htmlFor="independent">Independent</label>
          </div>
        </div>
      </div>
    </div>
  );
}
