schema {
  query: QueryRoot
  mutation: Mutation
}

"""Marks an element of a GraphQL schema as having restricted access."""
directive @accessRestricted(
  """Explains the reason around this restriction"""
  reason: String = null
) on FIELD_DEFINITION

"""Details about the gift card used on the checkout."""
type AppliedGiftCard implements Node {
  """The amount that was used taken from the Gift Card by applying it."""
  amountUsed: Money!

  """The amount left on the Gift Card."""
  balance: Money!

  """Globally unique identifier."""
  id: ID!

  """The last characters of the Gift Card code"""
  lastCharacters: String!
}

type Article implements Node {
  """The article's author."""
  author: ArticleAuthor!

  """The blog that the article belongs to."""
  blog: Blog!

  """List of comments posted on the article."""
  comments(first: Int!, after: String, reverse: Boolean = false): CommentConnection!

  """Stripped content of the article, single line with HTML tags removed."""
  content(
    """Truncates string after the given length."""
    truncateAt: Int
  ): String!

  """The content of the article, complete with HTML formatting."""
  contentHtml: HTML!

  """Stripped excerpt of the article, single line with HTML tags removed."""
  excerpt(
    """Truncates string after the given length."""
    truncateAt: Int
  ): String

  """The excerpt of the article, complete with HTML formatting."""
  excerptHtml: HTML

  """Globally unique identifier."""
  id: ID!

  """The image associated with the article."""
  image(
    """Image width in pixels between 1 and 2048"""
    maxWidth: Int

    """Image height in pixels between 1 and 2048"""
    maxHeight: Int

    """If specified, crop the image keeping the specified region"""
    crop: CropRegion

    """Image size multiplier retina displays. Must be between 1 and 3"""
    scale: Int = 1
  ): Image

  """The date and time when the article was published."""
  publishedAt: DateTime!

  """A categorization that a article can be tagged with."""
  tags: [String!]!

  """The article’s name."""
  title: String!

  """The url pointing to the article accessible from the web."""
  url: URL!
}

type ArticleAuthor {
  """The author's bio."""
  bio: String

  """The author’s email."""
  email: String!

  """The author's first name."""
  firstName: String!

  """The author's last name."""
  lastName: String!

  """The author's full name"""
  name: String!
}

type ArticleConnection {
  """A list of edges."""
  edges: [ArticleEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!
}

type ArticleEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of ArticleEdge."""
  node: Article!
}

"""The set of valid sort keys for the articles query."""
enum ArticleSortKeys {
  TITLE
  BLOG_TITLE
  AUTHOR
  UPDATED_AT
  ID
  RELEVANCE
}

"""Represents a generic custom attribute."""
type Attribute {
  """Key or name of the attribute."""
  key: String!

  """Value of the attribute."""
  value: String
}

"""Specifies the input fields required for an attribute."""
input AttributeInput {
  key: String!
  value: String!
}

"""A collection of available shipping rates for a checkout."""
type AvailableShippingRates {
  """
  Whether or not the shipping rates are ready.
  The `shippingRates` field is `null` when this value is `false`.
  This field should be polled until its value becomes `true`.
  
  """
  ready: Boolean!

  """The fetched shipping rates. `null` until the `ready` field is `true`."""
  shippingRates: [ShippingRate!]
}

type Blog implements Node {
  """List of the blog's articles."""
  articles(first: Int!, after: String, reverse: Boolean = false): ArticleConnection!

  """Globally unique identifier."""
  id: ID!

  """The blogs’s title."""
  title: String!

  """The url pointing to the blog accessible from the web."""
  url: URL!
}

type BlogConnection {
  """A list of edges."""
  edges: [BlogEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!
}

type BlogEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of BlogEdge."""
  node: Blog!
}

"""The set of valid sort keys for the blogs query."""
enum BlogSortKeys {
  HANDLE
  TITLE
  ID
  RELEVANCE
}

"""
Card brand, such as Visa or Mastercard, which can be used for payments.
"""
enum CardBrand {
  """Visa"""
  VISA

  """Mastercard"""
  MASTERCARD

  """Discover"""
  DISCOVER

  """American Express"""
  AMERICAN_EXPRESS

  """Diners Club"""
  DINERS_CLUB

  """JCB"""
  JCB
}

"""
A container for all the information required to checkout items and pay.
"""
type Checkout implements Node {
  appliedGiftCards: [AppliedGiftCard!]!

  """
  The available shipping rates for this Checkout.
  Should only be used when checkout `requiresShipping` is `true` and
  the shipping address is valid.
  
  """
  availableShippingRates: AvailableShippingRates

  """The date and time when the checkout was completed."""
  completedAt: DateTime

  """The date and time when the checkout was created."""
  createdAt: DateTime!

  """The currency code for the Checkout."""
  currencyCode: CurrencyCode!

  """A list of extra information that is added to the checkout."""
  customAttributes: [Attribute!]!

  """The customer associated with the checkout."""
  customer: Customer

  """The email attached to this checkout."""
  email: String

  """Globally unique identifier."""
  id: ID!

  """
  A list of line item objects, each one containing information about an item in the checkout.
  """
  lineItems(first: Int!, after: String, reverse: Boolean = false): CheckoutLineItemConnection!
  note: String

  """The resulting order from a paid checkout."""
  order: Order

  """
  The Order Status Page for this Checkout, null when checkout is not completed.
  """
  orderStatusUrl: URL

  """
  The amount left to be paid. This is equal to the cost of the line items, taxes
  and shipping minus discounts and gift cards.
  """
  paymentDue: Money!

  """
  Whether or not the Checkout is ready and can be completed. Checkouts may have
  asynchronous operations that can take time to finish. If you want to complete
  a checkout or ensure all the fields are populated and up to date, polling is
  required until the value is true. 
  """
  ready: Boolean!

  """States whether or not the fulfillment requires shipping."""
  requiresShipping: Boolean!

  """The shipping address to where the line items will be shipped."""
  shippingAddress: MailingAddress

  """
  Once a shipping rate is selected by the customer it is transitioned to a `shipping_line` object.
  """
  shippingLine: ShippingRate

  """Price of the checkout before shipping, taxes, and discounts."""
  subtotalPrice: Money!

  """Specifies if the Checkout is tax exempt."""
  taxExempt: Boolean!

  """
  Specifies if taxes are included in the line item and shipping line prices.
  """
  taxesIncluded: Boolean!

  """
  The sum of all the prices of all the items in the checkout, taxes and discounts included.
  """
  totalPrice: Money!

  """
  The sum of all the taxes applied to the line items and shipping lines in the checkout.
  """
  totalTax: Money!

  """The date and time when the checkout was last updated."""
  updatedAt: DateTime!

  """The url pointing to the checkout accessible from the web."""
  webUrl: URL!
}

"""
Specifies the fields required to update a checkout's attributes.

"""
input CheckoutAttributesUpdateInput {
  """
  The text of an optional note that a shop owner can attach to the checkout.
  """
  note: String

  """A list of extra information that is added to the checkout."""
  customAttributes: [AttributeInput!]

  """
  Allows setting partial addresses on a Checkout, skipping the full validation of attributes.
  The required attributes are city, province, and country.
  Full validation of the addresses is still done at complete time.
  
  """
  allowPartialAddresses: Boolean = false
}

type CheckoutAttributesUpdatePayload {
  """The updated checkout object."""
  checkout: Checkout!

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CheckoutCompleteFreePayload {
  """The updated checkout object."""
  checkout: Checkout

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CheckoutCompleteWithCreditCardPayload {
  """The checkout on which the payment was applied."""
  checkout: Checkout!

  """A representation of the attempted payment."""
  payment: Payment

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CheckoutCompleteWithTokenizedPaymentPayload {
  """The checkout on which the payment was applied."""
  checkout: Checkout!

  """A representation of the attempted payment."""
  payment: Payment

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

"""
Specifies the fields required to create a checkout.

"""
input CheckoutCreateInput {
  """The email with which the customer wants to checkout."""
  email: String

  """
  A list of line item objects, each one containing information about an item in the checkout.
  """
  lineItems: [CheckoutLineItemInput!]

  """The shipping address to where the line items will be shipped."""
  shippingAddress: MailingAddressInput

  """
  The text of an optional note that a shop owner can attach to the checkout.
  """
  note: String

  """A list of extra information that is added to the checkout."""
  customAttributes: [AttributeInput!]

  """
  Allows setting partial addresses on a Checkout, skipping the full validation of attributes.
  The required attributes are city, province, and country.
  Full validation of addresses is still done at complete time.
  
  """
  allowPartialAddresses: Boolean
}

type CheckoutCreatePayload {
  """The new checkout object."""
  checkout: Checkout

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CheckoutCustomerAssociatePayload {
  """The updated checkout object."""
  checkout: Checkout!

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CheckoutCustomerDisassociatePayload {
  """The updated checkout object."""
  checkout: Checkout!

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CheckoutEmailUpdatePayload {
  """The checkout object with the updated email."""
  checkout: Checkout!

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CheckoutGiftCardApplyPayload {
  """The updated checkout object."""
  checkout: Checkout!

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CheckoutGiftCardRemovePayload {
  """The updated checkout object."""
  checkout: Checkout!

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

"""
A single line item in the checkout, grouped by variant and attributes.
"""
type CheckoutLineItem implements Node {
  """
  Extra information in the form of an array of Key-Value pairs about the line item.
  """
  customAttributes: [Attribute!]!

  """Globally unique identifier."""
  id: ID!

  """The quantity of the line item."""
  quantity: Int!

  """Title of the line item. Defaults to the product's title."""
  title: String!

  """Product variant of the line item."""
  variant: ProductVariant
}

type CheckoutLineItemConnection {
  """A list of edges."""
  edges: [CheckoutLineItemEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!
}

type CheckoutLineItemEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of CheckoutLineItemEdge."""
  node: CheckoutLineItem!
}

"""Specifies the input fields to create a line item on a checkout."""
input CheckoutLineItemInput {
  """
  Extra information in the form of an array of Key-Value pairs about the line item.
  """
  customAttributes: [AttributeInput!]

  """The quantity of the line item."""
  quantity: Int!

  """The identifier of the product variant for the line item."""
  variantId: ID!
}

type CheckoutLineItemsAddPayload {
  """The updated checkout object."""
  checkout: Checkout

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CheckoutLineItemsRemovePayload {
  checkout: Checkout

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CheckoutLineItemsUpdatePayload {
  """The updated checkout object."""
  checkout: Checkout

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

"""Specifies the input fields to update a line item on the checkout."""
input CheckoutLineItemUpdateInput {
  id: ID

  """The variant identifier of the line item."""
  variantId: ID

  """The quantity of the line item."""
  quantity: Int

  """
  Extra information in the form of an array of Key-Value pairs about the line item.
  """
  customAttributes: [AttributeInput!]
}

type CheckoutShippingAddressUpdatePayload {
  """The updated checkout object."""
  checkout: Checkout!

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CheckoutShippingLineUpdatePayload {
  """The updated checkout object."""
  checkout: Checkout

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

"""
A collection represents a grouping of products that a shop owner can create to
organize them or make their shops easier to browse.
"""
type Collection implements Node {
  """
  Stripped description of the collection, single line with HTML tags removed.
  """
  description(
    """Truncates string after the given length."""
    truncateAt: Int
  ): String!

  """The description of the collection, complete with HTML formatting."""
  descriptionHtml: HTML!

  """
  A human-friendly unique string for the collection automatically generated from its title.
  Limit of 255 characters.
  
  """
  handle: String!

  """Globally unique identifier."""
  id: ID!

  """Image associated with the collection."""
  image(
    """Image width in pixels between 1 and 2048"""
    maxWidth: Int

    """Image height in pixels between 1 and 2048"""
    maxHeight: Int

    """If specified, crop the image keeping the specified region"""
    crop: CropRegion

    """Image size multiplier retina displays. Must be between 1 and 3"""
    scale: Int = 1
  ): Image

  """List of products in the collection."""
  products(first: Int!, after: String, sortKey: ProductCollectionSortKeys = COLLECTION_DEFAULT, reverse: Boolean = false): ProductConnection!

  """The collection’s name. Limit of 255 characters."""
  title: String!

  """The date and time when the collection was last modified."""
  updatedAt: DateTime!
}

type CollectionConnection {
  """A list of edges."""
  edges: [CollectionEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!
}

type CollectionEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of CollectionEdge."""
  node: Collection!
}

"""The set of valid sort keys for the collections query."""
enum CollectionSortKeys {
  TITLE
  UPDATED_AT
  ID
  RELEVANCE
}

type Comment implements Node {
  """The comment’s author."""
  author: CommentAuthor!

  """Stripped content of the comment, single line with HTML tags removed."""
  content(
    """Truncates string after the given length."""
    truncateAt: Int
  ): String!

  """The content of the comment, complete with HTML formatting."""
  contentHtml: HTML!

  """Globally unique identifier."""
  id: ID!
}

type CommentAuthor {
  """The author's email."""
  email: String!

  """The author’s name."""
  name: String!
}

type CommentConnection {
  """A list of edges."""
  edges: [CommentEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!
}

type CommentEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of CommentEdge."""
  node: Comment!
}

"""ISO 3166-1 alpha-2 country codes with some differences."""
enum CountryCode {
  """Canada"""
  CA

  """United States"""
  US

  """United Kingdom"""
  GB

  """Afghanistan"""
  AF

  """Albania"""
  AL

  """Algeria"""
  DZ

  """Andorra"""
  AD

  """Angola"""
  AO

  """Antigua And Barbuda"""
  AG

  """Argentina"""
  AR

  """Armenia"""
  AM

  """Aruba"""
  AW

  """Australia"""
  AU

  """Austria"""
  AT

  """Azerbaijan"""
  AZ

  """Bahamas"""
  BS

  """Bahrain"""
  BH

  """Bangladesh"""
  BD

  """Barbados"""
  BB

  """Belarus"""
  BY

  """Belgium"""
  BE

  """Belize"""
  BZ

  """Benin"""
  BJ

  """Bermuda"""
  BM

  """Bhutan"""
  BT

  """Bolivia"""
  BO

  """Bosnia And Herzegovina"""
  BA

  """Botswana"""
  BW

  """Brazil"""
  BR

  """Brunei"""
  BN

  """Bulgaria"""
  BG

  """New Caledonia"""
  NC

  """Cambodia"""
  KH

  """Republic of Cameroon"""
  CM

  """Cape Verde"""
  CV

  """Cayman Islands"""
  KY

  """Chile"""
  CL

  """China"""
  CN

  """Colombia"""
  CO

  """Comoros"""
  KM

  """Congo"""
  CG

  """Congo, The Democratic Republic Of The"""
  CD

  """Costa Rica"""
  CR

  """Côte d'Ivoire"""
  CI

  """Croatia"""
  HR

  """Curaçao"""
  CW

  """Cyprus"""
  CY

  """Czech Republic"""
  CZ

  """Denmark"""
  DK

  """Dominica"""
  DM

  """Dominican Republic"""
  DO

  """Ecuador"""
  EC

  """Egypt"""
  EG

  """El Salvador"""
  SV

  """Estonia"""
  EE

  """Ethiopia"""
  ET

  """Equatorial Guinea"""
  GQ

  """Faroe Islands"""
  FO

  """Fiji"""
  FJ

  """Finland"""
  FI

  """France"""
  FR

  """French Polynesia"""
  PF

  """Gabon"""
  GA

  """Gambia"""
  GM

  """Georgia"""
  GE

  """Germany"""
  DE

  """Ghana"""
  GH

  """Gibraltar"""
  GI

  """Greece"""
  GR

  """Greenland"""
  GL

  """Grenada"""
  GD

  """Guadeloupe"""
  GP

  """Guatemala"""
  GT

  """Guernsey"""
  GG

  """Guyana"""
  GY

  """Haiti"""
  HT

  """Honduras"""
  HN

  """Hong Kong"""
  HK

  """Hungary"""
  HU

  """Iceland"""
  IS

  """India"""
  IN

  """Indonesia"""
  ID

  """Ireland"""
  IE

  """Isle Of Man"""
  IM

  """Israel"""
  IL

  """Italy"""
  IT

  """Jamaica"""
  JM

  """Japan"""
  JP

  """Jersey"""
  JE

  """Jordan"""
  JO

  """Kazakhstan"""
  KZ

  """Kenya"""
  KE

  """Kosovo"""
  XK

  """Kuwait"""
  KW

  """Kyrgyzstan"""
  KG

  """Lao People's Democratic Republic"""
  LA

  """Latvia"""
  LV

  """Lebanon"""
  LB

  """Lesotho"""
  LS

  """Liberia"""
  LR

  """Liechtenstein"""
  LI

  """Lithuania"""
  LT

  """Luxembourg"""
  LU

  """Macao"""
  MO

  """Macedonia, Republic Of"""
  MK

  """Madagascar"""
  MG

  """Malawi"""
  MW

  """Malaysia"""
  MY

  """Maldives"""
  MV

  """Malta"""
  MT

  """Martinique"""
  MQ

  """Mauritius"""
  MU

  """Mayotte"""
  YT

  """Mexico"""
  MX

  """Moldova, Republic of"""
  MD

  """Monaco"""
  MC

  """Mongolia"""
  MN

  """Montenegro"""
  ME

  """Morocco"""
  MA

  """Mozambique"""
  MZ

  """Myanmar"""
  MM

  """Namibia"""
  NA

  """Nepal"""
  NP

  """Netherlands Antilles"""
  AN

  """Netherlands"""
  NL

  """New Zealand"""
  NZ

  """Nicaragua"""
  NI

  """Niger"""
  NE

  """Nigeria"""
  NG

  """Norway"""
  NO

  """Oman"""
  OM

  """Pakistan"""
  PK

  """Palestinian Territory, Occupied"""
  PS

  """Panama"""
  PA

  """Papua New Guinea"""
  PG

  """Paraguay"""
  PY

  """Peru"""
  PE

  """Philippines"""
  PH

  """Poland"""
  PL

  """Portugal"""
  PT

  """Qatar"""
  QA

  """Reunion"""
  RE

  """Romania"""
  RO

  """Russia"""
  RU

  """Rwanda"""
  RW

  """Saint Kitts And Nevis"""
  KN

  """Saint Lucia"""
  LC

  """Saint Martin"""
  MF

  """Sao Tome And Principe"""
  ST

  """Samoa"""
  WS

  """Saudi Arabia"""
  SA

  """Senegal"""
  SN

  """Serbia"""
  RS

  """Seychelles"""
  SC

  """Singapore"""
  SG

  """Sint Maarten"""
  SX

  """Slovakia"""
  SK

  """Slovenia"""
  SI

  """Solomon Islands"""
  SB

  """South Africa"""
  ZA

  """South Korea"""
  KR

  """South Sudan"""
  SS

  """Spain"""
  ES

  """Sri Lanka"""
  LK

  """St. Vincent"""
  VC

  """Sudan"""
  SD

  """Suriname"""
  SR

  """Sweden"""
  SE

  """Switzerland"""
  CH

  """Syria"""
  SY

  """Taiwan"""
  TW

  """Tanzania, United Republic Of"""
  TZ

  """Thailand"""
  TH

  """Trinidad and Tobago"""
  TT

  """Tunisia"""
  TN

  """Turkey"""
  TR

  """Turkmenistan"""
  TM

  """Turks and Caicos Islands"""
  TC

  """Uganda"""
  UG

  """Ukraine"""
  UA

  """United Arab Emirates"""
  AE

  """Uruguay"""
  UY

  """Uzbekistan"""
  UZ

  """Vanuatu"""
  VU

  """Venezuela"""
  VE

  """Vietnam"""
  VN

  """Virgin Islands, British"""
  VG

  """Yemen"""
  YE

  """Zambia"""
  ZM

  """Zimbabwe"""
  ZW

  """Aland Islands"""
  AX

  """Anguilla"""
  AI

  """Bouvet Island"""
  BV

  """British Indian Ocean Territory"""
  IO

  """Burkina Faso"""
  BF

  """Burundi"""
  BI

  """Central African Republic"""
  CF

  """Chad"""
  TD

  """Christmas Island"""
  CX

  """Cocos (Keeling) Islands"""
  CC

  """Cook Islands"""
  CK

  """Cuba"""
  CU

  """Djibouti"""
  DJ

  """Eritrea"""
  ER

  """Falkland Islands (Malvinas)"""
  FK

  """French Guiana"""
  GF

  """French Southern Territories"""
  TF

  """Guinea"""
  GN

  """Guinea Bissau"""
  GW

  """Heard Island And Mcdonald Islands"""
  HM

  """Holy See (Vatican City State)"""
  VA

  """Iran, Islamic Republic Of"""
  IR

  """Iraq"""
  IQ

  """Kiribati"""
  KI

  """Korea, Democratic People's Republic Of"""
  KP

  """Libyan Arab Jamahiriya"""
  LY

  """Mali"""
  ML

  """Mauritania"""
  MR

  """Montserrat"""
  MS

  """Nauru"""
  NR

  """Niue"""
  NU

  """Norfolk Island"""
  NF

  """Pitcairn"""
  PN

  """Saint Barthélemy"""
  BL

  """Saint Helena"""
  SH

  """Saint Pierre And Miquelon"""
  PM

  """San Marino"""
  SM

  """Sierra Leone"""
  SL

  """Somalia"""
  SO

  """South Georgia And The South Sandwich Islands"""
  GS

  """Svalbard And Jan Mayen"""
  SJ

  """Swaziland"""
  SZ

  """Tajikistan"""
  TJ

  """Timor Leste"""
  TL

  """Togo"""
  TG

  """Tokelau"""
  TK

  """Tonga"""
  TO

  """Tuvalu"""
  TV

  """United States Minor Outlying Islands"""
  UM

  """Wallis And Futuna"""
  WF

  """Western Sahara"""
  EH
}

"""Credit card information used for a payment."""
type CreditCard {
  brand: String
  expiryMonth: Int
  expiryYear: Int
  firstDigits: String
  firstName: String
  lastDigits: String
  lastName: String

  """Masked credit card number with only the last 4 digits displayed"""
  maskedNumber: String
}

"""
Specifies the fields required to complete a checkout with
a Shopify vaulted credit card payment.

"""
input CreditCardPaymentInput {
  """The amount of the payment."""
  amount: Money!

  """
  A unique client generated key used to avoid duplicate charges. When a
  duplicate payment is found, the original is returned instead of creating a new one.
  """
  idempotencyKey: String!

  """The billing address for the payment."""
  billingAddress: MailingAddressInput!

  """The ID returned by Shopify's Card Vault."""
  vaultId: String!

  """Executes the payment in test mode if possible. Defaults to `false`."""
  test: Boolean = false
}

"""The part of the image that should remain after cropping."""
enum CropRegion {
  """Keep the center of the image"""
  CENTER

  """Keep the top of the image"""
  TOP

  """Keep the bottom of the image"""
  BOTTOM

  """Keep the left of the image"""
  LEFT

  """Keep the right of the image"""
  RIGHT
}

"""Currency codes"""
enum CurrencyCode {
  """United States Dollars (USD)"""
  USD

  """Euro (EUR)"""
  EUR

  """United Kingdom Pounds (GBP)"""
  GBP

  """Canadian Dollars (CAD)"""
  CAD

  """Afghan Afghani (AFN)"""
  AFN

  """Albanian Lek (ALL)"""
  ALL

  """Algerian Dinar (DZD)"""
  DZD

  """Angolan Kwanza (AOA)"""
  AOA

  """Argentine Pesos (ARS)"""
  ARS

  """Armenian Dram (AMD)"""
  AMD

  """Aruban Florin (AWG)"""
  AWG

  """Australian Dollars (AUD)"""
  AUD

  """Barbadian Dollar (BBD)"""
  BBD

  """Azerbaijani Manat (AZN)"""
  AZN

  """Bangladesh Taka (BDT)"""
  BDT

  """Bahamian Dollar (BSD)"""
  BSD

  """Bahraini Dinar (BHD)"""
  BHD

  """Belarusian Ruble (BYR)"""
  BYR

  """Belize Dollar (BZD)"""
  BZD

  """Bhutanese Ngultrum (BTN)"""
  BTN

  """Bosnia and Herzegovina Convertible Mark (BAM)"""
  BAM

  """Brazilian Real (BRL)"""
  BRL

  """Bolivian Boliviano (BOB)"""
  BOB

  """Botswana Pula (BWP)"""
  BWP

  """Brunei Dollar (BND)"""
  BND

  """Bulgarian Lev (BGN)"""
  BGN

  """Burmese Kyat (MMK)"""
  MMK

  """Cambodian Riel"""
  KHR

  """Cape Verdean escudo (CVE)"""
  CVE

  """Cayman Dollars (KYD)"""
  KYD

  """Central African CFA Franc (XAF)"""
  XAF

  """Chilean Peso (CLP)"""
  CLP

  """Chinese Yuan Renminbi (CNY)"""
  CNY

  """Colombian Peso (COP)"""
  COP

  """Comorian Franc (KMF)"""
  KMF

  """Congolese franc (CDF)"""
  CDF

  """Costa Rican Colones (CRC)"""
  CRC

  """Croatian Kuna (HRK)"""
  HRK

  """Czech Koruny (CZK)"""
  CZK

  """Danish Kroner (DKK)"""
  DKK

  """Dominican Peso (DOP)"""
  DOP

  """East Caribbean Dollar (XCD)"""
  XCD

  """Egyptian Pound (EGP)"""
  EGP

  """Ethiopian Birr (ETB)"""
  ETB

  """CFP Franc (XPF)"""
  XPF

  """Fijian Dollars (FJD)"""
  FJD

  """Gambian Dalasi (GMD)"""
  GMD

  """Ghanaian Cedi (GHS)"""
  GHS

  """Guatemalan Quetzal (GTQ)"""
  GTQ

  """Guyanese Dollar (GYD)"""
  GYD

  """Georgian Lari (GEL)"""
  GEL

  """Haitian Gourde (HTG)"""
  HTG

  """Honduran Lempira (HNL)"""
  HNL

  """Hong Kong Dollars (HKD)"""
  HKD

  """Hungarian Forint (HUF)"""
  HUF

  """Icelandic Kronur (ISK)"""
  ISK

  """Indian Rupees (INR)"""
  INR

  """Indonesian Rupiah (IDR)"""
  IDR

  """Israeli New Shekel (NIS)"""
  ILS

  """Jamaican Dollars (JMD)"""
  JMD

  """Japanese Yen (JPY)"""
  JPY

  """Jersey Pound"""
  JEP

  """Jordanian Dinar (JOD)"""
  JOD

  """Kazakhstani Tenge (KZT)"""
  KZT

  """Kenyan Shilling (KES)"""
  KES

  """Kuwaiti Dinar (KWD)"""
  KWD

  """Kyrgyzstani Som (KGS)"""
  KGS

  """Laotian Kip (LAK)"""
  LAK

  """Latvian Lati (LVL)"""
  LVL

  """Lebanese Pounds (LBP)"""
  LBP

  """Lesotho Loti (LSL)"""
  LSL

  """Liberian Dollar (LRD)"""
  LRD

  """Lithuanian Litai (LTL)"""
  LTL

  """Malagasy Ariary (MGA)"""
  MGA

  """Macedonia Denar (MKD)"""
  MKD

  """Macanese Pataca (MOP)"""
  MOP

  """Malawian Kwacha (MWK)"""
  MWK

  """Maldivian Rufiyaa (MVR)"""
  MVR

  """Mexican Pesos (MXN)"""
  MXN

  """Malaysian Ringgits (MYR)"""
  MYR

  """Mauritian Rupee (MUR)"""
  MUR

  """Moldovan Leu (MDL)"""
  MDL

  """Moroccan Dirham"""
  MAD

  """Mongolian Tugrik"""
  MNT

  """Mozambican Metical"""
  MZN

  """Namibian Dollar"""
  NAD

  """Nepalese Rupee (NPR)"""
  NPR

  """Netherlands Antillean Guilder"""
  ANG

  """New Zealand Dollars (NZD)"""
  NZD

  """Nicaraguan Córdoba (NIO)"""
  NIO

  """Nigerian Naira (NGN)"""
  NGN

  """Norwegian Kroner (NOK)"""
  NOK

  """Omani Rial (OMR)"""
  OMR

  """Pakistani Rupee (PKR)"""
  PKR

  """Papua New Guinean Kina (PGK)"""
  PGK

  """Paraguayan Guarani (PYG)"""
  PYG

  """Peruvian Nuevo Sol (PEN)"""
  PEN

  """Philippine Peso (PHP)"""
  PHP

  """Polish Zlotych (PLN)"""
  PLN

  """Qatari Rial (QAR)"""
  QAR

  """Romanian Lei (RON)"""
  RON

  """Russian Rubles (RUB)"""
  RUB

  """Rwandan Franc (RWF)"""
  RWF

  """Samoan Tala (WST)"""
  WST

  """Saudi Riyal (SAR)"""
  SAR

  """Sao Tome And Principe Dobra (STD)"""
  STD

  """Serbian dinar (RSD)"""
  RSD

  """Seychellois Rupee (SCR)"""
  SCR

  """Singapore Dollars (SGD)"""
  SGD

  """Sudanese Pound (SDG)"""
  SDG

  """Syrian Pound (SYP)"""
  SYP

  """South African Rand (ZAR)"""
  ZAR

  """South Korean Won (KRW)"""
  KRW

  """South Sudanese Pound (SSP)"""
  SSP

  """Solomon Islands Dollar (SBD)"""
  SBD

  """Sri Lankan Rupees (LKR)"""
  LKR

  """Surinamese Dollar (SRD)"""
  SRD

  """Swedish Kronor (SEK)"""
  SEK

  """Swiss Francs (CHF)"""
  CHF

  """Taiwan Dollars (TWD)"""
  TWD

  """Thai baht (THB)"""
  THB

  """Tanzanian Shilling (TZS)"""
  TZS

  """Trinidad and Tobago Dollars (TTD)"""
  TTD

  """Tunisian Dinar (TND)"""
  TND

  """Turkish Lira (TRY)"""
  TRY

  """Turkmenistani Manat (TMT)"""
  TMT

  """Ugandan Shilling (UGX)"""
  UGX

  """Ukrainian Hryvnia (UAH)"""
  UAH

  """United Arab Emirates Dirham (AED)"""
  AED

  """Uruguayan Pesos (UYU)"""
  UYU

  """Uzbekistan som (UZS)"""
  UZS

  """Vanuatu Vatu (VUV)"""
  VUV

  """Venezuelan Bolivares (VEF)"""
  VEF

  """Vietnamese đồng (VND)"""
  VND

  """West African CFA franc (XOF)"""
  XOF

  """Yemeni Rial (YER)"""
  YER

  """Zambian Kwacha (ZMW)"""
  ZMW
}

"""
A customer represents a customer account with the shop. Customer accounts store
contact information for the customer, saving logged-in customers the trouble of
having to provide it at every checkout.
"""
type Customer {
  """
  Indicates whether the customer has consented to be sent marketing material via email.
  """
  acceptsMarketing: Boolean!

  """A list of addresses for the customer."""
  addresses(first: Int!, after: String, reverse: Boolean = false): MailingAddressConnection!

  """The date and time when the customer was created."""
  createdAt: DateTime!

  """The customer’s default address."""
  defaultAddress: MailingAddress

  """The customer’s name, email or phone number."""
  displayName: String!

  """The customer’s email address."""
  email: String

  """The customer’s first name."""
  firstName: String

  """A unique identifier for the customer."""
  id: ID!

  """The customer’s last name."""
  lastName: String

  """The orders associated with the customer."""
  orders(
    first: Int!
    after: String

    """
    Supported filter parameters:
     - `processed_at`
    """
    query: String
    sortKey: OrderSortKeys = ID
    reverse: Boolean = false
  ): OrderConnection!

  """The customer’s phone number."""
  phone: String

  """The date and time when the customer information was updated."""
  updatedAt: DateTime!
}

"""
A CustomerAccessToken represents the unique token required to make modifications to the customer object.
"""
type CustomerAccessToken {
  """The customer’s access token."""
  accessToken: String!

  """The date and time when the customer access token expires."""
  expiresAt: DateTime!
}

"""
Specifies the input fields required to create a customer access token.
"""
input CustomerAccessTokenCreateInput {
  """The email associated to the customer."""
  email: String!

  """The login password to be used by the customer."""
  password: String!
}

type CustomerAccessTokenCreatePayload {
  """The newly created customer access token object."""
  customerAccessToken: CustomerAccessToken

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CustomerAccessTokenDeletePayload {
  """The destroyed access token."""
  deletedAccessToken: String

  """ID of the destroyed customer access token."""
  deletedCustomerAccessTokenId: String

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CustomerAccessTokenRenewPayload {
  """The renewed customer access token object."""
  customerAccessToken: CustomerAccessToken

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

"""Specifies the input fields required to activate a customer."""
input CustomerActivateInput {
  """The activation token required to activate the customer"""
  activationToken: String!

  """The login password used by the customer."""
  password: String!
}

type CustomerActivatePayload {
  """The customer object."""
  customer: Customer

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CustomerAddressCreatePayload {
  """The new customer address object."""
  customerAddress: MailingAddress

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CustomerAddressDeletePayload {
  """ID of the deleted customer address."""
  deletedCustomerAddressId: String

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CustomerAddressUpdatePayload {
  """The customer’s updated mailing address."""
  customerAddress: MailingAddress

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

"""Specifies the fields required to create a new Customer."""
input CustomerCreateInput {
  """The customer’s first name."""
  firstName: String

  """The customer’s last name."""
  lastName: String

  """The customer’s email."""
  email: String!

  """The customer’s phone number."""
  phone: String

  """The login password used by the customer."""
  password: String!

  """
  Indicates whether the customer has consented to be sent marketing material via email.
  """
  acceptsMarketing: Boolean
}

type CustomerCreatePayload {
  """The created customer object."""
  customer: Customer

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

type CustomerRecoverPayload {
  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

"""Specifies the fields required to reset a Customer’s password."""
input CustomerResetInput {
  """The reset token required to reset the customer’s password."""
  resetToken: String!

  """New password that will be set as part of the reset password process."""
  password: String!
}

type CustomerResetPayload {
  """The customer object which was reset."""
  customer: Customer

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

"""Specifies the fields required to update the Customer information."""
input CustomerUpdateInput {
  """The customer’s first name."""
  firstName: String

  """The customer’s last name."""
  lastName: String

  """The customer’s email."""
  email: String

  """The customer’s phone number."""
  phone: String

  """The login password used by the customer."""
  password: String

  """
  Indicates whether the customer has consented to be sent marketing material via email.
  """
  acceptsMarketing: Boolean
}

type CustomerUpdatePayload {
  """The updated customer object."""
  customer: Customer

  """List of errors that occurred executing the mutation."""
  userErrors: [UserError!]!
}

"""An ISO-8601 encoded UTC date string."""
scalar DateTime

"""
Digital wallet, such as Apple Pay, which can be used for accelerated checkouts.
"""
enum DigitalWallet {
  """Apple Pay"""
  APPLE_PAY

  """Android Pay"""
  ANDROID_PAY

  """Shopify Pay"""
  SHOPIFY_PAY
}

"""Represents a web address."""
type Domain {
  """The host name of the domain (eg: `example.com`)."""
  host: String!

  """Whether SSL is enabled or not."""
  sslEnabled: Boolean!

  """The URL of the domain (eg: `https://example.com`)."""
  url: URL!
}

"""A string containing HTML code."""
scalar HTML

"""Represents an image resource."""
type Image {
  """A word or phrase to share the nature or contents of an image."""
  altText: String

  """A unique identifier for the image."""
  id: ID

  """The location of the image as a URL."""
  src: URL!
}

type ImageConnection {
  """A list of edges."""
  edges: [ImageEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!
}

type ImageEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of ImageEdge."""
  node: Image!
}

"""Represents a mailing address for customers and shipping."""
type MailingAddress implements Node {
  address1: String
  address2: String
  city: String
  company: String
  country: String
  countryCode: String
  firstName: String
  formatted(withName: Boolean = false, withCompany: Boolean = true): [String!]!
  formattedArea: String

  """Globally unique identifier."""
  id: ID!
  lastName: String
  latitude: Float
  longitude: Float
  name: String
  phone: String
  province: String
  provinceCode: String
  zip: String
}

type MailingAddressConnection {
  """A list of edges."""
  edges: [MailingAddressEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!
}

type MailingAddressEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of MailingAddressEdge."""
  node: MailingAddress!
}

"""Specifies the fields accepted to create or update a mailing address."""
input MailingAddressInput {
  address1: String
  address2: String
  city: String
  company: String
  country: String
  firstName: String
  lastName: String
  phone: String
  province: String
  zip: String
}

"""A monetary value string."""
scalar Money

"""
The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start.
"""
type Mutation {
  """Updates the attributes of a checkout."""
  checkoutAttributesUpdate(
    """The ID of the checkout."""
    checkoutId: ID!
    input: CheckoutAttributesUpdateInput!
  ): CheckoutAttributesUpdatePayload
  checkoutCompleteFree(
    """The ID of the checkout."""
    checkoutId: ID!
  ): CheckoutCompleteFreePayload

  """Completes a checkout using a credit card token from Shopify's Vault."""
  checkoutCompleteWithCreditCard(
    """The ID of the checkout."""
    checkoutId: ID!
    payment: CreditCardPaymentInput!
  ): CheckoutCompleteWithCreditCardPayload

  """Completes a checkout with a tokenized payment."""
  checkoutCompleteWithTokenizedPayment(
    """The ID of the checkout."""
    checkoutId: ID!
    payment: TokenizedPaymentInput!
  ): CheckoutCompleteWithTokenizedPaymentPayload

  """Creates a new checkout."""
  checkoutCreate(input: CheckoutCreateInput!): CheckoutCreatePayload

  """Associates a customer to the checkout."""
  checkoutCustomerAssociate(
    """The ID of the checkout."""
    checkoutId: ID!

    """The customer access token of the customer to associate."""
    customerAccessToken: String!
  ): CheckoutCustomerAssociatePayload

  """Disassociates the current checkout customer from the checkout."""
  checkoutCustomerDisassociate(
    """The ID of the checkout."""
    checkoutId: ID!
  ): CheckoutCustomerDisassociatePayload

  """Updates the email on an existing checkout."""
  checkoutEmailUpdate(
    """The ID of the checkout."""
    checkoutId: ID!

    """The email to update the checkout with."""
    email: String!
  ): CheckoutEmailUpdatePayload

  """Applies a gift card to an existing checkout using a gift card code."""
  checkoutGiftCardApply(
    """The code of the gift card to apply on the checkout."""
    giftCardCode: String!

    """The ID of the checkout."""
    checkoutId: ID!
  ): CheckoutGiftCardApplyPayload

  """Removes an applied gift card from the checkout."""
  checkoutGiftCardRemove(
    """The ID of the Applied Gift Card to remove from the Checkout"""
    appliedGiftCardId: ID!

    """The ID of the Checkout"""
    checkoutId: ID!
  ): CheckoutGiftCardRemovePayload

  """Adds a list of line items to a checkout."""
  checkoutLineItemsAdd(
    """A list of line item objects to add to the checkout."""
    lineItems: [CheckoutLineItemInput!]!

    """The ID of the checkout."""
    checkoutId: ID!
  ): CheckoutLineItemsAddPayload

  """Removes line items from an existing checkout"""
  checkoutLineItemsRemove(
    """the checkout on which to remove line items"""
    checkoutId: ID!

    """line item ids to remove"""
    lineItemIds: [ID!]!
  ): CheckoutLineItemsRemovePayload

  """Updates line items on a checkout."""
  checkoutLineItemsUpdate(
    """the checkout on which to update line items."""
    checkoutId: ID!

    """line items to update."""
    lineItems: [CheckoutLineItemUpdateInput!]!
  ): CheckoutLineItemsUpdatePayload

  """Updates the shipping address of an existing checkout."""
  checkoutShippingAddressUpdate(
    """The shipping address to where the line items will be shipped."""
    shippingAddress: MailingAddressInput!

    """The ID of the checkout."""
    checkoutId: ID!
  ): CheckoutShippingAddressUpdatePayload

  """Updates the shipping lines on an existing checkout."""
  checkoutShippingLineUpdate(
    """The ID of the checkout."""
    checkoutId: ID!

    """
    A concatenation of a Checkout’s shipping provider, price, and title,
    enabling the customer to select the availableShippingRates.
    """
    shippingRateHandle: String!
  ): CheckoutShippingLineUpdatePayload

  """
  Creates a customer access token.
  The customer access token is required to modify the customer object in any way.
  
  """
  customerAccessTokenCreate(input: CustomerAccessTokenCreateInput!): CustomerAccessTokenCreatePayload

  """Permanently destroys a customer access token."""
  customerAccessTokenDelete(
    """The access token used to identify the customer."""
    customerAccessToken: String!
  ): CustomerAccessTokenDeletePayload

  """Renews a customer access token."""
  customerAccessTokenRenew(
    """The access token used to identify the customer."""
    customerAccessToken: String!
  ): CustomerAccessTokenRenewPayload

  """Activates a customer."""
  customerActivate(
    """Specifies the customer to activate."""
    id: ID!
    input: CustomerActivateInput!
  ): CustomerActivatePayload

  """Creates a new address for a customer."""
  customerAddressCreate(
    """The access token used to identify the customer."""
    customerAccessToken: String!

    """The customer mailing address to create."""
    address: MailingAddressInput!
  ): CustomerAddressCreatePayload

  """Permanently deletes the address of an existing customer."""
  customerAddressDelete(
    """Specifies the address to delete."""
    id: ID!

    """The access token used to identify the customer."""
    customerAccessToken: String!
  ): CustomerAddressDeletePayload

  """Updates the address of an existing customer."""
  customerAddressUpdate(
    """The access token used to identify the customer."""
    customerAccessToken: String!

    """Specifies the customer address to update."""
    id: ID!

    """The customer’s mailing address."""
    address: MailingAddressInput!
  ): CustomerAddressUpdatePayload

  """Creates a new customer."""
  customerCreate(input: CustomerCreateInput!): CustomerCreatePayload

  """
  Sends a reset password email to the customer, as the first step in the reset password process.
  """
  customerRecover(
    """The email address of the customer to recover."""
    email: String!
  ): CustomerRecoverPayload

  """
  Resets a customer’s password with a token received from `CustomerRecover`.
  """
  customerReset(
    """Specifies the customer to reset."""
    id: ID!
    input: CustomerResetInput!
  ): CustomerResetPayload

  """Updates an existing customer."""
  customerUpdate(
    """The access token used to identify the customer."""
    customerAccessToken: String!

    """The customer object input."""
    customer: CustomerUpdateInput!
  ): CustomerUpdatePayload
}

"""An object with an ID to support global identification."""
interface Node {
  """Globally unique identifier."""
  id: ID!
}

"""
An order is a customer’s completed request to purchase one or more products from
a shop. An order is created when a customer completes the checkout process,
during which time they provides an email address, billing address and payment information.
"""
type Order implements Node {
  """The code of the currency used for the payment."""
  currencyCode: CurrencyCode!

  """The locale code in which this specific order happened."""
  customerLocale: String

  """The order’s URL for a customer."""
  customerUrl: URL

  """The customer's email address."""
  email: String

  """Globally unique identifier."""
  id: ID!

  """List of the order’s line items."""
  lineItems(first: Int!, after: String, reverse: Boolean = false): OrderLineItemConnection!

  """
  A unique numeric identifier for the order for use by shop owner and customer.
  """
  orderNumber: Int!

  """The customer's phone number."""
  phone: String

  """
  The date and time when the order was imported.
  This value can be set to dates in the past when importing from other systems.
  If no value is provided, it will be auto-generated based on current date and time.
  
  """
  processedAt: DateTime!

  """The address to where the order will be shipped."""
  shippingAddress: MailingAddress

  """Price of the order before shipping and taxes."""
  subtotalPrice: Money

  """
  The sum of all the prices of all the items in the order, taxes and discounts included (must be positive).
  """
  totalPrice: Money!

  """The total amount that has been refunded."""
  totalRefunded: Money!

  """The total cost of shipping."""
  totalShippingPrice: Money!

  """The total cost of taxes."""
  totalTax: Money
}

type OrderConnection {
  """A list of edges."""
  edges: [OrderEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!
}

type OrderEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of OrderEdge."""
  node: Order!
}

"""
Represents a single line in an order. There is one line item for each distinct product variant.
"""
type OrderLineItem {
  """List of custom attributes associated to the line item."""
  customAttributes: [Attribute!]!

  """The number of products variants associated to the line item."""
  quantity: Int!

  """The title of the product combined with title of the variant."""
  title: String!

  """The product variant object associated to the line item."""
  variant: ProductVariant
}

type OrderLineItemConnection {
  """A list of edges."""
  edges: [OrderLineItemEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!
}

type OrderLineItemEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of OrderLineItemEdge."""
  node: OrderLineItem!
}

"""The set of valid sort keys for the orders query."""
enum OrderSortKeys {
  PROCESSED_AT
  TOTAL_PRICE
  ID
  RELEVANCE
}

"""Information about pagination in a connection."""
type PageInfo {
  """Indicates if there are more pages to fetch."""
  hasNextPage: Boolean!

  """Indicates if there are any pages prior to the current page."""
  hasPreviousPage: Boolean!
}

"""A payment applied to a checkout."""
type Payment implements Node {
  """The amount of the payment."""
  amount: Money!

  """The billing address for the payment."""
  billingAddress: MailingAddress

  """The checkout to which the payment belongs."""
  checkout: Checkout!

  """The credit card used for the payment in the case of direct payments."""
  creditCard: CreditCard

  """
  An message describing a processing error during asynchronous processing.
  """
  errorMessage: String

  """Globally unique identifier."""
  id: ID!

  """
  A client-side generated token to identify a payment and perform idempotent operations.
  """
  idempotencyKey: String

  """Whether or not the payment is still processing asynchronously."""
  ready: Boolean!

  """
  A flag to indicate if the payment is to be done in test mode for gateways that support it.
  """
  test: Boolean!

  """
  The actual transaction recorded by Shopify after having processed the payment with the gateway.
  """
  transaction: Transaction
}

"""Settings related to payments."""
type PaymentSettings {
  """List of the card brands which the shop accepts."""
  acceptedCardBrands: [CardBrand!]!

  """The url pointing to the endpoint to vault credit cards."""
  cardVaultUrl: URL!

  """The country where the shop is located."""
  countryCode: CountryCode!

  """The three-letter code for the currency that the shop accepts."""
  currencyCode: CurrencyCode!

  """The shop’s Shopify Payments account id."""
  shopifyPaymentsAccountId: String

  """List of the digital wallets which the shop supports."""
  supportedDigitalWallets: [DigitalWallet!]!
}

"""
A product represents an individual item for sale in a Shopify store. Products
are often physical, but they don't have to be. 
For example, a digital download (such as a movie, music or ebook file) also
qualifies as a product, as do services (such as equipment rental, work for hire,
customization of another product or an extended warranty).
"""
type Product implements Node {
  """List of collections a product belongs to."""
  collections(first: Int!, after: String, reverse: Boolean = false): CollectionConnection!

  """The date and time when the product was created."""
  createdAt: DateTime!

  """
  Stripped description of the product, single line with HTML tags removed.
  """
  description(
    """Truncates string after the given length."""
    truncateAt: Int
  ): String!

  """The description of the product, complete with HTML formatting."""
  descriptionHtml: HTML!

  """
  A human-friendly unique string for the Product automatically generated from its title.
  They are used by the Liquid templating language to refer to objects.
  
  """
  handle: String!

  """Globally unique identifier."""
  id: ID!

  """List of images associated with the product."""
  images(
    first: Int!
    after: String
    sortKey: ProductImageSortKeys = POSITION
    reverse: Boolean = false

    """Image width in pixels between 1 and 2048"""
    maxWidth: Int

    """Image height in pixels between 1 and 2048"""
    maxHeight: Int

    """If specified, crop the image keeping the specified region"""
    crop: CropRegion

    """Image size multiplier retina displays. Must be between 1 and 3"""
    scale: Int = 1
  ): ImageConnection!

  """Lst of custom product options (maximum of 3 per product)."""
  options(
    """Truncate the array result to this size"""
    first: Int
  ): [ProductOption!]!

  """
  A categorization that a product can be tagged with, commonly used for filtering and searching.
  """
  productType: String!

  """
  The date and time when the product was published to the Online Store channel.
  A value of `null` indicates that the product is not published to Online Store.
  
  """
  publishedAt: DateTime!

  """
  A categorization that a product can be tagged with, commonly used for filtering and searching.
  Each comma-separated tag has a character limit of 255.
  
  """
  tags: [String!]!

  """The product’s title."""
  title: String!

  """The date and time when the product was last modified."""
  updatedAt: DateTime!

  """
  Find a product’s variant based on its selected options.
  This is useful for converting a user’s selection of product options into a single matching variant.
  If there is not a variant for the selected options, `null` will be returned.
  
  """
  variantBySelectedOptions(selectedOptions: [SelectedOptionInput!]!): ProductVariant

  """List of the product’s variants."""
  variants(first: Int!, after: String, reverse: Boolean = false): ProductVariantConnection!

  """The product’s vendor name."""
  vendor: String!
}

"""The set of valid sort keys for the products query."""
enum ProductCollectionSortKeys {
  MANUAL
  BEST_SELLING
  TITLE
  PRICE
  CREATED
  COLLECTION_DEFAULT
  ID
  RELEVANCE
}

type ProductConnection {
  """A list of edges."""
  edges: [ProductEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!
}

type ProductEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of ProductEdge."""
  node: Product!
}

"""The set of valid sort keys for the images query."""
enum ProductImageSortKeys {
  CREATED_AT
  POSITION
  ID
  RELEVANCE
}

"""
Custom product property names like "Size", "Color", and "Material".
Products are based on permutations of these options.
A product may have a maximum of 3 options.
255 characters limit each.

"""
type ProductOption implements Node {
  """Globally unique identifier."""
  id: ID!

  """The product option’s name."""
  name: String!

  """The corresponding value to the product option name."""
  values: [String!]!
}

"""The set of valid sort keys for the products query."""
enum ProductSortKeys {
  TITLE
  PRODUCT_TYPE
  VENDOR
  UPDATED_AT
  CREATED_AT
  ID
  RELEVANCE
}

"""
A product variant represents a different version of a product, such as differing sizes or differing colors.
"""
type ProductVariant implements Node {
  """Indicates if the product variant is in stock."""
  available: Boolean @deprecated(reason: "Use `availableForSale` instead")

  """Indicates if the product variant is available for sale."""
  availableForSale: Boolean!

  """
  The compare at price of the variant. This can be used to mark a variant as on
  sale, when `compareAtPrice` is higher than `price`.
  """
  compareAtPrice: Money

  """Globally unique identifier."""
  id: ID!

  """Image associated with the product variant."""
  image(
    """Image width in pixels between 1 and 2048"""
    maxWidth: Int

    """Image height in pixels between 1 and 2048"""
    maxHeight: Int

    """If specified, crop the image keeping the specified region"""
    crop: CropRegion

    """Image size multiplier retina displays. Must be between 1 and 3"""
    scale: Int = 1
  ): Image

  """The product variant’s price."""
  price: Money!

  """The product object that the product variant belongs to."""
  product: Product!

  """List of product options applied to the variant."""
  selectedOptions: [SelectedOption!]!

  """The SKU (Stock Keeping Unit) associated with the variant."""
  sku: String

  """The product variant’s title."""
  title: String!

  """
  The weight of the product variant in the unit system specified with `weight_unit`.
  """
  weight: Float

  """Unit of measurement for weight."""
  weightUnit: WeightUnit!
}

type ProductVariantConnection {
  """A list of edges."""
  edges: [ProductVariantEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!
}

type ProductVariantEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of ProductVariantEdge."""
  node: ProductVariant!
}

"""
The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start.
"""
type QueryRoot {
  customer(
    """The customer access token"""
    customerAccessToken: String!
  ): Customer
  node(id: ID!): Node
  nodes(ids: [ID!]!): [Node]!
  shop: Shop!
}

"""
Custom properties that a shop owner can use to define product variants.
Multiple options can exist. Options are represented as: option1, option2, option3, etc.

"""
type SelectedOption {
  """The product option’s name."""
  name: String!

  """The product option’s value."""
  value: String!
}

"""Specifies the input fields required for a selected option."""
input SelectedOptionInput {
  """The product option’s name."""
  name: String!

  """The product option’s value."""
  value: String!
}

"""A shipping rate to be applied to a checkout."""
type ShippingRate {
  """Human-readable unique identifier for this shipping rate."""
  handle: String!

  """Price of this shipping rate."""
  price: Money!

  """Title of this shipping rate."""
  title: String!
}

"""
Shop represents a collection of the general settings and information about the shop.
"""
type Shop {
  """List of the shop' articles."""
  articles(
    first: Int!
    after: String

    """
    Supported filter parameters:
     - `author`
     - `updated_at`
     - `created_at`
     - `blog_title`
     - `tag`
    """
    query: String
    sortKey: ArticleSortKeys = ID
    reverse: Boolean = false
  ): ArticleConnection!

  """List of the shop' blogs."""
  blogs(
    first: Int!
    after: String

    """
    Supported filter parameters:
     - `handle`
     - `title`
     - `updated_at`
     - `created_at`
    """
    query: String
    sortKey: BlogSortKeys = ID
    reverse: Boolean = false
  ): BlogConnection!

  """The url pointing to the endpoint to vault credit cards."""
  cardVaultUrl: URL! @deprecated(reason: "Use `paymentSettings` instead")

  """Find a collection by its handle."""
  collectionByHandle(handle: String!): Collection

  """List of the shop’s collections."""
  collections(
    first: Int!
    after: String

    """
    Supported filter parameters:
     - `title`
     - `collection_type`
     - `updated_at`
    """
    query: String
    sortKey: CollectionSortKeys = ID
    reverse: Boolean = false
  ): CollectionConnection!

  """The three-letter code for the currency that the shop accepts."""
  currencyCode: CurrencyCode! @deprecated(reason: "Use `paymentSettings` instead")

  """A description of the shop."""
  description: String

  """
  A string representing the way currency is formatted when the currency isn’t specified.
  """
  moneyFormat: String!

  """The shop’s name."""
  name: String!

  """Settings related to payments."""
  paymentSettings: PaymentSettings!

  """The shop’s primary domain."""
  primaryDomain: Domain!

  """The shop’s privacy policy."""
  privacyPolicy: ShopPolicy

  """Find a product by its handle."""
  productByHandle(handle: String!): Product

  """List of the shop’s product types."""
  productTypes(first: Int!): StringConnection!

  """List of the shop’s products."""
  products(
    first: Int!
    after: String

    """
    Supported filter parameters:
     - `title`
     - `product_type`
     - `vendor`
     - `created_at`
     - `updated_at`
     - `tag`
    """
    query: String
    sortKey: ProductSortKeys = ID
    reverse: Boolean = false
  ): ProductConnection!

  """The shop’s refund policy."""
  refundPolicy: ShopPolicy

  """The shop’s Shopify Payments account id."""
  shopifyPaymentsAccountId: String @deprecated(reason: "Use `paymentSettings` instead")

  """The shop’s terms of service."""
  termsOfService: ShopPolicy
}

"""
Policy that a merchant has configured for their store, such as their refund or privacy policy.
"""
type ShopPolicy implements Node {
  """Policy text, maximum size of 64kb."""
  body: String!

  """Globally unique identifier."""
  id: ID!

  """Policy’s title."""
  title: String!

  """Public URL to the policy."""
  url: URL!
}

type StringConnection {
  """A list of edges."""
  edges: [StringEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!
}

type StringEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of StringEdge."""
  node: String!
}

"""
Specifies the fields required to complete a checkout with
a tokenized payment.

"""
input TokenizedPaymentInput {
  """The amount of the payment."""
  amount: Money!

  """
  A unique client generated key used to avoid duplicate charges. When a
  duplicate payment is found, the original is returned instead of creating a new one.
  """
  idempotencyKey: String!

  """The billing address for the payment."""
  billingAddress: MailingAddressInput!

  """The type of payment token."""
  type: String!

  """
  A simple string or JSON containing the required payment data for the tokenized payment.
  """
  paymentData: String!

  """Executes the payment in test mode if possible. Defaults to `false`."""
  test: Boolean = false

  """Public Hash Key used for AndroidPay payments only."""
  identifier: String
}

"""An object representing exchange of money for a product or service."""
type Transaction {
  """The amount of money that the transaction was for."""
  amount: Money!

  """The kind of the transaction."""
  kind: TransactionKind!

  """The status of the transaction"""
  status: TransactionStatus!

  """Whether the transaction was done in test mode or not"""
  test: Boolean!
}

enum TransactionKind {
  SALE
  CAPTURE
  AUTHORIZATION
  EMV_AUTHORIZATION
  CHANGE
}

enum TransactionStatus {
  PENDING
  SUCCESS
  FAILURE
  ERROR
}

"""An RFC 3986 and RFC 3987 compliant URI string."""
scalar URL

"""Represents an error in the input of a mutation."""
type UserError {
  """Path to input field which caused the error."""
  field: [String!]

  """The error message."""
  message: String!
}

"""Units of measurements for weight."""
enum WeightUnit {
  """1 equals 1000 grams"""
  KILOGRAMS

  """Metric system unit of mass"""
  GRAMS

  """1 equals 16 ounces"""
  POUNDS

  """Imperial system unit of mass"""
  OUNCES
}
