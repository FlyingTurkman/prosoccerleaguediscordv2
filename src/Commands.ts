import { Command } from "./Command";
import { Hello } from "./commands/hello";
import { LookingForPlayer } from "./commands/looking_for_player";
import { LookingForTeam } from "./commands/looking_for_team";
import { RegionAdminAdd } from "./commands/region_admin_add";
import { RegionCreate } from "./commands/region_create";
import { Register } from "./commands/register";
import { TeamCaptain } from "./commands/team_captain";
import { TeamCoCaptain } from "./commands/team_co_captain";
import { TeamCreate } from "./commands/team_create";
import { TransferOffer } from "./commands/transfer_offer";




export const Commands: Command[] = [
    Hello,
    RegionCreate,
    RegionAdminAdd,
    TeamCreate,
    TeamCaptain,
    TeamCoCaptain,
    TransferOffer,
    LookingForTeam,
    LookingForPlayer,
    Register
]