import React, { useEffect } from 'react';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

const PaypalButton = ({
  totalPrice,
  handleSetPaypal,
}: {
  totalPrice: number;
  handleSetPaypal: any;
}) => {
  const currency = 'EUR';

  const ButtonWrapper = ({
    currency,
    showSpinner,
  }: {
    currency: string;
    showSpinner: boolean;
  }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          style={{ layout: 'vertical' }}
          disabled={false}
          fundingSource={'paypal'}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalPrice.toString(),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions
              .order!.capture()
              .then((details) => handleSetPaypal());
          }}
        />
      </>
    );
  };

  return (
    <div className='pt-1'>
      <PayPalScriptProvider
        options={{
          'client-id':
            'ATba9YMUOGj85RMZlI2u9oHbhEgJc-hLy_xQAdzqeGZAbD28Wh6B1kZiMAq2kwmo6youM6TP5-FjgNhp',
          components: 'buttons',
          currency: 'EUR',
        }}
      >
        <ButtonWrapper currency={currency} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
};

export default React.memo(PaypalButton);
