import { gql } from "@apollo/client";

export const GET_SHOES = gql`
  query getShoes($supplier: String, $pageSize: Int, $pageNumber: Int) {
    filterProduct(filter: { supplier: $supplier, pageSize: $pageSize, pageNumber: $pageNumber }) {
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
        }
      }
      totalDocs
      totalPages
      hasPrevPage
      hasNextPage
      prevPage
      nextPage
      totalPages
      pageSize
      pageNumber
    }
  }
`;
