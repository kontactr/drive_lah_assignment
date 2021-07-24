import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Divider } from 'antd'
import FileList from 'components/FileList'
import AddFileModal from 'components/AddFileModal'
import {
    getDirectoryHandler,
    getFilesWithinDirectory,
    createFileWithInDirectory,
    deleteFileWithInDirectory,
    getFileNameWithExtension,

} from 'utils/FileSystemHelpers'
import './SessionManagement.css'
import { withRouter } from 'react-router'

class SessionManagement extends React.Component {

    state = {
        sessionFiles: [],
        addFileModalVisibility: false,
    }

    openAddFileModal = () => {
        this.setState({ addFileModalVisibility: true })
    }

    closeAddFileModal = () => {
        this.setState({ addFileModalVisibility: false })
    }

    checkIfFileIsPresent = (fileName) => {
        const { sessionFiles } = this.state
        fileName = getFileNameWithExtension(fileName);
        fileName = fileName.trim().toLowerCase();
        const isFileAlreadyPresent = sessionFiles.find(file => {
            const name = file.name.trim().toLowerCase();
            return name === fileName
        })
        if (isFileAlreadyPresent) {
            return "File is already present!"
        } else {
            return ""
        }
    }

    onSelectWorkingDirectory = async () => {
        const { sessionStore } = this.props
        const { setDirectoryHandler } = sessionStore
        try {
            const dirHandler = await getDirectoryHandler();
            if (dirHandler) {
                const files = await getFilesWithinDirectory(dirHandler);
                setDirectoryHandler(dirHandler);
                this.setState({ sessionFiles: files });
            }
        } catch (err) {

        }
    }

    gotoLoginPage = () => {
        const { history, routes } = this.props
        const route = routes.login.generateRoute()
        history.push(route);
    }

    onSessionFileSelect = async (fileHandler) => {

        const { sessionStore } = this.props
        const { setFileHandler } = sessionStore;
        console.log(fileHandler);
        await setFileHandler(fileHandler);
        this.gotoLoginPage();

    }

    addNewSessionfile = (fileHandler) => {
        this.setState((state) => {
            // fileHandler["uniqueId"] = generateId()
            return {
                sessionFiles: [fileHandler, ...state.sessionFiles]
            }
        })
    }

    deleteSessionfile = async (fileToDelete) => {
        const { sessionFiles } = this.state
        const newStateFiles = []
        const resultArray = await Promise.all(sessionFiles.map((file) => file.isSameEntry(fileToDelete)))
        resultArray.forEach((result, index) => {
            if (!result) {
                newStateFiles.push(sessionFiles[index])
            }
        })
        this.setState({
            sessionFiles: newStateFiles
        })

    }

    onNewSessionFileAdd = async (formValues) => {
        const { sessionStore } = this.props
        const { dirHandler, setFileHandler } = sessionStore
        const { fileName, rememberAsCurrentSession } = formValues
        const fileHandler = await createFileWithInDirectory(dirHandler, fileName)
        if (!rememberAsCurrentSession) {
            this.addNewSessionfile(fileHandler);
        } else {
            this.addNewSessionfile(fileHandler);
            setFileHandler(fileHandler)
            this.gotoLoginPage();
        }
    }

    onDeleteSessionFile = async (file) => {
        const { sessionStore } = this.props
        const { dirHandler } = sessionStore
        const result = await deleteFileWithInDirectory(dirHandler, file.name)
        if (result) {
            this.deleteSessionfile(file);
        }
    }


    render() {
        const { sessionStore } = this.props
        const { dirHandler } = sessionStore
        const { sessionFiles, addFileModalVisibility } = this.state

        const isSessionFilesPresent = sessionFiles.length > 0

        return <div>
            <div>
                <Button onClick={this.onSelectWorkingDirectory}>Select Working Directory</Button>
            </div>
            {dirHandler ? <div>
                <div>
                    <Divider>Quick Action</Divider>
                    <div>
                        <Button>Load Previous Session</Button>
                        <Button onClick={this.openAddFileModal}>Add New Session</Button>
                    </div>
                </div>
                {isSessionFilesPresent ? <div>
                    <Divider>Select Session</Divider>
                    <div>
                        <FileList files={sessionFiles} onDelete={this.onDeleteSessionFile} onSessionSelect={this.onSessionFileSelect} />
                    </div>
                </div> : null}
            </div> : <>Please Select Working Directory</>}
            <AddFileModal visible={addFileModalVisibility}
                onCancel={this.closeAddFileModal}
                onFormSubmit={this.onNewSessionFileAdd}
                onFileNameValidation={this.checkIfFileIsPresent} />
        </div>
    }

}

export default withRouter(inject('sessionStore')(observer(SessionManagement)))