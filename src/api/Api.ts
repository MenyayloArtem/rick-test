import Character, { Statuses } from "../types/Character";
import ApiResponse, { CharacterResponse } from "./types/Response";

interface Filters {
  name?: string;
  status?: Statuses;
}

export default abstract class Api {
  static async makeRequest<T>(
    url: string,
    method: "get" | "post" = "get"
  ): Promise<ApiResponse<T>> {
    let res = await fetch(url, {
      method,
    });
    let json = await res.json();
    return json;
  }

  static async fetchCharacters(
    page: number = 0,
    filters?: Filters
  ): Promise<CharacterResponse> {
    let filterQuery: any = [];

    if (filters) {
      if (filters?.name) {
        filterQuery.push(`name=${filters.name}`);
      }

      if (filters?.status) {
        filterQuery.push(`status=${filters.status}`);
      }
    }

    filterQuery = filterQuery.length ? "&" + filterQuery.join("&") : "";

    let res = await this.makeRequest<Character>(
      `https://rickandmortyapi.com/api/character?page=${page + 1}${filterQuery}`
    );
    return res;
  }
}
