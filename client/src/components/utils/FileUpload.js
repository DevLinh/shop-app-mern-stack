import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import axios from 'axios'

function FileUpload(props) {
    const [Images, setImages] = useState([])

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append('file', files[0])
        //save the image we chose inside the Node Server

        axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])
                } else {
                    console.log(response.data)
                    console.log('Failed to save the image in sever')
                }
            })
    }

    //create a function that delete the clicked image
    const onDelete = (image) => {
        //get the index of this image in Images
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                multiple={false}
                maxSize={800000000}
                onDrop={onDrop}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                {
                    Images.map((image, index) => (
                        <div key={index} onClick={() => onDelete(image)}>
                            <img
                                style={{ minWidth: '300px', width: '300px', height: '240px' }}
                                src={`http://localhost:5000/${image}`} alt={`productImg-${index}`}
                            />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default FileUpload

