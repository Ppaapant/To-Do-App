export interface Contact {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}


  export interface ContactsState {
    items: Contact[];
    loading: boolean;
    error: string | null;
  }