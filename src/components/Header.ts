import { getTranslations } from '../utils/i18n';

export function createHeader(): HTMLElement {
  const t = getTranslations();
  
  const header = document.createElement('header');
  header.className = 'app-header';
  
  const container = document.createElement('div');
  container.className = 'header-container';
  
  const title = document.createElement('h1');
  title.className = 'header-title';
  title.textContent = t.header.title;
  
  const description = document.createElement('p');
  description.className = 'header-description';
  description.textContent = t.header.description;
  
  container.appendChild(title);
  container.appendChild(description);
  header.appendChild(container);
  
  return header;
}

export function updateHeader(): void {
  const t = getTranslations();
  const header = document.querySelector('.app-header');
  if (header) {
    const title = header.querySelector('.header-title');
    const description = header.querySelector('.header-description');
    if (title) title.textContent = t.header.title;
    if (description) description.textContent = t.header.description;
  }
}

