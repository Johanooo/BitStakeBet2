import stakeLogo from "../../../attached_assets/logos/stake.png";
import cloudbetLogo from "../../../attached_assets/logos/cloudbet.gif";
import bcGameLogo from "../../../attached_assets/logos/bc-game.png";
import roobetLogo from "../../../attached_assets/logos/roobet.png";
import onexbitLogo from "../../../attached_assets/logos/1xbit.png";
import thunderpickLogo from "../../../attached_assets/logos/thunderpick.png";
import gamdomLogo from "../../../attached_assets/logos/gamdom.svg";
import luckyblockLogo from "../../../attached_assets/logos/luckyblock.png";
import shuffleLogo from "../../../attached_assets/logos/shuffle.png";
import vaveLogo from "../../../attached_assets/logos/vave.png";
import bitslerLogo from "../../../attached_assets/logos/bitsler.webp";
import mystakeLogo from "../../../attached_assets/logos/mystake.png";
import rakebitLogo from "../../../attached_assets/logos/rakebit.png";
import betfuryLogo from "../../../attached_assets/logos/betfury.png";
import duelbitsLogo from "../../../attached_assets/logos/duelbits.png";
import sportsbetioLogo from "../../../attached_assets/logos/sportsbet-io.png";

export const bookmakerLogos: Record<string, string> = {
  "stake": stakeLogo,
  "cloudbet": cloudbetLogo,
  "bc-game": bcGameLogo,
  "roobet": roobetLogo,
  "1xbit": onexbitLogo,
  "thunderpick": thunderpickLogo,
  "gamdom": gamdomLogo,
  "luckyblock": luckyblockLogo,
  "shuffle": shuffleLogo,
  "vave": vaveLogo,
  "bitsler": bitslerLogo,
  "mystake": mystakeLogo,
  "rakebit": rakebitLogo,
  "betfury": betfuryLogo,
  "duelbits": duelbitsLogo,
  "sportsbet-io": sportsbetioLogo,
};

export function getBookmakerLogo(slug: string): string | undefined {
  return bookmakerLogos[slug];
}
