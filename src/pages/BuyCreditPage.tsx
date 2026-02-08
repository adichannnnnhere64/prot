import React, { useState, useEffect } from 'react';
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
  IonAlert,
  IonLoading,
  IonInput,
  IonRadioGroup,
  IonRadio,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { 
  // wallet, 
  cash,
  shieldCheckmark,
  card,
  logoPaypal,
  flashOutline,
  arrowBack,
} from 'ionicons/icons';
import './BuyCreditsPage.scss';
import { useAuth } from '@services/useApi';
import apiClient from '@services/APIService';

interface PaymentGateway {
  id: number;
  name: string;
  driver: string;
  display_name: string;
  description: string;
  icon: string;
  is_external: boolean;
  config?: {
    public_key?: string;
  };
}

interface PaymentVerificationData {
  payment_reference: string;
  gateway: string;
  transaction_id?: string;
}

interface PaymentResponse {
  success: boolean;
  message?: string;
  data: {
    requires_action?: boolean;
    redirect_url?: string;
    payment_reference?: string;
    action_data?: {
      client_secret?: string;
      stripe_config?: {
        publishable_key?: string;
      };
      approval_url?: string;
      order_id?: string;
    };
    payment_id?: string;
  };
}

// interface TransactionResponse {
//   success: boolean;
//   message?: string;
//   data: {
//     transaction_id: string;
//     amount: number;
//     currency: string;
//     status: string;
//   };
// }

const BuyCreditsPage: React.FC = () => {
  const history = useHistory();
  const { user, isAuthenticated, refreshUser } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      history.replace('/login');
    }
  }, [isAuthenticated, history]);

  const [amount, setAmount] = useState<string>('');
  const [gateways, setGateways] = useState<PaymentGateway[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string | null>(null); // Add this line

  // Quick amount buttons
  const quickAmounts = [10, 25, 50, 100, 250, 500];

  // Fetch gateways - filter out internal/wallet gateway for credit purchases
  useEffect(() => {
    const fetchGateways = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<{ success: boolean; data: PaymentGateway[] }>('/payment/gateways');
        
        if (response.success) {
          // Filter out internal/wallet gateway - for buying credits, only show external payment methods
          const externalGateways = response.data.filter((g: PaymentGateway) => 
            g.name !== 'internal' && g.is_external
          );
          
          setGateways(externalGateways);
          if (externalGateways.length > 0) {
            // Auto-select Stripe if available, otherwise first gateway
            const stripe = externalGateways.find((g: PaymentGateway) => g.name === 'stripe');
            setSelectedGateway(stripe ? stripe.name : externalGateways[0].name);
          }
        }
      } catch (error) {
        console.error('Error fetching gateways:', error);
        setError('Failed to load payment methods');
      } finally {
        setLoading(false);
      }
    };

    fetchGateways();
  }, []);

  const userCredits = parseFloat(user?.wallet_balance || '0');
  const purchaseAmount = parseFloat(amount || '0');

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
    setError('');
  };

  const validateAmount = (): boolean => {
    if (!amount || purchaseAmount <= 0) {
      setError('Please enter a valid amount');
      return false;
    }

    if (purchaseAmount < 1) {
      setError('Minimum purchase amount is $1');
      return false;
    }

    if (purchaseAmount > 10000) {
      setError('Maximum purchase amount is $10,000');
      return false;
    }

    if (!selectedGateway) {
      setError('Please select a payment method');
      return false;
    }

    return true;
  };

  const handleCheckout = async () => {
    if (!user) {
      history.push('/login');
      return;
    }

    if (!validateAmount()) {
      return;
    }

    // First create a transaction
    try {
      // const transactionData = {
      //   amount: purchaseAmount,
      //   gateway: selectedGateway,
      //   currency: 'USD',
      //   description: `Credit purchase of $${purchaseAmount.toFixed(2)}`,
      //   metadata: {
      //     type: 'credit_purchase',
      //     user_id: user.id,
      //     gateway: selectedGateway,
      //   },
      // };

      // Create transaction via your API
      // Note: You need to create a proper transaction endpoint in your backend
      // For now, we'll generate a temporary transaction ID
      const tempTransactionId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setTransactionId(tempTransactionId);
      
      // If you have a proper transaction endpoint, use this instead:
      /*
      const transactionResponse = await apiClient.post<TransactionResponse>('/transactions', transactionData);
      
      if (!transactionResponse.success) {
        throw new Error('Failed to create transaction');
      }

      setTransactionId(transactionResponse.data.transaction_id);
      */
      
      setTransactionId(tempTransactionId); // Temporary solution
      setShowConfirmation(true);
      
    } catch (error: any) {
      console.error('Transaction creation failed:', error);
      setError(error.message || 'Failed to start purchase process');
    }
  };

  const handleConfirmPurchase = async () => {
    if (!transactionId) {
      setError('Transaction not found');
      return;
    }

    setIsProcessing(true);
    setShowConfirmation(false);

    try {
      const paymentData = {
        transaction_id: transactionId,
        gateway: selectedGateway,
        return_url: `${window.location.origin}/payment/success?transaction=${transactionId}`,
        cancel_url: `${window.location.origin}/payment/cancel?transaction=${transactionId}`,
        description: `Credit Purchase - $${purchaseAmount.toFixed(2)}`,
        customer_email: user?.email,
        customer_name: user?.name,
        currency: 'USD',
        metadata: {
          user_id: user?.id,
          type: 'credit_purchase',
        },
      };

      // Initiate payment - use the correct endpoint
      const response = await apiClient.post<PaymentResponse>('/payment/initiate', paymentData);

      if (!response.success) {
        throw new Error(response.message || 'Payment initiation failed');
      }

      // Handle different gateway responses
      if (response.data.requires_action) {
        if (response.data.redirect_url) {
          // Redirect to payment gateway (PayPal or 3D Secure)
          window.location.href = response.data.redirect_url;
          return;
        } else if (response.data.action_data?.client_secret && selectedGateway === 'stripe') {
          // Handle Stripe payment intent
          await handleStripePayment(response.data, response.data.action_data.client_secret);
          return;
        }
      }

      // If payment completed without action required
      if (response.data.payment_reference) {
        await verifyAndComplete(response.data.payment_reference);
      }

    } catch (error: any) {
      setIsProcessing(false);
      setError(error.message || 'Payment failed. Please try again.');
      console.error('Purchase failed:', error);
    }
  };

  const handleStripePayment = async (responseData: PaymentResponse['data'], clientSecret: string) => {
    try {
      const publishableKey = responseData.action_data?.stripe_config?.publishable_key;
      if (!publishableKey) {
        throw new Error('Stripe configuration missing');
      }

      // Load Stripe.js
      const stripe = await loadStripe(publishableKey);
      
      // Create card element
      const elements = stripe.elements();
      const cardElement = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        }
      });

      // Mount card element
      cardElement.mount('#card-element');

      // Confirm payment
      const { error: stripeError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user?.name || '',
              email: user?.email || '',
            }
          }
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Verify payment with backend
      if (responseData.payment_reference) {
        await verifyAndComplete(responseData.payment_reference);
      }

    } catch (error: any) {
      setIsProcessing(false);
      setError(error.message || 'Stripe payment failed');
      console.error('Stripe payment error:', error);
    }
  };

  const verifyAndComplete = async (paymentReference: string) => {
    try {
      const verificationData: PaymentVerificationData = {
        payment_reference: paymentReference,
        gateway: selectedGateway,
        transaction_id: transactionId || undefined,
      };

      const response = await apiClient.post<PaymentResponse>('/payment/verify', verificationData);

      if (!response.success) {
        throw new Error(response.message || 'Payment verification failed');
      }

      // Add credits to user's wallet
      // You need to create this endpoint in your backend
      const addCreditsResponse = await apiClient.post('/wallet/add-credits', {
        amount: purchaseAmount,
        transaction_id: transactionId,
        payment_reference: paymentReference,
      });

      if (!addCreditsResponse.success) {
        throw new Error('Failed to add credits to wallet');
      }

      setIsProcessing(false);
      setShowSuccess(true);
      
      // Refresh user balance
      if (refreshUser) {
        await refreshUser();
      }

    } catch (error: any) {
      setIsProcessing(false);
      setError(error.message || 'Payment verification failed');
      console.error('Verification failed:', error);
    }
  };

  const loadStripe = async (publishableKey: string): Promise<any> => {
    if (!(window as any).Stripe) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.onload = () => resolve((window as any).Stripe(publishableKey));
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    return (window as any).Stripe(publishableKey);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setAmount('');
    setTransactionId(null);
    history.push('/dashboard');
  };

  const getGatewayIcon = (gateway: PaymentGateway) => {
    switch (gateway.name) {
      case 'stripe':
        return card;
      case 'paypal':
        return logoPaypal;
      default:
        return cash;
    }
  };

  // Render stripe card element if needed
  const renderStripeCardElement = () => {
    if (selectedGateway === 'stripe') {
      return (
        <div className="stripe-card-element" style={{ marginTop: '15px' }}>
          <div id="card-element" style={{ 
            padding: '12px', 
            border: '1px solid #ccc', 
            borderRadius: '8px',
            margin: '10px 0'
          }}>stripe</div>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            Your card details are secured by Stripe and never touch our servers.
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>Loading...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="loading-container">
            <IonLoading isOpen={true} message="Loading..." />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (gateways.length === 0) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => history.goBack()}>
                <IonIcon slot="icon-only" icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonTitle>Buy Credits</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="no-gateways" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <IonCard>
              <IonCardContent>
                <IonIcon icon={cash} size="large" color="medium" />
                <h3>No Payment Methods Available</h3>
                <p>Please contact support or try again later.</p>
                <IonButton onClick={() => history.goBack()}>
                  Go Back
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="buy-credits-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Buy Credits</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Current Balance */}
        <IonCard className="balance-card">
          <IonCardContent>
            <div className="balance-info">
              <IonIcon icon={flashOutline} color="primary" />
              <div>
                <p className="balance-label">Current Balance</p>
                <h2 className="balance-amount">{userCredits.toFixed(2)} Credits</h2>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Amount Input */}
        <IonCard className="amount-card">
          <IonCardHeader>
            <IonCardTitle>Enter Amount</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="amount-input-wrapper">
              <IonItem lines="none" className="amount-input">
                <IonLabel position="stacked">Amount (USD)</IonLabel>
                <IonInput
                  type="number"
                  value={amount}
                  onIonChange={(e) => {
                    setAmount(e.detail.value!);
                    setError('');
                  }}
                  placeholder="0.00"
                  min="1"
                  max="10000"
                  step="0.01"
                  className="custom-input"
                />
              </IonItem>

              {/* Quick Amount Buttons */}
              <div className="quick-amounts">
                <p className="quick-label">Quick select:</p>
                <div className="amount-buttons">
                  {quickAmounts.map((value) => (
                    <IonButton
                      key={value}
                      fill={amount === value.toString() ? 'solid' : 'outline'}
                      size="small"
                      onClick={() => handleQuickAmount(value)}
                      className="quick-button"
                    >
                      ${value}
                    </IonButton>
                  ))}
                </div>
              </div>

              {/* Amount Summary */}
              {purchaseAmount > 0 && (
                <div className="amount-summary">
                  <div className="summary-row">
                    <IonText color="medium">You will receive:</IonText>
                    <IonText color="dark">
                      <strong>{purchaseAmount.toFixed(2)} Credits</strong>
                    </IonText>
                  </div>
                  <p className="exchange-rate">1 USD = 1 Credit</p>
                </div>
              )}
            </div>
          </IonCardContent>
        </IonCard>

        {/* Payment Method */}
        <IonCard className="payment-card">
          <IonCardHeader>
            <IonCardTitle>Payment Method</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonRadioGroup 
              value={selectedGateway} 
              onIonChange={e => {
                setSelectedGateway(e.detail.value);
                setError('');
              }}
            >
              <IonList lines="none">
                {gateways.map((gateway) => (
                  <IonItem 
                    key={gateway.id} 
                    className={`payment-method-item ${selectedGateway === gateway.name ? 'selected' : ''}`}
                  >
                    <IonIcon 
                      slot="start" 
                      icon={getGatewayIcon(gateway)} 
                      color={selectedGateway === gateway.name ? 'primary' : 'medium'}
                    />
                    <IonLabel>
                      <h2>{gateway.display_name}</h2>
                      <p>{gateway.description}</p>
                    </IonLabel>
                    <IonRadio slot="end" value={gateway.name} />
                  </IonItem>
                ))}
              </IonList>
            </IonRadioGroup>

            {/* Stripe Card Element */}
            {renderStripeCardElement()}

            {error && (
              <div className="error-box">
                <IonText color="danger">{error}</IonText>
              </div>
            )}
          </IonCardContent>
        </IonCard>

        {/* Security Info */}
        <IonCard className="security-card">
          <IonCardContent>
            <IonItem lines="none" className="security-item">
              <IonIcon slot="start" icon={shieldCheckmark} color="success" />
              <IonLabel>
                <h3>Secure Payment</h3>
                <p>Your payment information is encrypted and secure</p>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Purchase Button */}
        <div className="purchase-section">
          <IonButton 
            expand="block" 
            size="large"
            color="primary"
            onClick={handleCheckout}
            disabled={!amount || purchaseAmount <= 0 || !selectedGateway}
            className="purchase-button"
          >
            <IonIcon slot="start" icon={cash} />
            {purchaseAmount > 0 ? `Buy ${purchaseAmount.toFixed(2)} Credits` : 'Enter Amount'}
          </IonButton>
          
          <div className="terms-notice">
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
        message={`Are you sure you want to purchase ${purchaseAmount.toFixed(2)} credits for $${purchaseAmount.toFixed(2)} using ${gateways.find(g => g.name === selectedGateway)?.display_name}?`}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Confirm Purchase',
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
        message={`${purchaseAmount.toFixed(2)} credits have been added to your account!`}
        buttons={[
          {
            text: 'Continue',
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

export default BuyCreditsPage;
