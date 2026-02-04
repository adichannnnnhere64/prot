import { IonReactRouter } from '@ionic/react-router';
import WelcomePage from '@pages/WelcomePage';
import { IonApp, setupIonicReact, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonTabs } from '@ionic/react';
import UIComponentsPage from '@pages/UIComponentsPage';
import { home, flask, extensionPuzzle, colorFilter } from 'ionicons/icons';
import IntegrationsPage from '@pages/IntegrationsPage';
import AboutPage from '@pages/AboutPage';
import ProductPage from '@pages/ProductPage';
import CheckoutPage from '@pages/CheckoutPage';

import { Route } from 'react-router-dom';
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

const App: React.FC = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <IonApp>
      <IonReactRouter>
        {/* Show header only on desktop */}
        {!isMobile && <AppHeader />}

        {isMobile ? (
          // Mobile layout with tabs
          <IonTabs>
            <IonRouterOutlet>
              {/* Only ONE route for each path */}
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
              <Route exact path="/product/:productId">
                <ProductPage />
              </Route>
              <Route exact path="/checkout/:productId">
                <CheckoutPage />
              </Route>
              {/* Remove duplicate redirect - RouteName.WELCOME already handles '/' */}
            </IonRouterOutlet>

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
          </IonTabs>
        ) : (
          // Desktop layout without tabs
          <IonRouterOutlet>
            {/* Only ONE route for each path */}
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
            <Route exact path="/product/:productId">
              <ProductPage />
            </Route>
            <Route exact path="/checkout/:productId">
              <CheckoutPage />
            </Route>
            {/* Remove duplicate redirect - RouteName.WELCOME already handles '/' */}
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
