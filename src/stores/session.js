import { readFile, writeFile } from 'utils/FileSystemHelpers'
import { convertToCSV, convertToArray } from 'utils/CSVHelpers'
import { makeAutoObservable } from 'mobx'

export default class SessionStore {
    dirHandler = undefined;
    fileHandler = undefined;
    database = []

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

    checkIfUserExist = (phone) => {

        phone = phone.trim();
        return Boolean(this.database.find((user) => {
            const userPhone = user.phone.trim();
            return phone === userPhone;
        }))
    }

    addNewUser = async ({ phone, name = "" }) => {
        console.log("CALLLED")
        const newDatabase = [...this.database, { phone, name }]

        const contents = convertToCSV(newDatabase);
        await writeFile(this.fileHandler, contents)
        this.setDatabase(newDatabase);
        console.log(contents, 60000)

        return newDatabase;
    }

}



