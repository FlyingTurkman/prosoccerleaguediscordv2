import { Command } from "./Command";
import { Hello } from "./commands/hello";
import { RegionCreate } from "./commands/region_create";




export const Commands: Command[] = [
    Hello,
    RegionCreate
]