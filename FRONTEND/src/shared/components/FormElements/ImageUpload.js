import React, { useRef, useState, useEffect } from 'react'

import Button from './Button'
import './ImageUpload.css'

const ImageUpload = props => {

    const filePickerRef = useRef()
    const [file, setFile] = useState()
    const [previewURL, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)

    const pickImageHandler = () => {
        filePickerRef.current.click()
    }

    useEffect(() => {
        if (!file) {
            return;
        } else {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result)
            }
            fileReader.readAsDataURL(file)
        }
    }, [file])

    const pickedHandler = (e) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            fileIsValid = true
        } else {
            setIsValid(false)
            fileIsValid = false
        }
        props.onInput(props.id, pickedFile, fileIsValid)
    }

    return (
        <div className="form-control">
            <input
                ref={filePickerRef}
                id={props.id}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />

            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewURL && <img src={previewURL} alt='Preview'></img>}
                    {!previewURL && <p>Please pick an image</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>

            {!isValid && <p>{props.errorText}</p>}

        </div>
    )
}

export default ImageUpload