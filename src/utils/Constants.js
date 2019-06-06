const BASE_URL = "http://api.cdta.org/api/v1/?request=";
const FIELDS = {
    TIME: 'time',
    ROUTES: 'routes',
    DIRECTIONS: 'directions',
    SCHEDULES: 'schedules',
    STOPS: 'stops',
    NEARSTOPS: 'nearstops',
    SEARCHSTOPS: 'searchstops',
    SEARCH: 'search',
    ARRIVALS: 'arrivals',
    ALERTS: 'alerts'
}
module.exports = { BASE_URL, FIELDS };
