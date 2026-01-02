import { getTranslations } from '../utils/i18n';

export function showVisualTrainingInfo(): void {
  const t = getTranslations();
  
  // Remove existing modal if present
  const existingModal = document.querySelector('.visual-training-modal-overlay');
  if (existingModal) {
    existingModal.remove();
  }
  
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'visual-training-modal-overlay modal-overlay';
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal visual-training-modal';
  modal.style.maxWidth = '800px';
  
  // Create header
  const header = document.createElement('div');
  header.className = 'modal-header';
  
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = t.visualTraining.title;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'modal-close';
  closeButton.innerHTML = '&times;';
  closeButton.setAttribute('aria-label', t.visualTraining.close);
  closeButton.addEventListener('click', () => closeModal());
  
  header.appendChild(title);
  header.appendChild(closeButton);
  
  // Create content
  const content = document.createElement('div');
  content.className = 'modal-content';
  
  // What is Visual Training
  const whatIsSection = createInfoSection(
    t.visualTraining.whatIs,
    t.visualTraining.whatIsContent
  );
  content.appendChild(whatIsSection);
  
  // Key Skills
  const keySkillsSection = createInfoSection(
    t.visualTraining.keySkills,
    '',
    t.visualTraining.keySkillsList
  );
  content.appendChild(keySkillsSection);
  
  // Matrix Training
  const matrixSection = createInfoSection(
    t.visualTraining.matrixTraining,
    t.visualTraining.matrixTrainingContent
  );
  content.appendChild(matrixSection);
  
  // Red-Green Glasses
  const redGreenSection = createInfoSection(
    t.visualTraining.redGreenGlasses,
    t.visualTraining.redGreenGlassesContent
  );
  content.appendChild(redGreenSection);
  
  // Applications
  const applicationsSection = createInfoSection(
    t.visualTraining.applications,
    '',
    t.visualTraining.applicationsList
  );
  content.appendChild(applicationsSection);
  
  // Create footer
  const footer = document.createElement('div');
  footer.className = 'modal-footer';
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn btn-primary';
  closeBtn.textContent = t.visualTraining.close;
  closeBtn.addEventListener('click', () => closeModal());
  
  footer.appendChild(closeBtn);
  
  // Assemble modal
  modal.appendChild(header);
  modal.appendChild(content);
  modal.appendChild(footer);
  overlay.appendChild(modal);
  
  // Add to body
  document.body.appendChild(overlay);
  
  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });
  
  // Close on Escape key
  const escapeHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escapeHandler);
    }
  };
  document.addEventListener('keydown', escapeHandler);
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
  
  // Focus close button for accessibility
  closeButton.focus();
}

function createInfoSection(title: string, content: string, list?: string[]): HTMLElement {
  const section = document.createElement('div');
  section.className = 'info-section';
  section.style.marginBottom = '2rem';
  
  const titleEl = document.createElement('h3');
  titleEl.textContent = title;
  titleEl.style.fontSize = '1.25rem';
  titleEl.style.fontWeight = '700';
  titleEl.style.marginBottom = '1rem';
  titleEl.style.color = 'var(--primary-color)';
  section.appendChild(titleEl);
  
  if (content) {
    const contentEl = document.createElement('p');
    contentEl.textContent = content;
    contentEl.style.marginBottom = '1rem';
    contentEl.style.lineHeight = '1.7';
    contentEl.style.color = 'var(--text-color)';
    section.appendChild(contentEl);
  }
  
  if (list && list.length > 0) {
    const listEl = document.createElement('ul');
    listEl.style.marginLeft = '1.5rem';
    listEl.style.marginBottom = '1rem';
    listEl.style.lineHeight = '1.8';
    
    list.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      li.style.marginBottom = '0.5rem';
      li.style.color = 'var(--text-color)';
      listEl.appendChild(li);
    });
    
    section.appendChild(listEl);
  }
  
  return section;
}

function closeModal(): void {
  const overlay = document.querySelector('.visual-training-modal-overlay');
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = '';
  }
}

export function updateVisualTrainingInfo(): void {
  const existingModal = document.querySelector('.visual-training-modal-overlay');
  if (existingModal) {
    showVisualTrainingInfo();
  }
}

