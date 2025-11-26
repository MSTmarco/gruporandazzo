/**
 * Filter Service
 * Handles filtering logic for vehicles and reservations
 * Follows Single Responsibility Principle
 */

export class FilterService {
    constructor() {
        this.activeFilters = {};
    }

    /**
     * Filter vehicles by multiple criteria
     */
    filterVehicles(vehicles, filters) {
        let filtered = [...vehicles];

        // Filter by search query
        if (filters.search) {
            const query = filters.search.toLowerCase();
            filtered = filtered.filter(v =>
                v.patent.toLowerCase().includes(query) ||
                v.model.toLowerCase().includes(query) ||
                (v.client && v.client.toLowerCase().includes(query))
            );
        }

        // Filter by category
        if (filters.category) {
            filtered = filtered.filter(v => v.category === filters.category);
        }

        // Filter by status
        if (filters.status) {
            filtered = filtered.filter(v => v.status === filters.status);
        }

        // Filter by date range
        if (filters.startDate && filters.endDate) {
            filtered = filtered.filter(v => {
                if (!v.startDate) return false;
                const vStart = new Date(v.startDate);
                const fStart = new Date(filters.startDate);
                const fEnd = new Date(filters.endDate);
                return vStart >= fStart && vStart <= fEnd;
            });
        }

        // Filter by has alerts
        if (filters.hasAlert !== undefined) {
            filtered = filtered.filter(v => v.hasAlert === filters.hasAlert);
        }

        // Filter by months in rental
        if (filters.minMonths !== undefined) {
            filtered = filtered.filter(v => v.monthsInRental >= filters.minMonths);
        }

        if (filters.maxMonths !== undefined) {
            filtered = filtered.filter(v => v.monthsInRental <= filters.maxMonths);
        }

        return filtered;
    }

    /**
     * Sort vehicles
     */
    sortVehicles(vehicles, sortBy, sortOrder = 'asc') {
        const sorted = [...vehicles];

        sorted.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            // Handle null/undefined
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            // Convert to comparable values
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            // Compare
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }

    /**
     * Group vehicles by category
     */
    groupByCategory(vehicles) {
        return vehicles.reduce((groups, vehicle) => {
            const category = vehicle.category;
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(vehicle);
            return groups;
        }, {});
    }

    /**
     * Group vehicles by status
     */
    groupByStatus(vehicles) {
        return vehicles.reduce((groups, vehicle) => {
            const status = vehicle.status;
            if (!groups[status]) {
                groups[status] = [];
            }
            groups[status].push(vehicle);
            return groups;
        }, {});
    }

    /**
     * Paginate results
     */
    paginate(items, page = 1, pageSize = 20) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        
        return {
            items: items.slice(start, end),
            total: items.length,
            page,
            pageSize,
            totalPages: Math.ceil(items.length / pageSize),
            hasNext: end < items.length,
            hasPrev: page > 1
        };
    }

    /**
     * Save filter preferences
     */
    saveFilters(filters) {
        this.activeFilters = { ...filters };
        // In production, save to localStorage or user preferences
    }

    /**
     * Load filter preferences
     */
    loadFilters() {
        return { ...this.activeFilters };
    }

    /**
     * Clear all filters
     */
    clearFilters() {
        this.activeFilters = {};
    }
}
