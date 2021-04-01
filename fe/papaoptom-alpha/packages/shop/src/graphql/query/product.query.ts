import { gql } from '@apollo/client';

export const GET_PRODUCT_WITH_RELATED_PRODUCTS = gql`
  query getProductWithRelatedProducts($slug: String!, $type: String!) {
    product(slug: $slug) {
      id
      title
      weight
      slug
      price
      type
      image
      categories {
        id
        slug
        title
      }
    }
    relatedProducts(slug: $slug, type: $type) {
      id
      title
      slug
      weight
      price
      type
      image
    }
  }
`;

export const GET_RELATED_PRODUCTS = gql`
  query getRelatedProducts($type: String!, $slug: String!) {
    relatedProducts(type: $type, slug: $slug) {
      id
      title
      slug
      weight
      price
      type
      image
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($slug: String!) {
    product(slug: $slug) {
      id
      title
      weight
      slug
      price
      discountInPercent
      type
      gallery {
        url
      }
      image
      categories {
        id
        slug
        title
      }
    }
  }
`;

export const GET_PRODUCT_DETAILS_SHOES = gql`
  query getProduct($slug: String!) {
    getProduct(slug: $slug) {
      message
      code
      data {
        id
        vcode
        name
        quantity
        category {
          id
          name
        }
        supplier {
          id
          email
          phone
          address
          company
        }
        brand {
          id
          name
        }
        createdAt
        updatedAt
        characteristics {
          description
          photo1
          productMaterial
          sizeChart
          repeatedDimensions
          steamInBox
          liningMaterial
          outsoleMaterial
          country
          heelHeight
          platformHeight
          picturedSize
          purchasePrice
          sellingPrice
          season
          shootingDate
          purchaseCurrency
          saleCurrency
          floor
          type
          oldPurchasePrice
          oldSellingPrice
          insoleMaterial
          videoReview
          totalOldPurchasePrice
          totalOldSellingPrice
          totalPurchasePrice
          totalSellingPrice
          discountInPercent
        }
        slug
      }
    }
  }
`
export const GET_PRODUCT_DETAILS = gql`
  query getProduct($slug: String!) {
    product(slug: $slug) {
      id
      slug
      title
      type
      unit
      price
      salePrice
      description
      discountInPercent
      gallery {
        url
      }
      image
      categories {
        id
        slug
        title
      }
      author {
        id
        name
        avatar
        bio
        socials {
          id
          media
          profileLink
        }
      }
      meta {
        publisher
        isbn
        edition
        languages
        country
        numberOfReader
        numberOfPage
        samplePDF
      }
    }
  }
`;
