import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ControlRegions } from "./controls-region";

export function Controls() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label>Sort by</Label>
        <Select value="population">
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">Area</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="population">Population</SelectItem>
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
            <Checkbox />
            <label>Member of the United Nations</label>
          </div>
          <div className="flex items-center gap-4">
            <Checkbox checked />
            <label>Independent</label>
          </div>
        </div>
      </div>
    </div>
  );
}
