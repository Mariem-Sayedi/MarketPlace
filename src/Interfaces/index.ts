export interface Product  {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
  };
 
  export interface DetailsScreenProps {
    route: {
      params: {
        product: Product;
      };
    };
  }