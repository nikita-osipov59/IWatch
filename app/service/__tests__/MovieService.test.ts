import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/api/config', () => ({
  apiBase: {
    get: vi.fn(),
  },
  apiBaseNewVersion: {
    get: vi.fn(),
  },
  apiBaseOld: {
    get: vi.fn(),
  },
}));

import { MovieService } from '../MovieService';
import * as config from '@/api/config';

describe('MovieService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getMovieBySearch', () => {
    it('calls the correct endpoint', async () => {
      const mockData = { docs: [], total: 0, limit: 20, page: 1, pages: 0 };
      vi.mocked(config.apiBase.get).mockResolvedValue({ data: mockData });

      const result = await MovieService().getMovieBySearch('test', 1);

      expect(config.apiBase.get).toHaveBeenCalledWith('movie/search?page=1&limit=20&query=test');
      expect(result).toEqual(mockData);
    });
  });

  describe('getMovieById', () => {
    it('calls the correct endpoint', async () => {
      const mockData = { id: 123, name: 'Test Movie' };
      vi.mocked(config.apiBase.get).mockResolvedValue({ data: mockData });

      const result = await MovieService().getMovieById('123');

      expect(config.apiBase.get).toHaveBeenCalledWith('movie/123');
      expect(result).toEqual(mockData);
    });
  });

  describe('getMovieByGenre', () => {
    it('calls the correct endpoint', async () => {
      const mockData = { docs: [], total: 0, limit: 15, page: 1, pages: 0 };
      vi.mocked(config.apiBase.get).mockResolvedValue({ data: mockData });

      const result = await MovieService().getMovieByGenre('comedy', 1);

      expect(config.apiBase.get).toHaveBeenCalledWith(
        'movie?page=1&limit=15&notNullFields=name&genres.name=comedy',
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('getTopMovies', () => {
    it('calls the correct endpoint', async () => {
      const mockData = { docs: [] };
      vi.mocked(config.apiBaseNewVersion.get).mockResolvedValue({ data: mockData });

      const result = await MovieService().getTopMovies();

      expect(config.apiBaseNewVersion.get).toHaveBeenCalledWith('list/top250?limit=10');
      expect(result).toEqual(mockData);
    });
  });

  describe('getGenres', () => {
    it('calls the correct endpoint', async () => {
      const mockData = [{ name: 'comedy' }];
      vi.mocked(config.apiBaseOld.get).mockResolvedValue({ data: mockData });

      const result = await MovieService().getGenres();

      expect(config.apiBaseOld.get).toHaveBeenCalledWith(
        'movie/possible-values-by-field?field=genres.name',
      );
      expect(result).toEqual(mockData);
    });
  });
});
