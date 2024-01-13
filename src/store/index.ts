import { create } from 'zustand';
import type { Database } from '@/lib/database.types';
type ProfileType = Database['public']['Tables']['users']['Row'];

type StateType = {
  user: ProfileType;
  setUser: (payload: ProfileType) => void;
}

const useStore = create<StateType>((set) => ({
  user: {
    age: 0,
    avatar_url: '',
    bio: '',
    email: '',
    grade: 0,
    id: '',
    name: '',
    school_name: '',
  },
  setUser: (payload) => set({ user: payload }),
}));

export default useStore;
