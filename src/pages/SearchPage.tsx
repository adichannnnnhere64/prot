import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonLabel,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonRange,
  IonItem,
  IonList,
  IonCheckbox,
  IonAccordion,
  IonAccordionGroup,
} from '@ionic/react';
import {
  search,
  chevronDown,
} from 'ionicons/icons';
import './SearchPage.scss';
import { useHistory } from 'react-router-dom';

// Mock product data
const mockOperators = [
  { 
    id: 1, 
    name: 'Premium Smart Watch', 
    price: 299.99, 
    category: 'Electronics', 
    rating: 4.5, 
    tag: 'trending',
    stock: 15 
  },
  { 
    id: 2, 
    name: 'Designer T-Shirt', 
    price: 49.99, 
    category: 'Fashion', 
    rating: 4.2,
    tag: 'new',
    stock: 25 
  },
  { 
    id: 3, 
    name: 'Wireless Headphones', 
    price: 129.99, 
    category: 'Audio', 
    rating: 4.7,
    tag: 'sale',
    stock: 8 
  },
  { 
    id: 4, 
    name: 'Gaming Console', 
    price: 499.99, 
    category: 'Gaming', 
    rating: 4.8,
    tag: 'hot',
    stock: 12 
  },
  { 
    id: 5, 
    name: 'Ultrabook Laptop', 
    price: 1299.99, 
    category: 'Computers', 
    rating: 4.6,
    tag: 'premium',
    stock: 5 
  },
  { 
    id: 6, 
    name: 'Fitness Tracker', 
    price: 199.99, 
    category: 'Fitness', 
    rating: 4.3,
    tag: 'new',
    stock: 20 
  },
];

const categories = [
  { id: 'all', name: 'All Categories', count: 50 },
  { id: 'electronics', name: 'Electronics', count: 15 },
  { id: 'fashion', name: 'Fashion', count: 12 },
  { id: 'home', name: 'Home & Garden', count: 8 },
  { id: 'sports', name: 'Sports', count: 7 },
  { id: 'books', name: 'Books', count: 5 },
  { id: 'beauty', name: 'Beauty', count: 3 },
];

const tags = ['trending', 'new', 'sale', 'hot', 'premium', 'bestseller'];

const SearchPage: React.FC = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ lower: 0, upper: 1500 });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');

  // Filter products based on search and filters
  const filteredOperators = mockOperators.filter(product => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase() === selectedCategory;
    
    // Price filter
    const matchesPrice = product.price >= priceRange.lower && 
      product.price <= priceRange.upper;
    
    // Tags filter
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.includes(product.tag);
    
    return matchesSearch && matchesCategory && matchesPrice && matchesTags;
  });

  // Sort products
  const sortedOperators = [...filteredOperators].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default: // popular
        return b.rating - a.rating;
    }
  });

  const handleTagToggle = (tag: string): void => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = (): void => {
    setSearchQuery('');
    setPriceRange({ lower: 0, upper: 1500 });
    setSelectedCategory('all');
    setSelectedTags([]);
    setSortBy('popular');
  };

  const handleViewProduct = (productId: number): void => {
    history.push(`/product/${productId}`);
  };

  return (
    <IonPage className="search-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search Operators</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Search Bar */}
        <div className="search-container ion-padding">
          <IonSearchbar
            value={searchQuery}
            onIonChange={(e) => setSearchQuery(e.detail.value || '')}
            placeholder="Search operators..."
            animated
            showCancelButton="focus"
          />
          
          <div className="search-controls">
            
            <IonButton 
              fill="outline" 
              size="small"
              onClick={clearFilters}
            >
              Clear All
            </IonButton>
            
            <div className="sort-dropdown">
              <IonLabel>Sort by:</IonLabel>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel ion-padding">
            <IonAccordionGroup>
              {/* Price Range */}
              <IonAccordion value="price">
                <IonItem slot="header" color="light">
                  <IonLabel>Price Range</IonLabel>
                  <IonIcon slot="end" icon={chevronDown} />
                </IonItem>
                <div className="ion-padding" slot="content">
                  <IonRange
                    dualKnobs={true}
                    min={0}
                    max={1500}
                    step={10}
                    value={priceRange}
                  >
                    <IonLabel slot="start">${priceRange.lower}</IonLabel>
                    <IonLabel slot="end">${priceRange.upper}</IonLabel>
                  </IonRange>
                </div>
              </IonAccordion>

              {/* Categories */}
              <IonAccordion value="categories">
                <IonItem slot="header" color="light">
                  <IonLabel>Categories</IonLabel>
                  <IonIcon slot="end" icon={chevronDown} />
                </IonItem>
                <div className="ion-padding" slot="content">
                  <IonList>
                    {categories.map(category => (
                      <IonItem key={category.id}>
                        <IonCheckbox
                          checked={selectedCategory === category.id}
                          onIonChange={() => setSelectedCategory(category.id)}
                        />
                        <IonLabel>
                          {category.name}
                          <p>{category.count} items</p>
                        </IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </div>
              </IonAccordion>

              {/* Tags */}
              <IonAccordion value="tags">
                <IonItem slot="header" color="light">
                  <IonLabel>Tags</IonLabel>
                  <IonIcon slot="end" icon={chevronDown} />
                </IonItem>
                <div className="tags-container ion-padding" slot="content">
                  {tags.map(tag => (
                    <IonChip
                      key={tag}
                      outline={!selectedTags.includes(tag)}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </IonChip>
                  ))}
                </div>
              </IonAccordion>
            </IonAccordionGroup>
          </div>
        )}

        {/* Results Info */}
        <div className="results-info ion-padding">
          <h3>
            {sortedOperators.length} {sortedOperators.length === 1 ? 'operator' : 'operators'} found
          </h3>
        </div>

        {/* Operators Grid */}
        <div className="products-grid ion-padding">
          <IonGrid>
            <IonRow>
              {sortedOperators.map(product => (
                <IonCol size="6" sizeMd="4" sizeLg="3" key={product.id}>
                  <IonCard className="product-card" button onClick={() => handleViewProduct(product.id)}>
                    <div className="product-image">
                      <div className="product-tag">
                        <IonChip color="primary" className="tag-chip">
                          {product.tag}
                        </IonChip>
                      </div>
                    </div>
                    
                    <IonCardHeader>
                      <IonCardTitle>{product.name}</IonCardTitle>
                    </IonCardHeader>
                    
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>

          {/* No Results */}
          {sortedOperators.length === 0 && (
            <div className="no-results ion-text-center ion-padding">
              <IonIcon icon={search} size="large" />
              <h3>No Operator found</h3>
              <p>Try adjusting your search or filters</p>
              <IonButton onClick={clearFilters}>
                Clear All Filters
              </IonButton>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
