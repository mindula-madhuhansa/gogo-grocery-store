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
    alternativeText: null | string;
    caption: null | string;
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
    previewUrl: null | string;
    provider: string;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
    createdAt: string;
    updatedAt: string;
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
