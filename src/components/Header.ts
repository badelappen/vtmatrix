import { getTranslations } from '../utils/i18n';
import { showVisualTrainingInfo } from './VisualTrainingInfo';
import { createInfoIcon } from '../utils/icons';

export function createHeader(): HTMLElement {
  const t = getTranslations();
  
  const header = document.createElement('header');
  header.className = 'app-header';
  
  const container = document.createElement('div');
  container.className = 'header-container';
  
  const titleRow = document.createElement('div');
  titleRow.style.display = 'flex';
  titleRow.style.justifyContent = 'space-between';
  titleRow.style.alignItems = 'flex-start';
  titleRow.style.gap = '1rem';
  
  const titleSection = document.createElement('div');
  titleSection.style.flex = '1';
  
  const title = document.createElement('h1');
  title.className = 'header-title';
  title.textContent = t.header.title;
  
  const description = document.createElement('p');
  description.className = 'header-description';
  description.textContent = t.header.description;
  
  titleSection.appendChild(title);
  titleSection.appendChild(description);
  
  // Info Button
  const infoButton = document.createElement('button');
  infoButton.className = 'header-info-button';
  infoButton.type = 'button';
  const infoIcon = createInfoIcon();
  infoButton.appendChild(infoIcon);
  const infoText = document.createTextNode(t.header.learnMore);
  infoButton.appendChild(infoText);
  infoButton.addEventListener('click', () => {
    showVisualTrainingInfo();
  });
  
  titleRow.appendChild(titleSection);
  titleRow.appendChild(infoButton);
  
  container.appendChild(titleRow);
  header.appendChild(container);
  
  return header;
}

export function updateHeader(): void {
  const t = getTranslations();
  const header = document.querySelector('.app-header');
  if (header) {
    const title = header.querySelector('.header-title');
    const description = header.querySelector('.header-description');
    const infoButton = header.querySelector('.header-info-button');
    if (title) title.textContent = t.header.title;
    if (description) description.textContent = t.header.description;
    if (infoButton) {
      // Remove old content and add new
      infoButton.innerHTML = '';
      const infoIcon = createInfoIcon();
      infoButton.appendChild(infoIcon);
      const infoText = document.createTextNode(t.header.learnMore);
      infoButton.appendChild(infoText);
    }
  }
}

