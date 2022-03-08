import { fireEvent, render, screen } from '@testing-library/react';
import Button from './';

it('Отображение кнопки', () => {
  render(<Button  />);
  const button = screen.getByRole('button')
  expect(button).toBeInTheDocument()
});

it('Клик по кнопке', () => {
  const textToReplace = 'Anti-pattern'
  const initialText = 'Clicking button test.'
  render(
    <Button
      onClick={() => {
        screen.getByText(initialText).innerHTML = textToReplace
      }}
    >
      {initialText}
    </Button>
  );
  const button = screen.getByText(initialText)

  fireEvent.click(button)
  expect(button).toHaveTextContent(textToReplace);
});