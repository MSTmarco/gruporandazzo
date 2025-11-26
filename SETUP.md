# Setup Guide - Hertz Fleet Manager

## Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Optional: Python 3 or Node.js for local server

### Installation

1. **Extract the ZIP file:**
   ```bash
   unzip hertz-fleet-manager.zip
   cd hertz-fleet-manager
   ```

2. **Run a local server:**

   **Option A - Using Python:**
   ```bash
   python3 -m http.server 8000
   # or
   npm start
   ```

   **Option B - Using Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **Option C - Using VS Code:**
   - Install "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

## Project Structure

```
hertz-fleet-manager/
├── index.html              # Main entry point
├── package.json            # NPM metadata
├── README.md               # Project overview
├── ARCHITECTURE.md         # Architecture documentation
├── .gitignore              # Git ignore rules
│
├── src/                    # Source code
│   ├── app.js              # Application initialization
│   ├── config/             # Configuration files
│   │   └── constants.js    # Application constants
│   ├── models/             # Data models
│   │   ├── Vehicle.js
│   │   ├── Reservation.js
│   │   ├── User.js
│   │   ├── Alert.js
│   │   └── index.js
│   ├── services/           # Business logic
│   │   ├── VehicleService.js
│   │   ├── ReservationService.js
│   │   └── FilterService.js
│   ├── ui/                 # User interface
│   │   ├── TabManager.js
│   │   ├── components/     # Reusable components
│   │   │   └── Modal.js
│   │   └── views/          # Page views
│   │       ├── DashboardView.js
│   │       └── FleetView.js
│   └── utils/              # Utility functions
│       ├── dateUtils.js
│       ├── domUtils.js
│       └── validationUtils.js
│
└── styles/                 # Stylesheets
    ├── variables.css       # CSS variables
    ├── main.css            # Main styles
    └── components/         # Component styles
        ├── modal.css
        ├── table.css
        ├── calendar.css
        └── sheet.css
```

## Development

### Adding a New Feature

1. **Add Model (if needed):**
   ```javascript
   // src/models/MyModel.js
   export class MyModel {
       constructor(data) { ... }
       validate() { ... }
   }
   ```

2. **Add Service (if needed):**
   ```javascript
   // src/services/MyService.js
   export class MyService {
       // Business logic here
   }
   ```

3. **Add View:**
   ```javascript
   // src/ui/views/MyView.js
   export class MyView {
       constructor(services) { ... }
       render(container) { ... }
       cleanup() { ... }
   }
   ```

4. **Register in App:**
   ```javascript
   // src/app.js
   import { MyView } from './ui/views/MyView.js';
   
   initializeViews() {
       this.views.myView = new MyView(this.services);
       this.tabManager.registerView('my-tab', this.views.myView);
   }
   ```

### Code Style

- Use ES6+ features
- Add JSDoc comments for public methods
- Follow naming conventions:
  - Classes: `PascalCase`
  - Functions/methods: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Files: `PascalCase.js` for classes, `camelCase.js` for utilities

### SOLID Principles Applied

✅ **Single Responsibility**: Each class has one reason to change  
✅ **Open/Closed**: Extend functionality without modifying existing code  
✅ **Liskov Substitution**: Views follow same interface  
✅ **Interface Segregation**: Small, focused interfaces  
✅ **Dependency Inversion**: Depend on abstractions (services)

## Customization

### Changing Colors

Edit `styles/variables.css`:
```css
:root {
    --primary: #1a1a1a;
    --secondary: #f7c100;
    /* Add your colors */
}
```

### Adding Mock Data

Edit service files (e.g., `src/services/VehicleService.js`):
```javascript
loadVehicles() {
    const mockData = [
        // Add your mock vehicles here
    ];
    return mockData.map(data => new Vehicle(data));
}
```

## Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)

1. Push to GitHub repository
2. Connect to hosting platform
3. Deploy from `main` branch
4. Root directory is project root

### Traditional Web Server

1. Upload all files to web server
2. Ensure server is configured to serve static files
3. Access via your domain

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Troubleshooting

### Issue: CORS errors when opening index.html directly
**Solution**: Use a local server (see Installation step 2)

### Issue: Modules not loading
**Solution**: Ensure you're using a local server, not opening file:// directly

### Issue: Changes not reflecting
**Solution**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## Next Steps

1. Review `README.md` for project overview
2. Read `ARCHITECTURE.md` for architecture details
3. Explore the code starting from `src/app.js`
4. Customize mock data in service files
5. Add new features following the established patterns

## Getting Help

- Check `ARCHITECTURE.md` for design patterns
- Review existing code for examples
- Follow SOLID principles when extending

## License

Private - Grupo Randazzo
