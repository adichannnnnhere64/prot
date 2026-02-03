import { IonReactRouter } from '@ionic/react-router';
import { IonApp, setupIonicReact } from '@ionic/react';
import Tabs from '@components/tabs/Tabs';
import WelcomePage from '@pages/WelcomePage';
import UIComponentsPage from '@pages/UIComponentsPage';
import IntegrationsPage from '@pages/IntegrationsPage';
import {
  IonRouterOutlet,
} from '@ionic/react';


import { Route } from 'react-router';
import AboutPage from '@pages/AboutPage';
import { RouteName } from '@utils/RouteName';

// Stylings
import './global.scss';
import TauriAPI from '@services/TauriAPI';
import AppHeader from '@components/header/AppHeader';

let platformMode;

TauriAPI.getPlatformName().then((name) => {
  // Supported platforms "linux" | "macos" | "ios" | "freebsd" | "dragonfly" | "netbsd" | "openbsd" | "solaris" | "android" | "windows";
  switch (name) {
    case 'macos':
    case 'ios':
      platformMode = 'ios';
      break;
    default:
      platformMode = 'md';
      break;
  }
});

setupIonicReact({
  mode: platformMode,
  rippleEffect: true,
  animated: true,
});



const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>

      {window.innerWidth <= 768 && <Tabs />}
      {window.innerWidth >= 768 && <AppHeader />}


   <IonRouterOutlet>
      <Route exact path={RouteName.WELCOME}>
        <WelcomePage />
      </Route>
      <Route exact path={RouteName.UI_COMPONENTS}>
        <UIComponentsPage />
      </Route>
      <Route exact path={RouteName.INTEGRATIONS}>
        <IntegrationsPage />
      </Route>
      <Route exact path={RouteName.ABOUT}>
        <AboutPage />
      </Route>
      <Route exact path='/tabs/integrations/barcode-scanner'>
				burat
      </Route>
      <Route exact path='/'>
        <WelcomePage />
      </Route>
    </IonRouterOutlet>

      
    </IonReactRouter>
  </IonApp>
);

export default App;
