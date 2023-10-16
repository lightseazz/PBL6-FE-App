
import Auth from './components/authPage/Auth';
import WorkspaceManager from './components/workspaceManager/WorkspaceManager';
import {PaperProvider } from 'react-native-paper';

export default function App() {
  return ( 
    <PaperProvider>
        <Auth/>
        {/* <WorkspaceManager /> */}
    </PaperProvider>

  );
}


