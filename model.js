// Application Data and State Management
const appData = {
  // Sample user for display purposes
  defaultUser: {
      id: 1,
      name: "John Doe",
      email: "admin@university.edu",
      role: "admin"
  },
  // Model information from provided data
  modelInfo: {
    accuracy: 89.2,
    precision: 87.6,
    recall: 90.1,
    features: ["Attendance", "Test Scores", "Study Hours", "Activities", "Support"]
  },
  // Sample predictions from provided data
  samplePredictions: [
    {
      id: 1,
      studentData: { attendance: 95, testScores: 88, studyHours: 25, activities: "Yes", support: "High" },
      prediction: "Excellent",
      confidence: 0.94,
      date: "2025-01-20"
    },
    {
      id: 2,
      studentData: { attendance: 78, testScores: 72, studyHours: 15, activities: "No", support: "Medium" },
      prediction: "Good",
      confidence: 0.82,
      date: "2025-01-19"
    },
    {
      id: 3,
      studentData: { attendance: 65, testScores: 55, studyHours: 8, activities: "No", support: "Low" },
      prediction: "Average",
      confidence: 0.76,
      date: "2025-01-18"
    }
  ],
  // Analytics data from provided data
  analytics: {
    totalPredictions: 145,
    averageConfidence: 0.84,
    performanceDistribution: { "Excellent": 32, "Good": 56, "Average": 42, "Poor": 15 },
    featureImportance: { "Attendance": 0.35, "Test Scores": 0.28, "Study Hours": 0.20, "Parental Support": 0.12, "Activities": 0.05 }
  },
  // Recommendations from provided data
  recommendations: {
    "Excellent": "Student shows exceptional performance! Continue current study habits and consider advanced coursework.",
    "Good": "Strong performance with room for improvement. Focus on consistent attendance and study schedules.",
    "Average": "Adequate performance. Increase study hours and seek additional support when needed.",
    "Poor": "Immediate intervention recommended. Consider tutoring, improved attendance, and enhanced parental support."
  }
};

// Application State
let currentUser = null;
let currentTheme = 'light';
let charts = {};
let predictionHistory = [];

// DOM Elements (will be populated based on the current page)
const DOMElements = {};

// Main Initializer
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing ML Dashboard...');
  try {
    initializeSharedComponents();

    const pageId = document.body.getAttribute('data-page-id');
    console.log("Detected page:", pageId);

    switch (pageId) {
        case 'overview':
            initializeOverviewPage();
            break;
        case 'prediction':
            initializePredictionPage();
            break;
        case 'analytics':
            initializeAnalyticsPage();
            break;
        case 'history':
            initializeHistoryPage();
            break;
        case 'about':
            // No page-specific JS needed for the about page
            break;
        default:
            console.warn("No specific page ID found. Running default initializations.");
            initializeOverviewPage(); // Fallback to overview
    }

    console.log('ML Dashboard initialization complete for page:', pageId);
  } catch (error) {
    console.error('Initialization error:', error);
    showToast('Application initialization failed', 'error');
  }
});

// INITIALIZATION FUNCTIONS

function initializeSharedComponents() {
    // Populate DOMElements with elements that exist on the current page
    populateDOMElements();
    
    // Set default user
    currentUser = appData.defaultUser;

    // Initialize common features
    initializeTheme();
    initializeUserMenu();
    updateUserInterface();
    initializeKeyboardShortcuts();
}

function initializeOverviewPage() {
    console.log('Initializing Overview Page...');
    updateDashboardStats();
    initializePerformanceChart();
    initializeFeatureChart();
    initializeRecentPredictions();
}

function initializePredictionPage() {
    console.log('Initializing Prediction Page...');
    initializePredictionForm();
}

function initializeAnalyticsPage() {
    console.log('Initializing Analytics Page...');
    initializeAnalyticsCharts();
}

function initializeHistoryPage() {
    console.log('Initializing History Page...');
    initializeHistory();
}


// HELPER FUNCTIONS

function populateDOMElements() {
    const elementIds = [
        'appContainer', 'userMenuToggle', 'userDropdown', 'themeToggleHeader',
        'predictionForm', 'predictBtn', 'predictionResults', 'historySearch', 
        'historyFilter', 'historyTableBody', 'performanceChart', 'featureChart',
        'trendsChart', 'metricsChart', 'predictionsGrid'
    ];
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            DOMElements[id] = element;
        }
    });
}

function initializeUserMenu() {
  if (DOMElements.userMenuToggle) {
    DOMElements.userMenuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleUserDropdown();
    });
  }
  
  document.addEventListener('click', function(e) {
    if (DOMElements.userDropdown && !DOMElements.userDropdown.contains(e.target)) {
      closeUserDropdown();
    }
  });
}

function toggleUserDropdown() {
  if (!DOMElements.userDropdown || !DOMElements.userMenuToggle) return;
  
  const isHidden = DOMElements.userDropdown.classList.contains('hidden');
  
  if (isHidden) {
    DOMElements.userDropdown.classList.remove('hidden');
    DOMElements.userMenuToggle.classList.add('active');
  } else {
    closeUserDropdown();
  }
}

function closeUserDropdown() {
  if (DOMElements.userDropdown) DOMElements.userDropdown.classList.add('hidden');
  if (DOMElements.userMenuToggle) DOMElements.userMenuToggle.classList.remove('active');
}

function updateUserInterface() {
  if (!currentUser) return;
  
  const userNameElements = ['userName', 'userDisplayName', 'welcomeUserName'];
  userNameElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.textContent = currentUser.name;
  });
  
  const userEmailElement = document.getElementById('userEmail');
  if (userEmailElement) userEmailElement.textContent = currentUser.email;
  
  const userAvatarElement = document.getElementById('userAvatar');
  if (userAvatarElement) userAvatarElement.textContent = currentUser.name.charAt(0).toUpperCase();
}

function updateDashboardStats() {
  const stats = appData.analytics;
  const elements = {
    quickTotalPredictions: stats.totalPredictions.toString(),
    quickAccuracy: `${appData.modelInfo.accuracy}%`,
    quickConfidence: `${Math.round(stats.averageConfidence * 100)}%`,
    totalPredictions: stats.totalPredictions.toString(),
    accuracyValue: `${appData.modelInfo.accuracy}%`,
    correctPredictions: Math.floor(stats.totalPredictions * appData.modelInfo.accuracy / 100).toString(),
    activeUsers: Object.values(stats.performanceDistribution).reduce((a, b) => a + b, 0).toString()
  };
  
  Object.keys(elements).forEach(id => {
    const element = document.getElementById(id);
    if (element) element.textContent = elements[id];
  });
}

// THEME MANAGEMENT

function initializeTheme() {
  console.log('Initializing theme system...');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  currentTheme = sessionStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);
  if (DOMElements.themeToggleHeader) {
    DOMElements.themeToggleHeader.addEventListener('click', toggleTheme);
  }
  updateThemeIcon();
}

function applyTheme(theme) {
  console.log('Applying theme:', theme);
  currentTheme = theme;
  document.body.setAttribute('data-color-scheme', theme);
  sessionStorage.setItem('theme', theme);
  // Re-initialize charts with new theme colors if they exist
  if(Object.keys(charts).length > 0) {
      Object.values(charts).forEach(chart => chart.destroy());
      charts = {};
      const pageId = document.body.getAttribute('data-page-id');
      if (pageId === 'overview') {
          initializePerformanceChart();
          initializeFeatureChart();
      } else if (pageId === 'analytics') {
          initializeAnalyticsCharts();
      }
  }
}

function toggleTheme() {
  console.log('Toggling theme from:', currentTheme);
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const themeIcon = document.getElementById('themeIconHeader');
  if (themeIcon) {
    themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
  }
}

// CHART IMPLEMENTATION

function getChartColors() {
  return ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'];
}

function getTextColor() {
  return currentTheme === 'dark' ? '#f5f5f5' : '#134252';
}

function getSecondaryTextColor() {
  return currentTheme === 'dark' ? '#a7a9a9' : '#626c71';
}

function initializePerformanceChart() {
  if (!DOMElements.performanceChart) return;
  const ctx = DOMElements.performanceChart.getContext('2d');
  const data = appData.analytics.performanceDistribution;
  if (charts.performanceChart) charts.performanceChart.destroy();
  charts.performanceChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(data),
      datasets: [{ data: Object.values(data), backgroundColor: getChartColors(), borderWidth: 2, borderColor: currentTheme === 'dark' ? '#1f2121' : '#ffffff' }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true, color: getTextColor(), font: { size: 12, weight: 'medium' } } } } }
  });
}

function initializeFeatureChart() {
  if (!DOMElements.featureChart) return;
  const ctx = DOMElements.featureChart.getContext('2d');
  const data = appData.analytics.featureImportance;
  if (charts.featureChart) charts.featureChart.destroy();
  charts.featureChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(data),
      datasets: [{ label: 'Importance', data: Object.values(data), backgroundColor: getChartColors().slice(0, Object.keys(data).length), borderRadius: 8, borderWidth: 0 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 0.4, ticks: { callback: (value) => (value * 100).toFixed(0) + '%', color: getSecondaryTextColor() } }, x: { ticks: { color: getSecondaryTextColor(), maxRotation: 45 } } } }
  });
}

function initializeAnalyticsCharts() {
  initializeTrendsChart();
  initializeMetricsChart();
}

function initializeTrendsChart() {
  if (!DOMElements.trendsChart) return;
  const ctx = DOMElements.trendsChart.getContext('2d');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const trendData = { Excellent: [28, 31, 26, 33, 29, 32], Good: [42, 39, 44, 38, 41, 43], Average: [23, 22, 21, 20, 22, 18], Poor: [7, 8, 9, 9, 8, 7] };
  if (charts.trendsChart) charts.trendsChart.destroy();
  charts.trendsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        { label: 'Excellent', data: trendData.Excellent, borderColor: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)', tension: 0.4, borderWidth: 3, pointRadius: 5, pointHoverRadius: 7 },
        { label: 'Good', data: trendData.Good, borderColor: '#1FB8CD', backgroundColor: 'rgba(31, 184, 205, 0.1)', tension: 0.4, borderWidth: 3, pointRadius: 5, pointHoverRadius: 7 },
        { label: 'Average', data: trendData.Average, borderColor: '#F59E0B', backgroundColor: 'rgba(245, 158, 11, 0.1)', tension: 0.4, borderWidth: 3, pointRadius: 5, pointHoverRadius: 7 },
        { label: 'Poor', data: trendData.Poor, borderColor: '#EF4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', tension: 0.4, borderWidth: 3, pointRadius: 5, pointHoverRadius: 7 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { color: getTextColor(), usePointStyle: true, padding: 20 } } }, scales: { y: { beginAtZero: true, ticks: { color: getSecondaryTextColor() } }, x: { ticks: { color: getSecondaryTextColor() } } } }
  });
}

function initializeMetricsChart() {
  if (!DOMElements.metricsChart) return;
  const ctx = DOMElements.metricsChart.getContext('2d');
  const metrics = appData.modelInfo;
  if (charts.metricsChart) charts.metricsChart.destroy();
  charts.metricsChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Accuracy', 'Precision', 'Recall'],
      datasets: [{ label: 'Model Performance', data: [metrics.accuracy/100, metrics.precision/100, metrics.recall/100], backgroundColor: 'rgba(31, 184, 205, 0.2)', borderColor: '#1FB8CD', borderWidth: 3, pointBackgroundColor: '#1FB8CD', pointBorderColor: '#ffffff', pointBorderWidth: 2, pointRadius: 6 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: getTextColor() } } }, scales: { r: { beginAtZero: true, max: 1, ticks: { callback: (value) => (value * 100).toFixed(0) + '%', color: getSecondaryTextColor() }, grid: { color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }, angleLines: { color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' } } } }
  });
}

// PREDICTION FORM

function initializePredictionForm() {
  if (!DOMElements.predictionForm) return;
  const rangeInputs = document.querySelectorAll('.form-range');
  rangeInputs.forEach(input => {
    input.addEventListener('input', updateRangeValue);
    updateRangeValue({ target: input });
  });
  DOMElements.predictionForm.addEventListener('submit', handlePrediction);
}

function updateRangeValue(event) {
  const input = event.target;
  const value = input.value;
  const id = input.id;
  const valueElements = { attendance: document.getElementById('attendanceValue'), testScores: document.getElementById('testScoresValue'), studyHours: document.getElementById('studyHoursValue') };
  if (valueElements[id]) valueElements[id].textContent = value;
}

async function handlePrediction(event) {
  event.preventDefault();
  if (DOMElements.predictBtn) DOMElements.predictBtn.classList.add('loading');
  if (DOMElements.predictionResults) DOMElements.predictionResults.classList.add('hidden');
  const formData = {
    attendance: parseInt(document.getElementById('attendance').value) || 95,
    testScores: parseInt(document.getElementById('testScores').value) || 88,
    studyHours: parseInt(document.getElementById('studyHours').value) || 25,
    activities: document.getElementById('activities').value || 'Yes',
    support: document.querySelector('input[name="support"]:checked')?.value || 'High'
  };
  await new Promise(resolve => setTimeout(resolve, 1500));
  const prediction = makePrediction(formData);
  displayPredictionResults(prediction);
  const historyItem = { id: predictionHistory.length + 1, studentData: formData, prediction: prediction.prediction, confidence: prediction.confidence, date: new Date().toISOString().split('T')[0] };
  predictionHistory.unshift(historyItem);
  if (DOMElements.predictBtn) DOMElements.predictBtn.classList.remove('loading');
  showToast('Prediction completed successfully!', 'success');
}

function makePrediction(data) {
  let score = 0;
  score += (data.attendance / 100) * 0.35;
  score += (data.testScores / 100) * 0.28;
  score += Math.min(data.studyHours / 30, 1) * 0.20;
  const supportScore = { 'Low': 0.3, 'Medium': 0.7, 'High': 1.0 };
  score += supportScore[data.support] * 0.12;
  const activityScore = { 'Yes': 1.0, 'No': 0.5 };
  score += activityScore[data.activities] * 0.05;
  let performance, confidence;
  if (score >= 0.85) { performance = 'Excellent'; confidence = 0.90 + (score - 0.85) * 0.4; }
  else if (score >= 0.70) { performance = 'Good'; confidence = 0.80 + (score - 0.70) * 0.67; }
  else if (score >= 0.50) { performance = 'Average'; confidence = 0.70 + (score - 0.50) * 0.5; }
  else { performance = 'Poor'; confidence = 0.60 + score * 0.2; }
  confidence = Math.min(0.99, Math.max(0.5, confidence + (Math.random() - 0.5) * 0.1));
  return { prediction: performance, confidence };
}

function displayPredictionResults(prediction) {
  if (!DOMElements.predictionResults) return;
  const performanceElement = document.getElementById('performanceResult');
  const confidenceElement = document.getElementById('confidenceValue');
  const confidenceFill = document.getElementById('confidenceFill');
  const recommendationsList = document.getElementById('recommendationsList');
  if (performanceElement) {
    performanceElement.textContent = prediction.prediction;
    performanceElement.className = `performance-value ${prediction.prediction.toLowerCase()}`;
  }
  const confidencePercent = Math.round(prediction.confidence * 100);
  if (confidenceElement) confidenceElement.textContent = `${confidencePercent}%`;
  if (confidenceFill) confidenceFill.style.width = `${confidencePercent}%`;
  if (recommendationsList) {
    const recommendation = appData.recommendations[prediction.prediction];
    recommendationsList.innerHTML = `<li>${recommendation}</li>`;
  }
  DOMElements.predictionResults.classList.remove('hidden');
  DOMElements.predictionResults.classList.add('show');
  DOMElements.predictionResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// RECENT PREDICTIONS & HISTORY

function initializeRecentPredictions() {
    updateRecentPredictionsGrid();
}

function updateRecentPredictionsGrid() {
  if (!DOMElements.predictionsGrid) return;
  const recentPredictions = [...appData.samplePredictions, ...predictionHistory].slice(0, 6);
  DOMElements.predictionsGrid.innerHTML = '';
  recentPredictions.forEach(pred => {
    const item = document.createElement('div');
    item.className = 'prediction-item';
    const date = new Date(pred.date).toLocaleDateString();
    const confidencePercent = Math.round(pred.confidence * 100);
    item.innerHTML = `<div class="prediction-header"><span class="prediction-id">ID: ${pred.id.toString().padStart(3, '0')}</span><span class="prediction-date">${date}</span></div><div class="prediction-result"><span class="prediction-badge status-badge ${pred.prediction.toLowerCase()}">${pred.prediction}</span><span class="prediction-confidence">${confidencePercent}% confidence</span></div>`;
    DOMElements.predictionsGrid.appendChild(item);
  });
}

function initializeHistory() {
  updateHistoryTable();
  if (DOMElements.historySearch) DOMElements.historySearch.addEventListener('input', filterHistory);
  if (DOMElements.historyFilter) DOMElements.historyFilter.addEventListener('change', filterHistory);
}

function updateHistoryTable() {
  if (!DOMElements.historyTableBody) return;
  const allPredictions = [...appData.samplePredictions, ...predictionHistory];
  DOMElements.historyTableBody.innerHTML = '';
  allPredictions.forEach(pred => {
    const row = document.createElement('tr');
    const date = new Date(pred.date).toLocaleDateString();
    const confidencePercent = Math.round(pred.confidence * 100);
    const studentDataStr = `Attendance: ${pred.studentData.attendance}%, Test: ${pred.studentData.testScores}, Study: ${pred.studentData.studyHours}h`;
    row.innerHTML = `<td>${date}</td><td><div style="font-size: 12px; color: var(--color-text-secondary);">${studentDataStr}</div></td><td><span class="status-badge ${pred.prediction.toLowerCase()}">${pred.prediction}</span></td><td>${confidencePercent}%</td><td><button class="btn btn--sm btn--outline" onclick="viewPredictionDetails(${pred.id})">View Details</button></td>`;
    DOMElements.historyTableBody.appendChild(row);
  });
}

function filterHistory() {
  const searchTerm = DOMElements.historySearch?.value.toLowerCase() || '';
  const filterType = DOMElements.historyFilter?.value || '';
  const rows = document.querySelectorAll('#historyTableBody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    const matchesSearch = text.includes(searchTerm);
    const badge = row.querySelector('.status-badge');
    const matchesFilter = !filterType || (badge && badge.textContent === filterType);
    row.style.display = matchesSearch && matchesFilter ? '' : 'none';
  });
}

function viewPredictionDetails(id) {
  showToast(`Viewing details for prediction ID: ${id}`, 'info');
}

// TOAST NOTIFICATIONS

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<div class="toast-message">${message}</div>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-in forwards';
    setTimeout(() => {
      if (container.contains(toast)) container.removeChild(toast);
    }, 300);
  }, 3000);
}

// KEYBOARD SHORTCUTS

function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        if (event.altKey && event.key === 't') {
            event.preventDefault();
            toggleTheme();
        }
        if (event.key === 'Escape') {
            closeUserDropdown();
        }
    });
}

// WINDOW RESIZE HANDLER
window.addEventListener('resize', function() {
  Object.values(charts).forEach(chart => {
    if (chart && chart.resize) chart.resize();
  });
});
