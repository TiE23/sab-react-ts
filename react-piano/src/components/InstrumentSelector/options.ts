import { InstrumentName } from "soundfont-player";
import instruments from "soundfont-player/names/musyngkite.json";

type Option = {
  value: InstrumentName,
  label: string,
};

// Perhaps a little too overeager to define new types... but oh well.
type OptionsList = Option[];
type InstrumentList = InstrumentName[];

function normalizeList(list: InstrumentList): OptionsList {
  return list.map((instrument) => ({
    value: instrument,
    label: instrument.replace(/_/gi, " "),
  }));
}

export const options = normalizeList(instruments as InstrumentList);
