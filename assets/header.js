// Header dinámico según sección y scroll
class DynamicHeader {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.sections = document.querySelectorAll('section');
    this.lastScrollY = window.scrollY;
    this.ticking = false;
    
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.updateHeader();
  }

  onScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateHeader();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  updateHeader() {
    const currentScrollY = window.scrollY;
    const currentSection = this.getCurrentSection();
    
    // Eliminar todas las clases de estado
    this.header.classList.remove('scrolled', 'dark-section', 'light-section');
    
    // Aplicar clases según la sección actual
    if (currentSection) {
      const sectionType = this.getSectionType(currentSection);
      this.header.classList.add(sectionType);
    }
    
    // Aplicar clase scrolled si hay scroll
    if (currentScrollY > 50) {
      this.header.classList.add('scrolled');
    }
    
    this.lastScrollY = currentScrollY;
  }

  getCurrentSection() {
    const scrollPosition = window.scrollY + 100;
    
    for (let section of this.sections) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        return section;
      }
    }
    
    return null;
  }

  getSectionType(section) {
    // Detectar el tipo de sección según su clase o contenido
    if (section.classList.contains('hero-gallery') || 
        section.classList.contains('gallery') ||
        section.style.background?.includes('linear-gradient')) {
      return 'dark-section';
    }
    
    // Sección con fondo claro por defecto
    return 'light-section';
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new DynamicHeader();
});
