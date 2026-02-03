// @components/header/DesktopHeader.tsx
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { logoIonic, personCircle, notifications, settings } from 'ionicons/icons';
import './DesktopHeader.scss';

const DesktopHeader: React.FC = () => {
  return (
    <IonHeader className="desktop-header">
      <IonToolbar>
        {/* Logo on the left */}
        <div slot="start" className="header-logo">
          <IonIcon icon={logoIonic} size="large" className="logo-icon" />
          <IonTitle className="logo-title">Tauronic</IonTitle>
        </div>

        {/* Navigation menu in the center (optional) */}
        <div className="header-nav">
          <IonButtons>
            <IonButton routerLink="/home">Home</IonButton>
            <IonButton routerLink="/dashboard">Dashboard</IonButton>
            <IonButton routerLink="/features">Features</IonButton>
            <IonButton routerLink="/about">About</IonButton>
            <IonButton routerLink="/contact">Contact</IonButton>
          </IonButtons>
        </div>

        {/* Action buttons on the right */}
        <IonButtons slot="end">
          <IonButton fill="clear">
            <IonIcon slot="icon-only" icon={notifications} />
          </IonButton>
          <IonButton fill="clear">
            <IonIcon slot="icon-only" icon={settings} />
          </IonButton>
          <IonButton fill="clear">
            <IonIcon slot="icon-only" icon={personCircle} size="large" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default DesktopHeader;
