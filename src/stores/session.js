import {
    DEFAULT_IDB_KEY_FOR_FILE_HANDLER,
    DEFAULT_IDB_KEY_FOR_DIRECTORY_HANDLER
} from 'config/constants'
import { readFile, writeFile, } from 'utils/FileSystemHelpers'
import { convertToCSV, convertToArray } from 'utils/CSVHelpers'
import { getValues, setValue } from 'utils/IdbHelpers'
import { makeAutoObservable, toJS } from 'mobx'

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

    setDirectoryHandler = (dirHandler, persist = true) => {
        this.dirHandler = dirHandler;
        if (persist) {
            setValue(DEFAULT_IDB_KEY_FOR_DIRECTORY_HANDLER, dirHandler)
        }
    }

    configureDatabase = async (fileHandler) => {
        const contents = await readFile(fileHandler);

        if (contents && contents.length) {
            const jsData = convertToArray(contents)
            this.setDatabase(jsData)
        } else {
            this.setDatabase([])
        }
    }

    writeToFile = async (usersDatabase) => {
        const contents = convertToCSV(usersDatabase);
        await writeFile(this.fileHandler, contents)
        return contents;
    }

    setFileHandler = async (fileHandler, persist = true) => {
        await this.configureDatabase(fileHandler);
        this.fileHandler = fileHandler;
        if (persist) {
            setValue(DEFAULT_IDB_KEY_FOR_FILE_HANDLER, fileHandler)
        }
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
        console.log(toJS(this.currentUser), 9333)
    }

    updateUser = async (phone, updateData) => {
        if (!phone) {
            return
        }
        const newDatabase = this.database.map((user) => {
            const userPhone = user.phone;
            if (userPhone === phone) {
                return { ...user, ...updateData }
            }
            return user;
        })
        await this.writeToFile(newDatabase);
        this.database = newDatabase;
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
        await this.writeToFile(newDatabase);
        this.setDatabase(newDatabase);
        return newUser;
    }

}



