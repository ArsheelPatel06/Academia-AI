#!/bin/bash

# ML Dashboard Deployment Script
set -e

echo "🚀 Starting ML Dashboard deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."

    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi

    # Check if model file exists
    if [ ! -f "model.pkl" ]; then
        print_warning "model.pkl not found. The application will use mock predictions."
    fi

    print_success "Prerequisites check completed"
}

# Setup environment
setup_environment() {
    print_status "Setting up environment..."

    # Copy environment file if it doesn't exist
    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_success "Created .env file from .env.example"
            print_warning "Please review and update the .env file with your configuration"
        else
            print_error ".env.example file not found"
            exit 1
        fi
    fi

    # Create necessary directories
    mkdir -p logs
    mkdir -p frontend
    mkdir -p ssl

    print_success "Environment setup completed"
}

# Build and start services
deploy_services() {
    print_status "Building and starting services..."

    # Stop existing services
    docker-compose down 2>/dev/null || true

    # Build and start services
    docker-compose up --build -d

    # Wait for services to be ready
    print_status "Waiting for services to be ready..."
    sleep 30

    # Check service health
    if curl -f http://localhost:8000/ > /dev/null 2>&1; then
        print_success "Backend service is running"
    else
        print_error "Backend service failed to start"
        docker-compose logs backend
        exit 1
    fi

    if curl -f http://localhost/ > /dev/null 2>&1; then
        print_success "Frontend service is running"
    else
        print_warning "Frontend service may not be fully ready yet"
    fi

    print_success "Services deployment completed"
}

# Show deployment information
show_info() {
    print_success "🎉 ML Dashboard deployed successfully!"
    echo ""
    echo "📋 Service URLs:"
    echo "   Frontend Dashboard: http://localhost"
    echo "   Backend API: http://localhost:8000"
    echo "   API Documentation: http://localhost:8000/docs"
    echo "   Database: localhost:5432"
    echo "   Redis: localhost:6379"
    echo ""
    echo "📝 Useful commands:"
    echo "   View logs: docker-compose logs -f"
    echo "   Stop services: docker-compose down"
    echo "   Restart services: docker-compose restart"
    echo "   Update services: docker-compose pull && docker-compose up -d"
    echo ""
    echo "🔧 Configuration:"
    echo "   Edit .env file to customize settings"
    echo "   Place your trained model.pkl in the project root"
    echo "   Check logs/ directory for application logs"
}

# Main deployment flow
main() {
    echo "════════════════════════════════════════════════════════════════"
    echo "  ML Student Performance Dashboard - Deployment Script"
    echo "════════════════════════════════════════════════════════════════"
    echo ""

    check_prerequisites
    setup_environment
    deploy_services
    show_info

    echo ""
    print_success "Deployment completed successfully! 🚀"
}

# Run main function
main
