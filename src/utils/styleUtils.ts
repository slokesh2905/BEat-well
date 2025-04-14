export const getRiskColorClass = (riskLevel: 'low' | 'moderate' | 'high' | 'very-high'): string => {
  switch (riskLevel) {
    case 'low':
      return 'bg-green-500';
    case 'moderate':
      return 'bg-yellow-500';
    case 'high':
      return 'bg-orange-500';
    case 'very-high':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export const getProgressStyle = (riskLevel: 'low' | 'moderate' | 'high' | 'very-high'): string => {
  switch (riskLevel) {
    case 'low':
      return 'bg-green-500';
    case 'moderate':
      return 'bg-yellow-500';
    case 'high':
      return 'bg-orange-500';
    case 'very-high':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}; 