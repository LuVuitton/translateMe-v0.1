import { citiesOptions, countriesOptions } from "./convertDataToSelect";

export const createAssignmentFormFields = {
  text: [
    { id: "assignment_title", type: "text", registerName: "assignment_title" },
    {
      id: "assignment_description",
      type: "textarea",
      registerName: "assignment_description",
      rows: 5,
    },
    { id: "address", type: "textarea", registerName: "address", rows: 3 },
  ],
  languages: [
    { id: "required_languages_id", name: "required_languages_id" },
    { id: "customer_languages_id", name: "customer_languages_id" },
  ],
  locations: [
    { id: "country_id", name: "country_id", options: countriesOptions },
    { id: "city_id", name: "city_id", options: citiesOptions },
  ],
  numbers: [
    {
      id: "execution_time_minutes",
      name: "execution_time_minutes",
      interval: 10,
    },
    { id: "worth", name: "worth", interval: 1 },
  ],
};
