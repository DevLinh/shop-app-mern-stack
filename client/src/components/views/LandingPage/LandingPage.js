import React, { useState, useEffect } from 'react'
import { Card, Col, Icon, Row } from 'antd';
import Axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
const { Meta } = Card;

function LandingPage() {

    const [Products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        Axios.post('/api/product/getProducts')
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.products)
                    console.log(response.data.products)
                } else {
                    console.log('Failed to load products!')
                }
            })
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2> Let's share your love <Icon type='heart' /></h2>
            </div>

            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div>
                :
                <div>
                    <Row gutter={[16, 16]}>
                        {Products.map((product, index) => (
                            <Col lg={6} md={8} xs={24}>
                                <Card
                                    hoverable
                                    cover={<a href={'/'}>
                                        <ImageSlider images={product.images} />
                                    </a>}
                                >
                                    <Meta
                                        title={product.title}
                                        description={`$${product.price}`}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            }
        </div>

    )
}

export default LandingPage
