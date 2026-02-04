import React, { useState, useEffect, JSX } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonBadge,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonNote,
  IonLoading,
  IonAlert,
  IonText,
} from '@ionic/react';
import {
  search,
  eye,
  download,
  arrowBack,
  arrowForward,
  checkmarkCircle,
  time,
  closeCircle,
  refresh,
} from 'ionicons/icons';
import './OrderListPage.scss';
import { useHistory } from 'react-router-dom';

// Mock order data - in a real app, this would come from an API
const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'Andrew P',
    email: 'john@example.com',
    total: 299.99,
    date: '2024-01-15',
    status: 'completed',
    items: 2,
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    total: 149.99,
    date: '2024-01-14',
    status: 'processing',
    items: 1,
    paymentMethod: 'PayPal',
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    total: 499.99,
    date: '2024-01-13',
    status: 'shipped',
    items: 3,
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'ORD-004',
    customer: 'Alice Williams',
    email: 'alice@example.com',
    total: 89.99,
    date: '2024-01-12',
    status: 'pending',
    items: 1,
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-005',
    customer: 'Charlie Brown',
    email: 'charlie@example.com',
    total: 1299.99,
    date: '2024-01-11',
    status: 'completed',
    items: 5,
    paymentMethod: 'Cryptocurrency',
  },
  {
    id: 'ORD-006',
    customer: 'Emma Davis',
    email: 'emma@example.com',
    total: 79.99,
    date: '2024-01-10',
    status: 'cancelled',
    items: 1,
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-007',
    customer: 'Michael Wilson',
    email: 'michael@example.com',
    total: 399.99,
    date: '2024-01-09',
    status: 'processing',
    items: 2,
    paymentMethod: 'PayPal',
  },
  {
    id: 'ORD-008',
    customer: 'Sarah Miller',
    email: 'sarah@example.com',
    total: 229.99,
    date: '2024-01-08',
    status: 'shipped',
    items: 3,
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-009',
    customer: 'David Taylor',
    email: 'david@example.com',
    total: 599.99,
    date: '2024-01-07',
    status: 'completed',
    items: 4,
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'ORD-010',
    customer: 'Lisa Anderson',
    email: 'lisa@example.com',
    total: 99.99,
    date: '2024-01-06',
    status: 'pending',
    items: 1,
    paymentMethod: 'PayPal',
  },
];

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const OrderListPage: React.FC = () => {
  const history = useHistory();
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [showExportAlert, setShowExportAlert] = useState(false);
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    // Apply filters and search
    let result = [...orders];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'total-desc':
          return b.total - a.total;
        case 'total-asc':
          return a.total - b.total;
        default:
          return 0;
      }
    });
    
    setFilteredOrders(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, statusFilter, orders, sortBy]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const getStatusBadge = (status: string): JSX.Element => {
    switch (status) {
      case 'completed':
        return <IonBadge color="success"><IonIcon icon={checkmarkCircle} /> Completed</IonBadge>;
      case 'processing':
        return <IonBadge color="warning"><IonIcon icon={time} /> Processing</IonBadge>;
      case 'shipped':
        return <IonBadge color="primary">Shipped</IonBadge>;
      case 'pending':
        return <IonBadge color="medium"><IonIcon icon={time} /> Pending</IonBadge>;
      case 'cancelled':
        return <IonBadge color="danger"><IonIcon icon={closeCircle} /> Cancelled</IonBadge>;
      default:
        return <IonBadge color="medium">{status}</IonBadge>;
    }
  };

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'completed': return 'success';
  //     case 'processing': return 'warning';
  //     case 'shipped': return 'primary';
  //     case 'pending': return 'medium';
  //     case 'cancelled': return 'danger';
  //     default: return 'medium';
  //   }
  // };

  const handleViewOrder = (orderId: string): void => {
    history.push(`/orders/${orderId}`);
  };

  const handleExportOrders = (): void => {
    setLoading(true);
    // Simulate export process
    setTimeout(() => {
      setLoading(false);
      setShowExportAlert(true);
    }, 1500);
  };

  const handleRefresh = ():void  => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrders([...mockOrders]); // In real app, fetch from API
      setLoading(false);
    }, 1000);
  };

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      paginationButtons.push(
        <IonButton
          key={i}
          fill={currentPage === i ? 'solid' : 'outline'}
          size="small"
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </IonButton>
      );
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationButtons.push(
        <IonText key={i} color="medium">
          ...
        </IonText>
      );
    }
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <IonPage className="order-list-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Order Management</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Stats Overview */}
        <div className="stats-overview ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol size="6" sizeMd="3">
                <IonCard className="stat-card">
                  <IonCardContent>
                    <h3>{orders.length}</h3>
                    <p>Total Orders</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="6" sizeMd="3">
                <IonCard className="stat-card">
                  <IonCardContent>
                    <h3>${totalRevenue.toFixed(2)}</h3>
                    <p>Total Revenue</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="6" sizeMd="3">
                <IonCard className="stat-card">
                  <IonCardContent>
                    <h3>{orders.filter(o => o.status === 'completed').length}</h3>
                    <p>Completed</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="6" sizeMd="3">
                <IonCard className="stat-card">
                  <IonCardContent>
                    <h3>{orders.filter(o => o.status === 'pending').length}</h3>
                    <p>Pending</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        {/* Controls */}
        <div className="controls-section ion-padding">
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol size="12" sizeMd="4">
                <IonSearchbar
                  value={searchQuery}
                  onIonChange={(e) => setSearchQuery(e.detail.value || '')}
                  placeholder="Search orders..."
                  animated
                />
              </IonCol>
              <IonCol size="6" sizeMd="3">
                <IonItem>
                  <IonLabel>Status</IonLabel>
                  <IonSelect
                    value={statusFilter}
                    onIonChange={(e) => setStatusFilter(e.detail.value)}
                    interface="popover"
                  >
                    {statusOptions.map((option) => (
                      <IonSelectOption key={option.value} value={option.value}>
                        {option.label}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonCol>
              <IonCol size="6" sizeMd="3">
                <IonItem>
                  <IonLabel>Sort By</IonLabel>
                  <IonSelect
                    value={sortBy}
                    onIonChange={(e) => setSortBy(e.detail.value)}
                    interface="popover"
                  >
                    <IonSelectOption value="date-desc">Date: Newest</IonSelectOption>
                    <IonSelectOption value="date-asc">Date: Oldest</IonSelectOption>
                    <IonSelectOption value="total-desc">Total: High to Low</IonSelectOption>
                    <IonSelectOption value="total-asc">Total: Low to High</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
              <IonCol size="12" sizeMd="2">
                <div className="action-buttons">
                  <IonButton expand="block" onClick={handleRefresh}>
                    <IonIcon slot="start" icon={refresh} />
                    Refresh
                  </IonButton>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        {/* Orders Table */}
        <div className="orders-table ion-padding">
          <IonCard>
            <IonCardContent>
              <div className="table-responsive">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Payment Method</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
		<tbody>
		  {currentOrders.map((order) => (
		    <tr key={order.id}>
		      <td data-label="Order ID">
			<strong>{order.id}</strong>
		      </td>
		      <td data-label="Customer">
			<div>
			  <strong>{order.customer}</strong>
			  <p className="customer-email">{order.email}</p>
			</div>
		      </td>
		      <td data-label="Date">
			{new Date(order.date).toLocaleDateString('en-US', {
			  year: 'numeric',
			  month: 'short',
			  day: 'numeric'
			})}
		      </td>
		      <td data-label="Items">
			<IonBadge color="light">{order.items} items</IonBadge>
		      </td>
		      <td data-label="Total">
			<strong>${order.total.toFixed(2)}</strong>
		      </td>
		      <td data-label="Payment">
			{order.paymentMethod}
		      </td>
		      <td data-label="Status">
			{getStatusBadge(order.status)}
		      </td>
		      <td data-label="Actions">
			<IonButton
			  size="small"
			  fill="outline"
			  onClick={() => handleViewOrder(order.id)}
			>
			  <IonIcon slot="icon-only" icon={eye} />
			</IonButton>
		      </td>
		    </tr>
		  ))}
		</tbody>
                </table>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-section ion-padding">
            <IonCard>
              <IonCardContent>
                <div className="pagination-controls">
                  <IonButton
                    fill="outline"
                    size="small"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <IonIcon slot="start" icon={arrowBack} />
                    Previous
                  </IonButton>
                  
                  <div className="page-numbers">
                    {paginationButtons}
                  </div>
                  
                  <IonButton
                    fill="outline"
                    size="small"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                    <IonIcon slot="end" icon={arrowForward} />
                  </IonButton>
                </div>
                
                <div className="pagination-info">
                  <IonNote>
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
                  </IonNote>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {/* Export Section */}
        <div className="export-section ion-padding">
          <IonCard>
            <IonCardContent>
              <div className="export-content">
                <IonText>
                  <h3>Export Orders</h3>
                  <p>Export your order data to CSV or Excel format</p>
                </IonText>
                <IonButton onClick={handleExportOrders}>
                  <IonIcon slot="start" icon={download} />
                  Export Data
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* No Results */}
        {filteredOrders.length === 0 && (
          <div className="no-results ion-text-center ion-padding">
            <IonIcon icon={search} size="large" color="medium" />
            <h3>No orders found</h3>
            <p>Try adjusting your search or filters</p>
            <IonButton onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
            }}>
              Clear Filters
            </IonButton>
          </div>
        )}
      </IonContent>

      {/* Loading */}
      <IonLoading
        isOpen={loading}
        message="Loading orders..."
        duration={0}
      />

      {/* Export Success Alert */}
      <IonAlert
        isOpen={showExportAlert}
        onDidDismiss={() => setShowExportAlert(false)}
        header="Export Successful!"
        message="Your order data has been exported successfully."
        buttons={['OK']}
      />
    </IonPage>
  );
};

export default OrderListPage;
