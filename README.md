# 📊 Student Performance Analytics and Reporting System

A complete React JS frontend application for managing and analyzing student performance data with role-based access (Admin and Student).

## 🎯 Overview

This project is a comprehensive Student Performance Analytics and Reporting System built with React, featuring:

- **Admin Dashboard**: Manage student records, add performance data, and view analytics
- **Student Dashboard**: View personal performance, track progress, and receive recommendations
- **Analytics & Reports**: Generate detailed performance analytics and reports with charts
- **Role-Based Access**: Separate interfaces for Admins (Teachers) and Students
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## ✨ Features

### Admin/Teacher Features
- ✅ View all students performance at a glance
- ✅ Add new student performance records (marks, attendance, subject)
- ✅ Generate comprehensive performance reports
- ✅ View interactive analytics with charts
- ✅ Track attendance and subject-wise performance
- ✅ Print reports for official documentation

### Student Features
- ✅ View personal performance dashboard
- ✅ Check subject-wise marks and attendance
- ✅ Track progress with visual progress bars
- ✅ Receive personalized recommendations based on performance
- ✅ View performance trends and analytics

### Technical Features
- ✅ **React with Hooks**: Modern functional components using useState and useEffect
- ✅ **React Router**: Client-side navigation between pages
- ✅ **Tailwind CSS**: Modern, responsive UI design
- ✅ **Recharts**: Interactive charts for data visualization
- ✅ **Form Validation**: Client-side validation for data entry
- ✅ **Dummy Data**: Pre-loaded data for demonstration (no backend required)
- ✅ **Component-Based Architecture**: Reusable, maintainable component structure

## 📁 Project Structure

```
student-performance-analytics/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── Navbar.jsx       # Top navigation bar with user info
│   │   ├── Sidebar.jsx      # Admin navigation sidebar
│   │   ├── StudentCard.jsx  # Student performance card component
│   │   ├── Charts.jsx       # Recharts components (Bar, Line, Pie)
│   │   ├── ProgressBar.jsx  # Progress visualization component
│   │   ├── FormField.jsx    # Reusable form input component
│   │   └── RecommendationsSection.jsx # Personalized recommendations
│   │
│   ├── pages/               # Application pages/routes
│   │   ├── Login.jsx        # Login page with role selection
│   │   ├── AdminDashboard.jsx # Admin main dashboard
│   │   ├── AdminAnalytics.jsx # Analytics dashboard with charts
│   │   ├── AdminReports.jsx # Report generation page
│   │   ├── AddPerformance.jsx # Add performance form
│   │   ├── ViewStudents.jsx # View all students
│   │   └── StudentDashboard.jsx # Student home dashboard
│   │
│   ├── data/               # Data and constants
│   │   └── dummyData.js    # Mock data for students and marks
│   │
│   ├── App.jsx             # Main app component with routing
│   ├── App.css             # Global app styles
│   ├── index.css           # Tailwind CSS imports
│   └── main.jsx            # React entry point
│
├── public/
│   └── index.html          # HTML template
│
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Dependencies and scripts
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🔐 Login Credentials

### Admin/Teacher Login
- **Username**: `admin`
- **Password**: `admin123`

### Student Login
- **Username**: Any student name (e.g., "Arjun Kumar", "Priya Sharma")
- **Password**: `student123`

## 📊 Dummy Data

The application comes pre-loaded with sample data:
- **5 Students** with different performance records
- **13+ Performance Records** across multiple subjects and semesters
- **Sample Subjects**: Mathematics, English, Science, History, Geography, Physical Education

## 🎨 UI/UX Features

- **Modern Design**: Gradient backgrounds, smooth transitions, and hover effects
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Color-Coded Grades**: Visual indicators for performance (A+, A, B, C, D)
- **Interactive Charts**: Recharts for visualizing performance trends
- **Progress Indicators**: Visual progress bars for marks and attendance
- **Card-Based Layout**: Clean organization of information

## 🛠️ Technology Stack

### Frontend Frameworks & Libraries
- **React 19**: UI library for building components
- **React Router v7**: Client-side routing and navigation
- **Recharts**: Chart library for data visualization
- **Tailwind CSS**: Utility-first CSS framework

### Build & Development Tools
- **Vite**: Fast build tool and development server
- **PostCSS & Autoprefixer**: CSS processing

## 📝 Key Components Explanation

### 1. **Navbar Component**
- Displays logged-in user information
- Shows user role (Admin/Student)
- Logout functionality

### 2. **Sidebar Component**
- Admin navigation menu
- Links to Dashboard, Analytics, Reports, Add Performance, View Students

### 3. **StudentCard Component**
- Displays student summary (name, class, grade, avg marks, attendance)
- Visual progress bar showing performance
- Interactive "View Details" button

### 4. **Charts Components**
- **LineChartComponent**: Shows trend analysis
- **BarChartComponent**: Compares performance across categories
- **PieChartComponent**: Displays distribution (grades, attendance ranges)

### 5. **ProgressBar Component**
- Visual percentage indicator
- Auto-color based on performance (green for good, red for poor)
- Used for marks and attendance tracking

### 6. **RecommendationsSection Component**
- Generates personalized recommendations
- Identifies weak subjects
- Suggests improvements
- Celebrates achievements

## 🔄 State Management

- **useState Hook**: Managing form inputs, user authentication, and component state
- **useEffect Hook**: Fetching data, filtering student records
- **useMemo Hook**: Optimizing expensive calculations for charts and reports
- **useNavigate Hook**: Programmatic navigation between routes

## 📋 Form Validation

All forms include validation for:
- Required fields
- Numeric ranges (marks 0-100, attendance 0-100)
- Student name and subject selection
- Error messages for invalid inputs

## 🎯 How to Use

### As an Admin:
1. Login with admin credentials
2. View dashboard overview with statistics
3. Click "Add Performance" to enter student marks
4. View all students in the "View Students" section
5. Check analytics with charts in "Analytics"
6. Generate and print reports in "Reports"

### As a Student:
1. Login with your name and student password
2. View your dashboard with overall grade and attendance
3. Check subject-wise marks in the table
4. View performance progress bars
5. Read personalized recommendations
6. View charts showing your performance trends

## 🔧 Customization

### Adding New Students
Edit `src/data/dummyData.js` and add to the `studentsData` array:
```javascript
{
  id: 6,
  name: 'New Student Name',
  email: 'email@student.com',
  class: '10A',
  role: 'student'
}
```

### Adding New Subjects
Edit `AddPerformance.jsx` and add to the subjects array:
```javascript
{ value: 'Computer Science', label: 'Computer Science' }
```

### Changing Color Scheme
Update colors in `tailwind.config.js`:
```javascript
colors: {
  primary: '#3B82F6',    // Change primary color
  secondary: '#10B981',   // Change secondary color
  danger: '#EF4444',      // Change danger color
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Performance Optimizations

- useMemo for expensive chart calculations
- Component-based code splitting
- Conditional rendering for protected routes
- Efficient state management

## 📚 Learning Resources

This project demonstrates:
- React Hooks (useState, useEffect, useMemo, useContext)
- React Router for SPA navigation
- Form handling and validation
- Data visualization with Recharts
- Tailwind CSS for styling
- Component composition and reusability
- State management patterns
- Protected routes and authentication

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements.

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
