const EmptyCart = () => {
  return (
    <div className='min-h-[calc(100vh-128px)] flex flex-col items-center pt-20 gap-10'>
      <img src={require('../../assets/empty-cart.webp')} alt='' width='500px' />
      <p className='text-xl font-semibold'>Your Cart is Empty</p>
      <p>Looks like you haven't added anything to your cart yet.</p>
    </div>
  );
};
export default EmptyCart;
