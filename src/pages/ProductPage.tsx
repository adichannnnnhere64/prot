import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonLabel,
  IonChip,
  IonCard,
  IonCardContent,
  IonText,
  IonItem,
  IonList,
  IonListHeader,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import {
  star,
  heart,
  shareSocial,
  arrowBack,
  shirt,
  watch,
  headset,
} from 'ionicons/icons';
import './ProductPage.scss';

// Mock product data - in a real app, this would come from an API or state management
const mockProducts = [
  { 
    id: 1, 
    name: 'Premium Smart Watch', 
    price: 299.99, 
    category: 'Electronics', 
    rating: 4.5, 
    description: 'Advanced smart watch with health tracking, notifications, and long battery life.',
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-Day Battery'],
    colors: ['Black', 'Silver', 'Midnight Blue'],
    image: 'watch', 
    icon: watch, 
    tag: 'trending', 
    stock: 15 
  },
  { 
    id: 2, 
    name: 'Designer T-Shirt', 
    price: 49.99, 
    category: 'Fashion', 
    rating: 4.2,
    description: 'Premium cotton t-shirt with modern design and comfortable fit.',
    features: ['100% Cotton', 'Machine Washable', 'Available in multiple sizes'],
    colors: ['White', 'Black', 'Gray', 'Navy'],
    image: 'shirt', 
    icon: shirt, 
    tag: 'new', 
    stock: 25 
  },
  { 
    id: 3, 
    name: 'Wireless Headphones', 
    price: 129.99, 
    category: 'Audio', 
    rating: 4.7,
    description: 'Noise-cancelling wireless headphones with superior sound quality.',
    features: ['Active Noise Cancellation', '30-hour battery', 'Bluetooth 5.2', 'Voice Assistant'],
    colors: ['Black', 'White'],
    image: 'headset', 
    icon: headset, 
    tag: 'sale', 
    stock: 8 
  },
  // Add other products similarly...
];

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const history = useHistory();

  // Find the product by ID
  const product = mockProducts.find(p => p.id === parseInt(productId || '1'));

  if (!product) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>Product Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="ion-padding ion-text-center">
            <h2>Product not found</h2>
            <IonButton onClick={() => history.push('/')}>Back to Home</IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

const handleBuyNow = (): void => {
  // Navigate to checkout page with product ID and quantity
  history.push(`/checkout/${product?.id}?quantity=1`);
};

  return (
    <IonPage className="product-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{product.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={heart} />
            </IonButton>
            <IonButton>
              <IonIcon slot="icon-only" icon={shareSocial} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Product Image Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <div className="image-placeholder">
              <IonIcon icon={product.icon} className="product-icon-large" />
            </div>
          </div>

        </div>

        {/* Product Info */}
        <div className="product-info ion-padding">
          <div className="product-header">
            <div>
              <IonChip color="medium" outline>
                {product.category}
              </IonChip>
              <h1 className="product-title">{product.name}</h1>

            </div>
            
            <div className="product-price">
              <h2>${product.price.toFixed(2)}</h2>
              <p className="stock-status">
                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
              </p>
            </div>
          </div>

          <p className="product-description">{product.description}</p>

          {/* Features */}
          <div className="product-features ion-margin-top">
            <IonListHeader>
              <IonLabel>Features</IonLabel>
            </IonListHeader>
            <IonList>
              {product.features.map((feature, index) => (
                <IonItem key={index}>
                  <IonIcon slot="start" icon={star} color="primary" size="small" />
                  <IonLabel>{feature}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons ion-padding">
            
            <IonButton 
              expand="block" 
              color="secondary" 
              fill="outline"
              size="large"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </IonButton>
          </div>

          {/* Additional Info */}
          <IonCard>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>Free Shipping</IonLabel>
                  <IonText color="success">On orders over $50</IonText>
                </IonItem>
                <IonItem>
                  <IonLabel>30-Day Returns</IonLabel>
                  <IonText>No questions asked</IonText>
                </IonItem>
                <IonItem>
                  <IonLabel>Warranty</IonLabel>
                  <IonText>1 year manufacturer warranty</IonText>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductPage;
