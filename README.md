# Academia AI - Education Management System

A modern, intelligent education management system designed for educational institutions to manage attendance, schedules, courses, and student information efficiently.

## 🎓 Features

### 📊 Dashboard

- **Overview Statistics**: View total students, courses, and attendance metrics
- **Interactive Calendar**: Monthly calendar view with course schedules
- **Quick Actions**: Easy access to common tasks
- **Real-time Updates**: Live data updates and notifications

### 👥 Attendance Management

- **Student Tracking**: Mark attendance for individual students
- **Status Options**: Present, Absent, Late, and Pending statuses
- **Bulk Operations**: Mark attendance for multiple students at once
- **Export Reports**: Generate and export attendance reports
- **Search & Filter**: Find students quickly with search functionality

### 📚 Course Management

- **Course Overview**: View all courses with detailed information
- **Schedule Display**: Visual representation of course schedules
- **Room Management**: Track classroom assignments
- **Student Enrollment**: Monitor course enrollment numbers
- **Professor Assignment**: Link courses to teaching staff

### 📅 Calendar & Scheduling

- **Monthly View**: Interactive calendar with course events
- **Event Management**: Add and manage academic events
- **Schedule Conflicts**: Identify and resolve scheduling conflicts
- **Export Options**: Export calendar data in various formats

### 👤 User Management

- **Role-based Access**: Admin and Teacher roles with different permissions
- **Profile Management**: Update personal information and preferences
- **Authentication**: Secure login with JWT tokens
- **Session Management**: Remember me functionality

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ml-dashboard-login
   ```

2. **Install Python dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Start the backend server**

   ```bash
   python backend_main.py
   ```

   The backend will start on `http://localhost:5000`

4. **Open the application**
   - Open `index.html` in your web browser
   - Or serve it using a local server:
     ```bash
     python -m http.server 8000
     ```
   - Then visit `http://localhost:8000`

### Demo Credentials

**Admin User:**

- Email: `admin@academia.edu`
- Password: `admin123`

**Teacher User:**

- Email: `prof.smith@academia.edu`
- Password: `teacher123`

## 🏗️ Architecture

### Frontend

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS for interactivity and API communication
- **Font Awesome**: Icons for better user experience

### Backend

- **Flask**: Lightweight Python web framework
- **SQLite**: Local database for data persistence
- **JWT**: Secure authentication with JSON Web Tokens
- **CORS**: Cross-origin resource sharing support

### Database Schema

- **Users**: Admin and teacher accounts
- **Students**: Student information and records
- **Courses**: Course details and scheduling
- **Attendance**: Daily attendance records
- **Schedule**: Course scheduling information

## 📱 Usage

### Login

1. Enter your email and password
2. Check "Remember me" to stay logged in
3. Click "Sign In" to access the dashboard

### Dashboard

- View overview statistics
- Navigate through the interactive calendar
- Access quick actions for common tasks

### Attendance Management

1. Navigate to the Attendance page
2. Select a course or date
3. Mark attendance for students using the action buttons
4. Export reports as needed

### Course Management

1. Go to the Classes page
2. View all courses in a grid layout
3. Click "Details" for more information
4. Use "Join" to access course materials

### Calendar

1. Navigate to the Calendar page
2. Use navigation arrows to change months
3. View scheduled courses and events
4. Export calendar data if needed

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
FLASK_SECRET_KEY=your_secret_key_here
JWT_SECRET_KEY=your_jwt_secret_here
DEBUG=True
```

### Database

The application uses SQLite by default. The database file (`academia_ai.db`) will be created automatically on first run.

## 🛠️ Development

### Project Structure

```
ml-dashboard-login/
├── index.html          # Main application interface
├── style.css           # Styles and layout
├── app.js              # Frontend JavaScript logic
├── backend_main.py     # Flask backend server
├── requirements.txt    # Python dependencies
├── README.md          # Project documentation
└── academia_ai.db     # SQLite database (created automatically)
```

### API Endpoints

#### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

#### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics

#### Attendance

- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance

#### Students

- `GET /api/students` - Get all students
- `POST /api/students` - Add new student

#### Courses

- `GET /api/courses` - Get all courses
- `POST /api/courses` - Add new course

#### Calendar

- `GET /api/calendar/events` - Get calendar events

#### Profile

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

## 🎨 Customization

### Styling

The application uses CSS custom properties for easy theming. Modify the `:root` variables in `style.css` to change colors and styling.

### Adding Features

1. **Frontend**: Add new pages in `index.html` and corresponding styles in `style.css`
2. **Backend**: Add new routes in `backend_main.py`
3. **Database**: Add new tables as needed in the `init_db()` function

## 🔒 Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Passwords are hashed using Werkzeug
- **CORS Protection**: Configured for secure cross-origin requests
- **Input Validation**: Server-side validation for all inputs

## 📊 Data Management

### Sample Data

The application includes sample data for demonstration:

- 4 user accounts (admin and teachers)
- 6 student records
- 6 course records
- Sample attendance data

### Data Export

- Attendance reports can be exported
- Calendar data can be exported
- All data is stored in SQLite database

## 🐛 Troubleshooting

### Common Issues

1. **Backend not starting**

   - Check if port 5000 is available
   - Ensure all dependencies are installed
   - Check Python version (3.8+ required)

2. **Database errors**

   - Delete `academia_ai.db` to reset the database
   - Check file permissions in the project directory

3. **CORS errors**
   - Ensure the backend is running on the correct port
   - Check browser console for specific error messages

### Logs

- Backend logs are displayed in the terminal
- Check browser console for frontend errors
- Database queries can be logged by enabling debug mode

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Academia AI** - Empowering education through intelligent management solutions.
# Academia-AI
