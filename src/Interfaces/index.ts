export interface Product  {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    quantity: number;

  };
 
  export interface DetailsScreenProps {
    route: {
      params: {
        product: Product;
      };
    };
  };
  export interface User  {
    username: string;
    password: string;
  };
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
  };