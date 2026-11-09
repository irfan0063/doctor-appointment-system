export type Doctor = {
  id: string;
  specialty: string;
  availableFrom?: string;
  availableTo?: string;
  user: {
    id: string;
    name: string;
    city?: string;
    email: string;
  };
};
