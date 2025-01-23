import { useCallback } from 'react';
import { OrderForm } from 'vtex.order-manager';

const { useOrderForm } = OrderForm;

interface IParams {
  attachment: Record<string, unknown>;
  attachmentName: string;
  itemIndex: string | number;
}

export default function useItemAttachment() {
  const {
    orderForm: { id },
  } = useOrderForm();

  const addAttachment = useCallback(
    async ({ attachment, attachmentName, itemIndex }: IParams) => {
      try {
        await fetch(
          `/api/checkout/pub/orderForm/${id}/items/${itemIndex}/attachments/${attachmentName}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              ...attachment,
            }),
          },
        );
      } catch (err) {
        console.error('error when try to add item attachment');
      }
    },
    [id],
  );

  const removeAttachment = useCallback(
    async ({ attachment, attachmentName, itemIndex }: IParams) => {
      try {
        await fetch(
          `/api/checkout/pub/orderForm/${id}/items/${itemIndex}/attachments/${attachmentName}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'DELETE',
            body: JSON.stringify({ ...attachment }),
          },
        );
      } catch (err) {
        console.error('error when try to add item attachment');
      }
    },
    [id],
  );

  return { addAttachment, removeAttachment };
}
