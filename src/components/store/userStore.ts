import { create } from 'zustand';

// Define the type for the user object (customize as per your user structure)
export interface User {
  _id?: string;
  name?: string;
  email: string;
  // Add other fields as needed
}

// Define the shape of your store
interface UserStore {
  user: User | null;
  setUser: (data: User | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),
}));

export default useUserStore;
