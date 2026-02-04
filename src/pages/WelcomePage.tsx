import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  // IonChip,
  // IonLabel,
} from '@ionic/react';
import { 
  chevronForward,
  flame,
  trendingUp,
  shieldCheckmark,
  cash,
  bag,
  shirt,
  watch,
  headset,
  gameController,
  laptop,
	// walletOutline,
  fitness,
  camera,
} from 'ionicons/icons';
import './WelcomePage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const WelcomePage: React.FC = () => {
  // Product data
  const products = [
    { id: 1, name: 'Premium Smart Watch', price: 299.99, category: 'Electronics', rating: 4.5, image: 'watch', color: 'primary', icon: watch, tag: 'trending' },
    { id: 2, name: 'Designer T-Shirt', price: 49.99, category: 'Fashion', rating: 4.2, image: 'shirt', color: 'secondary', icon: shirt, tag: 'new' },
    { id: 3, name: 'Wireless Headphones', price: 129.99, category: 'Audio', rating: 4.7, image: 'headset', color: 'tertiary', icon: headset, tag: 'sale' },
    { id: 4, name: 'Gaming Console', price: 499.99, category: 'Gaming', rating: 4.8, image: 'game', color: 'success', icon: gameController, tag: 'hot' },
    { id: 5, name: 'Ultrabook Laptop', price: 1299.99, category: 'Computers', rating: 4.6, image: 'laptop', color: 'warning', icon: laptop, tag: 'premium' },
    { id: 6, name: 'Fitness Tracker', price: 199.99, category: 'Fitness', rating: 4.3, image: 'fitness', color: 'danger', icon: fitness, tag: 'new' },
    { id: 7, name: 'DSLR Camera', price: 899.99, category: 'Photography', rating: 4.9, image: 'camera', color: 'dark', icon: camera, tag: 'professional' },
    { id: 8, name: 'Leather Backpack', price: 89.99, category: 'Accessories', rating: 4.4, image: 'bag', color: 'medium', icon: bag, tag: 'bestseller' },
  ];

  // Features data
  const features = [
    { icon: shieldCheckmark, title: 'Secure Payment', description: '100% safe & secure transactions' },
    { icon: cash, title: 'Money Back Guarantee', description: '30-day return policy' },
    { icon: trendingUp, title: 'Best Prices', description: 'Price match guarantee' },
    { icon: flame, title: 'Fast Delivery', description: 'Free shipping over $50' },
  ];

  // Hero slides data
  const heroSlides = [
    {
      title: 'Summer Sale 2024',
      subtitle: 'Up to 50% Off',
      description: 'Discover amazing deals on top brands',
      color: 'primary',
      bgColor: 'var(--ion-color-primary)',
      image: 'assets/slide1.jpg',
      buttonText: 'Shop Now'
    },
    {
      title: 'Free Shipping',
      subtitle: 'On Orders Over $50',
      description: 'No minimum purchase required',
      color: 'success',
      bgColor: 'var(--ion-color-success)',
      image: 'assets/slide3.jpg',
      buttonText: 'Start Shopping'
    },
  ];

  return (
    <IonPage className='welcome-page'>

      
      <IonContent fullscreen className="store-content">
        {/* Hero Slider */}
        <section className="hero-slider">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            className="hero-swiper"
          >
            {heroSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div 
                  className="hero-slide"
                  style={{ backgroundColor: slide.bgColor }}
                >
                  <div className="slide-content">
                    <h2 className="slide-title">{slide.title}</h2>
                    <h3 className="slide-subtitle">{slide.subtitle}</h3>
                    <p className="slide-description">{slide.description}</p>
                    <IonButton 
                      color="light" 
                      fill="solid" 
                      size="large"
                      className="slide-button"
                    >
                      {slide.buttonText}
                      <IonIcon slot="end" icon={chevronForward} />
                    </IonButton>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Features Section */}
        <section className="features-section ion-padding">
          <IonGrid>
            <IonRow>
              {features.map((feature, index) => (
                <IonCol size="6" sizeMd="3" key={index}>
                  <div className="feature-card">
                    <div className="feature-icon" >
                      <IonIcon icon={feature.icon} />
                    </div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </section>

        {/* Products Section */}
        <section className="products-section ion-padding">
          <div className="section-header">
            <h2>Featured Products</h2>
            <IonButton fill="clear" color="primary">
              View All <IonIcon slot="end" icon={chevronForward} />
            </IonButton>
          </div>
          
          <IonGrid>
            <IonRow>
              {products.map((product) => (
                <IonCol size="6" sizeMd="3" key={product.id}>
                  <IonCard className="product-card"

										   button
    routerLink={`/product/${product.id}`}  // Add this line

									>
                    <div className="product-image">
                      <div className="image-placeholder">
                        <IonIcon icon={product.icon} className="product-icon" />
                      </div>
                    </div>
                    
                    <IonCardHeader>
                      <IonCardSubtitle>{product.category}</IonCardSubtitle>
                      <IonCardTitle>{product.name}</IonCardTitle>
                    </IonCardHeader>
                    
                    <IonCardContent>
                      <div className="product-footer">
                        <div className="product-price">
                          <h3>${product.price.toFixed(2)}</h3>
                          {product.id === 3 && (
                            <span className="original-price">$159.99</span>
                          )}
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
