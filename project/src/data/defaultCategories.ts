import { Category } from '../types';

const defaultCategories: Category[] = [
  { 
    id: 'greetings', 
    name: 'Greetings', 
    color: 'bg-blue-500', 
    icon: 'hand' 
  },
  { 
    id: 'requests', 
    name: 'Requests', 
    color: 'bg-purple-500', 
    icon: 'help-circle' 
  },
  { 
    id: 'responses', 
    name: 'Responses', 
    color: 'bg-green-500', 
    icon: 'message-circle' 
  },
  { 
    id: 'emergencies', 
    name: 'Emergencies', 
    color: 'bg-red-500', 
    icon: 'alert-triangle' 
  },
  { 
    id: 'custom', 
    name: 'Custom', 
    color: 'bg-amber-500', 
    icon: 'edit' 
  }
];

export default defaultCategories;