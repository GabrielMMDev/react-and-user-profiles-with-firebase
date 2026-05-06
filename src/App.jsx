import {AuthProvider} from './providers/AuthProvider';
import {FirebaseProvider} from './providers/FirebaseProvider';
import {AppRoutes} from './routes';
import './App.css';

export const App = () => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </FirebaseProvider>
  );
};

export default App;