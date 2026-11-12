export interface IListing {
  _id?: string;
  title: string;
  description: string;
  price: number;
  category: 'Books' | 'Electronics' | 'Furniture' | 'Stationery' | 'Transport' | 'Other';
  condition: 'Brand New' | 'Like New' | 'Good' | 'Fair';
  listingType: 'For Sale' | 'Free' | 'Exchange';
  imageUrl: string;
  location: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone?: string;
  status: 'Available' | 'Reserved' | 'Sold';
  createdAt?: string;
  updatedAt?: string;
}

export interface IOffer {
  _id?: string;
  listingId: string | IListing;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  offerPrice: number;
  message?: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt?: string;
  updatedAt?: string;
}
