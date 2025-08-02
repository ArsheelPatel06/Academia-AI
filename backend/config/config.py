"""
Configuration settings for Academia AI Backend
"""
import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Frontend directory
FRONTEND_DIR = BASE_DIR / "frontend"

# API Configuration
API_HOST = os.getenv("API_HOST", "localhost")
API_PORT = int(os.getenv("API_PORT", 5000))
API_DEBUG = os.getenv("API_DEBUG", "True").lower() == "true"

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///academia_ai.db")

# Security Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-jwt-secret-key")

# CORS Configuration
CORS_ORIGINS = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

# Logging Configuration
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

# Model Configuration
MODEL_CONFIG = {
    "prediction_weights": {
        "attendance": 0.35,
        "test_scores": 0.28,
        "study_hours": 0.20,
        "parental_support": 0.12,
        "activities": 0.05
    },
    "performance_thresholds": {
        "excellent": 0.85,
        "good": 0.70,
        "average": 0.50
    }
}

# File paths
STATIC_FILES_DIR = FRONTEND_DIR / "assets"
TEMPLATES_DIR = FRONTEND_DIR / "templates"
JS_DIR = FRONTEND_DIR / "js"
CSS_DIR = FRONTEND_DIR / "style" 