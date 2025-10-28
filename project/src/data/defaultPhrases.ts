import { Phrase } from '../types';

const defaultPhrases: Phrase[] = [
  // Greetings
  { id: '1', text: 'Hello, how are you?', category: 'greetings', isFavorite: true, usageCount: 0 },
  { id: '2', text: 'Good morning', category: 'greetings', isFavorite: false, usageCount: 0 },
  { id: '3', text: 'Good afternoon', category: 'greetings', isFavorite: false, usageCount: 0 },
  { id: '4', text: 'Good evening', category: 'greetings', isFavorite: false, usageCount: 0 },
  { id: '5', text: 'Nice to meet you', category: 'greetings', isFavorite: false, usageCount: 0 },
  
  // Requests
  { id: '6', text: 'Can you help me please?', category: 'requests', isFavorite: true, usageCount: 0 },
  { id: '7', text: 'I need assistance', category: 'requests', isFavorite: false, usageCount: 0 },
  { id: '8', text: 'Can you repeat that?', category: 'requests', isFavorite: false, usageCount: 0 },
  { id: '9', text: 'Please speak slower', category: 'requests', isFavorite: false, usageCount: 0 },
  { id: '10', text: 'Where is the bathroom?', category: 'requests', isFavorite: false, usageCount: 0 },
  
  // Responses
  { id: '11', text: 'Yes, thank you', category: 'responses', isFavorite: true, usageCount: 0 },
  { id: '12', text: 'No, thank you', category: 'responses', isFavorite: false, usageCount: 0 },
  { id: '13', text: "I'm fine, thanks", category: 'responses', isFavorite: false, usageCount: 0 },
  { id: '14', text: "I'll be right back", category: 'responses', isFavorite: false, usageCount: 0 },
  { id: '15', text: 'I understand', category: 'responses', isFavorite: false, usageCount: 0 },
  
  // Emergencies
  { id: '16', text: 'I need medical help', category: 'emergencies', isFavorite: true, usageCount: 0 },
  { id: '17', text: 'Call 911', category: 'emergencies', isFavorite: true, usageCount: 0 },
  { id: '18', text: "I'm not feeling well", category: 'emergencies', isFavorite: false, usageCount: 0 },
  { id: '19', text: 'Emergency contact information is in my phone', category: 'emergencies', isFavorite: false, usageCount: 0 },
  
  // Custom examples
  { id: '20', text: 'I communicate using this app', category: 'custom', isFavorite: true, usageCount: 0 },
  { id: '21', text: 'Please be patient with me', category: 'custom', isFavorite: false, usageCount: 0 }
];

export default defaultPhrases;