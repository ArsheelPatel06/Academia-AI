#!/usr/bin/env python3
"""
Academia AI Backend - Main Application Entry Point
Intelligent Education Management System Backend
"""

import sys
import logging
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(backend_dir))

from config.config import *

# Configure logging
logging.basicConfig(
    level=getattr(logging, LOG_LEVEL),
    format=LOG_FORMAT,
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('backend.log')
    ]
)

logger = logging.getLogger(__name__)

def main():
    """Main application entry point"""
    try:
        logger.info("Starting Academia AI Backend...")
        
        # Import the Flask application
        from app import app
        
        # Run the application
        app.run(
            host=API_HOST,
            port=API_PORT,
            debug=API_DEBUG
        )
        
        logger.info("Academia AI Backend started successfully")
        
    except Exception as e:
        logger.error(f"Failed to start backend: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
