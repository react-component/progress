import React from 'react';
import { Circle, Line } from '../src';
import { render, waitFor } from '@testing-library/react';

describe('(Circle | Line).indeterminate', () => {
  describe('Line', () => {
    it('should render indeterminate style', () => {
      const { container, rerender } = render(<Line loading />);
      const line: HTMLElement = container.querySelector('.rc-progress-line-path');

      expect(line.style.animation).toContain('indeterminate-animate');

      rerender(<Line />);

      expect(line.style.animation).not.toContain('indeterminate-animate');
    });

    it('should render indeterminate with percent and rerennder without it', () => {
      const { container, rerender } = render(<Line percent={20} loading />);
      const line: HTMLElement = container.querySelector('.rc-progress-line-path');

      expect(line.style.animation).toContain('indeterminate-animate');
      expect(line.style.strokeDasharray).toEqual('20 100');

      rerender(<Line percent={20} />);

      expect(line.style.animation).not.toContain('indeterminate-animate');
      expect(line.style.strokeDasharray).not.toEqual('20 100');
    });
  });

  describe('Circle', () => {
    it('should render indeterminate style', () => {
      const { container, rerender } = render(<Circle loading />);
      const circle: HTMLElement = container.querySelector('.rc-progress-circle-path');

      expect(circle.style.animation).toContain('indeterminate-animate');

      rerender(<Circle />);

      expect(circle.style.animation).not.toContain('indeterminate-animate');
    });

    it('should rerender indeterminate with percent Circle', () => {
      const { container, rerender } = render(<Circle percent={20} loading />);
      const circle: HTMLElement = container.querySelector('.rc-progress-circle-path');

      expect(circle.style.animation).toContain('indeterminate-animate');
      expect(circle.style.transform).toEqual('rotate(0deg)');

      rerender(<Circle percent={20} />);

      expect(circle.style.animation).not.toContain('indeterminate-animate');
      expect(circle.style.transform).not.toEqual('rotate(0deg)');
    });
  });
});
