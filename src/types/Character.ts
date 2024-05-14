export type Unknown = "unknown";
export type Statuses = "alive" | "dead";
export type Genders = "Male" | "Female" | "Genderless";
interface URLInfo {
  name: string;
  url: string;
}

export default interface Character {
  id: number;
  name: string;
  status: Statuses | Unknown;
  species: string;
  type: string;
  gender: Genders | Unknown;
  origin: URLInfo;
  location: URLInfo;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
