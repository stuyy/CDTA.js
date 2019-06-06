const BASE_URL = "http://api.cdta.org/api/v1/?request=";
const FIELDS = {
    TIME: 'time',
    ROUTES: 'routes',
    DIRECTIONS: 'directions',
    SCHEDULES: 'schedules',
    STOPS: 'stops',
    NEAR_STOPS: 'nearstops',
    SEARCH_STOPS: 'searchstops',
    SEARCH: 'search',
    ARRIVALS: 'arrivals',
    ALERTS: 'alerts'
}
module.exports = { BASE_URL, FIELDS };