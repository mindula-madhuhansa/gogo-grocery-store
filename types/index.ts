interface Format {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}

interface ImageData {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      small: Format;
      thumbnail: Format;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
    createdAt: string;
    updatedAt: string;
  };
}

interface Product {
  id: number;
  attributes: {
    name: string;
    description: string;
    mrp: number;
    sellingPrice: number;
    itemQuantityType: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    images: {
      data: ImageData[];
    };
    categories: {
      data: Category[];
    };
  };
}

interface Category {
  id: number;
  attributes: {
    name: string;
    color: null | string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    icon: {
      data: ImageData;
    };
  };
}

interface Slider {
  id: number;
  attributes: {
    name: string;
    type: "home" | "banner";
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: {
      data: ImageData;
    };
  };
}

interface UserData {
  id: number;
  email: string;
  username: string;
  blocked: boolean;
  confirmed: boolean;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

interface CartItem {
  data: {
    quantity: number;
    amount: string;
    products: number;
    users_permissions_user: number;
    userId: number;
  };
}

interface ItemList {
  quantity: number;
  amount: number;
  id: number;
  image: string;
  mrp: number;
  sellingPrice: number;
  name: string;
}

interface Item {
  id: number;
  attributes: {
    quantity: number;
    amount: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    userId: number;
    products: {
      data: Product[];
    };
  };
  length: number;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface ApiResponse {
  data: Category[];
  meta: {
    pagination: Pagination;
  };
}
