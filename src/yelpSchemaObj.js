type Business {
  name: String
  id: String
  is_claimed: Boolean
  is_closed: Boolean
  url: String
  phone: String
  display_phone: String
  review_count: Int
  categories: [Category]
  rating: Float
  location: Location
  coordinates: Coordinates
  photos: [String]
  hours: [Hours]
  reviews: [Review]
}

type Businesses {
  business: [Business]
  total: Int
}

type Category {
  title: String
  alias: String
}

type Coordinates {
  latitude: Float
  longitude: Float
}

type Hours {
  hours_type: String
  open: [OpenHours]
  is_open_now: Boolean
}

type Location {
  address1: String
  address2: String
  address3: String
  city: String
  state: String
  zip_code: String
  country: String
  formatted_address: String
}

type OpenHours {
  is_overnight: Boolean
  end: String
  start: String
  day: Int
}

type Query {
  business(id: String, locale: String): Business
  reviews(business: String, locale: String): Reviews
  phone_search(phone: String): Businesses
  search(term: String, location: String, country: String, offset: Int, limit: Int, sort_by: String, locale: String, longitude: Float, latitude: Float, categories: String, open_now: String, open_at: String, price: String, attributes: String, radius: Float): Businesses
}

type Review {
  rating: Int
  user: User
  text: String
  time_created: String
  url: String
}

type Reviews {
  review: [Review]
  total: Int
}

type User {
  image_url: String
  name: String
}
