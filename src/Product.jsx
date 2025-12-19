import React, { useState } from 'react';
import { Row, Col, Image, Button, Card, Divider, Typography, List } from 'antd';
import EnsoKit from './assets/images/EnsoKit.png'
import JournalDeck from './assets/images/JournalDeck.png'
import MandalaKit from './assets/images/MandalaKit.png'
import ProductivityDeck from './assets/images/ProductivityDeck.png'
import ZentangleKit from './assets/images/ZentangleKit.png'
const { Title, Text, Paragraph } = Typography;


const productsData = {
  ensoBox: {
    id: 'enso-box',
    name: 'Enso Box',
    price: [100,799,40], 
    inStock: true,
    images: [
      EnsoKit,
      EnsoKit,
      'Thumb2',
      'Thumb3',
      'Thumb4',
      'Thumb5',
      'Thumb6',
    ],
    description: 'Our physical toolkit for emotional well-being offers a break from screen time and encourages exploration of your senses and creating a safe space to discover new ways of coping with stress.',
    included: [
      'Mandala Kit: Black Sheets 10 | Complete Design Sheets 4 | Half Trace Sheets 2 | Full Trace Sheet 2 | Set of 12 Watercolor Pencils | Micro Pan Tip 2 | Fine Tip Pen 1 | Drawing Pencil 1',
      'Enso Box Content: 30 Day Suggested Plan Sheet 1',
      'Zentangle Kit: Blank Sheets 10 | Trace Sheets 10 |',
      'Journal with 4 Sticker Sheets 1 | Bubble Pop Fidget 1',
      'Kalimba Kit: 1 Complete 17 Key Kalimba',
      'Fridge Magnets: 1 Pack of 30',
    ],
  },
  journalDeck: {
    id: 'journal-deck',
    name: 'Journal Deck',
    price: [20,799,40],
    inStock: true,
    images: [JournalDeck,JournalDeck,'Thumb2','Thumb3'],
    description: 'Description for Journal Deck',
    included: [],
  },
  productivityDeck: {
    id: 'productivity-deck',
    name: 'Productivity Deck',
    price: [20,799,40],
    inStock: true,
    images: [ProductivityDeck,ProductivityDeck,'Thumb2','Thumb3'],
    description: 'Description for Productivity Deck',
    included: [],
  },
  mandalaKit: {
    id: 'mandala-kit',
    name: 'Mandala Kit',
    price: [20,799,40],
    inStock: true,
    images: [MandalaKit, MandalaKit,'Thumb2','Thumb3','Thumb4','Thumb5'],
    description: 'Description for Mandala Kit',
    included: [],
  },
  zentangleKit: {
    id: 'zentangle-kit',
    name: 'Zentangle Kit',
    price: [20,799,40],
    inStock: true,
    images: [ZentangleKit,ZentangleKit,'Thumb2','Thumb3'],
    description: 'Description for Zentangle Kit',
    included: [],
  },
};

const ProductPage = () => {
  const [featured, setFeatured] = useState(productsData.ensoBox);
  const [others, setOthers] = useState([
    productsData.journalDeck,
    productsData.productivityDeck,
    productsData.mandalaKit,
    productsData.zentangleKit,
  ]);
  const [selectedImage, setSelectedImage] = useState(featured.images[0]);

  const handleThumbnailClick = (img) => {
    setSelectedImage(img);
  };

  const handleProductClick = (product) => {
    const newOthers = others.filter((p) => p.id !== product.id).concat(featured);
    setFeatured(product);
    setSelectedImage(product.images[0]);
    setOthers(newOthers);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Product Details Section */}
      <Row gutter={16}>
        <Col span={4}>
          <div
            style={{
              maxHeight: '400px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {featured.images.slice(1).map((img, index) => (
              <Image
                key={index}
                src={img}
                width={50}
                height={50}
                style={{ cursor: 'pointer' }}
                onClick={() => handleThumbnailClick(img)}
                preview={false}
              />
            ))}
          </div>
        </Col>
        {/* Main Image */}
        <Col span={8}>
          <Image
            src={selectedImage}
            width={400}
            height={400}
            preview={{
              visible: false, // Preview is enabled, but we can control if needed
            }}
          />
        </Col>
        {/* Product Info */}
        <Col span={12}>
          <Title level={2}>{featured.name}</Title>
          <Paragraph style={{color: 'green'}}>{featured.inStock ? 'In Stock' : 'Out of Stock'}</Paragraph>
          <Text strong>${featured.price[0].toFixed(2)}</Text>
          <Paragraph>{featured.description}</Paragraph>
          <Title level={4}>What’s Included</Title>
          <List
            dataSource={featured.included}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Button type="primary" style={{ marginTop: '16px', background: "#79A808" }}>
            Buy
          </Button>
        </Col>
      </Row>

      <Divider />

      <Title level={3}>Other Items</Title>
      <Row gutter={16}>
        {others.map((product) => (
          <Col span={6} key={product.id}>
            <Card
              hoverable
              cover={<Image src={product.images[0]} preview={false} />}
              onClick={() => handleProductClick(product)}
            >
              <Card.Meta
                title={product.name}
                description={`USD: ${product.price[0].toFixed(2)} INR: ${product.price[1].toFixed(2)} AED: ${product.price[2].toFixed(2)}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductPage;