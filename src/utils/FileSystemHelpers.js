import { DEFAULT_FILE_EXTENSION, ERROR_EXCEPTION } from 'config/constants'

export const verifyPermission = async (fileHandler, mode = "readwrite") => {
    try {
        if (!fileHandler) return false;

        const options = {};
        options.mode = mode;
        // Check if permission was already granted. If so, return true.
        if ((await fileHandler.queryPermission(options)) === "granted") {
            return true;
        }
        // Request permission. If the user grants permission, return true.
        if ((await fileHandler.requestPermission(options)) === "granted") {
            return true;
        }
        // The user didn't grant permission, so return false.
        return false;
    } catch (permissionError) {
        return false
    }

};

export const verifyPermissionForDirectory = async (dirHandler, mode = "readwrite") => {

    try {
        if (!dirHandler) return false;

        const options = {};
        options.mode = mode;
        // Check if permission was already granted. If so, return true.
        let result = (await dirHandler.queryPermission(options))

        if (result === "granted") {
            return true;
        }


        // Request permission. If the user grants permission, return true.
        if ((await dirHandler.requestPermission(options)) === "granted") {
            return true;
        }


        // The user didn't grant permission, so return false.
        return false;

    } catch (permissionError) {
        return false
    }


};

export const getFileNameWithExtension = (fileName) => {
    if (!fileName.endsWith(DEFAULT_FILE_EXTENSION)) {
        fileName = `${fileName}${DEFAULT_FILE_EXTENSION}`
    }
    return fileName

}

export const createFileWithInDirectory = async (dirHandler, fileName) => {
    try {
        fileName = getFileNameWithExtension(fileName);
        const fileHandler = await dirHandler.getFileHandle(fileName, {
            create: true,
        });
        return fileHandler;

    } catch (writeError) {
        return undefined;
    }

};

export const deleteFileWithInDirectory = async (dirHandler, fileName) => {
    try {
        if (!dirHandler) {
            return false;
        }
        await dirHandler.removeEntry(fileName);
        return true;
    } catch (deleteFileError) {
        return false;
    }


}

export const getDirectoryHandler = async () => {
    try {
        const dirHandler = await window.showDirectoryPicker();
        return dirHandler;
    } catch (directoryPresentError) {
        const errorString = directoryPresentError.toString();
        if (errorString === ERROR_EXCEPTION.USER_DIRECTORY_NOT_SELECT) {
            return undefined
        }
        return null
    }

};

export const getFilesWithinDirectory = async (dirHandler, filterByExtension = DEFAULT_FILE_EXTENSION) => {
    try {
        const files = [];
        if (dirHandler) {
            await verifyPermissionForDirectory(dirHandler)
            for await (const file of dirHandler.values()) {
                if (!filterByExtension || file.name.endsWith(filterByExtension)) {
                    //file["uniqueId"] = generateId()
                    files.push(file);
                }
            }
        }
        return files;

    } catch (filesReadInDirectoryError) {
        return undefined;
    }

}

export const readFile = async (fileHandler) => {
    try {
        if (!fileHandler) {
            return "";
        }
        await verifyPermission(fileHandler, "read"); // we do not need this for read unless user changed mode on system
        const file = await fileHandler.getFile();
        const contents = await file.text();
        return contents;
    } catch (readingFileError) {
        return undefined;
    }


}

export const writeFile = async (fileHandler, contents) => {
    try {
        await verifyPermission(fileHandler, "readwrite")
        const writable = await fileHandler.createWritable();
        await writable.write(contents);
        await writable.close();
        return true;
    } catch (writingFileError) {
        return false;
    }
};