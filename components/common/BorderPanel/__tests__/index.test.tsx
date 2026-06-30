import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BorderPanel } from '../index';

describe('BorderPanel', () => {
  it('renders children', () => {
    render(
      <BorderPanel>
        <p>Content</p>
      </BorderPanel>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <BorderPanel title="Test Title">
        <p>Content</p>
      </BorderPanel>,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(
      <BorderPanel subTitle="Sub Title">
        <p>Content</p>
      </BorderPanel>,
    );
    expect(screen.getByText('Sub Title')).toBeInTheDocument();
  });

  it('does not render title when not provided', () => {
    render(
      <BorderPanel>
        <p>Content</p>
      </BorderPanel>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders without children', () => {
    render(<BorderPanel title="Only Title" />);
    expect(screen.getByText('Only Title')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <BorderPanel className="custom-class">
        <p>Content</p>
      </BorderPanel>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies custom classNameTitle', () => {
    render(
      <BorderPanel title="Title" classNameTitle="title-class">
        <p>Content</p>
      </BorderPanel>,
    );
    expect(screen.getByText('Title')).toHaveClass('title-class');
  });
});
