const SERVER_ERRORS = [
  {
    code:'1000',
    message:'USER IS ALREADY EXIST',
    messageKey:'USER_IS_ALREADY_EXIST'
  },{
    code:'1001',
    message:'USER NOT REGISTERED',
    messageKey:'USER_NOT_REGISTERED'
  },{
    code:'1002',
    message:'USER IS NOT VERIFY',
    messageKey:'USER_IS_NOT_VERIFY'
  },{
    code:'1003',
    message:'NOT GENERATE CODE',
    messageKey:'NOT_GENERATE_CODE'
  },{
    code:'1004',
    message:'INVALID CODE',
    messageKey:'INVALID_CODE'
  },{
    code:'1005',
    message:'OTP IS EXPIRED',
    messageKey:'OTP_IS_EXPIRED'
  },{
    code:'1006',
    message:'INVALID PASSWORD',
    messageKey:'INVALID_PASSWORD'
  },{
    code:'1007',
    message:'ACCESS TOKEN IS NOT FOUND',
    messageKey:'ACCESS_TOKEN_IS_NOT_FOUND'
  },{
    code:'1008',
    message:'ACCESS TOKEN INVALID',
    messageKey:'ACCESS_TOKEN_INVALID'
  },{
    code:'1009',
    message:'ACCESS TOKEN IS NOT GENERATED',
    messageKey:'ACCESS_TOKEN_IS_NOT_GENERATED'
  },{
    code:'1010',
    message:'ERROR IN HASH PASSWORD',
    messageKey:'ERROR_IN_HASH_PASSWORD'
  },{
    code:'1011',
    message:'ERROR IN COMPARE PASSWORD',
    messageKey:'ERROR_IN_COMPARE_PASSWORD'
  },{
    code:'1012',
    message:'PASSWORD AND CONFIRM PASSWORD NOT CORRECT',
    messageKey:'PASSWORD_AND_CONFIRM_PASSWORD_NOT_CORRECT'
  },{
    code:'1013',
    message:'DO_NOT_SEND_MESSAGE',
    messageKey:'DO_NOT_SEND_MESSAGE'
  },{
    code:'1014',
    message:'OLD PASSWORD IS NOT CORRECT',
    messageKey:'OLD_PASSWORD_IS_NOT_CORRECT'
  },{
    code:'1015',
    message:'ROLE NOT FOUND',
    messageKey:'ROLE_NOT_FOUND'
  },{
    code:'2000',
    message:'USER IS DELETED',
    messageKey:'USER_IS_DELETED'
  },{
    code:'11000',
    message:'INVALID ID',
    messageKey:'INVALID_ID'
  },{
    code:'12000',
    message:'LINK NOT FOUND',
    messageKey:'LINK_NOT_FOUND'
  },{
    code:'3000',
    message:'This Employee is no longer Existed',
    messageKey:'EMPLOYEE_NOT_FOUND'
  },{
    code:'3001',
    message:'This Employee is Inactive',
    messageKey:'EMPLOYEE_INACTIVE'
  },{
    code:'3005',
    message:'This id is Exist Already',
    messageKey:'EMPLOYEE_ID_EXIST'
  },{
    code:'3006',
    message:'This Civil id is Exist Already',
    messageKey:'EMPLOYEE_CIVIL_ID_EXIST'
  },{
    code:'3007',
    message:'Employee is not valid',
    messageKey:'EMPLOYEE_EMPTY'
  },{
    code:'3008',
    message:'Name is empty',
    messageKey:'EMPLOYEE_NAME_EMPTY'
  },{
    code:'3009',
    message:'Phone is empty',
    messageKey:'EMPLOYEE_PHONE_EMPTY'
  },{
    code:'3010',
    message:'Email is empty',
    messageKey:'EMPLOYEE_EMAIL_EMPTY'
  },{
    code:'3011',
    message:'IM account is empty',
    messageKey:'EMPLOYEE_IM_ACCOUNT_EMPTY'
  },{
    code:'3012',
    message:'Event is empty',
    messageKey:'EMPLOYEE_EVENT_EMPTY'
  },{
    code:'3013',
    message:'Phone is not valid',
    messageKey:'EMPLOYEE_PHONE_NOT_VALID'
  },{
    code:'3014',
    message:'IM account is not valid',
    messageKey:'EMPLOYEE_IM_ACCOUNT_NOT_VALID'
  },{
    code:'3015',
    message:'Email is not valid',
    messageKey:'EMPLOYEE_EMAIL_NOT_VALID'
  },{
    code:'3016',
    message:'Event is not valid',
    messageKey:'EMPLOYEE_EVENT_NOT_VALID'
  }
]
    //---------------------------------------------
    //Authentication Errors Start from 1000 t0 1999
    //---------------------------------------------
    /*USER_IS_ALREADY_EXIST: 1000,
  EMPLOYEE_NOT_FOUND: 3000,
  EMPLOYEE_INACTIVE: 3001,
    USER_NOT_REGISTERED: 1001,
  
    USER_IS_NOT_VERIFY: 1002,
  
    NOT_GENERATE_CODE: 1003,
  
    INVALID_CODE: 1004,
  
    OTP_IS_EXPIRED: 1005,
  
    INVALID_PASSWORD: 1006,
  
    ACCESS_TOKEN_IS_NOT_FOUND: 1007,
  
    ACCESS_TOKEN_INVALID: 1008, // invalid or expired
  
    ACCESS_TOKEN_IS_NOT_GENERATED: 1009,
  
    ERROR_IN_HASH_PASSWORD: 1010,
  
    ERROR_IN_COMPARE_PASSWORD: 1011,
  
    PASSWORD_AND_CONFIRM_PASSWORD_NOT_CORRECT: 1012,
  
    DO_NOT_SEND_MESSAGE: 1013,
  
    OLD_PASSWORD_IS_NOT_CORRECT: 1014,
  
    ROLE_NOT_FOUND: 1015,
  
    //---------------------------------------------
    // Users Errors Start from 2000 t0 2999
    //---------------------------------------------
    USER_IS_DELETED: 2000,
  
    //---------------------------------------------
    // Invalid Id (Mongodb id)
    INVALID_ID: 11000,
  
    //---------------------------------------------
    //Link does not found
    LINK_NOT_FOUND: 12000,
  };*/
  
export default SERVER_ERRORS;
  