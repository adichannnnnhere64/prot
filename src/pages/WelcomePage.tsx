import {
  IonAccordion,
  IonAccordionGroup,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonChip,
  IonBadge,
  IonLabel,
  IonList,
  IonItem,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';
import { 
  star, 
  cart, 
  heart, 
  shareSocial,
  logoFacebook,
  logoTwitter,
  logoInstagram,
  logoLinkedin,
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
      title: 'New Arrivals',
      subtitle: 'Latest Collection',
      description: 'Fresh styles just arrived',
      color: 'secondary',
      bgColor: 'var(--ion-color-secondary)',
      image: 'assets/slide2.jpg',
      buttonText: 'Explore'
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
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tauronic Store</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={cart} />
              <IonBadge color="danger" className="cart-badge">3</IonBadge>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
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
                      <div className="product-tag">
                        <IonChip color={product.color} className="tag-chip">
                          {product.tag}
                        </IonChip>
                      </div>
                      <div className="product-actions">
                        <IonButton fill="clear" color="danger" size="small">
                          <IonIcon slot="icon-only" icon={heart} />
                        </IonButton>
                        <IonButton fill="clear" color="medium" size="small">
                          <IonIcon slot="icon-only" icon={shareSocial} />
                        </IonButton>
                      </div>
                      <div className="image-placeholder">
                        <IonIcon icon={product.icon} className="product-icon" />
                      </div>
                    </div>
                    
                    <IonCardHeader>
                      <IonCardSubtitle>{product.category}</IonCardSubtitle>
                      <IonCardTitle>{product.name}</IonCardTitle>
                      <div className="product-rating">
                        {[...Array(5)].map((_, i) => (
                          <IonIcon 
                            key={i} 
                            icon={star} 
                            color={i < Math.floor(product.rating) ? 'warning' : 'medium'}
                            className="star-icon"
                          />
                        ))}
                        <span className="rating-text">{product.rating}</span>
                      </div>
                    </IonCardHeader>
                    
                    <IonCardContent>
                      <div className="product-footer">
                        <div className="product-price">
                          <h3>${product.price.toFixed(2)}</h3>
                          {product.id === 3 && (
                            <span className="original-price">$159.99</span>
                          )}
                        </div>
                        <IonButton 
                          color="primary" 
                          fill="solid" 
                          size="small"
                          className="add-to-cart"
                        >
                          <IonIcon slot="start" icon={cart} />
                          Add
                        </IonButton>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </section>

        {/* Categories Section */}
        <section className="categories-section ion-padding">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Beauty'].map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-icon">
                  <IonIcon icon={[watch, shirt, bag, fitness, bag, bag][index]} />
                </div>
                <h4>{category}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* About Section (Collapsible) */}
        <section className="about-section ion-padding">
          <IonCard>
            <IonAccordionGroup>
              <IonAccordion value='first'>
                <IonCardHeader slot='header'>
                  <IonText>Click to find out more!</IonText>
                  <IonCardTitle>
                    <h3>Tauronic Store - Premium Shopping Experience</h3>
                  </IonCardTitle>
                  <IonCardSubtitle>
                    <h2>About Our Store</h2>
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent slot='content'>
                  <h2>Why Choose Tauronic Store?</h2>
                  <p>
                    Tauronic Store is your one-stop destination for premium products 
                    across various categories. We combine cutting-edge technology with 
                    exceptional customer service to deliver an unparalleled shopping experience.
                  </p>
                  
                  <h2>Our Promise:</h2>
                  <ul>
                    <li>✅ 100% Authentic Products</li>
                    <li>✅ Free Shipping on Orders Over $50</li>
                    <li>✅ 30-Day Return Policy</li>
                    <li>✅ 24/7 Customer Support</li>
                    <li>✅ Secure Payment Gateway</li>
                  </ul>
                  
                  <div className="store-stats">
                    <div className="stat">
                      <h3>10K+</h3>
                      <p>Happy Customers</p>
                    </div>
                    <div className="stat">
                      <h3>500+</h3>
                      <p>Brands Available</p>
                    </div>
                    <div className="stat">
                      <h3>24/7</h3>
                      <p>Support Available</p>
                    </div>
                  </div>
                </IonCardContent>
              </IonAccordion>
            </IonAccordionGroup>
          </IonCard>
        </section>

        {/* Footer - Now inside IonContent */}
        <footer className="store-footer ion-padding">
          <div className="footer-content">
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="4">
                  <div className="footer-section">
                    <h3>Tauronic Store</h3>
                    <p>Your premium shopping destination. Quality products, exceptional service.</p>
                    <div className="social-icons">
                      <IonButton fill="clear" color="dark">
                        <IonIcon icon={logoFacebook} />
                      </IonButton>
                      <IonButton fill="clear" color="dark">
                        <IonIcon icon={logoTwitter} />
                      </IonButton>
                      <IonButton fill="clear" color="dark">
                        <IonIcon icon={logoInstagram} />
                      </IonButton>
                      <IonButton fill="clear" color="dark">
                        <IonIcon icon={logoLinkedin} />
                      </IonButton>
                    </div>
                  </div>
                </IonCol>
                
                <IonCol size="6" sizeMd="2">
                  <div className="footer-section">
                    <h4>Shop</h4>
                    <IonList lines="none">
                      <IonItem>All Products</IonItem>
                      <IonItem>New Arrivals</IonItem>
                      <IonItem>Best Sellers</IonItem>
                      <IonItem>Sales</IonItem>
                    </IonList>
                  </div>
                </IonCol>
                
                <IonCol size="6" sizeMd="2">
                  <div className="footer-section">
                    <h4>Help</h4>
                    <IonList lines="none">
                      <IonItem>Contact Us</IonItem>
                      <IonItem>Shipping Info</IonItem>
                      <IonItem>Returns</IonItem>
                      <IonItem>FAQs</IonItem>
                    </IonList>
                  </div>
                </IonCol>
                
                <IonCol size="12" sizeMd="4">
                  <div className="footer-section">
                    <h4>Newsletter</h4>
                    <p>Subscribe to get special offers and updates</p>
                    <div className="newsletter-form">
                      <IonItem className="newsletter-input">
                        <IonLabel position="floating">Email Address</IonLabel>
                        <input type="email" placeholder="Enter your email" />
                      </IonItem>
                      <IonButton expand="block" color="primary" className="subscribe-btn">
                        Subscribe
                      </IonButton>
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
            
            <div className="footer-bottom">
              <p>© 2024 Tauronic Store. All rights reserved.</p>
              <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
