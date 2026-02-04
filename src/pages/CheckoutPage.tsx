import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonAlert,
  IonLoading,
} from '@ionic/react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { 
  arrowBack, 
  card, 
  wallet, 
  checkmarkCircle,
  cash,
  shieldCheckmark,
} from 'ionicons/icons';
import './CheckoutPage.scss';

// Mock product data - in a real app, this would come from state or API
const mockProducts = [
  { 
    id: 1, 
    name: 'Premium Smart Watch', 
    price: 299.99, 
    category: 'Electronics',
    image: 'watch'
  },
  { 
    id: 2, 
    name: 'Designer T-Shirt', 
    price: 49.99, 
    category: 'Fashion',
    image: 'shirt'
  },
  { 
    id: 3, 
    name: 'Wireless Headphones', 
    price: 129.99, 
    category: 'Audio',
    image: 'headset'
  },
];

// Mock user game credits
const userCredits = 1000.00;

const CheckoutPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const history = useHistory();
  const location = useLocation();
  
  // Get quantity from location state or default to 1
  const searchParams = new URLSearchParams(location.search);
  const quantity = parseInt(searchParams.get('quantity') || '1');
  
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('credits');

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

  const totalPrice = product.price * quantity;
  const hasEnoughCredits = userCredits >= totalPrice;

  const handleCheckout = (): void => {
    setShowConfirmation(true);
  };

  const handleConfirmPurchase = (): void => {
    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // In a real app, you would:
      // 1. Deduct credits from user account
      // 2. Create an order record
      // 3. Send confirmation email
      // 4. Update inventory
    }, 1500);
  };

  const handleSuccessClose = (): void => {
    setShowSuccess(false);
    history.push('/');
  };

  const paymentMethods = [
    { id: 'credits', name: 'Game Credits', icon: wallet, description: `Available: $${userCredits.toFixed(2)}` },
    { id: 'card', name: 'Credit/Debit Card', icon: card, description: 'Pay with your card' },
  ];

  return (
    <IonPage className="checkout-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Order Summary */}
        <IonCard className="summary-card">
          <IonCardHeader>
            <IonCardTitle>Order Summary</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none">
              <IonItem className="product-item">
                <IonLabel>
                  <h2>{product.name}</h2>
                  <p>{product.category}</p>
                  <p>Quantity: {quantity}</p>
                </IonLabel>
                <IonText slot="end" className="product-price">
                  ${product.price.toFixed(2)}
                </IonText>
              </IonItem>
              
              <IonItem className="total-item">
                <IonLabel>
                  <h2>Total</h2>
                </IonLabel>
                <IonText slot="end" className="total-price">
                  ${totalPrice.toFixed(2)}
                </IonText>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Payment Method */}
        <IonCard className="payment-card">
          <IonCardHeader>
            <IonCardTitle>Payment Method</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {paymentMethods.map((method) => (
                <IonItem 
                  key={method.id} 
                  lines="none"
                  className={`payment-method-item ${paymentMethod === method.id ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <IonIcon 
                    slot="start" 
                    icon={method.icon} 
                    color={paymentMethod === method.id ? 'primary' : 'medium'}
                  />
                  <IonLabel>
                    <h2>{method.name}</h2>
                    <p>{method.description}</p>
                  </IonLabel>
                  <IonIcon 
                    slot="end" 
                    icon={checkmarkCircle} 
                    color={paymentMethod === method.id ? 'primary' : 'transparent'}
                  />
                </IonItem>
              ))}
            </IonList>

            {/* Credit/Debit Card Form (conditionally shown) */}
            {paymentMethod === 'card' && (
              <div className="card-form ion-margin-top">
                <IonItem className="ion-margin-bottom">
                  <IonLabel position="floating">Card Number</IonLabel>
                  <IonInput 
                    type="tel" 
                    inputmode="numeric"
                    placeholder="1234 5678 9012 3456"
                  />
                </IonItem>
                
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">Expiry Date</IonLabel>
                        <IonInput 
                          type="tel" 
                          placeholder="MM/YY"
                        />
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">CVV</IonLabel>
                        <IonInput 
                          type="tel" 
                          placeholder="123"
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
            )}

            {/* Credits Warning */}
            {paymentMethod === 'credits' && !hasEnoughCredits && (
              <div className="credits-warning ion-margin-top">
                <IonText color="danger">
                  <p>
                    <IonIcon icon={shieldCheckmark} /> 
                    Insufficient credits. You need ${(totalPrice - userCredits).toFixed(2)} more.
                  </p>
                </IonText>
              </div>
            )}
          </IonCardContent>
        </IonCard>

        {/* Security Info */}
        <IonCard className="security-card">
          <IonCardContent>
            <IonItem lines="none">
              <IonIcon slot="start" icon={shieldCheckmark} color="success" />
              <IonLabel>
                <h3>Secure Payment</h3>
                <p>Your payment information is encrypted and secure</p>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Checkout Button */}
        <div className="checkout-button ion-padding">
          <IonButton 
            expand="block" 
            size="large"
            color="primary"
            onClick={handleCheckout}
            disabled={paymentMethod === 'credits' && !hasEnoughCredits}
          >
            <IonIcon slot="start" icon={cash} />
            Complete Purchase
          </IonButton>
          
          <div className="terms-notice ion-text-center ion-margin-top">
            <IonText color="medium">
              <small>
                By completing your purchase, you agree to our Terms of Service
              </small>
            </IonText>
          </div>
        </div>
      </IonContent>

      {/* Confirmation Alert */}
      <IonAlert
        isOpen={showConfirmation}
        onDidDismiss={() => setShowConfirmation(false)}
        header="Confirm Purchase"
        message={`Are you sure you want to purchase ${quantity} ${product.name}(s) for $${totalPrice.toFixed(2)}?`}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: (): void => {
              console.log('Purchase cancelled');
            }
          },
          {
            text: 'Confirm',
            role: 'confirm',
            handler: handleConfirmPurchase
          }
        ]}
      />

      {/* Success Alert */}
      <IonAlert
        isOpen={showSuccess}
        onDidDismiss={handleSuccessClose}
        header="Purchase Successful!"
        message={`You have successfully purchased ${quantity} ${product.name}(s). Your order has been confirmed.`}
        buttons={[
          {
            text: 'Continue Shopping',
            handler: handleSuccessClose
          }
        ]}
      />

      {/* Loading Spinner */}
      <IonLoading
        isOpen={isProcessing}
        message="Processing your purchase..."
        duration={0}
      />
    </IonPage>
  );
};

export default CheckoutPage;
