import { create } from 'zustand';

import { apiBase } from '@/api/config';

export interface BirthPlace {
  value: string;
}

export interface DeathPlace {
  value: string;
}

export interface Spouse {
  id: number;
  name: string;
  divorced: boolean;
  divorcedReason: string;
  sex: string;
  children: number;
  relation: string;
}

export interface Profession {
  value: string;
}

export interface Fact {
  value: string;
}

export interface MovieRole {
  id: number;
  name: string;
  alternativeName: string;
  rating: number;
  general: boolean;
  description: string;
  enProfession: string;
}

export interface IPerson {
  id: number;
  name: string;
  enName: string;
  photo: string;
  sex: string;
  growth: number;
  birthday: string;
  death: string;
  age: number;
  birthPlace: BirthPlace[];
  deathPlace: DeathPlace[];
  spouses: Spouse[];
  countAwards: number;
  profession: Profession[];
  facts: Fact[];
  movies: MovieRole[];
  updatedAt: string;
  createdAt: string;
}

interface State {
  getPersonById: (id: string) => Promise<IPerson>;
  data: IPerson | null;
}

export const useGetPersonByIdStore = create<State>((set) => ({
  data: null,
  getPersonById: async (id) => {
    try {
      const response = await apiBase.get(`person/${id}`);

      set(() => ({ data: response.data }));
      return response.data;
    } catch (error) {
      console.error('Error fetching person by id:', error);
    }
  },
}));
