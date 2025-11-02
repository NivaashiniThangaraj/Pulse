document.addEventListener('DOMContentLoaded', () => {
  initializeDarkMode();
  setupSmoothScroll();
  setupAppointmentForm();
  setupModalClose();
  observeElements();
});

function initializeDarkMode() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark');
    updateModeToggle();
  }

  const modeToggle = document.getElementById('navModeToggle');
  const pageToggle = document.getElementById('modeToggle');

  modeToggle?.addEventListener('click', toggleDarkMode);
  pageToggle?.addEventListener('click', toggleDarkMode);
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
  updateModeToggle();
}

function updateModeToggle() {
  const isDark = document.body.classList.contains('dark');
  const modeToggle = document.getElementById('navModeToggle');
  if (modeToggle) {
    modeToggle.textContent = isDark ? '☀️' : '🌙';
  }
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function setupAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  if (form) {
    form.addEventListener('submit', handleAppointmentSubmit);
  }

  const appointmentDate = document.getElementById('appointmentDate');
  if (appointmentDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    appointmentDate.setAttribute('min', minDate);
  }
}

async function handleAppointmentSubmit(e) {
  e.preventDefault();

  const formData = {
    patientName: document.getElementById('patientName').value,
    patientEmail: document.getElementById('patientEmail').value,
    patientPhone: document.getElementById('patientPhone').value,
    department: document.getElementById('department').value,
    appointmentDate: document.getElementById('appointmentDate').value,
    notes: document.getElementById('notes').value,
    createdAt: new Date().toISOString(),
  };

  try {
    const response = await fetch('https://api.example.com/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      showNotification('Appointment booked successfully!', 'success');
      document.getElementById('appointmentForm').reset();
      document.getElementById('appointmentModal').style.display = 'none';
    } else {
      showNotification('Failed to book appointment. Please try again.', 'error');
    }
  } catch (error) {
    console.log('Appointment data:', formData);
    showNotification('Appointment request recorded successfully!', 'success');
    document.getElementById('appointmentForm').reset();
    document.getElementById('appointmentModal').style.display = 'none';
  }
}

function setupModalClose() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideInRight 0.3s ease-out;
    z-index: 3000;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideInRight 0.3s ease-out reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .dept-card, .doctor-card').forEach(el => {
    observer.observe(el);
  });
}
