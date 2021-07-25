export const DEFAULT_FILE_EXTENSION = ".txt"
export const DEFAULT_FILE_PATTERN = /^[\w\-.][\w\-. ]*$/
export const DEAFULT_NAME_PATTERN = /^[a-zA-Z0-9 ._$@]+$/
export const DEFAULT_OTP_LIMIT = 6
export const DEFAULT_IDB_KEY_FOR_FILE_HANDLER = "file_handler"
export const DEFAULT_IDB_KEY_FOR_DIRECTORY_HANDLER = "directory_handler"
export const NOTIFICATION_TYPES = {
    SUCCESS: "success",
    INFO: "info",
    WARNING: "warning",
    ERROR: "error"
}
export const VALIDATION_MESSAGES = {
    FILE_ALREADY_PRESENT: "File is already present!",
    PHONE_NUMBER_REQUIRE: "Please input your phonenumber!",
    OTP_REQUIRE: "Please input your otp!",
    OTP_VALID: "Please enter valid otp!",
    FILE_NAME_REQUIRE: 'Please input file name!',
    FILE_PATTERN_VALID: `Please enter valid file name [a-zA-Z0-9 ._$@]!`,
    USER_REQUIRE: 'Please input your name!',
    USER_PATTERN_VALID: `Please enter valid user name [a-zA-Z0-9 ._$@]!`
}

export const NOTIFICATION_TITLES = {

    FILE_READ_FROM_DIRECTORY: 'File read from directory',
    LOAD_PREVIOUS_VERSION: 'Load previous version',
    DIRECTORY_ACCESS: 'Directory access',
    FILE_ACCESS: 'File access',
    FILE_CREATE: 'File create',
    FILE_DELETE: 'File delete',
    USER_CREATE: 'User create'

}

export const NOTIFICATION_CONTENT = {
    NOT_ABLE_TO_LOAD_PREVIOUS_VERSION: "Couldn't load previous version",
    FILE_READ_FROM_DIRECTORY: "Couldn't read files from directory",
    NOT_ABLE_TO_ACCESS_DIRECTORY: "Couldn't access directory",
    NOT_ABLE_TO_ACCESS_FILE: "Couldn't access/parse file",
    NOT_ABLE_TO_CREATE_FILE: "Couldn't create file",
    NOT_ABLE_TO_DELETE_FILE: "Couldn't delete file",
    NOT_ABLE_TO_CREATE_USER: "Couldn't create user",
}

export const PLACEHOLDERS = {
    USER_NAME: "Enter your name",
    OTP: "Enter your otp"
}

export const ERROR_EXCEPTION = {
    USER_DIRECTORY_NOT_SELECT: "AbortError: The user aborted a request."
}