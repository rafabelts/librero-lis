import { AdminSettingsComponents } from '../components/AdminSettingsComponents/AdminSettingsComponents';

export default function SettingsPage() {
  const path = location.pathname;
  return path.includes('admin') ? (
    <AdminSettingsComponents />
  ) : (
    <AdminSettingsComponents />
  );
}
