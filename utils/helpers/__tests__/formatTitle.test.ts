import { describe, it, expect } from 'vitest';
import { formatTitle } from '../formatTitle';

describe('formatTitle', () => {
  it('capitalizes first letter and lowercases rest', () => {
    expect(formatTitle('hello')).toBe('Hello');
  });

  it('handles already capitalized string', () => {
    expect(formatTitle('Hello')).toBe('Hello');
  });

  it('handles all uppercase', () => {
    expect(formatTitle('HELLO')).toBe('Hello');
  });

  it('handles mixed case', () => {
    expect(formatTitle('hElLo')).toBe('Hello');
  });

  it('handles multiple words', () => {
    expect(formatTitle('hello world')).toBe('Hello world');
  });

  it('handles URL-encoded string', () => {
    expect(formatTitle('%D0%BA%D0%BE%D0%BC%D0%B5%D0%B4%D0%B8%D1%8F')).toBe('Комедия');
  });

  it('handles empty string', () => {
    expect(formatTitle('')).toBe('');
  });

  it('handles single character', () => {
    expect(formatTitle('a')).toBe('A');
  });
});
