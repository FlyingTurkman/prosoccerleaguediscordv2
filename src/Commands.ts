import { Command } from "./Command";
import { Hello } from "./commands/hello";
import { RegionAdminAdd } from "./commands/region_admin_add";
import { RegionCreate } from "./commands/region_create";
import { TeamCaptain } from "./commands/team_captain";
import { TeamCreate } from "./commands/team_create";




export const Commands: Command[] = [
    Hello,
    RegionCreate,
    RegionAdminAdd,
    TeamCreate,
    TeamCaptain
]