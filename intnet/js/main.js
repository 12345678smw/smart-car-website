/**
 * 智能小车官网交互脚本
 * 包含：轮播图、表单验证、图片弹窗、滚动效果、深色模式切换、导航菜单
 */

// DOM元素缓存
const dom = {
  navbar: document.getElementById('navbar'),
  mobileMenu: document.getElementById('mobile-menu'),
  menuToggle: document.getElementById('menu-toggle'),
  themeToggle: document.getElementById('theme-toggle'),
  carousel: document.getElementById('carousel'),
  carouselItems: document.querySelectorAll('.carousel-item'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
  dots: document.querySelectorAll('.dot'),
  contactForm: document.getElementById('contact-form'),
  imageModal: document.getElementById('image-modal'),
  modalImage: document.getElementById('modal-image'),
  closeModal: document.getElementById('close-modal'),
  faqItems: document.querySelectorAll('.faq-item')
};

/**
 * 导航栏滚动效果
 * 滚动时添加渐变背景和阴影
 */
function initNavbarScroll() {
  if (!dom.navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      dom.navbar.classList.add('bg-white/95', 'dark:bg-slate-900/95', 'shadow-md', 'backdrop-blur-sm');
      dom.navbar.classList.remove('bg-transparent');
    } else {
      dom.navbar.classList.remove('bg-white/95', 'dark:bg-slate-900/95', 'shadow-md', 'backdrop-blur-sm');
      dom.navbar.classList.add('bg-transparent');
    }
  });
}

/**
 * 移动端菜单切换
 */
function initMobileMenu() {
  if (!dom.menuToggle || !dom.mobileMenu) return;
  
  dom.menuToggle.addEventListener('click', () => {
    dom.mobileMenu.classList.toggle('hidden');
    dom.menuToggle.classList.toggle('rotate-90');
  });

  // 点击链接时关闭菜单
  const mobileLinks = dom.mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      dom.mobileMenu.classList.add('hidden');
      dom.menuToggle.classList.remove('rotate-90');
    });
  });
}

/**
 * 深色模式切换
 */
function initThemeToggle() {
  if (!dom.themeToggle) return;
  
  // 检查本地存储
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    updateThemeIcon(true);
  }
  
  dom.themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
  });
}

function updateThemeIcon(isDark) {
  if (!dom.themeToggle) return;
  dom.themeToggle.innerHTML = isDark 
    ? '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" /></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>';
}

/**
 * 轮播图功能
 */
function initCarousel() {
  if (!dom.carousel || dom.carouselItems.length === 0) return;
  
  let currentIndex = 0;
  const totalItems = dom.carouselItems.length;
  
  function showSlide(index) {
    // 确保索引在范围内
    currentIndex = (index + totalItems) % totalItems;
    
    // 隐藏所有轮播项
    dom.carouselItems.forEach(item => {
      item.classList.remove('opacity-100', 'z-10');
      item.classList.add('opacity-0', 'z-0');
    });
    
    // 显示当前轮播项
    dom.carouselItems[currentIndex].classList.remove('opacity-0', 'z-0');
    dom.carouselItems[currentIndex].classList.add('opacity-100', 'z-10');
    
    // 更新指示器
    dom.dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('bg-blue-600');
        dot.classList.remove('bg-white/50');
      } else {
        dot.classList.remove('bg-blue-600');
        dot.classList.add('bg-white/50');
      }
    });
  }
  
  // 下一张
  dom.nextBtn?.addEventListener('click', () => showSlide(currentIndex + 1));
  
  // 上一张
  dom.prevBtn?.addEventListener('click', () => showSlide(currentIndex - 1));
  
  // 点击指示器
  dom.dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => showSlide(idx));
  });
  
  // 自动播放
  setInterval(() => showSlide(currentIndex + 1), 5000);
}

/**
 * 表单验证
 */
function initFormValidation() {
  if (!dom.contactForm) return;
  
  dom.contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
      name: dom.contactForm.querySelector('#name').value.trim(),
      school: dom.contactForm.querySelector('#school').value.trim(),
      message: dom.contactForm.querySelector('#message').value.trim(),
      contact: dom.contactForm.querySelector('#contact').value.trim()
    };
    
    // 验证
    let isValid = true;
    const errors = [];
    
    if (!formData.name) {
      errors.push('请输入姓名');
      isValid = false;
    }
    
    if (!formData.school) {
      errors.push('请输入学校/单位');
      isValid = false;
    }
    
    if (!formData.message) {
      errors.push('请输入咨询内容');
      isValid = false;
    } else if (formData.message.length < 10) {
      errors.push('咨询内容至少需要10个字符');
      isValid = false;
    }
    
    if (!formData.contact) {
      errors.push('请输入联系方式');
      isValid = false;
    }
    
    if (isValid) {
      // 模拟提交成功
      showToast('留言提交成功！我们会尽快与您联系。');
      dom.contactForm.reset();
    } else {
      showToast(errors.join('\n'), true);
    }
  });
}

/**
 * Toast提示
 */
function showToast(message, isError = false) {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full ${
    isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
  }`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // 显示动画
  setTimeout(() => {
    toast.classList.remove('translate-x-full');
    toast.classList.add('translate-x-0');
  }, 10);
  
  // 自动隐藏
  setTimeout(() => {
    toast.classList.remove('translate-x-0');
    toast.classList.add('translate-x-full');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * 图片弹窗功能
 */
function initImageModal() {
  // 所有带 data-modal-src 属性的图片
  const modalImages = document.querySelectorAll('[data-modal-src]');
  
  modalImages.forEach(img => {
    img.addEventListener('click', () => {
      const src = img.getAttribute('data-modal-src');
      dom.modalImage.src = src;
      dom.modalImage.alt = img.alt;
      dom.imageModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // 关闭弹窗
  dom.closeModal?.addEventListener('click', closeModal);
  
  dom.imageModal?.addEventListener('click', (e) => {
    if (e.target === dom.imageModal) {
      closeModal();
    }
  });
  
  // ESC键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !dom.imageModal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

function closeModal() {
  dom.imageModal.classList.add('hidden');
  document.body.style.overflow = '';
}

/**
 * FAQ折叠面板
 */
function initFAQ() {
  dom.faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    
    header?.addEventListener('click', () => {
      // 关闭其他项
      dom.faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-content')?.classList.add('hidden');
        }
      });
      
      // 切换当前项
      item.classList.toggle('active');
      content.classList.toggle('hidden');
    });
  });
}

/**
 * 图片淡入加载效果
 */
function initImageFadeIn() {
  const images = document.querySelectorAll('img[data-fade-in]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  images.forEach(img => observer.observe(img));
}

/**
 * 页面加载完成后初始化所有功能
 */
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initThemeToggle();
  initCarousel();
  initFormValidation();
  initImageModal();
  initFAQ();
  initImageFadeIn();
  
  // 图片加载完成后触发淡入
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      img.classList.add('opacity-100');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('opacity-100');
      });
    }
  });
});
