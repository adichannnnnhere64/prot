import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { home, flask, extensionPuzzle, colorFilter } from 'ionicons/icons';
import { RouteName } from '@utils/RouteName';

import './Tabs.scss';

const Tabs: React.FC = () => (
  <IonTabBar slot="bottom">
    <IonTabButton tab="welcome" href={RouteName.WELCOME}>
      <IonIcon aria-hidden="true" icon={home} />
      <IonLabel>Welcome</IonLabel>
    </IonTabButton>
    <IonTabButton tab="ui-components" href={RouteName.UI_COMPONENTS}>
      <IonIcon aria-hidden="true" icon={colorFilter} />
      <IonLabel>UI Components</IonLabel>
    </IonTabButton>
    <IonTabButton tab="integrations" href={RouteName.INTEGRATIONS}>
      <IonIcon aria-hidden="true" icon={extensionPuzzle} />
      <IonLabel>Integrations</IonLabel>
    </IonTabButton>
    <IonTabButton tab="about" href={RouteName.ABOUT}>
      <IonIcon aria-hidden="true" icon={flask} />
      <IonLabel>About</IonLabel>
    </IonTabButton>
  </IonTabBar>
);

export default Tabs;
