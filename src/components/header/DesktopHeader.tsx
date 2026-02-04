// @components/header/DesktopHeader.tsx
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import {  personCircle, settings, logOut  } from 'ionicons/icons';
import { useState } from 'react';
import './DesktopHeader.scss';
import { RouteName } from '@utils/RouteName';

const DesktopHeader: React.FC = () => {
const [popoverEvent, setPopoverEvent] = useState<MouseEvent | null>(null);

  const handleLogout = (): void => {
    // Add your logout logic here
    console.log('Logging out...');
    setPopoverEvent(null);
    // Example: Clear tokens, redirect to login, etc.
    // localStorage.removeItem('authToken');
    // window.location.href = '/login';
  };

  return (
    <IonHeader className="desktop-header">
      <IonToolbar>
        {/* Logo on the left */}
        <div slot="start" className="header-logo">
          <IonTitle className="logo-title">Swag Coupons</IonTitle>
        </div>

        {/* Navigation menu in the center */}
        <div className="header-nav">
          <IonButtons>
            <IonButton routerLink={RouteName.WELCOME}>Home</IonButton>
            <IonButton routerLink={RouteName.PRODUCTS}>Operators</IonButton>
            <IonButton routerLink={RouteName.ORDERS}>Orders</IonButton>
          </IonButtons>
        </div>

        {/* Action buttons on the right */}
        <IonButtons slot="end">

          
          {/* User menu button with dropdown */}
          <IonButton 
            fill="clear"
            id="user-menu-trigger"
            onClick={(e) => setPopoverEvent(e.nativeEvent)}
          >
            <IonIcon slot="icon-only" icon={personCircle} size="large" />
          </IonButton>

          {/* User dropdown popover */}
          <IonPopover
            isOpen={!!popoverEvent}
            event={popoverEvent}
            onDidDismiss={() => setPopoverEvent(null)}
            className="user-dropdown-popover"
            side="bottom"
            alignment="end"
          >
            <IonList>
              <IonItem button detail={false} routerLink={RouteName.ACCOUNT} onClick={() => setPopoverEvent(null)}>
                <IonIcon icon={settings} slot="start" />
                <IonLabel>Settings</IonLabel>
              </IonItem>
              <IonItem 
                button 
                detail={false} 
                onClick={handleLogout}
                className="logout-item"
              >
                <IonIcon icon={logOut} slot="start" />
                <IonLabel>Logout</IonLabel>
              </IonItem>
            </IonList>
          </IonPopover>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default DesktopHeader;
