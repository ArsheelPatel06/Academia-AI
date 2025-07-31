// Academia AI - Education Management System

// Application Data
const appData = {
  // Sample users for authentication
  users: [
    {
      id: 1,
      name: "Admin User",
      email: "admin@academia.edu",
      password: "admin123",
      role: "admin",
      avatar: "A"
    },
    {
      id: 2,
      name: "Prof. Smith",
      email: "prof.smith@academia.edu",
      password: "teacher123",
      role: "teacher",
      avatar: "S"
    }
  ],

  // Sample attendance data
  attendanceData: [
    {
      id: 1,
      name: "Alex Johnson",
      studentId: "S123456",
      status: "present",
      lastAttendance: "May 12, 2023",
      avatar: "AJ"
    },
    {
      id: 2,
      name: "Maria Garcia",
      studentId: "S789012",
      status: "absent",
      lastAttendance: "May 12, 2023",
      avatar: "MG"
    },
    {
      id: 3,
      name: "James Wilson",
      studentId: "S345678",
      status: "late",
      lastAttendance: "May 12, 2023",
      avatar: "JW"
    },
    {
      id: 4,
      name: "Sarah Lee",
      studentId: "S901234",
      status: "pending",
      lastAttendance: "May 12, 2023",
      avatar: "SL"
    }
  ],

  // Sample schedule data
  scheduleData: [
    {
      id: 1,
      abbreviation: "DSJ",
      title: "Data Science Junior",
      professor: "Prof. Johnson",
      time: "9:00 AM - 10:30 AM",
      students: 32,
      room: "101",
      section: "A",
      status: "completed"
    },
    {
      id: 2,
      abbreviation: "PMC",
      title: "Probability & Math Computing",
      professor: "Prof. Williams",
      time: "11:00 AM - 12:30 PM",
      students: 28,
      room: "205",
      section: "B",
      status: "completed"
    },
    {
      id: 3,
      abbreviation: "DED",
      title: "Discrete Event Dynamics",
      professor: "Prof. Anderson",
      time: "1:30 PM - 3:00 PM",
      students: 45,
      room: "312",
      section: "C",
      status: "completed"
    },
    {
      id: 4,
      abbreviation: "PJW",
      title: "Project Workshop",
      professor: "Prof. Smith (You)",
      time: "4:00 PM - 5:30 PM",
      students: 18,
      room: "104",
      section: "D",
      status: "completed"
    },
    {
      id: 5,
      abbreviation: "MLD",
      title: "Machine Learning Design",
      professor: "Prof. Chen",
      time: "10:00 AM - 11:30 AM",
      students: 36,
      room: "215",
      section: "E",
      status: "completed"
    },
    {
      id: 6,
      abbreviation: "WBD",
      title: "Web Development Bootcamp",
      professor: "Prof. Rodriguez",
      time: "2:00 PM - 3:30 PM",
      students: 24,
      room: "107",
      section: "F",
      status: "completed"
    }
  ]
};

// Application State
let currentUser = null;
let currentPage = 'dashboard';

// DOM Elements
let loginPage, mainApp;
let loginForm, passwordToggle;
let navItems, pages;
let calendarDays, scheduleGrid, attendanceTableBody;

// Initialize Application
document.addEventListener('DOMContentLoaded', function () {
  console.log('Academia AI - Initializing...');

  initializeDOMElements();
  initializeEventListeners();
  checkAuthentication();

  console.log('Academia AI - Initialized successfully');
});

// Initialize DOM Elements
function initializeDOMElements() {
  loginPage = document.getElementById('loginPage');
  mainApp = document.getElementById('mainApp');
  loginForm = document.getElementById('loginForm');
  passwordToggle = document.getElementById('passwordToggle');
  navItems = document.querySelectorAll('.nav-item');
  pages = document.querySelectorAll('.page');
  calendarDays = document.getElementById('calendarDays');
  scheduleGrid = document.getElementById('scheduleGrid');
  attendanceTableBody = document.getElementById('attendanceTableBody');
}

// Initialize Event Listeners
function initializeEventListeners() {
  // Login form
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Password toggle
  if (passwordToggle) {
    passwordToggle.addEventListener('click', togglePasswordVisibility);
  }

  // Navigation
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const page = item.getAttribute('data-page');
      switchPage(page);
    });
  });

  // Sidebar actions
  const loginActionBtn = document.getElementById('loginActionBtn');
  const signOutBtn = document.getElementById('signOutBtn');

  if (loginActionBtn) {
    loginActionBtn.addEventListener('click', () => {
      if (currentUser) {
        showToast('Already logged in!', 'info');
      } else {
        showLoginPage();
      }
    });
  }

  if (signOutBtn) {
    signOutBtn.addEventListener('click', handleLogout);
  }

  // Demo credentials
  initializeDemoCredentials();

  // Attendance form
  const attendanceForm = document.querySelector('.attendance-form');
  if (attendanceForm) {
    attendanceForm.addEventListener('submit', handleAttendanceSubmit);
  }

  // Day buttons
  const dayButtons = document.querySelectorAll('.day-btn');
  dayButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dayButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Calendar navigation
  const calendarNavs = document.querySelectorAll('.calendar-nav');
  calendarNavs.forEach(nav => {
    nav.addEventListener('click', handleCalendarNavigation);
  });

  // Export button
  const exportBtn = document.querySelector('.export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', handleExport);
  }

  // Search functionality
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    input.addEventListener('input', handleSearch);
  });
}

// Authentication Functions
function checkAuthentication() {
  const savedUser = sessionStorage.getItem('academiaUser');
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      showMainApp();
    } catch (e) {
      console.error('Error restoring session:', e);
      showLoginPage();
    }
  } else {
    showLoginPage();
  }
}

function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // Find user
  const user = appData.users.find(u => u.email === email && u.password === password);

  if (user) {
    currentUser = user;

    if (rememberMe) {
      sessionStorage.setItem('academiaUser', JSON.stringify(user));
    }

    showToast(`Welcome back, ${user.name}!`, 'success');
    showMainApp();
  } else {
    showToast('Invalid email or password', 'error');
  }
}

function handleLogout() {
  currentUser = null;
  sessionStorage.removeItem('academiaUser');
  showToast('Logged out successfully', 'success');
  showLoginPage();
}

function showLoginPage() {
  loginPage.classList.remove('hidden');
  mainApp.classList.add('hidden');
  currentPage = 'login';
}

function showMainApp() {
  loginPage.classList.add('hidden');
  mainApp.classList.remove('hidden');
  updateUserInterface();
  switchPage('dashboard');
}

// UI Functions
function updateUserInterface() {
  if (!currentUser) return;

  // Update user name displays
  const userNameElements = ['userName', 'profileAvatar'];
  userNameElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = currentUser.avatar;
    }
  });

  // Update welcome greeting
  const welcomeGreeting = document.getElementById('welcomeGreeting');
  if (welcomeGreeting) {
    welcomeGreeting.textContent = `Welcome, ${currentUser.name.split(' ')[0]}!`;
  }

  // Update profile name
  const profileName = document.querySelector('.profile-name');
  if (profileName) {
    profileName.textContent = currentUser.name;
  }

  // Update schedule greeting
  const scheduleGreeting = document.getElementById('scheduleGreeting');
  if (scheduleGreeting) {
    const now = new Date();
    const hour = now.getHours();
    let greeting = 'Good morning';
    if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
    else if (hour >= 17) greeting = 'Good evening';

    scheduleGreeting.textContent = `${greeting}, ${currentUser.name}`;
  }

  // Update schedule date
  const scheduleDate = document.getElementById('scheduleDate');
  if (scheduleDate) {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    scheduleDate.textContent = now.toLocaleDateString('en-US', options);
  }
}

function switchPage(pageName) {
  // Update navigation
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-page') === pageName) {
      item.classList.add('active');
    }
  });

  // Update pages
  pages.forEach(page => {
    page.classList.remove('active');
    if (page.id === `${pageName}Page`) {
      page.classList.add('active');
    }
  });

  currentPage = pageName;

  // Initialize page-specific content
  switch (pageName) {
    case 'dashboard':
      initializeDashboard();
      break;
    case 'attendance':
      initializeAttendance();
      break;
    case 'classes':
      initializeSchedule();
      break;
    case 'calendar':
      initializeCalendar();
      break;
    case 'profile':
      // Profile page is static
      break;
  }
}

// Dashboard Functions
function initializeDashboard() {
  generateCalendar();
}

function generateCalendar() {
  if (!calendarDays) return;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  calendarDays.innerHTML = '';

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = date.getDate();

    if (date.getMonth() !== month) {
      dayElement.classList.add('other-month');
    }

    if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth()) {
      dayElement.classList.add('active');
    }

    calendarDays.appendChild(dayElement);
  }
}

// Attendance Functions
function initializeAttendance() {
  populateAttendanceTable();
}

function populateAttendanceTable() {
  if (!attendanceTableBody) return;

  attendanceTableBody.innerHTML = '';

  appData.attendanceData.forEach(student => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>
        <div class="student-info">
          <div class="student-avatar">${student.avatar}</div>
          <div>
            <div class="student-name">${student.name}</div>
            <div class="student-id">${student.studentId}</div>
          </div>
        </div>
      </td>
      <td>${student.studentId}</td>
      <td>
        <span class="status-badge ${student.status}">
          ${getStatusIcon(student.status)}
          ${student.status.charAt(0).toUpperCase() + student.status.slice(1)}
        </span>
      </td>
      <td>${student.lastAttendance}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn-small present" title="Mark Present">
            <i class="fas fa-check"></i>
          </button>
          <button class="action-btn-small absent" title="Mark Absent">
            <i class="fas fa-times"></i>
          </button>
          <button class="action-btn-small late" title="Mark Late">
            <i class="fas fa-clock"></i>
          </button>
        </div>
      </td>
    `;

    attendanceTableBody.appendChild(row);
  });
}

function getStatusIcon(status) {
  switch (status) {
    case 'present': return '<i class="fas fa-check"></i>';
    case 'absent': return '<i class="fas fa-times"></i>';
    case 'late': return '<i class="fas fa-clock"></i>';
    case 'pending': return '<i class="fas fa-question"></i>';
    default: return '';
  }
}

function handleAttendanceSubmit(event) {
  event.preventDefault();
  showToast('Attendance marked successfully!', 'success');
}

// Schedule Functions
function initializeSchedule() {
  populateScheduleGrid();
}

function populateScheduleGrid() {
  if (!scheduleGrid) return;

  scheduleGrid.innerHTML = '';

  appData.scheduleData.forEach(course => {
    const card = document.createElement('div');
    card.className = `schedule-card ${course.status}`;

    card.innerHTML = `
      <div class="course-header">
        <div class="course-abbreviation">${course.abbreviation}</div>
        <div class="course-info">
          <h4>${course.title}</h4>
          <p>${course.professor}</p>
        </div>
      </div>
      
      <div class="course-details">
        <div class="detail-item">
          <i class="fas fa-clock"></i>
          <span>${course.time}</span>
        </div>
        <div class="detail-item">
          <i class="fas fa-graduation-cap"></i>
          <span>${course.students}</span>
        </div>
        <div class="detail-item">
          <i class="fas fa-building"></i>
          <span>${course.room}</span>
        </div>
        <div class="detail-item">
          <i class="fas fa-desktop"></i>
          <span>${course.section}</span>
        </div>
      </div>
      
      <div class="course-actions">
        <button class="details-btn">
          <i class="fas fa-eye"></i>
          Details
        </button>
        <button class="join-btn primary">
          <i class="fas fa-video"></i>
          Join
        </button>
      </div>
    `;

    scheduleGrid.appendChild(card);
  });
}

// Calendar Functions
function initializeCalendar() {
  generateCalendar();
}

function handleCalendarNavigation(event) {
  const direction = event.currentTarget.querySelector('i').classList.contains('fa-chevron-left') ? 'prev' : 'next';
  showToast(`Navigating to ${direction === 'prev' ? 'previous' : 'next'} month`, 'info');
}

// Utility Functions
function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const icon = passwordToggle.querySelector('i');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    passwordInput.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

function initializeDemoCredentials() {
  const demoItems = document.querySelectorAll('.demo-item');
  demoItems.forEach(item => {
    item.addEventListener('click', function () {
      const text = this.textContent;
      const email = text.match(/[\w\.-]+@[\w\.-]+\.\w+/);
      const password = text.match(/\/\s*(\w+)/);

      if (email && password) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        if (emailInput) emailInput.value = email[0];
        if (passwordInput) passwordInput.value = password[1];

        showToast('Demo credentials filled in!', 'success');
      }
    });
  });
}

function handleExport() {
  showToast('Exporting attendance report...', 'info');
  setTimeout(() => {
    showToast('Report exported successfully!', 'success');
  }, 2000);
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  showToast(`Searching for: ${searchTerm}`, 'info');
}

// Toast Notifications
function showToast(message, type = 'info') {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-message">${message}</div>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;

  toastContainer.appendChild(toast);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, 3000);
}

// Add toast styles to head
const toastStyles = `
  .toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .toast {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: slideIn 0.3s ease-out;
  }

  .toast.success {
    border-left: 4px solid #10b981;
  }

  .toast.error {
    border-left: 4px solid #ef4444;
  }

  .toast.info {
    border-left: 4px solid #3b82f6;
  }

  .toast-message {
    font-size: 14px;
    color: #374151;
  }

  .toast-close {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: color 0.2s;
  }

  .toast-close:hover {
    color: #6b7280;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

if (!document.getElementById('toast-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'toast-styles';
  styleSheet.textContent = toastStyles;
  document.head.appendChild(styleSheet);
}

// Keyboard shortcuts
document.addEventListener('keydown', function (event) {
  if (event.altKey) {
    switch (event.key) {
      case '1':
        event.preventDefault();
        if (currentUser) switchPage('dashboard');
        break;
      case '2':
        event.preventDefault();
        if (currentUser) switchPage('attendance');
        break;
      case '3':
        event.preventDefault();
        if (currentUser) switchPage('classes');
        break;
      case '4':
        event.preventDefault();
        if (currentUser) switchPage('calendar');
        break;
      case '5':
        event.preventDefault();
        if (currentUser) switchPage('profile');
        break;
    }
  }

  if (event.key === 'Escape') {
    // Close any open modals or dropdowns
  }
});

// Handle window resize
window.addEventListener('resize', function () {
  // Handle responsive behavior
});

console.log('Academia AI - Education Management System loaded successfully');