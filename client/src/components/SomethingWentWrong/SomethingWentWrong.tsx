const SomethingWentWrong = () => {
  return (
    <div className='flex flex-col items-center gap-4 min-h-[calc(100vh-128px)] pt-20'>
      <img src={require('../../assets/sad-dog.png')} alt='' />
      <div className='text-4xl text-red-500 font-bold'>OOPS!</div>
      <div className='text-xl'>It seems like something went wrong.</div>
      <div className='text-xl'>Please check your URL or try again.</div>
    </div>
  );
};
export default SomethingWentWrong;
