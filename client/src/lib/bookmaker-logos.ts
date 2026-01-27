import stakeLogo from "../../../attached_assets/logos/stake.png";
import cloudbetLogo from "../../../attached_assets/logos/cloudbet.png";
import bcGameLogo from "../../../attached_assets/logos/bc-game.png";
import roobetLogo from "../../../attached_assets/logos/roobet.png";
import rollbitLogo from "../../../attached_assets/logos/rollbit.png";
import sportsbetIoLogo from "../../../attached_assets/logos/sportsbet-io.png";
import duelbitsLogo from "../../../attached_assets/logos/duelbits.png";
import betfuryLogo from "../../../attached_assets/logos/betfury.png";
import onexbitLogo from "../../../attached_assets/logos/1xbit.png";
import thunderpickLogo from "../../../attached_assets/logos/thunderpick.png";
import gamdomLogo from "../../../attached_assets/logos/gamdom.png";
import luckyblockLogo from "../../../attached_assets/logos/luckyblock.png";
import shuffleLogo from "../../../attached_assets/logos/shuffle.png";
import vaveLogo from "../../../attached_assets/logos/vave.png";
import bitslerLogo from "../../../attached_assets/logos/bitsler.png";
import mystakeLogo from "../../../attached_assets/logos/mystake.png";
import winzLogo from "../../../attached_assets/logos/winz.png";
import betcoinAgLogo from "../../../attached_assets/logos/betcoin-ag.png";
import nitrogenSportsLogo from "../../../attached_assets/logos/nitrogen-sports.png";
import duckdiceLogo from "../../../attached_assets/logos/duckdice.png";
import coinsgameLogo from "../../../attached_assets/logos/coinsgame.png";
import rakebitLogo from "../../../attached_assets/logos/rakebit.png";
import rolettoLogo from "../../../attached_assets/logos/roletto.png";

export const bookmakerLogos: Record<string, string> = {
  "stake": stakeLogo,
  "cloudbet": cloudbetLogo,
  "bc-game": bcGameLogo,
  "roobet": roobetLogo,
  "rollbit": rollbitLogo,
  "sportsbet-io": sportsbetIoLogo,
  "duelbits": duelbitsLogo,
  "betfury": betfuryLogo,
  "1xbit": onexbitLogo,
  "thunderpick": thunderpickLogo,
  "gamdom": gamdomLogo,
  "luckyblock": luckyblockLogo,
  "shuffle": shuffleLogo,
  "vave": vaveLogo,
  "bitsler": bitslerLogo,
  "mystake": mystakeLogo,
  "winz": winzLogo,
  "betcoin-ag": betcoinAgLogo,
  "nitrogen-sports": nitrogenSportsLogo,
  "duckdice": duckdiceLogo,
  "coinsgame": coinsgameLogo,
  "rakebit": rakebitLogo,
  "roletto": rolettoLogo,
};

export function getBookmakerLogo(slug: string): string | undefined {
  return bookmakerLogos[slug];
}
