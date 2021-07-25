import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Divider, Modal } from 'antd'
import FileList from 'components/FileList'
import EmptyWrapper from 'components/EmptyWrapper'
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
import { DEFAULT_FILE_EXTENSION } from 'config/constants'

class SessionManagement extends React.Component {

    state = {

        sessionFiles: [],
        addFileModalVisibility: false,
        enablePreviousVersion: false,
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

    setDirectoryFiles = async (dirHandler) => {

        const { sessionStore } = this.props
        const { setDirectoryHandler } = sessionStore

        const files = await getFilesWithinDirectory(dirHandler);
        setDirectoryHandler(dirHandler);
        this.setState({ sessionFiles: files });

    }

    onSelectWorkingDirectory = async () => {
        try {
            const dirHandler = await getDirectoryHandler();
            if (dirHandler) {
                this.setDirectoryFiles(dirHandler)
            }
        } catch (err) {

        }
    }

    gotoLoginPage = () => {
        const { history, routes } = this.props
        const route = routes.login.generateRoute()
        console.log(7444)
        history.push(route);
    }

    onSessionFileSelect = async (fileHandler) => {

        const { sessionStore } = this.props
        const { setFileHandler } = sessionStore;
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

    onDeleteSessionFile = (file) => {
        const conig = {
            title: 'Delete Session File',
            content: <div>Are you sure, you want to delete <span className="delete-modal-file-name">{file.name}</span> file ?</div>
        }
        Modal.confirm({
            ...conig,
            onOk: async () => {
                const { sessionStore } = this.props
                const { dirHandler } = sessionStore
                const result = await deleteFileWithInDirectory(dirHandler, file.name)
                if (result) {
                    this.deleteSessionfile(file);
                }
                return result;
            }
        })
    }

    onLoadPreviousVersion = async () => {
        const { sessionStore } = this.props
        const { retrivePersistHandlers,
            setDirectoryHandler,
            setFileHandler,
        } = sessionStore

        const response = await retrivePersistHandlers()
        if (response) {
            await setFileHandler(response.fileHandler)
            await this.setDirectoryFiles(response.dirHandler)
            await setDirectoryHandler(response.dirHandler)


            this.gotoLoginPage();
        } else {
        }
    }

    render() {
        const { sessionStore } = this.props
        const { dirHandler } = sessionStore
        const { sessionFiles, addFileModalVisibility, enablePreviousVersion } = this.state

        const isSessionFilesPresent = sessionFiles.length > 0


        return <div className="session-management-container">
            <div className="session-root-config-options">
                <Button type="primary" onClick={this.onSelectWorkingDirectory}>Select Working Directory</Button>
                {enablePreviousVersion && <Button className="session-previous-version-button" onClick={this.onLoadPreviousVersion}>Load Previous Session</Button>}
            </div>
            <div className="session-working-directory-container">
                {dirHandler ? <div className="session-directory-data-container">
                    <div>
                        <Divider>Quick Action</Divider>
                        <div className="session-quick-action-container">
                            <div className="session-directory-name-container">Your Current Working Directory is :
                                <span className="session-directory-name">
                                    {` ${dirHandler.name} `}
                                </span>
                            </div>
                            {/* <Button>Load Previous Session</Button> */}
                            <Button type="dashed" onClick={this.openAddFileModal}>Add New Session</Button>
                        </div>
                    </div>
                    {isSessionFilesPresent ? <div>
                        <Divider>Select Session</Divider>
                        <div>
                            <FileList files={sessionFiles} onDelete={this.onDeleteSessionFile} onSessionSelect={this.onSessionFileSelect} />
                        </div>
                    </div> :
                        <div className="empty-container-data">
                            <EmptyWrapper description={(
                                <div>No Session Files ({DEFAULT_FILE_EXTENSION}) Found!</div>
                            )}></EmptyWrapper>
                        </div>
                    }
                </div> : <div className="empty-container-data"> <EmptyWrapper description={(<div>Please Select Your Working Directory!</div>)} /> </div>}
            </div>
            <AddFileModal visible={addFileModalVisibility}
                onCancel={this.closeAddFileModal}
                onFormSubmit={this.onNewSessionFileAdd}
                onFileNameValidation={this.checkIfFileIsPresent} />
        </div>
    }

    async componentDidMount() {
        const { sessionStore } = this.props
        const { dirHandler, retrivePersistHandlers,
            setIsPrevVersionPresent,
            isPrevVersionPresent,
        } = sessionStore

        if (dirHandler) {
            await this.setDirectoryFiles(dirHandler)
            if (isPrevVersionPresent) {
                this.setState({ enablePreviousVersion: true })
            }
        } else {
            const response = await retrivePersistHandlers()
            if (response) {
                setIsPrevVersionPresent(true);
                this.setState({ enablePreviousVersion: true })
            } else {
                setIsPrevVersionPresent(false);
            }

        }

    }

}

export default withRouter(inject('sessionStore')(observer(SessionManagement)))

// <div>Please Select Working Directory</div>