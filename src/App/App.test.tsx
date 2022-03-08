import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/rootStore';
import App from './';

test('Отображение приложения', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
