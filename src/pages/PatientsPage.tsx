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
  Eye, 
  Edit, 
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { mockPatientData } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const PatientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  // Filter patients based on search and status
  const filteredPatients = mockPatientData.filter(patient => {
    const matchesSearch = !searchTerm || 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const getPatientStats = (patient: typeof mockPatientData[0]) => {
    const assessments = patient.assessments;
    if (assessments.length === 0) {
      return {
        avgIntensity: 0,
        lastAssessment: 'Never',
        riskLevel: 'unknown'
      };
    }

    const avgIntensity = Math.round(
      (assessments.reduce((sum, a) => sum + a.intensity, 0) / assessments.length) * 10
    ) / 10;

    const lastAssessment = new Date(
      Math.max(...assessments.map(a => a.timestamp))
    );
    
    const daysSince = Math.floor(
      (Date.now() - lastAssessment.getTime()) / (1000 * 60 * 60 * 24)
    );

    let lastAssessmentText = '';
    if (daysSince === 0) lastAssessmentText = 'Today';
    else if (daysSince === 1) lastAssessmentText = 'Yesterday';
    else if (daysSince < 7) lastAssessmentText = `${daysSince} days ago`;
    else lastAssessmentText = lastAssessment.toLocaleDateString();

    const riskLevel = avgIntensity >= 6 ? 'high' : avgIntensity >= 4 ? 'moderate' : 'low';

    return {
      avgIntensity,
      lastAssessment: lastAssessmentText,
      riskLevel
    };
  };

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <Badge variant="danger" size="sm">High Risk</Badge>;
      case 'moderate':
        return <Badge variant="warning" size="sm">Moderate</Badge>;
      case 'low':
        return <Badge variant="success" size="sm">Low Risk</Badge>;
      default:
        return <Badge variant="secondary" size="sm">Unknown</Badge>;
    }
  };

  return (
    <PageLayout
      title="Patient Management"
      subtitle={`${filteredPatients.length} patients`}
      actions={
        <div className="flex space-x-2">
          <Button
            variant="outline"
            leftIcon={<Search size={18} />}
            onClick={() => console.log('Advanced search')}
          >
            Advanced Search
          </Button>
          <Button
            variant="primary"
            leftIcon={<UserPlus size={18} />}
            onClick={() => console.log('Add patient')}
          >
            Add Patient
          </Button>
        </div>
      }
    >
      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search patients by name or email..."
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
                <option value="all">All Patients</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="high-risk">High Risk</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPatients.map((patient) => {
          const stats = getPatientStats(patient);
          
          return (
            <Card 
              key={patient.id}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => navigate(`/patient/${patient.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-4 text-lg font-semibold">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-500">{patient.email}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Risk Level</p>
                    <div className="mt-1">
                      {getRiskBadge(stats.riskLevel)}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Intensity</p>
                    <p className="text-lg font-semibold text-gray-900">{stats.avgIntensity}/7</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Total Assessments</p>
                    <p className="text-lg font-semibold text-gray-900">{patient.assessments.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Last Assessment</p>
                    <p className="text-sm text-gray-900">{stats.lastAssessment}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<Eye size={16} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/patient/${patient.id}`);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<Edit size={16} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Edit patient:', patient.id);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('More actions:', patient.id);
                    }}
                  >
                    <MoreHorizontal size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users size={40} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? 'No patients match your search criteria.'
                : 'No patients have been added yet.'
              }
            </p>
            {searchTerm ? (
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            ) : (
              <Button variant="primary" leftIcon={<UserPlus size={18} />}>
                Add First Patient
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </PageLayout>
  );
};

export default PatientsPage;