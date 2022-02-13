export const BASEURL = 'http://localhost:3007';
//export const BASEURL = 'http://edc5a87.online-server.cloud:3007';
export const PREFIX = '/HRProfileDemo';
const DETAILS_EMPLOYEE = '/detailsEmployee'
export const LANDING_URL = BASEURL + '/empid?';
export const DISPLAY_API_URL = BASEURL + '/publicDisplay';
export const IMAGES_API_URL = BASEURL + '/static';
export const DOWNLOAD_QRS_API_URL = BASEURL + '/QRs';///employee/downloadQRs
export const DOWNLOAD_EXCEL_API_URL = BASEURL + '/Contacts';
export const DOWNLOAD_ERRORS_API_URL = BASEURL + '/Errors';
export const DOWNLOAD_SAMPLE_EXCEL_API_URL = BASEURL + '/sampleExcel';
export const COUNTRY_CODE_API_URL = BASEURL + '/countryCode';

///Employees
export const EMPLOYEES_API_URL = BASEURL + '/employee';
export const UPLOAD_IMAGE_API_URL = EMPLOYEES_API_URL + '/uploadimage';
export const DELETE_EMPLOYEES_API_URL = EMPLOYEES_API_URL + '/deleteEmployees';
export const IMPORT_V_CARDS_API_URL = EMPLOYEES_API_URL + '/importVCard';
export const IMPORT_EXCEL_API_URL = EMPLOYEES_API_URL + '/importExcel';
export const EXPORT_EXCEL_API_URL = EMPLOYEES_API_URL + '/excel';
export const V_CARD_API_URL = EMPLOYEES_API_URL + '/vcard';
export const V_CARD_GUEST_API_URL = EMPLOYEES_API_URL + '/vcardGuest';
export const QRS_API_URL = EMPLOYEES_API_URL + '/qrs';
export const EMPLOYEE_DETAILS_API_URL = EMPLOYEES_API_URL + '/guest';
export const DOWNLOAD_V_CARDS_API_URL = EMPLOYEES_API_URL + '/vcards';
export const SEARCH_EMPLOYEES_API_URL = EMPLOYEES_API_URL + '/search';
export const IMPORT_PROGRESS_PERCENTAGE_API_URL = EMPLOYEES_API_URL + '/importProgressPercentage';
export const EXPORT_PROGRESS_PERCENTAGE_API_URL = EMPLOYEES_API_URL + '/exportProgressPercentage';

///Profile
export const PROFILE_API_URL = BASEURL + '/profile';
export const PROFILE_ME_API_URL = PROFILE_API_URL + '/profile-me';
export const UPDATE_PASSWORD_API_URL = PROFILE_API_URL + '/password';
export const EMAIL_API_URL = PROFILE_API_URL + '/email';
//export const UPDATE_EMAIL_API_URL = EMAIL_API_URL+'/email-generate-code';
//export const VERIFY_UPDATE_EMAIL_API_URL = EMAIL_API_URL+'/email-verify';

///Response
export const RESPONSE_API_URL = BASEURL + '/response';
export const RESPONSE_CODE_API_URL = RESPONSE_API_URL + '/code';

///Auth
export const AUTH_API_URL = BASEURL + '/auth';
export const REGISTER_API_URL = AUTH_API_URL + '/register';
export const LOGIN_API_URL = AUTH_API_URL + '/login';
export const LOGOUT_API_URL = AUTH_API_URL + '/logout';

///Users
export const ADMINS_API_URL = BASEURL + '/admins';

///Admins
export const SUPER_ADMINS_API_URL = BASEURL + '/superAdmins';
///Tenants
export const TENANTS_API_URL = BASEURL + '/tenants';
//export const ADD_USER_API_URL = ADMINS_API_URL + '/register';

////Route
export const RESET_PASSWORD_ROUTE = PREFIX + '/resetPass';
export const RESET_EMAIL_ROUTE = PREFIX + '/resetEmail';
export const LOGIN_ROUTE = PREFIX + '/login';
export const ADD_SUPER_ADMIN_ROUTE = PREFIX + '/addSuperAdmin';
export const SUPER_ADMINS_ROUTE = PREFIX + '/superAdmins';
export const EDIT_SUPER_ADMIN_ROUTE = PREFIX + '/editSuperAdmin';
export const PROFILE_ROUTE = PREFIX + '/profile';
export const TENANTS_ROUTE = PREFIX + '/tenants';
export const EMPLOYEES_ROUTE = PREFIX + '/Employee';
export const EDIT_EMPLOYEES_ROUTE = PREFIX + '/editEmployee';
export const EMPLOYEES_Details_ROUTE = PREFIX + DETAILS_EMPLOYEE;
export const ADD_TENANT_ROUTE = PREFIX + '/addTenant';
export const EDIT_TENANT_ROUTE = PREFIX + '/editTenant';
export const ADMINS_ROUTE = PREFIX + '/admins';
export const ADD_ADMIN_ROUTE = PREFIX + '/addUser';
export const EDIT_ADMIN_ROUTE = PREFIX + '/editUser';
export const DETAILS_TENANT_ROUTE = PREFIX + '/detailsTenant';
export const SEARCH_ROUTE = PREFIX + '/search';
export const RESPONSES_ROUTE = PREFIX + '/Response';
export const LANDING_BAGE = 'uibuilder'
export const LANDING_BAGE_ROUTE = '/' + LANDING_BAGE;
export const ADD_EMPLOYEE_ROUTE = PREFIX + '/addEmployee';
export const LANDING_ROUTE = '/';
export const LANDING_EMPLOYEE_ROUTE = '/empid';
export const BackgroundImagesURL = BASEURL + '/Background';
export const LandingURL = BASEURL + '/landing';
export const BackgroundURL = LandingURL + '/image';
export const DETAILS_EMPLOYEE_URL = BASEURL + PREFIX + DETAILS_EMPLOYEE + '?';
/////landing
export const TinaURL = BASEURL + '/___tina';
export const MediaURL = BASEURL + '/Media';
export const TINA_UPLOAD_IMAGE_API_URL = LandingURL + '/changeBackground';
