import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Settings,
  Save,
  Bell,
  Shield,
  Database,
  Globe,
  Palette,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'general' | 'notifications' | 'security' | 'appearance' | 'data'>('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSettingChange = () => {
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    setHasUnsavedChanges(false);
    console.log('Settings saved');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Application Preferences"
          subtitle="Configure general application settings"
        />
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Language
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={handleSettingChange}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={handleSettingChange}
                >
                  <option>UTC-5 (Eastern)</option>
                  <option>UTC-6 (Central)</option>
                  <option>UTC-7 (Mountain)</option>
                  <option>UTC-8 (Pacific)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Auto-save assessments</h4>
                  <p className="text-sm text-gray-500">Automatically save assessment progress</p>
                </div>
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  onChange={handleSettingChange}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Show assessment reminders</h4>
                  <p className="text-sm text-gray-500">Display daily assessment reminders</p>
                </div>
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  onChange={handleSettingChange}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Analytics tracking</h4>
                  <p className="text-sm text-gray-500">Help improve the platform with usage analytics</p>
                </div>
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  onChange={handleSettingChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Notification Preferences"
          subtitle="Configure how and when you receive notifications"
        />
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <input 
                type="checkbox" 
                defaultChecked 
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                onChange={handleSettingChange}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-t">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Assessment Reminders</h4>
                <p className="text-sm text-gray-500">Daily reminders to complete assessments</p>
              </div>
              <input 
                type="checkbox" 
                defaultChecked 
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                onChange={handleSettingChange}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-t">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Progress Updates</h4>
                <p className="text-sm text-gray-500">Weekly progress summaries</p>
              </div>
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                onChange={handleSettingChange}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-t">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Security Alerts</h4>
                <p className="text-sm text-gray-500">Notifications about account security</p>
              </div>
              <input 
                type="checkbox" 
                defaultChecked 
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                onChange={handleSettingChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title="Notification Schedule"
          subtitle="Set when you want to receive notifications"
        />
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reminder Time
              </label>
              <input
                type="time"
                defaultValue="09:00"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={handleSettingChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reminder Days
              </label>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <label key={day} className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      defaultChecked={!['Sun', 'Sat'].includes(day)}
                      className="sr-only"
                      onChange={handleSettingChange}
                    />
                    <div className="w-10 h-10 rounded-full border-2 border-teal-200 flex items-center justify-center text-sm font-medium cursor-pointer hover:bg-teal-50">
                      {day}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Account Security"
          subtitle="Manage your account security settings"
        />
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <Badge variant="secondary" size="sm">Not Enabled</Badge>
            </div>

            <div className="flex items-center justify-between py-3 border-t">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Login Notifications</h4>
                <p className="text-sm text-gray-500">Get notified of new login attempts</p>
              </div>
              <input 
                type="checkbox" 
                defaultChecked 
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                onChange={handleSettingChange}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-t">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Session Timeout</h4>
                <p className="text-sm text-gray-500">Automatically log out after inactivity</p>
              </div>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={handleSettingChange}
              >
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
                <option>Never</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title="Privacy Settings"
          subtitle="Control your data privacy and sharing preferences"
        />
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Data Sharing</h4>
                <p className="text-sm text-gray-500">Allow anonymized data for research</p>
              </div>
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                onChange={handleSettingChange}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-t">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Profile Visibility</h4>
                <p className="text-sm text-gray-500">Control who can see your profile information</p>
              </div>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={handleSettingChange}
              >
                <option>Private</option>
                <option>Clinicians Only</option>
                <option>Team Members</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Theme & Display"
          subtitle="Customize the appearance of the application"
        />
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Theme
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div className="border-2 border-teal-500 rounded-lg p-3 cursor-pointer">
                  <div className="w-full h-16 bg-white border rounded mb-2"></div>
                  <p className="text-sm font-medium text-center">Light</p>
                </div>
                <div className="border-2 border-gray-200 rounded-lg p-3 cursor-pointer hover:border-gray-300">
                  <div className="w-full h-16 bg-gray-800 rounded mb-2"></div>
                  <p className="text-sm font-medium text-center">Dark</p>
                </div>
                <div className="border-2 border-gray-200 rounded-lg p-3 cursor-pointer hover:border-gray-300">
                  <div className="w-full h-16 bg-gradient-to-br from-white to-gray-800 rounded mb-2"></div>
                  <p className="text-sm font-medium text-center">Auto</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Color Scheme
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { name: 'Teal', color: 'bg-teal-500', selected: true },
                  { name: 'Blue', color: 'bg-blue-500', selected: false },
                  { name: 'Purple', color: 'bg-purple-500', selected: false },
                  { name: 'Green', color: 'bg-green-500', selected: false }
                ].map((scheme) => (
                  <div 
                    key={scheme.name}
                    className={`border-2 ${scheme.selected ? 'border-gray-800' : 'border-gray-200'} rounded-lg p-3 cursor-pointer hover:border-gray-400`}
                    onClick={handleSettingChange}
                  >
                    <div className={`w-full h-8 ${scheme.color} rounded mb-2`}></div>
                    <p className="text-sm font-medium text-center">{scheme.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Compact Mode</h4>
                  <p className="text-sm text-gray-500">Use smaller spacing and components</p>
                </div>
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  onChange={handleSettingChange}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Animations</h4>
                  <p className="text-sm text-gray-500">Enable smooth transitions and animations</p>
                </div>
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  onChange={handleSettingChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Data Management"
          subtitle="Control your data storage and export options"
        />
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Data Backup</h4>
                <p className="text-sm text-gray-500">Automatically backup your assessment data</p>
              </div>
              <input 
                type="checkbox" 
                defaultChecked 
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                onChange={handleSettingChange}
              />
            </div>

            <div className="border-t pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Export Your Data</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" leftIcon={<Database size={16} />}>
                  Export Assessment Data
                </Button>
                <Button variant="outline" leftIcon={<Database size={16} />}>
                  Export Profile Data
                </Button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Data Retention</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keep assessment data for
                </label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={handleSettingChange}
                >
                  <option>1 year</option>
                  <option>2 years</option>
                  <option>5 years</option>
                  <option>Forever</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50">
        <CardHeader
          title="Danger Zone"
          subtitle="Irreversible actions that affect your account"
        />
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="text-sm font-medium text-red-900">Delete All Assessment Data</h4>
                <p className="text-sm text-red-700">Permanently remove all your assessment history</p>
              </div>
              <Button variant="danger" size="sm">
                Delete Data
              </Button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-red-200">
              <div>
                <h4 className="text-sm font-medium text-red-900">Delete Account</h4>
                <p className="text-sm text-red-700">Permanently delete your account and all data</p>
              </div>
              <Button variant="danger" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const sections = [
    { id: 'general', label: 'General', icon: <Settings size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'data', label: 'Data & Privacy', icon: <Database size={18} /> }
  ];

  return (
    <PageLayout
      title="Settings"
      subtitle="Configure your preferences and account settings"
      actions={
        hasUnsavedChanges && (
          <Button
            variant="primary"
            leftIcon={<Save size={18} />}
            onClick={handleSaveSettings}
          >
            Save Changes
          </Button>
        )
      }
    >
      {hasUnsavedChanges && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <div className="flex items-center">
            <AlertTriangle size={20} className="text-amber-600 mr-2" />
            <span className="text-sm text-amber-800">You have unsaved changes. Don't forget to save your settings.</span>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8 border-b border-gray-200 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`
                flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                ${activeSection === section.id
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {section.icon}
              <span className="ml-2">{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Section Content */}
      {activeSection === 'general' && renderGeneralSettings()}
      {activeSection === 'notifications' && renderNotificationSettings()}
      {activeSection === 'security' && renderSecuritySettings()}
      {activeSection === 'appearance' && renderAppearanceSettings()}
      {activeSection === 'data' && renderDataSettings()}
    </PageLayout>
  );
};

export default SettingsPage;