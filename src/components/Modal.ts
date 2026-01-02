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
  
  // Build email address dynamically to avoid bot scraping
  const buildEmail = (): string => {
    const parts = ['vtmatrix', '@', 'asteroid-zone', '.', 'com'];
    return parts.join('');
  };
  
  // Split content by lines and create paragraphs
  let contentText = t.legal[type].content;
  const emailAddress = buildEmail();
  
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
      // Check if paragraph contains email placeholder
      if (paragraph.includes('{EMAIL_PLACEHOLDER}')) {
        // Split paragraph to handle email separately
        const parts = paragraph.split('{EMAIL_PLACEHOLDER}');
        p.style.marginBottom = '15px';
        p.style.lineHeight = '1.6';
        
        // Add text before email
        if (parts[0]) {
          p.appendChild(document.createTextNode(parts[0].trim()));
        }
        
        // Create email link (built dynamically, not in static text)
        const emailLink = document.createElement('a');
        emailLink.href = 'mailto:' + emailAddress;
        emailLink.textContent = emailAddress;
        emailLink.style.color = 'var(--primary-color)';
        emailLink.style.textDecoration = 'none';
        emailLink.style.fontWeight = '500';
        emailLink.addEventListener('mouseenter', () => {
          emailLink.style.textDecoration = 'underline';
        });
        emailLink.addEventListener('mouseleave', () => {
          emailLink.style.textDecoration = 'none';
        });
        p.appendChild(emailLink);
        
        // Add text after email
        if (parts[1]) {
          p.appendChild(document.createTextNode(parts[1].trim()));
        }
      } else {
        p.textContent = paragraph.trim();
        p.style.marginBottom = '15px';
        p.style.lineHeight = '1.6';
      }
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

