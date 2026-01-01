import './styles/main.css';
import { App } from './app';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    throw new Error('App-Container nicht gefunden!');
  }

  new App(appContainer);
});

