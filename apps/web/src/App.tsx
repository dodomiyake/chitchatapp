import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './AppShell';
import {
  EmptyState,
  ErrorState,
  LoadingState,
  OfflineState,
} from './components/states/StateViews';
import { AuthShell } from './shells/AuthShell';
import { DesktopShell } from './shells/DesktopShell';
import { MobileNavShell } from './shells/MobileNavShell';
import { TabletShell } from './shells/TabletShell';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/auth" replace />} />
        <Route path="auth" element={<AuthShell />} />
        <Route path="mobile" element={<MobileNavShell />} />
        <Route path="tablet" element={<TabletShell />} />
        <Route path="desktop" element={<DesktopShell />} />
        <Route path="loading" element={<LoadingState />} />
        <Route path="empty" element={<EmptyState />} />
        <Route path="offline" element={<OfflineState />} />
        <Route path="error" element={<ErrorState />} />
      </Route>
    </Routes>
  );
}
