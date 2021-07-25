import {
    DEFAULT_IDB_KEY_FOR_FILE_HANDLER,
    DEFAULT_IDB_KEY_FOR_DIRECTORY_HANDLER
} from 'config/constants'
import { readFile, writeFile, } from 'utils/FileSystemHelpers'
import { convertToCSV, convertToArray } from 'utils/CSVHelpers'
import { getValues, setValue } from 'utils/IdbHelpers'
import { makeAutoObservable } from 'mobx'

export default class SessionStore {
    dirHandler = undefined;
    fileHandler = undefined;
    database = []
    currentUser = undefined;

    isPrevVersionPresent = false;

    setIsPrevVersionPresent = (value) => {
        this.isPrevVersionPresent = value
    }


    getPersistHandlers = async () => {
        const [fileHandler, dirHandler] = await getValues(
            DEFAULT_IDB_KEY_FOR_FILE_HANDLER,
            DEFAULT_IDB_KEY_FOR_DIRECTORY_HANDLER
        )
        if (fileHandler && dirHandler) {
            return { fileHandler, dirHandler }
        }
        return undefined;
    }

    retrivePersistHandlers = async () => {
        try {
            const response = await this.getPersistHandlers()
            //return undefined;
            return response;
        } catch (err) {
            return undefined;
        }
    }

    constructor() {
        makeAutoObservable(this)
        this.retrivePersistHandlers()
    }

    setDirectoryHandler = async (dirHandler, persist = true) => {
        this.dirHandler = dirHandler;
        if (persist) {
            const result = await setValue(DEFAULT_IDB_KEY_FOR_DIRECTORY_HANDLER, dirHandler)
            return result
        }
        return true;

    }

    configureDatabase = async (fileHandler) => {
        const contents = await readFile(fileHandler);
        if (contents && contents.length) {
            const jsData = convertToArray(contents)
            if (jsData !== undefined) {
                this.setDatabase(jsData)
                return true
            }
            return false

        } else {
            this.setDatabase([])
            return contents !== undefined;


        }
    }

    writeToFile = async (usersDatabase) => {
        const contents = convertToCSV(usersDatabase);
        const result = await writeFile(this.fileHandler, contents)
        if (result) {
            return contents;
        }
        return undefined;
    }

    setFileHandler = async (fileHandler, persist = true) => {
        const result = await this.configureDatabase(fileHandler);
        if (result) {
            this.fileHandler = fileHandler;
            if (persist) {
                setValue(DEFAULT_IDB_KEY_FOR_FILE_HANDLER, fileHandler)
            }
        }
        return result

    }

    setDatabase = (databse = []) => {
        if (Array.isArray(databse)) {
            this.database = databse;
        }
    }

    setCurrentUser = (user = {}) => {
        if (!this.currentUser) {
            this.currentUser = user;
        } else {
            this.currentUser = { ...this.currentUser, ...user }
        }
    }

    updateUser = async (phone, updateData) => {
        if (!phone) {
            return false
        }
        const newDatabase = this.database.map((user) => {
            const userPhone = user.phone;
            if (userPhone === phone) {
                return { ...user, ...updateData }
            }
            return user;
        })
        const result = await this.writeToFile(newDatabase);
        if (result !== undefined) {
            this.database = newDatabase;
        }
        return result;
    }

    resetUser = () => {
        this.currentUser = undefined;
    }

    checkIfUserExist = (phone) => {
        phone = phone.trim();
        return this.database.find((user) => {
            const userPhone = user.phone.trim();
            return phone === userPhone;
        })
    }

    addNewUser = async ({ phone, name = "" }) => {
        const newUser = { phone, name }
        const newDatabase = [...this.database, newUser]
        const result = await this.writeToFile(newDatabase);
        if (result !== undefined) {
            this.setDatabase(newDatabase);
            return newUser;
        }
        return result;
    }

}



