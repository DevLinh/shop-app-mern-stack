import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd'
import FileUpload from '../../utils/FileUpload'

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    { key: 1, value: 'Africa' },
    { key: 2, value: 'Europe' },
    { key: 3, value: 'Asia' },
    { key: 4, value: 'North America' },
    { key: 5, value: 'South America' },
    { key: 6, value: 'Australia' },
    { key: 7, value: 'Antarctica' }
]

function UploadProductPage() {
    const [ContinentValue, setContinentValue] = useState(1)
    const [TitleValue, setTitleValue] = useState('')
    const [DescriptionValue, setDescriptionValue] = useState('')
    const [PriceValue, setPriceValue] = useState(0)

    const [Images, setImages] = useState([])

    const onTitleValueChange = (e) => {
        setTitleValue(e.currentTarget.value)
    }

    const onDescriptionValueChange = (e) => {
        setDescriptionValue(e.currentTarget.value)
    }

    const onPriceValueChange = (e) => {
        setPriceValue(e.currentTarget.value)
    }

    const onContinentsSelectChange = (e) => {
        setContinentValue(e.currentTarget.value);
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Travel Product</Title>
            </div>

            <Form>
                {/* Drop Image Zone - We do this later */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input value={TitleValue} onChange={onTitleValueChange} />
                <br />
                <br />
                <label>Description</label>
                <TextArea value={DescriptionValue} onChange={onDescriptionValueChange} />
                <br />
                <br />
                <label>Price($)</label>
                <Input value={PriceValue} onChange={onPriceValueChange} />
                <br />
                <br />
                <select onChange={onContinentsSelectChange} value={ContinentValue}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.value}>{item.value}</option>
                    ))}
                </select>

                <br />
                <br />
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
