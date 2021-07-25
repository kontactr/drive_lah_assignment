import React from 'react';
import PropTypes from 'prop-types';
import { Button, List } from 'antd'
import './FileList.css'
import Avatar from 'antd/lib/avatar/avatar';


const fileListConfig = {
    itemLayout: "horizontal",
}

const FileList = (props) => {
    const { files, onDelete, onSessionSelect } = props
    let fileIndex = 0;
    return (
        <List
            className="file-list"
            {...fileListConfig}

            dataSource={files}
            renderItem={file => (
                <List.Item
                    key={`${file.name}${++fileIndex}`}
                    className="file-item"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSessionSelect(file);
                    }}
                    actions={[
                        <Button danger onClick={(e) => {
                            e.stopPropagation();

                            onDelete(file)
                        }}>Delete</Button>
                    ]}
                >
                    <List.Item.Meta
                        title={<span>{file.name}</span>}
                        avatar={<Avatar src="https://img.icons8.com/fluent/48/000000/file.png"></Avatar>}
                    >
                    </List.Item.Meta>
                </List.Item>
            )}

        />
    )
}

FileList.propTypes = {
    files: PropTypes.array,
    onDelete: PropTypes.func,
    onSessionSelect: PropTypes.func
}

export default React.memo(FileList);