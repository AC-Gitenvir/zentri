import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Patient {
  id: string;
  tokenNumber: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  hospital: string;
  department: string;
  doctor: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'waiting' | 'in-progress' | 'completed';
  registrationTime: string;
}

interface AppState {
  patients: Patient[];
  currentToken: number;
  hospitals: any[];
  departments: any[];
  doctors: any[];
  selectedHospital: string;
  selectedDepartment: string;
}

type AppAction = 
  | { type: 'ADD_PATIENT'; payload: Patient }
  | { type: 'UPDATE_PATIENT_STATUS'; payload: { id: string; status: Patient['status'] } }
  | { type: 'SET_HOSPITAL'; payload: string }
  | { type: 'SET_DEPARTMENT'; payload: string }
  | { type: 'NEXT_TOKEN' };

const initialState: AppState = {
  patients: [],
  currentToken: 1,
  hospitals: [
    { id: 1, name: 'SMS Hospital', location: 'JLN Marg, Jaipur', departments: ['Cardiology', 'Orthopedics', 'Pediatrics', 'General Medicine'] },
    { id: 2, name: 'Fortis Hospital', location: 'Malviya Nagar, Jaipur', departments: ['Neurology', 'Oncology', 'Cardiology', 'Gastroenterology'] },
    { id: 3, name: 'Manipal Hospital', location: 'Sector 5, Vidhyadhar Nagar, Jaipur', departments: ['Orthopedics', 'Pediatrics', 'ENT', 'Dermatology'] },
    { id: 4, name: 'Narayana Hospital', location: 'Sector 28, Pratap Nagar, Jaipur', departments: ['Cardiology', 'Nephrology', 'General Surgery', 'Gynecology'] },
    { id: 5, name: 'Apollo Hospital', location: 'Tonk Road, Jaipur', departments: ['Neurology', 'Oncology', 'Cardiology', 'Pulmonology'] }
  ],
  departments: [
    { id: 1, name: 'Cardiology', doctors: ['Dr. Rajesh Sharma', 'Dr. Priya Agarwal', 'Dr. Amit Kumar'] },
    { id: 2, name: 'Orthopedics', doctors: ['Dr. Suresh Gupta', 'Dr. Neha Singh', 'Dr. Ravi Verma'] },
    { id: 3, name: 'Pediatrics', doctors: ['Dr. Sunita Jain', 'Dr. Mahesh Chand', 'Dr. Kavita Sharma'] },
    { id: 4, name: 'General Medicine', doctors: ['Dr. Vikash Agarwal', 'Dr. Pooja Mathur', 'Dr. Sanjay Goyal'] },
    { id: 5, name: 'Neurology', doctors: ['Dr. Ashok Meena', 'Dr. Rekha Joshi', 'Dr. Deepak Yadav'] },
  ],
  doctors: [],
  selectedHospital: '',
  selectedDepartment: '',
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: [...state.patients, action.payload],
        currentToken: state.currentToken + 1,
      };
    case 'UPDATE_PATIENT_STATUS':
      return {
        ...state,
        patients: state.patients.map(patient =>
          patient.id === action.payload.id
            ? { ...patient, status: action.payload.status }
            : patient
        ),
      };
    case 'SET_HOSPITAL':
      return {
        ...state,
        selectedHospital: action.payload,
      };
    case 'SET_DEPARTMENT':
      return {
        ...state,
        selectedDepartment: action.payload,
      };
    case 'NEXT_TOKEN':
      return {
        ...state,
        currentToken: state.currentToken + 1,
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};