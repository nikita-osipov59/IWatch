import { apiBase } from '@/api/config';
import { IPerson } from '@/types/person';

export const PersonService = () => {
  const getPersonById = (id: string) =>
    apiBase.get<IPerson>(`person/${id}`).then((res) => res.data);

  return { getPersonById };
};
