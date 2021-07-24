import { readFile, writeFile } from 'utils/FileSystemHelpers'
import { convertToCSV, convertToArray } from 'utils/CSVHelpers'
import { makeAutoObservable } from 'mobx'

export default class SessionStore {
    dirHandler = undefined;
    fileHandler = undefined;
    database = []
    currentUser = undefined;




    constructor() {
        makeAutoObservable(this)
    }

    setDirectoryHandler = (dirHandler) => {
        this.dirHandler = dirHandler;
    }

    configureDatabase = async (fileHandler) => {
        const contents = await readFile(fileHandler);

        if (contents && contents.length) {
            const jsData = convertToArray(contents)
            console.log(jsData, 233333)
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

    setFileHandler = async (fileHandler) => {
        await this.configureDatabase(fileHandler);
        this.fileHandler = fileHandler;
    }

    setDatabase = (databse = []) => {
        console.log(databse);
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
        const contents = await this.writeToFile(newDatabase);
        this.setDatabase(newDatabase);
        console.log(contents, 60000)
        return newUser;
    }

}



