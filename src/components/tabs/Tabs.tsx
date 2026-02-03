import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { home, flask, extensionPuzzle, colorFilter } from 'ionicons/icons';
import { RouteName } from '@utils/RouteName';


import './Tabs.scss';

const Tabs: React.FC = () => (
  <IonTabs>
 
    <IonTabBar slot='bottom'>
      <IonTabButton tab='tab1' href={RouteName.WELCOME}>
        <IonIcon aria-hidden='true' icon={home} />
        <IonLabel>Welcome</IonLabel>
      </IonTabButton>
      <IonTabButton tab='tab2' href={RouteName.UI_COMPONENTS}>
        <IonIcon aria-hidden='true' icon={colorFilter} />
        <IonLabel>UI Components</IonLabel>
      </IonTabButton>
      <IonTabButton tab='tab3' href={RouteName.INTEGRATIONS}>
        <IonIcon aria-hidden='true' icon={extensionPuzzle} />
        <IonLabel>Integrations</IonLabel>
      </IonTabButton>
      <IonTabButton tab='tab4' href={RouteName.ABOUT}>
        <IonIcon aria-hidden='true' icon={flask} />
        <IonLabel>About</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;
