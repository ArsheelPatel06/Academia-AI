// Immediate authentication check for all pages
(function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn");
    const currentPage = window.location.pathname.split('/').pop();

    // Skip authentication check for login and index pages
    if (currentPage !== 'login.html' && currentPage !== 'index.html' && currentPage !== '') {
        if (isLoggedIn !== "true") {
            window.location.href = "login.html";
            return;
        }
    }
})();

// Global Application State
let currentUser = null;
let currentTheme = 'light';
let isUserDropdownOpen = false;

// Default user data
const defaultUser = {
    name: "John Doe",
    email: "admin@university.edu",
    role: "admin",
    avatar: "J"
};

// Initialize global functionality
document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing Academia AI global components...');

    // Initialize user
    currentUser = JSON.parse(localStorage.getItem('currentUser')) || defaultUser;

    // Initialize theme
    initializeTheme();

    // Initialize global components
    initializeGlobalComponents();

    // Set active navigation based on current page
    setActiveNavigation();

    // Initialize page-specific functionality
    initializePageSpecificFeatures();

    console.log('Global components initialized successfully');
});

// Enhanced Theme Management
function initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentTheme = sessionStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);
}

function applyTheme(theme) {
    console.log('Applying theme:', theme);
    currentTheme = theme;
    document.body.setAttribute('data-color-scheme', theme);
    sessionStorage.setItem('theme', theme);

    // Update theme icon
    updateThemeIcon();

    // Update CSS variables for theme
    updateThemeColors();

    // Update component colors
    updateComponentColors();
}

function toggleTheme() {
    console.log('Toggling theme from:', currentTheme);
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);

    // Show toast notification
    showToast(`Switched to ${newTheme} mode`, 'success');
}

function updateThemeIcon() {
    const themeIcons = document.querySelectorAll('.theme-icon');
    themeIcons.forEach(icon => {
        icon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    });
}

function updateThemeColors() {
    const root = document.documentElement;
    if (currentTheme === 'dark') {
        // Dark mode colors
        root.style.setProperty('--color-background', '#1a1a1a');
        root.style.setProperty('--color-surface', '#2d2d2d');
        root.style.setProperty('--color-text', '#ffffff');
        root.style.setProperty('--color-text-secondary', '#b0b0b0');
        root.style.setProperty('--color-border', 'rgba(255, 255, 255, 0.1)');

        // Update specific component colors for dark mode
        root.style.setProperty('--primary-blue', '#4a90e2');
        root.style.setProperty('--primary-blue-light', '#5ba0f2');
        root.style.setProperty('--primary-blue-dark', '#357abd');
        root.style.setProperty('--accent-green', '#4caf50');
        root.style.setProperty('--accent-red', '#f44336');
        root.style.setProperty('--accent-orange', '#ff9800');
        root.style.setProperty('--accent-purple', '#9c27b0');
        root.style.setProperty('--accent-teal', '#009688');
        root.style.setProperty('--accent-cyan', '#00bcd4');
        root.style.setProperty('--gray-50', '#2d2d2d');
        root.style.setProperty('--gray-100', '#3d3d3d');
        root.style.setProperty('--gray-200', '#4d4d4d');
        root.style.setProperty('--gray-300', '#5d5d5d');
        root.style.setProperty('--gray-400', '#6d6d6d');
        root.style.setProperty('--gray-500', '#7d7d7d');
        root.style.setProperty('--gray-600', '#8d8d8d');
        root.style.setProperty('--gray-700', '#9d9d9d');
        root.style.setProperty('--gray-800', '#adadad');
        root.style.setProperty('--gray-900', '#bdbdbd');
        root.style.setProperty('--brand-dark-blue', '#4a90e2');
        root.style.setProperty('--brand-light-blue', '#5ba0f2');

        // Update body background
        document.body.style.backgroundColor = '#1a1a1a';
    } else {
        // Light mode colors - reset to defaults
        root.style.removeProperty('--color-background');
        root.style.removeProperty('--color-surface');
        root.style.removeProperty('--color-text');
        root.style.removeProperty('--color-text-secondary');
        root.style.removeProperty('--color-border');
        root.style.removeProperty('--primary-blue');
        root.style.removeProperty('--primary-blue-light');
        root.style.removeProperty('--primary-blue-dark');
        root.style.removeProperty('--accent-green');
        root.style.removeProperty('--accent-red');
        root.style.removeProperty('--accent-orange');
        root.style.removeProperty('--accent-purple');
        root.style.removeProperty('--accent-teal');
        root.style.removeProperty('--accent-cyan');
        root.style.removeProperty('--gray-50');
        root.style.removeProperty('--gray-100');
        root.style.removeProperty('--gray-200');
        root.style.removeProperty('--gray-300');
        root.style.removeProperty('--gray-400');
        root.style.removeProperty('--gray-500');
        root.style.removeProperty('--gray-600');
        root.style.removeProperty('--gray-700');
        root.style.removeProperty('--gray-800');
        root.style.removeProperty('--gray-900');
        root.style.removeProperty('--brand-dark-blue');
        root.style.removeProperty('--brand-light-blue');

        // Reset body background
        document.body.style.backgroundColor = '';
    }
}

function updateComponentColors() {
    // Update specific component styles for theme
    const cards = document.querySelectorAll('.dashboard-card, .card');
    const buttons = document.querySelectorAll('.btn');
    const navItems = document.querySelectorAll('.nav-item');
    const inputs = document.querySelectorAll('input, select, textarea');
    const forms = document.querySelectorAll('form');

    if (currentTheme === 'dark') {
        cards.forEach(card => {
            card.style.backgroundColor = 'var(--color-surface)';
            card.style.color = 'var(--color-text)';
        });

        buttons.forEach(btn => {
            if (!btn.classList.contains('btn--primary') && !btn.classList.contains('btn--secondary')) {
                btn.style.backgroundColor = 'var(--color-surface)';
                btn.style.color = 'var(--color-text)';
            }
        });

        navItems.forEach(item => {
            item.style.color = 'var(--color-text)';
        });

        inputs.forEach(input => {
            input.style.backgroundColor = 'var(--color-surface)';
            input.style.color = 'var(--color-text)';
            input.style.borderColor = 'var(--color-border)';
        });

        forms.forEach(form => {
            form.style.color = 'var(--color-text)';
        });
    } else {
        cards.forEach(card => {
            card.style.backgroundColor = '';
            card.style.color = '';
        });

        buttons.forEach(btn => {
            if (!btn.classList.contains('btn--primary') && !btn.classList.contains('btn--secondary')) {
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }
        });

        navItems.forEach(item => {
            item.style.color = '';
        });

        inputs.forEach(input => {
            input.style.backgroundColor = '';
            input.style.color = '';
            input.style.borderColor = '';
        });

        forms.forEach(form => {
            form.style.color = '';
        });
    }
}

// Global Components Initialization
function initializeGlobalComponents() {
    initializeHeader();
    initializeSidebar();
    initializeUserMenu();
    initializeThemeToggle();
    initializeSearchBar();
    initializeNotifications();
}

function initializeHeader() {
    console.log('Initializing header components...');
    updateUserInterface();
}

function initializeSidebar() {
    console.log('Initializing sidebar components...');
}

function initializeUserMenu() {
    console.log('Initializing user menu...');
    const userMenuToggle = document.getElementById('userMenuToggle');
    const userDropdown = document.getElementById('userDropdown');

    if (userMenuToggle && userDropdown) {
        userMenuToggle.addEventListener('click', toggleUserDropdown);

        // Close dropdown when clicking outside
        document.addEventListener('click', function (event) {
            if (!userMenuToggle.contains(event.target) && !userDropdown.contains(event.target)) {
                closeUserDropdown();
            }
        });

        // Initialize dropdown items
        initializeDropdownItems();
    }
}

function toggleUserDropdown() {
    const userDropdown = document.getElementById('userDropdown');
    const userMenuToggle = document.getElementById('userMenuToggle');

    if (userDropdown && userMenuToggle) {
        isUserDropdownOpen = !isUserDropdownOpen;

        if (isUserDropdownOpen) {
            userDropdown.classList.remove('hidden');
            userMenuToggle.classList.add('active');
        } else {
            userDropdown.classList.add('hidden');
            userMenuToggle.classList.remove('active');
        }
    }
}

function closeUserDropdown() {
    const userDropdown = document.getElementById('userDropdown');
    const userMenuToggle = document.getElementById('userMenuToggle');

    if (userDropdown && userMenuToggle) {
        userDropdown.classList.add('hidden');
        userMenuToggle.classList.remove('active');
        isUserDropdownOpen = false;
    }
}

function initializeDropdownItems() {
    // Profile button
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showToast('Profile settings clicked', 'info');
        });
    }

    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showToast('Dashboard settings clicked', 'info');
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handleSignOut();
        });
    }
}

function handleSignOut() {
    showToast('Signing out...', 'info');

    // Clear user data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');

    // Redirect to login page
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

function initializeThemeToggle() {
    console.log('Initializing theme toggle...');
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function updateUserInterface() {
    // Update user information in header
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const userDisplayName = document.getElementById('userDisplayName');
    const userEmail = document.getElementById('userEmail');

    if (currentUser) {
        if (userAvatar) userAvatar.textContent = currentUser.avatar;
        if (userName) userName.textContent = currentUser.name;
        if (userDisplayName) userDisplayName.textContent = currentUser.name;
        if (userEmail) userEmail.textContent = currentUser.email;
    }
}

function initializeSearchBar() {
    console.log('Initializing search bar...');
    const searchInput = document.querySelector('.search-bar input');

    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value;
            if (searchTerm.length > 2) {
                console.log('Searching for:', searchTerm);
            }
        });
    }
}

function initializeNotifications() {
    console.log('Initializing notifications...');
    const notificationBell = document.querySelector('.notifications');

    if (notificationBell) {
        notificationBell.addEventListener('click', function () {
            showToast('Notifications clicked', 'info');
        });
    }
}

function setActiveNavigation() {
    console.log('Setting active navigation...');
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Add active class to current page
    const currentNavItem = document.querySelector(`[href="${currentPage}"]`);
    if (currentNavItem) {
        currentNavItem.classList.add('active');
    }
}

// Toast Notifications
function showToast(message, type = 'info') {
    console.log(`Toast: ${message} (${type})`);

    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = createToastContainer();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add to container
    toastContainer.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Page-specific functionality
function initializePageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

    switch (currentPage) {
        case 'prediction.html':
            initializePredictionPage();
            break;
        case 'analytics.html':
            initializeAnalyticsPage();
            break;
        case 'graph.html':
            initializeGraphPage();
            break;
        case 'attendance.html':
            initializeAttendancePage();
            break;
        case 'classes.html':
            initializeClassesPage();
            break;
        case 'calendar.html':
            initializeCalendarPage();
            break;
        case 'profile.html':
            initializeProfilePage();
            break;
        case 'about.html':
            initializeAboutPage();
            break;
        case 'dashboard.html':
            initializeDashboardPage();
            break;
        case 'login.html':
            initializeLoginPage();
            break;
        case 'index.html':
            initializeWelcomePage();
            break;
        case 'history.html':
            initializeHistoryPage();
            break;
        default:
            console.log('No specific initialization for page:', currentPage);
    }
}

// Page-specific initializations
function initializePredictionPage() {
    console.log('Initializing prediction page...');

    // Initialize range inputs
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
        const valueDisplay = document.getElementById(input.id + 'Value');
        if (valueDisplay) {
            valueDisplay.textContent = input.value;
            input.addEventListener('input', function () {
                valueDisplay.textContent = this.value;
            });
        }
    });

    // Initialize prediction form
    const predictionForm = document.getElementById('predictionForm');
    if (predictionForm) {
        predictionForm.addEventListener('submit', handlePredictionSubmit);
    }
}

function handlePredictionSubmit(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('predictBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Show loading state
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;

    // Simulate prediction processing
    setTimeout(() => {
        // Collect form data
        const formData = {
            attendance: document.getElementById('attendance').value,
            testScores: document.getElementById('testScores').value,
            studyHours: document.getElementById('studyHours').value,
            activities: document.getElementById('activities').value,
            subject: document.getElementById('subject').value,
            support: document.querySelector('input[name="support"]:checked').value
        };

        // Generate prediction
        const prediction = generatePrediction(formData);

        // Display results
        displayPredictionResults(prediction);

        // Reset button state
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        submitBtn.disabled = false;

        showToast('Prediction completed successfully!', 'success');
    }, 2000);
}

function generatePrediction(formData) {
    // Simple prediction algorithm
    const attendanceScore = (formData.attendance / 100) * 0.35;
    const testScore = (formData.testScores / 100) * 0.28;
    const studyScore = (formData.studyHours / 40) * 0.20;
    const activityScore = formData.activities === 'Yes' ? 0.05 : 0.02;
    const supportScore = formData.support === 'High' ? 0.12 : (formData.support === 'Medium' ? 0.08 : 0.04);

    const totalScore = attendanceScore + testScore + studyScore + activityScore + supportScore;

    let performance = 'Poor';
    let confidence = Math.round(totalScore * 100);

    if (totalScore >= 0.85) {
        performance = 'Excellent';
    } else if (totalScore >= 0.70) {
        performance = 'Good';
    } else if (totalScore >= 0.50) {
        performance = 'Average';
    }

    return {
        performance,
        confidence,
        score: totalScore,
        subject: formData.subject,
        recommendations: generateRecommendations(formData, totalScore)
    };
}

function generateRecommendations(formData, score) {
    const recommendations = [];

    // General recommendations based on performance factors
    if (formData.attendance < 85) {
        recommendations.push('Improve attendance rate to enhance performance');
    }

    if (formData.testScores < 75) {
        recommendations.push('Focus on improving test scores through better study habits');
    }

    if (formData.studyHours < 20) {
        recommendations.push('Increase study hours to achieve better results');
    }

    if (formData.activities === 'No') {
        recommendations.push('Consider participating in extracurricular activities');
    }

    if (formData.support === 'Low') {
        recommendations.push('Seek additional parental support for academic success');
    }

    // Subject-specific recommendations
    const subjectRecommendations = getSubjectRecommendations(formData.subject, score);
    recommendations.push(...subjectRecommendations);

    if (score >= 0.85) {
        recommendations.push('Maintain current excellent performance level');
    }

    return recommendations;
}

function getSubjectRecommendations(subject, score) {
    const recommendations = [];

    switch (subject) {
        case 'Mathematics':
            recommendations.push('Practice problem-solving daily with varied difficulty levels');
            recommendations.push('Focus on understanding core concepts before advanced topics');
            recommendations.push('Use visual aids and diagrams for complex problems');
            if (score < 0.7) {
                recommendations.push('Consider joining a math study group or tutoring');
            }
            break;

        case 'Physics':
            recommendations.push('Strengthen mathematical foundation for physics concepts');
            recommendations.push('Practice with real-world applications and experiments');
            recommendations.push('Use simulation software for complex concepts');
            if (score < 0.7) {
                recommendations.push('Focus on understanding fundamental laws and principles');
            }
            break;

        case 'Chemistry':
            recommendations.push('Memorize periodic table and chemical formulas');
            recommendations.push('Practice balancing chemical equations regularly');
            recommendations.push('Understand molecular structures and bonding');
            if (score < 0.7) {
                recommendations.push('Use molecular model kits for better visualization');
            }
            break;

        case 'Biology':
            recommendations.push('Create detailed diagrams and flowcharts');
            recommendations.push('Focus on understanding biological processes');
            recommendations.push('Use mnemonic devices for complex terminology');
            if (score < 0.7) {
                recommendations.push('Consider field trips to enhance practical understanding');
            }
            break;

        case 'Computer Science':
            recommendations.push('Practice coding daily with different programming languages');
            recommendations.push('Work on personal projects to apply concepts');
            recommendations.push('Participate in coding competitions and hackathons');
            if (score < 0.7) {
                recommendations.push('Focus on understanding algorithms and data structures');
            }
            break;

        case 'English':
            recommendations.push('Read diverse literature to improve comprehension');
            recommendations.push('Practice writing essays with different styles');
            recommendations.push('Expand vocabulary through reading and writing');
            if (score < 0.7) {
                recommendations.push('Join a book club or writing workshop');
            }
            break;

        case 'History':
            recommendations.push('Create timelines and mind maps for historical events');
            recommendations.push('Connect historical events to current affairs');
            recommendations.push('Practice critical analysis of historical sources');
            if (score < 0.7) {
                recommendations.push('Watch historical documentaries for better context');
            }
            break;

        case 'Geography':
            recommendations.push('Use maps and atlases for spatial understanding');
            recommendations.push('Connect geographical features to human activities');
            recommendations.push('Study current events and their geographical impact');
            if (score < 0.7) {
                recommendations.push('Use interactive maps and virtual field trips');
            }
            break;

        case 'Economics':
            recommendations.push('Follow current economic news and trends');
            recommendations.push('Practice analyzing economic data and graphs');
            recommendations.push('Understand basic economic principles and models');
            if (score < 0.7) {
                recommendations.push('Use economic simulation games for better understanding');
            }
            break;

        case 'Literature':
            recommendations.push('Analyze different literary devices and techniques');
            recommendations.push('Practice creative writing and poetry');
            recommendations.push('Study various literary movements and authors');
            if (score < 0.7) {
                recommendations.push('Join a creative writing group or literary club');
            }
            break;

        default:
            recommendations.push('Focus on core concepts and regular practice');
            recommendations.push('Seek additional resources specific to your subject');
    }

    return recommendations;
}

function displayPredictionResults(prediction) {
    const resultsContainer = document.getElementById('predictionResults');
    const performanceResult = document.getElementById('performanceResult');
    const confidenceValue = document.getElementById('confidenceValue');
    const confidenceFill = document.getElementById('confidenceFill');
    const recommendationsList = document.getElementById('recommendationsList');
    const subjectInfo = document.getElementById('subjectInfo');

    if (resultsContainer) {
        resultsContainer.classList.remove('hidden');
        performanceResult.textContent = prediction.performance;
        confidenceValue.textContent = prediction.confidence + '%';
        confidenceFill.style.width = prediction.confidence + '%';

        // Update subject info
        if (subjectInfo && prediction.subject) {
            subjectInfo.textContent = `Subject: ${prediction.subject}`;
        }

        // Update recommendations
        recommendationsList.innerHTML = '';
        prediction.recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });

        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

function initializeAnalyticsPage() {
    console.log('Initializing analytics page...');

    // Initialize analytics charts after a short delay to ensure DOM is ready
    setTimeout(() => {
        initializeTrendsChart();
        initializeMetricsChart();
    }, 100);
}

function initializeGraphPage() {
    console.log('Initializing graph page...');

    // Initialize charts after a short delay to ensure DOM is ready
    setTimeout(() => {
        initializePerformanceChart();
        initializeFeatureChart();
        updateGraphMetrics();
        initializeChartControls();
    }, 100);
}

function initializePerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) {
        console.error('Performance chart canvas not found');
        return;
    }

    // Sample data for performance distribution
    const performanceData = {
        labels: ['Excellent', 'Good', 'Average', 'Poor'],
        datasets: [{
            label: 'Student Count',
            data: [28, 42, 22, 8],
            backgroundColor: [
                '#87CEEB',   // Light Blue for Excellent
                '#FFB347',   // Light Orange for Good
                '#CD853F',   // Reddish-Brown for Average
                '#F5DEB3'    // Light Cream for Poor
            ],
            borderColor: [
                '#000000',
                '#000000',
                '#000000',
                '#000000'
            ],
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
            hoverBorderWidth: 3,
            hoverBorderColor: '#ffffff',
            hoverBackgroundColor: [
                '#A8D8EA',
                '#FFC87C',
                '#D4A574',
                '#F7E7CE'
            ]
        }]
    };

    const performanceChart = new Chart(ctx, {
        type: 'doughnut',
        data: performanceData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 10,
                            weight: '500'
                        },
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderWidth: 2,
                    cornerRadius: 12,
                    displayColors: true,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} students (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1500,
                easing: 'easeOutQuart'
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });

    // Store chart reference for potential updates
    window.performanceChart = performanceChart;
}

function initializeTrendsChart() {
    const ctx = document.getElementById('trendsChart');
    if (!ctx) {
        console.error('Trends chart canvas not found');
        return;
    }

    // Sample data for performance trends based on the image
    const trendsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Excellent',
            data: [28, 30, 32, 34, 32, 25],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#4CAF50',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
        }, {
            label: 'Good',
            data: [42, 43, 44, 38, 40, 43],
            borderColor: '#2196F3',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#2196F3',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
        }, {
            label: 'Average',
            data: [23, 22, 21, 20, 22, 24],
            borderColor: '#FF9800',
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#FF9800',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
        }, {
            label: 'Poor',
            data: [7, 8, 9, 8, 6, 8],
            borderColor: '#F44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#F44336',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
        }]
    };

    const trendsChart = new Chart(ctx, {
        type: 'line',
        data: trendsData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 14,
                            weight: '600'
                        },
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    titleFont: {
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 12
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        font: {
                            size: 11,
                            weight: '500'
                        },
                        color: '#ffffff'
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 45,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        callback: function (value) {
                            return value;
                        },
                        font: {
                            size: 11,
                            weight: '500'
                        },
                        color: '#ffffff'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function initializeMetricsChart() {
    const ctx = document.getElementById('metricsChart');
    if (!ctx) {
        console.error('Metrics chart canvas not found');
        return;
    }

    // Sample data for model metrics - radar chart
    const metricsData = {
        labels: ['Accuracy', 'Precision', 'Recall', 'F1 Score'],
        datasets: [{
            label: 'Model Performance',
            data: [95, 87, 92, 89],
            backgroundColor: 'rgba(0, 150, 136, 0.3)',
            borderColor: 'rgba(0, 150, 136, 1)',
            borderWidth: 3,
            pointBackgroundColor: 'rgba(0, 150, 136, 1)',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
        }]
    };

    const metricsChart = new Chart(ctx, {
        type: 'radar',
        data: metricsData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            weight: '600'
                        },
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function (context) {
                            return context.parsed.r + '%';
                        }
                    },
                    titleFont: {
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 12
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        callback: function (value) {
                            return value + '%';
                        },
                        font: {
                            size: 11,
                            weight: '500'
                        },
                        color: '#ffffff',
                        backdropColor: 'transparent'
                    },
                    pointLabels: {
                        font: {
                            size: 12,
                            weight: '600'
                        },
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}



function initializeFeatureChart() {
    const ctx = document.getElementById('featureChart');
    if (!ctx) {
        console.error('Feature chart canvas not found');
        return;
    }

    // Sample data for feature importance
    const featureData = {
        labels: ['Attendance Rate', 'Study Hours', 'Previous Grades', 'Assignment Completion', 'Participation Score', 'Extra Activities'],
        datasets: [{
            label: 'Feature Importance',
            data: [28, 23, 19, 16, 7, 4],
            backgroundColor: [
                '#87CEEB',   // Light Blue
                '#FFB347',   // Light Orange
                '#CD853F',   // Reddish-Brown
                '#F5DEB3',   // Light Cream
                '#B0C4DE',   // Muted Blue-Gray
                '#FF6B6B'    // Red
            ],
            borderColor: [
                '#000000',
                '#000000',
                '#000000',
                '#000000',
                '#000000',
                '#000000'
            ],
            borderWidth: 1,
            borderRadius: 4,
            borderSkipped: false,
            hoverBorderWidth: 2,
            hoverBorderColor: '#ffffff',
            hoverBackgroundColor: [
                '#A8D8EA',
                '#FFC87C',
                '#D4A574',
                '#F7E7CE',
                '#C8D4E8',
                '#FF8A8A'
            ]
        }]
    };

    const featureChart = new Chart(ctx, {
        type: 'bar',
        data: featureData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    titleFont: {
                        size: 13,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 11
                    },
                    callbacks: {
                        label: function (context) {
                            return `${context.parsed.y}% importance`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 30,
                    ticks: {
                        callback: function (value) {
                            return value + '%';
                        },
                        font: {
                            size: 11,
                            weight: '600'
                        },
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text') || '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        lineWidth: 1
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 10,
                            weight: '500'
                        },
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text') || '#ffffff',
                        maxRotation: 0,
                        minRotation: 0
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });

    // Store chart reference for potential updates
    window.featureChart = featureChart;
}

function updateGraphMetrics() {
    // Update metric cards with real-time data
    const metrics = {
        accuracyValue: '89.2%',
        totalPredictions: '145',
        correctPredictions: '129',
        activeUsers: '47'
    };

    Object.keys(metrics).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = metrics[id];
        }
    });

    // Add animation to metric values
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach(value => {
        value.style.animation = 'fadeInUp 0.6s ease-out';
    });
}

function refreshGraphData() {
    console.log('Refreshing graph data...');

    // Simulate data refresh
    setTimeout(() => {
        if (window.performanceChart) {
            // Update performance chart with new data
            const newData = [Math.floor(Math.random() * 20) + 40,
            Math.floor(Math.random() * 20) + 60,
            Math.floor(Math.random() * 15) + 20,
            Math.floor(Math.random() * 10) + 5];

            window.performanceChart.data.datasets[0].data = newData;
            window.performanceChart.update('active');
        }

        if (window.featureChart) {
            // Update feature chart with new data
            const newFeatureData = [Math.floor(Math.random() * 10) + 30,
            Math.floor(Math.random() * 8) + 25,
            Math.floor(Math.random() * 6) + 18,
            Math.floor(Math.random() * 4) + 10,
            Math.floor(Math.random() * 3) + 3];

            window.featureChart.data.datasets[0].data = newFeatureData;
            window.featureChart.update('active');
        }

        // Update metrics
        updateGraphMetrics();

        if (window.GlobalApp && window.GlobalApp.showToast) {
            window.GlobalApp.showToast('Graph data refreshed successfully!', 'success');
        }
    }, 1000);
}

function exportGraphData() {
    console.log('Exporting graph data...');

    // Simulate data export
    const exportData = {
        performance: window.performanceChart ? window.performanceChart.data : null,
        features: window.featureChart ? window.featureChart.data : null,
        timestamp: new Date().toISOString()
    };

    // Create download link
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `graph-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (window.GlobalApp && window.GlobalApp.showToast) {
        window.GlobalApp.showToast('Graph data exported successfully!', 'success');
    }
}

// Add chart control functionality
function initializeChartControls() {
    // Add refresh button functionality
    const refreshBtn = document.querySelector('.chart-control-btn[data-action="refresh"]');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshGraphData);
    }

    // Add export button functionality
    const exportBtn = document.querySelector('.chart-control-btn[data-action="export"]');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportGraphData);
    }
}

function initializeAttendancePage() {
    console.log('Initializing attendance page...');

    // Populate attendance table with sample data
    populateAttendanceTable();

    // Initialize search functionality
    initializeAttendanceSearch();

    // Initialize filter functionality
    initializeAttendanceFilters();
}

function populateAttendanceTable() {
    const tableBody = document.getElementById('attendanceTableBody');
    if (!tableBody) return;

    const sampleData = [
        {
            name: 'Sarah Johnson',
            id: 'STU001',
            status: 'present',
            lastAttendance: 'Today, 9:15 AM',
            avatar: 'S'
        },
        {
            name: 'Michael Chen',
            id: 'STU002',
            status: 'present',
            lastAttendance: 'Today, 9:12 AM',
            avatar: 'M'
        },
        {
            name: 'Emily Rodriguez',
            id: 'STU003',
            status: 'late',
            lastAttendance: 'Today, 9:25 AM',
            avatar: 'E'
        },
        {
            name: 'David Kim',
            id: 'STU004',
            status: 'absent',
            lastAttendance: 'Yesterday, 9:10 AM',
            avatar: 'D'
        },
        {
            name: 'Jessica Williams',
            id: 'STU005',
            status: 'present',
            lastAttendance: 'Today, 9:08 AM',
            avatar: 'J'
        },
        {
            name: 'Alex Thompson',
            id: 'STU006',
            status: 'late',
            lastAttendance: 'Today, 9:22 AM',
            avatar: 'A'
        },
        {
            name: 'Maria Garcia',
            id: 'STU007',
            status: 'absent',
            lastAttendance: 'Yesterday, 9:05 AM',
            avatar: 'M'
        },
        {
            name: 'James Wilson',
            id: 'STU008',
            status: 'present',
            lastAttendance: 'Today, 9:14 AM',
            avatar: 'J'
        }
    ];

    tableBody.innerHTML = sampleData.map(student => `
        <tr>
            <td>
                <div class="student-info">
                    <div class="student-avatar">${student.avatar}</div>
                    <div>
                        <div class="student-name">${student.name}</div>
                        <div class="student-id">${student.id}</div>
                    </div>
                </div>
            </td>
            <td>${student.id}</td>
            <td>
                <span class="status-badge ${student.status}">
                    ${student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
            </td>
            <td>${student.lastAttendance}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn-small present" onclick="markAttendance('${student.id}', 'present')">
                        <i class="fas fa-check"></i> Present
                    </button>
                    <button class="action-btn-small absent" onclick="markAttendance('${student.id}', 'absent')">
                        <i class="fas fa-times"></i> Absent
                    </button>
                    <button class="action-btn-small late" onclick="markAttendance('${student.id}', 'late')">
                        <i class="fas fa-clock"></i> Late
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function markAttendance(studentId, status) {
    // Update the status badge
    const row = document.querySelector(`tr:has(td:contains('${studentId}'))`);
    if (row) {
        const statusCell = row.querySelector('.status-badge');
        if (statusCell) {
            statusCell.className = `status-badge ${status}`;
            statusCell.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        }
    }

    // Show success message
    showToast(`Attendance marked as ${status} for student ${studentId}`, 'success');
}

function initializeAttendanceSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#attendanceTableBody tr');

        rows.forEach(row => {
            const studentName = row.querySelector('.student-name').textContent.toLowerCase();
            const studentId = row.querySelector('.student-id').textContent.toLowerCase();

            if (studentName.includes(searchTerm) || studentId.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

function initializeAttendanceFilters() {
    const classFilter = document.getElementById('class-filter');
    const dateFilter = document.getElementById('date-filter');
    const statusFilter = document.getElementById('status-filter');

    if (classFilter) {
        classFilter.addEventListener('change', function () {
            // Handle class filter change
            showToast(`Filtered by class: ${this.value}`, 'info');
        });
    }

    if (dateFilter) {
        dateFilter.addEventListener('change', function () {
            // Handle date filter change
            showToast(`Filtered by date: ${this.value}`, 'info');
        });
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', function () {
            // Handle status filter change
            showToast(`Filtered by status: ${this.value}`, 'info');
        });
    }
}

// Classes Page Functions
function initializeClassesPage() {
    console.log('Initializing classes page...');

    // Populate classes grid
    populateClassesGrid();

    // Initialize modal functionality
    initializeClassModals();

    // Initialize tab functionality
    initializeTabs();

    // Initialize form handlers
    initializeFormHandlers();
}

function populateClassesGrid() {
    const classesGrid = document.getElementById('classesGrid');
    if (!classesGrid) return;

    const classesData = [
        {
            id: 'math101',
            subject: 'Mathematics',
            courseTitle: 'Calculus II - Derivatives and Integrals',
            professor: 'Professor Joe',
            time: '09:00 - 10:30',
            schedule: 'Mon/Wed',
            courseCode: 'MATH101',
            credits: 3,
            description: 'Advanced calculus concepts including derivatives, integrals, and their applications in real-world problems.',
            profEmail: 'joe@university.edu',
            profPhone: '+1 (555) 123-4567',
            profOffice: 'Science Building, Room 201',
            icon: '∑',
            type: 'math'
        },
        {
            id: 'physics201',
            subject: 'Physics',
            courseTitle: 'Mechanics - Forces and Motion',
            professor: 'Professor Smith',
            time: '11:00 - 12:30',
            schedule: 'Tue/Thu',
            courseCode: 'PHYS201',
            credits: 4,
            description: 'Study of classical mechanics, including Newton\'s laws, forces, motion, and energy conservation.',
            profEmail: 'smith@university.edu',
            profPhone: '+1 (555) 234-5678',
            profOffice: 'Physics Lab, Room 105',
            icon: '⚙️',
            type: 'physics'
        },
        {
            id: 'cs301',
            subject: 'Computer Science',
            courseTitle: 'Data Structures and Algorithms',
            professor: 'Professor Williams',
            time: '14:00 - 15:30',
            schedule: 'Mon/Wed',
            courseCode: 'CS301',
            credits: 3,
            description: 'Advanced data structures and algorithm analysis for efficient problem solving.',
            profEmail: 'williams@university.edu',
            profPhone: '+1 (555) 345-6789',
            profOffice: 'Computer Science Building, Room 302',
            icon: '💻',
            type: 'computer-science'
        },
        {
            id: 'eng401',
            subject: 'English Literature',
            courseTitle: 'Modern Poetry Analysis',
            professor: 'Professor Johnson',
            time: '09:00 - 10:30',
            schedule: 'Tue/Thu',
            courseCode: 'ENG401',
            credits: 3,
            description: 'Analysis of modern poetry and literary techniques from the 20th century.',
            profEmail: 'johnson@university.edu',
            profPhone: '+1 (555) 456-7890',
            profOffice: 'Humanities Building, Room 401',
            icon: '📚',
            type: 'english'
        },
        {
            id: 'hist301',
            subject: 'History',
            courseTitle: 'World War II - European Theater',
            professor: 'Professor Brown',
            time: '11:00 - 12:30',
            schedule: 'Mon/Wed',
            courseCode: 'HIST301',
            credits: 3,
            description: 'Comprehensive study of World War II focusing on the European theater and its global impact.',
            profEmail: 'brown@university.edu',
            profPhone: '+1 (555) 567-8901',
            profOffice: 'History Department, Room 205',
            icon: '🏛️',
            type: 'history'
        },
        {
            id: 'chem201',
            subject: 'Chemistry',
            courseTitle: 'Organic Chemistry Fundamentals',
            professor: 'Professor Davis',
            time: '14:00 - 15:30',
            schedule: 'Tue/Thu',
            courseCode: 'CHEM201',
            credits: 4,
            description: 'Introduction to organic chemistry, molecular structures, and chemical reactions.',
            profEmail: 'davis@university.edu',
            profPhone: '+1 (555) 678-9012',
            profOffice: 'Chemistry Lab, Room 103',
            icon: '🧪',
            type: 'chemistry'
        }
    ];

    classesGrid.innerHTML = classesData.map(cls => `
        <div class="class-card" data-class-id="${cls.id}">
            <div class="class-card-header">
                <div class="class-icon ${cls.type}">${cls.icon}</div>
                <div class="class-info">
                    <h3>${cls.subject}</h3>
                    <p>${cls.courseTitle}</p>
                    <p>${cls.professor}</p>
                </div>
            </div>
            <div class="class-details">
                <span class="class-time">${cls.time}</span>
                <div class="class-actions">
                    <button class="class-action-btn" onclick="openClassDetails('${cls.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="class-action-btn" onclick="markAttendance('${cls.id}')">
                        <i class="fas fa-check"></i> Attendance
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Store classes data globally for modal access
    window.classesData = classesData;
}

function openClassDetails(classId) {
    const classData = window.classesData.find(cls => cls.id === classId);
    if (!classData) return;

    // Update modal content
    document.getElementById('modalTitle').textContent = `${classData.subject} - ${classData.courseTitle}`;
    document.getElementById('modalSubject').textContent = classData.subject;
    document.getElementById('modalCourseCode').textContent = classData.courseCode;
    document.getElementById('modalCredits').textContent = classData.credits;
    document.getElementById('modalSchedule').textContent = `${classData.schedule} ${classData.time}`;
    document.getElementById('modalDescription').textContent = classData.description;

    // Professor info
    document.getElementById('modalProfAvatar').textContent = classData.professor.split(' ').pop().charAt(0);
    document.getElementById('modalProfName').textContent = classData.professor;
    document.getElementById('modalProfEmail').textContent = classData.profEmail;
    document.getElementById('modalProfPhone').textContent = classData.profPhone;
    document.getElementById('modalProfOffice').textContent = classData.profOffice;

    // Show modal
    document.getElementById('classModal').classList.remove('hidden');

    // Load attendance data
    loadAttendanceData(classId);

    // Load assignments
    loadAssignments(classId);

    // Load notes
    loadNotes(classId);
}

function initializeClassModals() {
    // Close modal functionality
    const modalClose = document.getElementById('modalClose');
    const assignmentModalClose = document.getElementById('assignmentModalClose');
    const noteModalClose = document.getElementById('noteModalClose');

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            document.getElementById('classModal').classList.add('hidden');
        });
    }

    if (assignmentModalClose) {
        assignmentModalClose.addEventListener('click', () => {
            document.getElementById('assignmentModal').classList.add('hidden');
        });
    }

    if (noteModalClose) {
        noteModalClose.addEventListener('click', () => {
            document.getElementById('noteModal').classList.add('hidden');
        });
    }

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
        }
    });
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            button.classList.add('active');
            document.getElementById(`${targetTab}Tab`).classList.add('active');
        });
    });
}

function initializeFormHandlers() {
    // Assignment form
    const assignmentForm = document.getElementById('assignmentForm');
    const addAssignmentBtn = document.getElementById('addAssignmentBtn');
    const cancelAssignment = document.getElementById('cancelAssignment');

    if (addAssignmentBtn) {
        addAssignmentBtn.addEventListener('click', () => {
            document.getElementById('assignmentModal').classList.remove('hidden');
        });
    }

    if (cancelAssignment) {
        cancelAssignment.addEventListener('click', () => {
            document.getElementById('assignmentModal').classList.add('hidden');
            assignmentForm.reset();
        });
    }

    if (assignmentForm) {
        assignmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addAssignment();
        });
    }

    // Note form
    const noteForm = document.getElementById('noteForm');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const cancelNote = document.getElementById('cancelNote');

    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', () => {
            document.getElementById('noteModal').classList.remove('hidden');
        });
    }

    if (cancelNote) {
        cancelNote.addEventListener('click', () => {
            document.getElementById('noteModal').classList.add('hidden');
            noteForm.reset();
        });
    }

    if (noteForm) {
        noteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addNote();
        });
    }
}

function loadAttendanceData(classId) {
    // Simulate loading attendance data
    const attendanceData = [
        { name: 'Sarah Johnson', id: 'STU001', status: 'present', time: '09:15' },
        { name: 'Michael Chen', id: 'STU002', status: 'present', time: '09:12' },
        { name: 'Emily Rodriguez', id: 'STU003', status: 'late', time: '09:25' },
        { name: 'David Kim', id: 'STU004', status: 'absent', time: '-' },
        { name: 'Jessica Williams', id: 'STU005', status: 'present', time: '09:08' }
    ];

    const tableBody = document.getElementById('attendanceTableBody');
    if (tableBody) {
        tableBody.innerHTML = attendanceData.map(student => `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>
                    <span class="status-badge ${student.status}">
                        ${student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                </td>
                <td>${student.time}</td>
                <td>
                    <button class="action-btn-small present" onclick="markStudentAttendance('${student.id}', 'present')">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="action-btn-small absent" onclick="markStudentAttendance('${student.id}', 'absent')">
                        <i class="fas fa-times"></i>
                    </button>
                    <button class="action-btn-small late" onclick="markStudentAttendance('${student.id}', 'late')">
                        <i class="fas fa-clock"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Update stats
    document.getElementById('totalStudents').textContent = '25';
    document.getElementById('presentToday').textContent = '20';
    document.getElementById('absentToday').textContent = '3';
    document.getElementById('lateToday').textContent = '2';
}

function loadAssignments(classId) {
    const assignmentsList = document.getElementById('assignmentsList');
    if (!assignmentsList) return;

    const assignments = [
        {
            title: 'Calculus Problem Set 1',
            description: 'Complete problems 1-15 from Chapter 3',
            dueDate: '2024-01-15',
            points: 50
        },
        {
            title: 'Midterm Exam',
            description: 'Comprehensive exam covering chapters 1-5',
            dueDate: '2024-01-25',
            points: 100
        }
    ];

    assignmentsList.innerHTML = assignments.map(assignment => `
        <div class="assignment-item">
            <div class="assignment-header">
                <div class="assignment-title">${assignment.title}</div>
                <div class="assignment-due">Due: ${assignment.dueDate}</div>
            </div>
            <div class="assignment-description">${assignment.description}</div>
            <div class="assignment-meta">
                <span>Points: ${assignment.points}</span>
                <span>Status: Active</span>
            </div>
        </div>
    `).join('');
}

function loadNotes(classId) {
    const notesList = document.getElementById('notesList');
    if (!notesList) return;

    const notes = [
        {
            title: 'Derivative Rules Review',
            content: 'Important to remember the chain rule and product rule for next class.',
            type: 'lecture',
            date: '2024-01-10'
        },
        {
            title: 'Office Hours Reminder',
            content: 'Office hours moved to Tuesday 2-4 PM this week.',
            type: 'reminder',
            date: '2024-01-08'
        }
    ];

    notesList.innerHTML = notes.map(note => `
        <div class="note-item">
            <div class="note-header">
                <div class="note-title">${note.title}</div>
                <span class="note-type ${note.type}">${note.type}</span>
            </div>
            <div class="note-content">${note.content}</div>
            <div class="note-date">${note.date}</div>
        </div>
    `).join('');
}

function addAssignment() {
    const title = document.getElementById('assignmentTitle').value;
    const description = document.getElementById('assignmentDescription').value;
    const dueDate = document.getElementById('assignmentDueDate').value;
    const points = document.getElementById('assignmentPoints').value;

    if (!title || !description || !dueDate || !points) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    // Add assignment to the list
    const assignmentsList = document.getElementById('assignmentsList');
    const assignmentHtml = `
        <div class="assignment-item">
            <div class="assignment-header">
                <div class="assignment-title">${title}</div>
                <div class="assignment-due">Due: ${dueDate}</div>
            </div>
            <div class="assignment-description">${description}</div>
            <div class="assignment-meta">
                <span>Points: ${points}</span>
                <span>Status: Active</span>
            </div>
        </div>
    `;

    assignmentsList.insertAdjacentHTML('afterbegin', assignmentHtml);

    // Close modal and reset form
    document.getElementById('assignmentModal').classList.add('hidden');
    document.getElementById('assignmentForm').reset();

    showToast('Assignment added successfully', 'success');
}

function addNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const type = document.getElementById('noteType').value;

    if (!title || !content || !type) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    // Add note to the list
    const notesList = document.getElementById('notesList');
    const noteHtml = `
        <div class="note-item">
            <div class="note-header">
                <div class="note-title">${title}</div>
                <span class="note-type ${type}">${type}</span>
            </div>
            <div class="note-content">${content}</div>
            <div class="note-date">${new Date().toISOString().split('T')[0]}</div>
        </div>
    `;

    notesList.insertAdjacentHTML('afterbegin', noteHtml);

    // Close modal and reset form
    document.getElementById('noteModal').classList.add('hidden');
    document.getElementById('noteForm').reset();

    showToast('Note added successfully', 'success');
}

function markStudentAttendance(studentId, status) {
    showToast(`Attendance marked as ${status} for student ${studentId}`, 'success');
}

function markAttendance(classId) {
    openClassDetails(classId);
    // Switch to attendance tab
    document.querySelector('[data-tab="attendance"]').click();
}



function initializeCalendarPage() {
    console.log('Initializing calendar page...');
}

function initializeProfilePage() {
    console.log('Initializing profile page...');
}

function initializeAboutPage() {
    console.log('Initializing about page...');
}

function initializeDashboardPage() {
    console.log('Initializing dashboard page...');
}

function initializeLoginPage() {
    console.log('Initializing login page...');
}

function initializeWelcomePage() {
    console.log('Initializing welcome page...');
}

function initializeHistoryPage() {
    console.log('Initializing history page...');

    // Initialize search functionality
    const searchInput = document.getElementById('historySearch');
    const filterSelect = document.getElementById('historyFilter');
    const tableBody = document.getElementById('historyTableBody');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            filterHistoryData();
        });
    }

    if (filterSelect) {
        filterSelect.addEventListener('change', function () {
            filterHistoryData();
        });
    }

    // Initialize action buttons
    initializeHistoryActionButtons();

    // Load initial data
    loadHistoryData();
}

function filterHistoryData() {
    const searchTerm = document.getElementById('historySearch')?.value.toLowerCase() || '';
    const filterValue = document.getElementById('historyFilter')?.value || '';
    const tableBody = document.getElementById('historyTableBody');

    if (!tableBody) return;

    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const studentData = row.querySelector('.history-student-info')?.textContent.toLowerCase() || '';
        const prediction = row.querySelector('.history-prediction-badge')?.textContent || '';
        const date = row.querySelector('.history-date')?.textContent.toLowerCase() || '';

        const matchesSearch = studentData.includes(searchTerm) || date.includes(searchTerm);
        const matchesFilter = !filterValue || prediction === filterValue;

        if (matchesSearch && matchesFilter) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    // Show empty state if no results
    const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');
    showEmptyState(visibleRows.length === 0);
}

function showEmptyState(isEmpty) {
    let emptyState = document.querySelector('.history-empty');

    if (isEmpty && !emptyState) {
        emptyState = document.createElement('div');
        emptyState.className = 'history-empty';
        emptyState.innerHTML = `
            <div class="history-empty-icon">📊</div>
            <h3>No predictions found</h3>
            <p>Try adjusting your search criteria or filters</p>
        `;

        const tableContainer = document.querySelector('.history-table');
        if (tableContainer) {
            tableContainer.appendChild(emptyState);
        }
    } else if (!isEmpty && emptyState) {
        emptyState.remove();
    }
}

function initializeHistoryActionButtons() {
    // Add event listeners to all action buttons
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('history-action-btn')) {
            const action = e.target.classList.contains('view') ? 'view' : 'delete';
            const row = e.target.closest('tr');

            if (action === 'view') {
                viewPredictionDetails(row);
            } else if (action === 'delete') {
                deletePrediction(row);
            }
        }
    });
}

function viewPredictionDetails(row) {
    const studentInfo = row.querySelector('.history-student-info')?.textContent || '';
    const prediction = row.querySelector('.history-prediction-badge')?.textContent || '';
    const confidence = row.querySelector('.history-confidence')?.textContent || '';
    const date = row.querySelector('.history-date')?.textContent || '';

    // Show prediction details in a modal or toast
    const details = `
        Date: ${date}
        Student: ${studentInfo}
        Prediction: ${prediction}
        Confidence: ${confidence}
    `;

    if (window.GlobalApp && window.GlobalApp.showToast) {
        window.GlobalApp.showToast(`Viewing prediction details: ${prediction}`, 'info');
    }

    console.log('Viewing prediction details:', details);
}

function deletePrediction(row) {
    const prediction = row.querySelector('.history-prediction-badge')?.textContent || '';

    // Show confirmation dialog
    if (confirm(`Are you sure you want to delete this ${prediction} prediction?`)) {
        // Remove the row with animation
        row.style.transition = 'opacity 0.3s ease-out';
        row.style.opacity = '0';

        setTimeout(() => {
            row.remove();

            // Check if table is empty
            const remainingRows = document.querySelectorAll('#historyTableBody tr');
            if (remainingRows.length === 0) {
                showEmptyState(true);
            }

            if (window.GlobalApp && window.GlobalApp.showToast) {
                window.GlobalApp.showToast(`Deleted ${prediction} prediction`, 'success');
            }
        }, 300);
    }
}

function loadHistoryData() {
    // Simulate loading data
    console.log('Loading history data...');

    // In a real application, this would fetch data from an API
    // For now, we'll just initialize the existing data
    const tableBody = document.getElementById('historyTableBody');
    if (tableBody && tableBody.children.length > 0) {
        console.log('History data loaded successfully');
    }
}

// Export for global access
window.GlobalApp = {
    showToast,
    toggleTheme,
    currentUser,
    currentTheme
};

console.log('Academia AI Global Logic loaded successfully');
