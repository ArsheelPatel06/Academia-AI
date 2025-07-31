#!/usr/bin/env python3
"""
Academia AI - Education Management System Backend
A Flask-based backend for managing educational institutions, attendance, schedules, and more.
"""

from flask import Flask, request, jsonify, session
from flask_cors import CORS
from datetime import datetime, timedelta
import json
import os
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'academia_ai_secret_key_2024'
app.config['JWT_SECRET_KEY'] = 'academia_jwt_secret_2024'
CORS(app)

# Database initialization
def init_db():
    """Initialize the SQLite database with required tables."""
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL,
            avatar TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Students table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            student_id TEXT UNIQUE NOT NULL,
            email TEXT,
            avatar TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Courses table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            abbreviation TEXT NOT NULL,
            title TEXT NOT NULL,
            professor_id INTEGER,
            time_slot TEXT,
            room TEXT,
            section TEXT,
            max_students INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (professor_id) REFERENCES users (id)
        )
    ''')
    
    # Attendance table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER,
            course_id INTEGER,
            date DATE NOT NULL,
            status TEXT NOT NULL,
            marked_by INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (student_id) REFERENCES students (id),
            FOREIGN KEY (course_id) REFERENCES courses (id),
            FOREIGN KEY (marked_by) REFERENCES users (id)
        )
    ''')
    
    # Schedule table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            course_id INTEGER,
            day_of_week INTEGER,
            start_time TEXT,
            end_time TEXT,
            room TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (course_id) REFERENCES courses (id)
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

# Sample data insertion
def insert_sample_data():
    """Insert sample data for demonstration."""
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    
    # Check if sample data already exists
    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] > 0:
        conn.close()
        return
    
    # Insert sample users
    sample_users = [
        ('Admin User', 'admin@academia.edu', generate_password_hash('admin123'), 'admin', 'A'),
        ('Prof. Smith', 'prof.smith@academia.edu', generate_password_hash('teacher123'), 'teacher', 'S'),
        ('Prof. Johnson', 'prof.johnson@academia.edu', generate_password_hash('teacher456'), 'teacher', 'J'),
        ('Prof. Williams', 'prof.williams@academia.edu', generate_password_hash('teacher789'), 'teacher', 'W')
    ]
    
    cursor.executemany('''
        INSERT INTO users (name, email, password_hash, role, avatar)
        VALUES (?, ?, ?, ?, ?)
    ''', sample_users)
    
    # Insert sample students
    sample_students = [
        ('Alex Johnson', 'S123456', 'alex.johnson@student.edu', 'AJ'),
        ('Maria Garcia', 'S789012', 'maria.garcia@student.edu', 'MG'),
        ('James Wilson', 'S345678', 'james.wilson@student.edu', 'JW'),
        ('Sarah Lee', 'S901234', 'sarah.lee@student.edu', 'SL'),
        ('Michael Brown', 'S567890', 'michael.brown@student.edu', 'MB'),
        ('Emily Davis', 'S234567', 'emily.davis@student.edu', 'ED')
    ]
    
    cursor.executemany('''
        INSERT INTO students (name, student_id, email, avatar)
        VALUES (?, ?, ?, ?)
    ''', sample_students)
    
    # Insert sample courses
    sample_courses = [
        ('DSJ', 'Data Science Junior', 2, '9:00 AM - 10:30 AM', '101', 'A', 32),
        ('PMC', 'Probability & Math Computing', 3, '11:00 AM - 12:30 PM', '205', 'B', 28),
        ('DED', 'Discrete Event Dynamics', 4, '1:30 PM - 3:00 PM', '312', 'C', 45),
        ('PJW', 'Project Workshop', 2, '4:00 PM - 5:30 PM', '104', 'D', 18),
        ('MLD', 'Machine Learning Design', 4, '10:00 AM - 11:30 AM', '215', 'E', 36),
        ('WBD', 'Web Development Bootcamp', 4, '2:00 PM - 3:30 PM', '107', 'F', 24)
    ]
    
    cursor.executemany('''
        INSERT INTO courses (abbreviation, title, professor_id, time_slot, room, section, max_students)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', sample_courses)
    
    conn.commit()
    conn.close()

# Insert sample data
insert_sample_data()

# JWT token decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            token = token.split(' ')[1]  # Remove 'Bearer ' prefix
            data = jwt.decode(token, app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
            current_user = get_user_by_id(data['user_id'])
            if not current_user:
                return jsonify({'message': 'Invalid token'}), 401
        except:
            return jsonify({'message': 'Invalid token'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated

# Database helper functions
def get_user_by_id(user_id):
    """Get user by ID."""
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, name, email, role, avatar FROM users WHERE id = ?', (user_id,))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return {
            'id': user[0],
            'name': user[1],
            'email': user[2],
            'role': user[3],
            'avatar': user[4]
        }
    return None

def get_user_by_email(email):
    """Get user by email."""
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, name, email, password_hash, role, avatar FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return {
            'id': user[0],
            'name': user[1],
            'email': user[2],
            'password_hash': user[3],
            'role': user[4],
            'avatar': user[5]
        }
    return None

# Authentication routes
@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login endpoint."""
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password are required'}), 400
    
    user = get_user_by_email(data['email'])
    
    if not user or not check_password_hash(user['password_hash'], data['password']):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    # Generate JWT token
    token = jwt.encode({
        'user_id': user['id'],
        'email': user['email'],
        'exp': datetime.utcnow() + timedelta(hours=24)
    }, app.config['JWT_SECRET_KEY'], algorithm='HS256')
    
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': {
            'id': user['id'],
            'name': user['name'],
            'email': user['email'],
            'role': user['role'],
            'avatar': user['avatar']
        }
    })

@app.route('/api/auth/register', methods=['POST'])
def register():
    """User registration endpoint."""
    data = request.get_json()
    
    if not data or not data.get('name') or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Name, email, and password are required'}), 400
    
    # Check if user already exists
    existing_user = get_user_by_email(data['email'])
    if existing_user:
        return jsonify({'message': 'User with this email already exists'}), 409
    
    # Create new user
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    
    password_hash = generate_password_hash(data['password'])
    avatar = data.get('name', '').split()[0][0].upper() if data.get('name') else 'U'
    
    cursor.execute('''
        INSERT INTO users (name, email, password_hash, role, avatar)
        VALUES (?, ?, ?, ?, ?)
    ''', (data['name'], data['email'], password_hash, data.get('role', 'user'), avatar))
    
    user_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    # Generate token for new user
    token = jwt.encode({
        'user_id': user_id,
        'email': data['email'],
        'exp': datetime.utcnow() + timedelta(hours=24)
    }, app.config['JWT_SECRET_KEY'], algorithm='HS256')
    
    return jsonify({
        'message': 'Registration successful',
        'token': token,
        'user': {
            'id': user_id,
            'name': data['name'],
            'email': data['email'],
            'role': data.get('role', 'user'),
            'avatar': avatar
        }
    }), 201

# Dashboard routes
@app.route('/api/dashboard/stats', methods=['GET'])
@token_required
def get_dashboard_stats(current_user):
    """Get dashboard statistics."""
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    
    # Get total students
    cursor.execute('SELECT COUNT(*) FROM students')
    total_students = cursor.fetchone()[0]
    
    # Get total courses
    cursor.execute('SELECT COUNT(*) FROM courses')
    total_courses = cursor.fetchone()[0]
    
    # Get today's attendance
    today = datetime.now().strftime('%Y-%m-%d')
    cursor.execute('SELECT COUNT(*) FROM attendance WHERE date = ?', (today,))
    today_attendance = cursor.fetchone()[0]
    
    # Get total attendance this week
    week_start = (datetime.now() - timedelta(days=datetime.now().weekday())).strftime('%Y-%m-%d')
    cursor.execute('SELECT COUNT(*) FROM attendance WHERE date >= ?', (week_start,))
    week_attendance = cursor.fetchone()[0]
    
    conn.close()
    
    return jsonify({
        'total_students': total_students,
        'total_courses': total_courses,
        'today_attendance': today_attendance,
        'week_attendance': week_attendance
    })

# Attendance routes
@app.route('/api/attendance', methods=['GET'])
@token_required
def get_attendance(current_user):
    """Get attendance data."""
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    
    # Get attendance with student and course information
    cursor.execute('''
        SELECT 
            a.id,
            s.name,
            s.student_id,
            s.avatar,
            a.status,
            a.date,
            c.abbreviation as course
        FROM attendance a
        JOIN students s ON a.student_id = s.id
        LEFT JOIN courses c ON a.course_id = c.id
        ORDER BY a.date DESC, s.name
    ''')
    
    attendance_records = []
    for row in cursor.fetchall():
        attendance_records.append({
            'id': row[0],
            'name': row[1],
            'student_id': row[2],
            'avatar': row[3],
            'status': row[4],
            'date': row[5],
            'course': row[6]
        })
    
    conn.close()
    
    return jsonify(attendance_records)

@app.route('/api/attendance', methods=['POST'])
@token_required
def mark_attendance(current_user):
    """Mark student attendance."""
    data = request.get_json()
    
    if not data or not data.get('student_id') or not data.get('status'):
        return jsonify({'message': 'Student ID and status are required'}), 400
    
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    
    # Check if student exists
    cursor.execute('SELECT id FROM students WHERE student_id = ?', (data['student_id'],))
    student = cursor.fetchone()
    if not student:
        conn.close()
        return jsonify({'message': 'Student not found'}), 404
    
    # Check if attendance already marked for today
    today = datetime.now().strftime('%Y-%m-%d')
    cursor.execute('''
        SELECT id FROM attendance 
        WHERE student_id = ? AND date = ?
    ''', (student[0], today))
    
    existing_attendance = cursor.fetchone()
    
    if existing_attendance:
        # Update existing attendance
        cursor.execute('''
            UPDATE attendance 
            SET status = ?, marked_by = ?
            WHERE id = ?
        ''', (data['status'], current_user['id'], existing_attendance[0]))
    else:
        # Create new attendance record
        cursor.execute('''
            INSERT INTO attendance (student_id, course_id, date, status, marked_by)
            VALUES (?, ?, ?, ?, ?)
        ''', (student[0], data.get('course_id'), today, data['status'], current_user['id']))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Attendance marked successfully'})

# Students routes
@app.route('/api/students', methods=['GET'])
@token_required
def get_students(current_user):
    """Get all students."""
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT id, name, student_id, email, avatar FROM students ORDER BY name')
    students = []
    
    for row in cursor.fetchall():
        students.append({
            'id': row[0],
            'name': row[1],
            'student_id': row[2],
            'email': row[3],
            'avatar': row[4]
        })
    
    conn.close()
    
    return jsonify(students)

@app.route('/api/students', methods=['POST'])
@token_required
def add_student(current_user):
    """Add a new student."""
    data = request.get_json()
    
    if not data or not data.get('name') or not data.get('student_id'):
        return jsonify({'message': 'Name and student ID are required'}), 400
    
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    
    # Check if student ID already exists
    cursor.execute('SELECT id FROM students WHERE student_id = ?', (data['student_id'],))
    if cursor.fetchone():
        conn.close()
        return jsonify({'message': 'Student ID already exists'}), 409
    
    # Create avatar from name
    avatar = ''.join([name[0].upper() for name in data['name'].split()[:2]])
    
    cursor.execute('''
        INSERT INTO students (name, student_id, email, avatar)
        VALUES (?, ?, ?, ?)
    ''', (data['name'], data['student_id'], data.get('email'), avatar))
    
    student_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return jsonify({
        'message': 'Student added successfully',
        'student_id': student_id
    }), 201

# Courses routes
@app.route('/api/courses', methods=['GET'])
@token_required
def get_courses(current_user):
    """Get all courses."""
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT 
            c.id,
            c.abbreviation,
            c.title,
            c.time_slot,
            c.room,
            c.section,
            c.max_students,
            u.name as professor_name
        FROM courses c
        LEFT JOIN users u ON c.professor_id = u.id
        ORDER BY c.abbreviation
    ''')
    
    courses = []
    for row in cursor.fetchall():
        courses.append({
            'id': row[0],
            'abbreviation': row[1],
            'title': row[2],
            'time_slot': row[3],
            'room': row[4],
            'section': row[5],
            'max_students': row[6],
            'professor_name': row[7]
        })
    
    conn.close()
    
    return jsonify(courses)

@app.route('/api/courses', methods=['POST'])
@token_required
def add_course(current_user):
    """Add a new course."""
    data = request.get_json()
    
    if not data or not data.get('abbreviation') or not data.get('title'):
        return jsonify({'message': 'Abbreviation and title are required'}), 400
    
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO courses (abbreviation, title, professor_id, time_slot, room, section, max_students)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['abbreviation'],
        data['title'],
        data.get('professor_id'),
        data.get('time_slot'),
        data.get('room'),
        data.get('section'),
        data.get('max_students', 30)
    ))
    
    course_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return jsonify({
        'message': 'Course added successfully',
        'course_id': course_id
    }), 201

# Calendar routes
@app.route('/api/calendar/events', methods=['GET'])
@token_required
def get_calendar_events(current_user):
    """Get calendar events."""
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    
    # Get courses with schedule information
    cursor.execute('''
        SELECT 
            c.id,
            c.abbreviation,
            c.title,
            c.time_slot,
            c.room,
            u.name as professor_name
        FROM courses c
        LEFT JOIN users u ON c.professor_id = u.id
        WHERE c.time_slot IS NOT NULL
    ''')
    
    events = []
    for row in cursor.fetchall():
        events.append({
            'id': row[0],
            'title': f"{row[1]} - {row[2]}",
            'time': row[3],
            'room': row[4],
            'professor': row[5],
            'type': 'course'
        })
    
    conn.close()
    
    return jsonify(events)

# Profile routes
@app.route('/api/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    """Get user profile."""
    return jsonify(current_user)

@app.route('/api/profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    """Update user profile."""
    data = request.get_json()
    
    conn = sqlite3.connect('academia_ai.db')
    cursor = conn.cursor()
    
    # Update user information
    cursor.execute('''
        UPDATE users 
        SET name = ?, avatar = ?
        WHERE id = ?
    ''', (data.get('name', current_user['name']), data.get('avatar', current_user['avatar']), current_user['id']))
    
    conn.commit()
    conn.close()
    
    # Return updated user info
    updated_user = get_user_by_id(current_user['id'])
    return jsonify({
        'message': 'Profile updated successfully',
        'user': updated_user
    })

# Health check
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'message': 'Academia AI backend is running',
        'timestamp': datetime.now().isoformat()
    })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'message': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'message': 'Internal server error'}), 500

if __name__ == '__main__':
    print("Academia AI - Education Management System Backend")
    print("Starting server...")
    app.run(debug=True, host='0.0.0.0', port=5000)
