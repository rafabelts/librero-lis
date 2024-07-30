import { AdminSettingsComponents } from '../components/SettingsComponents/AdminSettingsComponents';
import { StudentSettingsComponents } from '../components/SettingsComponents/StudentSettings';
export default function SettingsPage() {
  const path = location.pathname;
  return path.includes('admin') ? (
    <AdminSettingsComponents />
  ) : (
    <StudentSettingsComponents />
  );
}
