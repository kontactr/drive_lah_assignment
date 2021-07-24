import { DEFAULT_FILE_EXTENSION } from 'config/constants'

export const verifyPermission = async (fileHandler, mode = "readwrite") => {

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
};

export const verifyPermissionForDirectory = async (dirHandler, mode = "readwrite") => {

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
};

export const getFileNameWithExtension = (fileName) => {
    if (!fileName.endsWith(DEFAULT_FILE_EXTENSION)) {
        fileName = `${fileName}${DEFAULT_FILE_EXTENSION}`
    }
    return fileName

}

export const createFileWithInDirectory = async (dirHandler, fileName) => {
    fileName = getFileNameWithExtension(fileName);
    const fileHandler = await dirHandler.getFileHandle(fileName, {
        create: true,
    });
    return fileHandler;
};

export const deleteFileWithInDirectory = async (dirHandler, fileName) => {
    if (!dirHandler) {
        return false;
    }
    await dirHandler.removeEntry(fileName);
    return true;
}

export const getDirectoryHandler = async () => {
    const dirHandler = await window.showDirectoryPicker();
    return dirHandler;
};

export const getFilesWithinDirectory = async (dirHandler, filterByExtension = DEFAULT_FILE_EXTENSION) => {
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
}

export const readFile = async (fileHandler) => {
    if (!fileHandler) {
        return "";
    }
    await verifyPermission(fileHandler, "read"); // we do not need this for read unless user changed mode on system
    const file = await fileHandler.getFile();
    const contents = await file.text();
    return contents;
}

export const writeFile = async (fileHandler, contents) => {
    await verifyPermission(fileHandler, "readwrite")
    const writable = await fileHandler.createWritable();
    await writable.write(contents);
    await writable.close();
};