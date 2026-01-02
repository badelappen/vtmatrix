import { getTranslations } from '../utils/i18n';
import { showModal } from './Modal';

export function createFooter(): HTMLElement {
  const t = getTranslations();
  
  const footer = document.createElement('footer');
  footer.className = 'app-footer';
  
  const container = document.createElement('div');
  container.className = 'footer-container';
  
  // Links Section
  const linksSection = document.createElement('div');
  linksSection.className = 'footer-links';
  
  const imprintLink = createFooterLink('imprint', t.footer.imprint);
  const privacyLink = createFooterLink('privacy', t.footer.privacy);
  const cookiesLink = createFooterLink('cookies', t.footer.cookies);
  
  linksSection.appendChild(imprintLink);
  linksSection.appendChild(privacyLink);
  linksSection.appendChild(cookiesLink);
  
  // Copyright Section
  const copyrightSection = document.createElement('div');
  copyrightSection.className = 'footer-copyright';
  copyrightSection.textContent = t.footer.copyright;
  
  container.appendChild(linksSection);
  container.appendChild(copyrightSection);
  footer.appendChild(container);
  
  return footer;
}

function createFooterLink(type: 'imprint' | 'privacy' | 'cookies', text: string): HTMLElement {
  const link = document.createElement('a');
  link.href = '#';
  link.textContent = text;
  link.className = 'footer-link';
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(type);
  });
  return link;
}

export function updateFooter(): void {
  const t = getTranslations();
  const footer = document.querySelector('.app-footer');
  if (footer) {
    const links = footer.querySelectorAll('.footer-link');
    const copyright = footer.querySelector('.footer-copyright');
    
    if (links.length >= 3) {
      links[0].textContent = t.footer.imprint;
      links[1].textContent = t.footer.privacy;
      links[2].textContent = t.footer.cookies;
    }
    if (copyright) {
      copyright.textContent = t.footer.copyright;
    }
  }
}

