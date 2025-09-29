import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, Shield } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Demo User',
    email: 'demo@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    birthdate: '1990-01-01',
    bio: 'Healthcare professional focused on patient care and recovery support.',
    role: 'patient'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating profile:', formData);
    setIsEditing(false);
  };

  return (
    <PageLayout
      title="Profile"
      subtitle="Manage your personal information and preferences"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <Card className="md:col-span-1">
            <CardContent className="text-center py-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-4xl font-semibold mx-auto">
                  {formData.name.charAt(0)}
                </div>
                <button 
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50"
                  onClick={() => console.log('Change photo')}
                >
                  <Camera size={18} className="text-gray-600" />
                </button>
              </div>
              
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {formData.name}
              </h3>
              <p className="text-gray-500">{formData.email}</p>
              <div className="mt-2">
                <Badge variant="primary" size="sm">
                  <Shield size={12} className="mr-1" />
                  {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                </Badge>
              </div>
              
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  isFullWidth
                >
                  {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                </Button>
              </div>

              {/* Account Stats */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Account Statistics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Member since:</span>
                    <span className="text-gray-900">Jan 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total assessments:</span>
                    <span className="text-gray-900">25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Current streak:</span>
                    <span className="text-gray-900">7 days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="md:col-span-2">
            <CardHeader
              title="Personal Information"
              subtitle="Update your profile information and preferences"
            />
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    leftIcon={<User size={18} />}
                  />
                  
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={true}
                    leftIcon={<Mail size={18} />}
                    helperText="Email cannot be changed"
                  />
                  
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    leftIcon={<Phone size={18} />}
                  />
                  
                  <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    leftIcon={<MapPin size={18} />}
                  />
                  
                  <Input
                    label="Birth Date"
                    name="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    leftIcon={<Calendar size={18} />}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                    >
                      <option value="patient">Patient</option>
                      <option value="clinician">Clinician</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    rows={4}
                    className={`
                      w-full rounded-md border-gray-300 shadow-sm
                      focus:border-teal-500 focus:ring-teal-500
                      disabled:bg-gray-50 disabled:text-gray-500
                      resize-none
                    `}
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      leftIcon={<Save size={18} />}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Security Settings */}
        <Card className="mt-6">
          <CardHeader
            title="Security Settings"
            subtitle="Manage your account security and privacy"
          />
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable 2FA
                </Button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
                  <p className="text-sm text-gray-500">Update your account password</p>
                </div>
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Login Sessions</h4>
                  <p className="text-sm text-gray-500">Manage your active login sessions</p>
                </div>
                <Button variant="outline" size="sm">
                  View Sessions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;