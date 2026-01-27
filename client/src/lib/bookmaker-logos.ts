import stakeLogo from "../../../attached_assets/logos/stake.png";
import cloudbetLogo from "../../../attached_assets/logos/cloudbet.gif";
import bcGameLogo from "../../../attached_assets/logos/bcgame.png";
import roobetLogo from "../../../attached_assets/logos/roobet.png";
import onexbitLogo from "../../../attached_assets/logos/1xbit.png";
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
import betpandaLogo from "../../../attached_assets/logos/betpanda.svg";
import fortunejackLogo from "../../../attached_assets/logos/fortunejack.svg";
import bitcasinoLogo from "../../../attached_assets/logos/bitcasino.png";
import betyLogo from "../../../attached_assets/logos/bety.svg";
import sportbetOneLogo from "../../../attached_assets/logos/sportbet-one.png";
import sevenbitLogo from "../../../attached_assets/logos/7bit.png";
import betsioLogo from "../../../attached_assets/logos/betsio.png";
import megadiceLogo from "../../../attached_assets/logos/megadice.png";
import bitstarzLogo from "../../../attached_assets/logos/bitstarz.png";
import jackbitLogo from "../../../attached_assets/logos/jackbit.png";
import cryptorinoLogo from "../../../attached_assets/logos/cryptorino.png";

export const bookmakerLogos: Record<string, string> = {
  "stake": stakeLogo,
  "cloudbet": cloudbetLogo,
  "bc-game": bcGameLogo,
  "roobet": roobetLogo,
  "1xbit": onexbitLogo,
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
  "betpanda": betpandaLogo,
  "fortunejack": fortunejackLogo,
  "bitcasino": bitcasinoLogo,
  "bety": betyLogo,
  "sportbet-one": sportbetOneLogo,
  "7bit": sevenbitLogo,
  "bets-io": betsioLogo,
  "megadice": megadiceLogo,
  "bitstarz": bitstarzLogo,
  "jackbit": jackbitLogo,
  "cryptorino": cryptorinoLogo,
};

export function getBookmakerLogo(slug: string): string | undefined {
  return bookmakerLogos[slug];
}
