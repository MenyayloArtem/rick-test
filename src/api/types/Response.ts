import Character from "../../types/Character";

export default interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
  error?: string;
}

export type CharacterResponse = ApiResponse<Character>;
