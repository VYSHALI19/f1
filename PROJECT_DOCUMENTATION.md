# Student Performance Analytics and Reporting System

A complete React-based Student Performance Analytics and Reporting System with role-based access (Admin/Student), performance tracking, analytics, and reporting features.

## 🎯 Project Overview

This is a full-featured educational analytics system built with React that allows:
- **Admins**: Manage student performance data, view reports, and analyze trends
- **Students**: Track their own performance, view progress, and receive recommendations

## 📁 Project Structure

```
FSAD PRO/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/
│   │   ├── LoginPage.jsx           # Role-based login/signup
│   │   ├── AdminDashboard.jsx      # Admin overview with stats
│   │   ├── StudentDashboard.jsx    # Student performance display
│   │   ├── AddPerformance.jsx      # Admin form to add marks
│   │   ├── ViewStudents.jsx        # Admin list of students
│   │   ├── AdminReports.jsx        # Performance reports
│   │   └── AdminAnalytics.jsx      # Analytics with charts
│   ├── data/
│   │   └── dummyData.json          # Mock student and performance data
│   ├── styles/
│   │   ├── LoginPage.css
│   │   ├── AdminDashboard.css      # Shared admin styles
│   │   ├── StudentDashboard.css
│   │   ├── AddPerformance.css
│   │   ├── ViewStudents.css
│   │   ├── AdminReports.css
│   │   └── AdminAnalytics.css
│   ├── App.jsx                     # Main app with React Router
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Features

### Authentication & Authorization
- **Role-based Login**: Students and Admins have separate login
- **Account Creation**: New users can sign up
- **localStorage**: Stores user credentials and data
- **Role-based Redirects**: Automatic routing based on user role

### Admin Features
- **Dashboard**: Overview of students, average marks, attendance stats
- **Add Performance**: Form to record student marks and attendance
- **View Students**: List of all enrolled students with enrollment dates
- **Reports**: Detailed performance analysis
  - Top performing students
  - Subject-wise performance
  - Students needing improvement
- **Analytics**: Visual insights
  - Subject-wise performance charts
  - Grade distribution
  - Performance metrics

### Student Features  
- **Performance Dashboard**: View personal performance data
  - Average marks and grade
  - Subject-wise breakdown
  - Attendance tracking
- **Progress Tracking**: Visual progress bars for each subject
- **Recommendations**: Personalized tips based on performance

## 🔐 Login Credentials

### Admin Login
- **Role**: Admin
- **Email**: Any email
- **Password**: Any password (on first signup)

### Student Login
- **Role**: Student
- **Email**: Any email
- **Password**: Any password (on first signup)

## 📊 Sample Data

The system includes dummy data for:
- **5 Students**: Arjun Kumar, Priya Sharma, Rahul Singh, Neha Patel, Dhruv Verma
- **15 Performance Records**: Covering Math, English, and Science subjects
- **Attendance & Marks**: Realistic performance data

## 🛠️ Technologies Used

- **React 18+**: Component-based UI
- **React Router v6**: Client-side navigation
- **Vite**: Fast build tool
- **CSS3**: Styling and animations
- **localStorage**: Data persistence
- **JSON**: Mock data storage

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Routes

| Route | Component | Role |
|-------|-----------|------|
| `/` | LoginPage | Public |
| `/admin/dashboard` | AdminDashboard | Admin |
| `/admin/add-performance` | AddPerformance | Admin |
| `/admin/view-students` | ViewStudents | Admin |
| `/admin/reports` | AdminReports | Admin |
| `/admin/analytics` | AdminAnalytics | Admin |
| `/student/dashboard` | StudentDashboard | Student |

## 💾 Data Structure

### Student Object
```json
{
  "id": 1,
  "name": "Student Name",
  "email": "student@email.com",
  "class": "10A",
  "enrollment": "2023-01-15"
}
```

### Performance Object
```json
{
  "id": 1,
  "studentId": 1,
  "studentName": "Student Name",
  "subject": "Mathematics",
  "marks": 85,
  "attendance": 92,
  "semester": "Sem 1",
  "date": "2024-01-15"
}
```

## 🎨 UI/UX Features

- **Modern Gradient Design**: Professional color schemes
- **Responsive Layout**: Works on desktop and mobile
- **Smooth Transitions**: Hover effects and animations
- **Clear Typography**: Easy-to-read fonts and sizes
- **Intuitive Navigation**: Clear menu structure
- **Data Visualization**: Progress bars, stat cards, distribution charts
- **Form Validation**: Real-time error messages
- **Loading States**: User feedback during data loading

## 🔄 Data Flow

```
LoginPage (Authenticate)
    ↓
Role Check (localStorage)
    ├─→ Admin → AdminDashboard → Add/View/Report/Analytics
    └─→ Student → StudentDashboard (View Performance)
```

## 💡 Key Functionalities

### Admin Workflow
1. Login with admin role
2. View dashboard with overview stats
3. Add new performance records
4. View all students
5. Generate reports
6. View analytics

### Student Workflow
1. Login with student role
2. View personal performance
3. Check subject-wise marks
4. Track attendance
5. Read recommendations
6. Monitor progress

## 📈 Grade Calculation

- **A+**: 90-100
- **A**: 80-89
- **B**: 70-79
- **C**: 60-69
- **D**: Below 60

## 🔒 Security Notes

- Credentials stored in localStorage (frontend only)
- Not suitable for production without backend
- For real deployment, implement JWT authentication
- Use secure backend for data storage

## 🚧 Future Enhancements

- Backend API integration
- Database for persistent storage
- Advanced charting library (Recharts/Chart.js)
- Export to PDF/Excel reports
- Email notifications
- Comparative analysis between students
- Semester-based tracking
- Multiple class management
- Student-parent portal

## 📝 Notes

- All data is stored in localStorage and JSON files
- No backend server required for development
- Responsive design works on all devices
- Form validation ensures data integrity
- Real-time calculations for statistics

## 👨‍💻 Development

The project uses:
- **Vite** for fast hot module replacement
- **React Router** for navigation
- **CSS** for styling (no CSS framework)
- **JSON** for mock data

## 📄 License

MIT License - Feel free to use for educational purposes

---

**Created**: 2024 | **Version**: 1.0.0
