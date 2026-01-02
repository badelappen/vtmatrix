import { getTranslations } from '../utils/i18n';

type ModalType = 'imprint' | 'privacy' | 'cookies';

let currentModalType: ModalType | null = null;

export function showModal(type: ModalType): void {
  currentModalType = type;
  const t = getTranslations();
  
  // Remove existing modal if present
  const existingModal = document.querySelector('.modal-overlay');
  if (existingModal) {
    existingModal.remove();
  }
  
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  // Create header
  const header = document.createElement('div');
  header.className = 'modal-header';
  
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = t.legal[type].title;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'modal-close';
  closeButton.innerHTML = '&times;';
  closeButton.setAttribute('aria-label', t.legal.close);
  closeButton.addEventListener('click', () => closeModal());
  
  header.appendChild(title);
  header.appendChild(closeButton);
  
  // Create content
  const content = document.createElement('div');
  content.className = 'modal-content';
  
  // Split content by lines and create paragraphs
  const contentText = t.legal[type].content;
  const paragraphs = contentText.split('\n\n').filter(p => p.trim());
  
  paragraphs.forEach(paragraph => {
    const p = document.createElement('p');
    // Check if it's a heading (starts with number or is all caps)
    if (/^\d+\./.test(paragraph.trim()) || paragraph.trim().toUpperCase() === paragraph.trim()) {
      const heading = document.createElement('h3');
      heading.textContent = paragraph.trim();
      heading.style.marginTop = '20px';
      heading.style.marginBottom = '10px';
      heading.style.fontSize = '18px';
      heading.style.fontWeight = '600';
      content.appendChild(heading);
    } else {
      p.textContent = paragraph.trim();
      p.style.marginBottom = '15px';
      p.style.lineHeight = '1.6';
      content.appendChild(p);
    }
  });
  
  // Create footer
  const footer = document.createElement('div');
  footer.className = 'modal-footer';
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn btn-primary';
  closeBtn.textContent = t.legal.close;
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

function closeModal(): void {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = '';
    currentModalType = null;
  }
}

export function updateModal(): void {
  if (currentModalType) {
    showModal(currentModalType);
  }
}

