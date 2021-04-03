import { gql } from '@apollo/client';

export const ADD_ORDER = gql`
  mutation($orderInput: String!) {
    addOrder(orderInput: $orderInput) {
      id
      userId
      products {
        id
        title
      }
      status
    }
  }
`;

export const ADD_ORDER_PAPA = gql`
  mutation($phoneNumber: String!, $product: String!) {
    addOrder(phoneNumber: $phoneNumber, product: $product) {
      code,
      message,
      success
    }
  }
`;

export const GET_PAYMENT = gql`
  mutation($paymentInput: String!) {
    charge(paymentInput: $paymentInput) {
      status
    }
  }
`;
