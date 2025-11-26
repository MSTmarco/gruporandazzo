# Hertz Fleet Manager - Grupo Randazzo

A modern fleet management system built with vanilla JavaScript following SOLID principles and clean code practices.

## 🏗️ Project Structure

```
hertz-fleet-manager/
├── index.html                 # Main HTML entry point
├── src/
│   ├── config/               # Configuration files
│   │   └── constants.js      # Application constants
│   ├── models/               # Data models
│   │   ├── Vehicle.js
│   │   ├── Reservation.js
│   │   ├── User.js
│   │   └── Alert.js
│   ├── services/             # Business logic services
│   │   ├── VehicleService.js
│   │   ├── ReservationService.js
│   │   ├── AlertService.js
│   │   ├── ReportService.js
│   │   └── FilterService.js
│   ├── ui/                   # UI components
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Modal.js
│   │   │   ├── Table.js
│   │   │   ├── Calendar.js
│   │   │   └── SheetView.js
│   │   ├── views/            # Main view controllers
│   │   │   ├── DashboardView.js
│   │   │   ├── FleetView.js
│   │   │   ├── AlertsView.js
│   │   │   ├── CalendarView.js
│   │   │   └── ReportsView.js
│   │   └── TabManager.js     # Tab navigation manager
│   ├── utils/                # Utility functions
│   │   ├── dateUtils.js
│   │   ├── validationUtils.js
│   │   └── domUtils.js
│   └── app.js                # Main application entry
├── styles/
│   ├── main.css             # Main styles
│   ├── components/          # Component-specific styles
│   │   ├── modal.css
│   │   ├── table.css
│   │   ├── calendar.css
│   │   └── sheet.css
│   └── variables.css        # CSS variables
└── assets/                  # Static assets (if needed)
```

## 🎯 SOLID Principles Applied

### Single Responsibility Principle (SRP)
- Each class/module has one specific responsibility
- Services handle business logic
- Views handle UI presentation
- Models represent data structures

### Open/Closed Principle (OCP)
- Components are open for extension but closed for modification
- Use of configuration objects for customization

### Liskov Substitution Principle (LSP)
- Base classes can be replaced with derived classes
- Consistent interfaces across similar components

### Interface Segregation Principle (ISP)
- Small, focused interfaces
- Components only depend on what they use

### Dependency Inversion Principle (DIP)
- High-level modules don't depend on low-level modules
- Both depend on abstractions (service interfaces)

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd hertz-fleet-manager
```

2. Open `index.html` in a modern web browser

3. No build process required - uses vanilla JavaScript

## 📦 Features

- ✅ Dashboard with key metrics
- ✅ Fleet management (CRUD operations)
- ✅ Sheet view with hourly/daily views
- ✅ Drag-and-drop reservations
- ✅ Alert system configuration
- ✅ Calendar view
- ✅ Report generation
- ✅ User management
- ✅ Activity logs

## 🧪 Code Quality

- Follows ES6+ standards
- Modular architecture
- Separation of concerns
- Clean, readable code
- Comprehensive comments

## 📝 License

Private - Grupo Randazzo

## 👥 Contributors

- Development Team
