import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Download, 
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  RefreshCw,
  Shield,
  Stethoscope
} from 'lucide-react';
import { mockUsers } from '../data/mockData';

const UsersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'patients' | 'clinicians' | 'admins'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Filter users based on tab, search, and status
  const filteredUsers = mockUsers.filter(user => {
    const matchesTab = activeTab === 'all' || user.role === activeTab.slice(0, -1); // Remove 's' from plural
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="danger" size="sm">Admin</Badge>;
      case 'clinician':
        return <Badge variant="warning" size="sm">Clinician</Badge>;
      case 'patient':
        return <Badge variant="success" size="sm">Patient</Badge>;
      default:
        return <Badge variant="secondary" size="sm">{role}</Badge>;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield size={20} className="text-red-600" />;
      case 'clinician':
        return <Stethoscope size={20} className="text-amber-600" />;
      case 'patient':
        return <Users size={20} className="text-green-600" />;
      default:
        return <Users size={20} className="text-gray-600" />;
    }
  };

  const handleUserAction = (action: string, userId: string) => {
    console.log(`${action} user:`, userId);
    // Implement user actions
  };

  const handleBulkAction = (action: string) => {
    console.log(`${action} users:`, selectedUsers);
    // Implement bulk actions
    setSelectedUsers([]);
  };

  const tabs = [
    { id: 'all', label: 'All Users', count: mockUsers.length },
    { id: 'patients', label: 'Patients', count: mockUsers.filter(u => u.role === 'patient').length },
    { id: 'clinicians', label: 'Clinicians', count: mockUsers.filter(u => u.role === 'clinician').length },
    { id: 'admins', label: 'Admins', count: mockUsers.filter(u => u.role === 'admin').length }
  ];

  return (
    <PageLayout
      title="User Management"
      subtitle="Manage all platform users and their roles"
      actions={
        <div className="flex space-x-2">
          <Button
            variant="outline"
            leftIcon={<RefreshCw size={18} />}
            onClick={() => console.log('Refresh users')}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            leftIcon={<Download size={18} />}
            onClick={() => console.log('Export users')}
          >
            Export
          </Button>
          <Button
            variant="primary"
            leftIcon={<UserPlus size={18} />}
            onClick={() => console.log('Add user')}
          >
            Add User
          </Button>
        </div>
      }
    >
      {/* Navigation Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Users size={18} className="mr-2" />
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search size={18} />}
                className="mb-0"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <Card className="mb-6">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedUsers.length} user(s) selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('activate')}>
                  Activate
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('deactivate')}>
                  Deactivate
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleBulkAction('delete')}>
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card>
        <CardHeader
          title={`${activeTab === 'all' ? 'All' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Users`}
          subtitle={`${filteredUsers.length} users found`}
        />
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(filteredUsers.map(u => u.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers([...selectedUsers, user.id]);
                          } else {
                            setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                          }
                        }}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3">
                            {user.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRoleIcon(user.role)}
                        <span className="ml-2 text-sm text-gray-900 capitalize">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="success" size="sm">Active</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleUserAction('view', user.id)}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleUserAction('edit', user.id)}
                          title="Edit User"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleUserAction('delete', user.id)}
                          title="Delete User"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleUserAction('more', user.id)}
                          title="More Actions"
                        >
                          <MoreHorizontal size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users size={40} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm 
                  ? 'No users match your search criteria.'
                  : 'No users have been added yet.'
                }
              </p>
              {searchTerm ? (
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              ) : (
                <Button variant="primary" leftIcon={<UserPlus size={18} />}>
                  Add First User
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default UsersPage;