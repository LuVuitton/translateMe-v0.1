import {

  CitiesMapping,
  CountriesMapping,
  LanguageMapping,
  ProficiencyMapping,
  citiesMapping,
  countriesMapping,
  languageMapping,
} from "./mappingData";

export const convertLocationToSelect = (mapping: Mapping): SelectOptions => {
  const options: SelectOptions = [];

  for (const key in mapping) {
    if (mapping.hasOwnProperty(key)) {
      const item = mapping[key];
      const label = typeof item === "string" ? item : item.countryName;
      options.push({
        label,
        value: parseInt(key),
      });
    }
  }

  return options;
};

export const convertLanguageToSelect = (
  mapping: LanguageMapping
): SelectOptions => {
  const options: SelectOptions = [];

  for (const key in mapping) {
    if (mapping.hasOwnProperty(key)) {
      const item = mapping[key];
      options.push({
        label: item.full,
        value: parseInt(key),
      });
    }
  }

  return options;
};
export const convertProficiencyToSelect = (
  mapping: ProficiencyMapping
): SelectOptions => {
  const options: SelectOptions = [];

  for (const key in mapping) {
    if (mapping.hasOwnProperty(key)) {
      const item = mapping[key];
      options.push({
        label: item,
        value: parseInt(key),
      });
    }
  }

  return options;
};

export const countriesOptions = convertLocationToSelect(countriesMapping);
export const citiesOptions = convertLocationToSelect(citiesMapping);
export const languagesOptions = convertLanguageToSelect(languageMapping);


export type SelectOptions = { label: string; value: number }[];

export type Mapping = CountriesMapping | CitiesMapping;
