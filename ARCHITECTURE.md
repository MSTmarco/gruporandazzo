# Architecture Documentation

## Overview
Hertz Fleet Manager is built with vanilla JavaScript following SOLID principles and clean code practices. No framework dependencies required.

## Architecture Principles

### 1. Single Responsibility Principle (SRP)
Each class/module has one specific responsibility:
- **Models**: Represent data and business entities
- **Services**: Handle business logic and data operations
- **Views**: Manage UI presentation and user interactions
- **Utilities**: Provide reusable helper functions

### 2. Open/Closed Principle (OCP)
Components are open for extension but closed for modification:
- Service classes can be extended without modifying existing code
- Views follow a common interface for easy extension
- Configuration objects allow customization without code changes

### 3. Liskov Substitution Principle (LSP)
Derived classes can substitute base classes:
- All views follow the same contract (render, cleanup methods)
- Service implementations are interchangeable
- Models can be substituted with extended versions

### 4. Interface Segregation Principle (ISP)
Clients depend only on interfaces they use:
- Small, focused utility functions
- Services expose only necessary methods
- Views don't depend on unused features

### 5. Dependency Inversion Principle (DIP)
High-level modules don't depend on low-level modules:
- Views depend on service abstractions, not implementations
- Services can be mocked for testing
- Configuration is injected, not hardcoded

## Project Structure

```
hertz-fleet-manager/
├── src/
│   ├── config/          # Application configuration
│   ├── models/          # Data models (Vehicle, Reservation, User, Alert)
│   ├── services/        # Business logic (VehicleService, FilterService, etc.)
│   ├── ui/
│   │   ├── components/  # Reusable UI components
│   │   ├── views/       # Main view controllers
│   │   └── TabManager.js
│   ├── utils/           # Utility functions
│   └── app.js           # Application entry point
├── styles/
│   ├── variables.css    # CSS custom properties
│   ├── main.css         # Core styles
│   └── components/      # Component-specific styles
└── index.html           # Entry HTML file
```

## Design Patterns

### 1. Module Pattern
Each file exports specific functionality as ES6 modules:
```javascript
export class VehicleService { ... }
export function formatDate(date) { ... }
```

### 2. Service Layer Pattern
Business logic is separated into service classes:
- `VehicleService`: Vehicle CRUD operations
- `FilterService`: Filtering and sorting logic
- `ReservationService`: Reservation management
- `AlertService`: Alert configuration and execution

### 3. View Pattern
UI components follow a consistent structure:
```javascript
class SomeView {
    constructor(services) { ... }
    render(container) { ... }
    cleanup() { ... }
}
```

### 4. Observer Pattern
Event-driven communication between components:
- Event listeners for user interactions
- Service layer notifies views of data changes

## Data Flow

```
User Action → View → Service → Model → Service → View Update
```

1. **User Action**: Click button, input text, etc.
2. **View**: Captures event and calls appropriate service method
3. **Service**: Performs business logic and updates models
4. **Model**: Validates and stores data
5. **Service**: Returns result to view
6. **View Update**: Re-renders affected UI components

## Key Components

### Models
Represent business entities with validation:
- `Vehicle`: Fleet vehicle with status, location, etc.
- `Reservation`: Rental/reservation information
- `User`: System user with roles and permissions
- `Alert`: Notification configuration

### Services
Handle business logic:
- `VehicleService`: Manage fleet vehicles
- `ReservationService`: Handle reservations
- `AlertService`: Configure and send alerts
- `FilterService`: Filter and sort data
- `ReportService`: Generate reports

### Views
Control UI presentation:
- `DashboardView`: Main dashboard with stats
- `FleetView`: Vehicle management interface
- `SheetView`: Excel-style availability view
- `CalendarView`: Calendar-based view
- `AlertsView`: Alert configuration

### Utilities
Reusable helper functions:
- `dateUtils`: Date formatting and manipulation
- `domUtils`: DOM manipulation helpers
- `validationUtils`: Input validation

## Extension Points

### Adding a New View
1. Create view class in `src/ui/views/`
2. Implement `render(container)` and `cleanup()` methods
3. Register with TabManager in `app.js`

### Adding a New Service
1. Create service class in `src/services/`
2. Inject into Application services
3. Use in views as needed

### Adding a New Model
1. Create model class in `src/models/`
2. Implement validation methods
3. Use in services

## Testing Strategy

### Unit Tests
- Test model validation logic
- Test utility functions
- Test service business logic

### Integration Tests
- Test service + model interactions
- Test view + service interactions

### E2E Tests
- Test complete user workflows
- Test cross-component interactions

## Performance Considerations

1. **Lazy Loading**: Views loaded only when needed
2. **Event Delegation**: Minimize event listeners
3. **Efficient DOM Updates**: Update only changed elements
4. **Debouncing**: Limit expensive operations (search, filter)

## Security Considerations

1. **Input Validation**: All user input validated
2. **XSS Prevention**: Sanitize HTML content
3. **CSRF Protection**: Implement when adding API
4. **Authentication**: Session management (to be implemented)

## Future Enhancements

1. **API Integration**: Connect to backend API
2. **Real-time Updates**: WebSocket for live data
3. **Offline Support**: Service Worker for PWA
4. **Unit Tests**: Comprehensive test suite
5. **Build Process**: Bundling and optimization
6. **TypeScript**: Add type safety
7. **State Management**: Centralized state (if needed)

## Coding Standards

1. Use ES6+ features
2. Follow consistent naming conventions
3. Add JSDoc comments for public methods
4. Keep functions small and focused
5. Avoid deep nesting
6. Use meaningful variable names
7. Write self-documenting code
