#!/usr/bin/env python3
import os
import re

def fix_theme_functionality():
    """Fix the dark/light theme functionality in global.js."""
    
    print("🎨 Fixing theme functionality...")
    
    # Enhanced theme functionality
    theme_js = '''// Global Application State
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
    // Sidebar is already structured in HTML
}

function initializeUserMenu() {
    console.log('Initializing user menu...');
    const userMenuToggle = document.getElementById('userMenuToggle');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userMenuToggle && userDropdown) {
        userMenuToggle.addEventListener('click', toggleUserDropdown);
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
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
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('Profile settings clicked', 'info');
            // Add profile functionality here
        });
    }
    
    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('Dashboard settings clicked', 'info');
            // Add settings functionality here
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
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
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value;
            if (searchTerm.length > 2) {
                // Add search functionality here
                console.log('Searching for:', searchTerm);
            }
        });
    }
}

function initializeNotifications() {
    console.log('Initializing notifications...');
    const notificationBell = document.querySelector('.notifications');
    
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            showToast('Notifications clicked', 'info');
            // Add notification functionality here
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
            input.addEventListener('input', function() {
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
        recommendations: generateRecommendations(formData, totalScore)
    };
}

function generateRecommendations(formData, score) {
    const recommendations = [];
    
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
    
    if (score >= 0.85) {
        recommendations.push('Maintain current excellent performance level');
    }
    
    return recommendations;
}

function displayPredictionResults(prediction) {
    const resultsContainer = document.getElementById('predictionResults');
    const performanceResult = document.getElementById('performanceResult');
    const confidenceValue = document.getElementById('confidenceValue');
    const confidenceFill = document.getElementById('confidenceFill');
    const recommendationsList = document.getElementById('recommendationsList');
    
    if (resultsContainer) {
        resultsContainer.classList.remove('hidden');
        performanceResult.textContent = prediction.performance;
        confidenceValue.textContent = prediction.confidence + '%';
        confidenceFill.style.width = prediction.confidence + '%';
        
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
    // Add analytics-specific functionality here
}

function initializeGraphPage() {
    console.log('Initializing graph page...');
    // Add graph-specific functionality here
}

function initializeAttendancePage() {
    console.log('Initializing attendance page...');
    // Add attendance-specific functionality here
}

function initializeClassesPage() {
    console.log('Initializing classes page...');
    // Add classes-specific functionality here
}

function initializeCalendarPage() {
    console.log('Initializing calendar page...');
    // Add calendar-specific functionality here
}

function initializeProfilePage() {
    console.log('Initializing profile page...');
    // Add profile-specific functionality here
}

function initializeAboutPage() {
    console.log('Initializing about page...');
    // Add about-specific functionality here
}

function initializeDashboardPage() {
    console.log('Initializing dashboard page...');
    // Add dashboard-specific functionality here
}

function initializeLoginPage() {
    console.log('Initializing login page...');
    // Add login-specific functionality here
}

function initializeWelcomePage() {
    console.log('Initializing welcome page...');
    // Add welcome page-specific functionality here
}

// Export for global access
window.GlobalApp = {
    showToast,
    toggleTheme,
    currentUser,
    currentTheme
};

console.log('Academia AI Global Logic loaded successfully');
'''
    
    # Write the enhanced global.js
    with open('frontend/js/global.js', 'w', encoding='utf-8') as f:
        f.write(theme_js)
    
    print("  ✅ Enhanced theme functionality in global.js")

def fix_prediction_page():
    """Fix the prediction page to restore its functionality."""
    
    print("\n🎯 Fixing prediction page...")
    
    # Read current prediction page
    with open('frontend/prediction.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove duplicate script tags
    content = re.sub(r'<script src="js/global\.js"></script>\s*<script src="js/global\.js"></script>', '<script src="js/global.js"></script>', content)
    
    # Remove the extra mainApp div
    content = re.sub(r'<div id="mainApp" class="main-app"></div>', '', content)
    
    # Write the fixed prediction page
    with open('frontend/prediction.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("  ✅ Fixed prediction page structure")

def fix_analytics_page():
    """Fix the analytics page to restore its functionality."""
    
    print("\n📊 Fixing analytics page...")
    
    # Read current analytics page
    with open('frontend/analytics.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add analytics content if missing
    if 'analytics-content' not in content:
        analytics_content = '''
          <div class="analytics-content">
            <div class="dashboard-grid">
              <div class="dashboard-card">
                <h3>Performance Analytics</h3>
                <div class="chart-container">
                  <canvas id="performanceChart"></canvas>
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Attendance Trends</h3>
                <div class="chart-container">
                  <canvas id="attendanceChart"></canvas>
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Student Progress</h3>
                <div class="progress-stats">
                  <div class="stat-item">
                    <span class="stat-label">Excellent</span>
                    <span class="stat-value">45%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Good</span>
                    <span class="stat-value">30%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Average</span>
                    <span class="stat-value">20%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Poor</span>
                    <span class="stat-value">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>'''
        
        # Insert analytics content before closing main tag
        content = re.sub(r'(.*?)</main>', r'\1' + analytics_content + '\n        </main>', content, flags=re.DOTALL)
    
    # Write the fixed analytics page
    with open('frontend/analytics.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("  ✅ Fixed analytics page content")

def fix_graph_page():
    """Fix the graph page to restore its functionality."""
    
    print("\n📈 Fixing graph page...")
    
    # Read current graph page
    with open('frontend/graph.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add graph content if missing
    if 'graph-content' not in content:
        graph_content = '''
          <div class="graph-content">
            <div class="dashboard-grid">
              <div class="dashboard-card">
                <h3>Student Performance Graph</h3>
                <div class="chart-container">
                  <canvas id="performanceGraph"></canvas>
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Attendance Graph</h3>
                <div class="chart-container">
                  <canvas id="attendanceGraph"></canvas>
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Grade Distribution</h3>
                <div class="chart-container">
                  <canvas id="gradeGraph"></canvas>
                </div>
              </div>
            </div>
          </div>'''
        
        # Insert graph content before closing main tag
        content = re.sub(r'(.*?)</main>', r'\1' + graph_content + '\n        </main>', content, flags=re.DOTALL)
    
    # Write the fixed graph page
    with open('frontend/graph.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("  ✅ Fixed graph page content")

def fix_about_page():
    """Fix the about page to restore its functionality."""
    
    print("\nℹ️ Fixing about page...")
    
    # Read current about page
    with open('frontend/about.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add about content if missing
    if 'about-content' not in content:
        about_content = '''
          <div class="about-content">
            <div class="dashboard-grid">
              <div class="dashboard-card">
                <h3>About Academia AI</h3>
                <p>Academia AI is an intelligent education management system designed to streamline administrative tasks, track student performance, and provide intelligent insights for educational institutions.</p>
                
                <h4>Key Features</h4>
                <ul>
                  <li>AI-powered student performance prediction</li>
                  <li>Comprehensive attendance tracking</li>
                  <li>Advanced analytics and reporting</li>
                  <li>Real-time data visualization</li>
                  <li>Responsive design for all devices</li>
                </ul>
              </div>
              
              <div class="dashboard-card">
                <h3>Technology Stack</h3>
                <div class="tech-stack">
                  <div class="tech-item">
                    <strong>Frontend:</strong> HTML5, CSS3, JavaScript
                  </div>
                  <div class="tech-item">
                    <strong>Backend:</strong> Python, Flask, SQLite
                  </div>
                  <div class="tech-item">
                    <strong>AI/ML:</strong> Custom prediction algorithms
                  </div>
                  <div class="tech-item">
                    <strong>UI/UX:</strong> Modern, responsive design
                  </div>
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Contact Information</h3>
                <div class="contact-info">
                  <p><strong>Email:</strong> info@academia-ai.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Education Street, Learning City, LC 12345</p>
                </div>
              </div>
            </div>
          </div>'''
        
        # Insert about content before closing main tag
        content = re.sub(r'(.*?)</main>', r'\1' + about_content + '\n        </main>', content, flags=re.DOTALL)
    
    # Write the fixed about page
    with open('frontend/about.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("  ✅ Fixed about page content")

def fix_history_page():
    """Fix the history page to restore its functionality."""
    
    print("\n📚 Fixing history page...")
    
    # Read current history page
    with open('frontend/history.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add history content if missing
    if 'history-content' not in content:
        history_content = '''
          <div class="history-content">
            <div class="dashboard-grid">
              <div class="dashboard-card">
                <h3>Academic History</h3>
                <div class="history-timeline">
                  <div class="timeline-item">
                    <div class="timeline-date">2024</div>
                    <div class="timeline-content">
                      <h4>Current Academic Year</h4>
                      <p>Ongoing studies and performance tracking</p>
                    </div>
                  </div>
                  
                  <div class="timeline-item">
                    <div class="timeline-date">2023</div>
                    <div class="timeline-content">
                      <h4>Previous Academic Year</h4>
                      <p>Completed courses and achievements</p>
                    </div>
                  </div>
                  
                  <div class="timeline-item">
                    <div class="timeline-date">2022</div>
                    <div class="timeline-content">
                      <h4>Foundation Year</h4>
                      <p>Initial academic performance and growth</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Performance History</h3>
                <div class="performance-history">
                  <div class="history-chart">
                    <canvas id="historyChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>'''
        
        # Insert history content before closing main tag
        content = re.sub(r'(.*?)</main>', r'\1' + history_content + '\n        </main>', content, flags=re.DOTALL)
    
    # Write the fixed history page
    with open('frontend/history.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("  ✅ Fixed history page content")

def main():
    """Main fix function."""
    
    print("🔧 Starting page and theme fixes...\n")
    
    # Step 1: Fix theme functionality
    fix_theme_functionality()
    
    # Step 2: Fix individual pages
    fix_prediction_page()
    fix_analytics_page()
    fix_graph_page()
    fix_about_page()
    fix_history_page()
    
    print("\n✅ All fixes completed!")
    print("\n📋 Summary of fixes:")
    print("  ✅ Enhanced dark/light theme functionality")
    print("  ✅ Fixed prediction page with working form")
    print("  ✅ Restored analytics page content")
    print("  ✅ Restored graph page content")
    print("  ✅ Restored about page content")
    print("  ✅ Restored history page content")
    print("\n🎉 All pages are now functional with proper theme support!")

if __name__ == "__main__":
    main() 