const Overlay = ({ category }: { category: string }) => {
  return (
    <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/40 to-black/50 transition-all duration-300 group-hover:bg-gradient-to-t group-hover:from-black/80 group-hover:via-black/60 group-hover:to-black/20'>
      <span className='translate-y-8 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-3xl font-semibold text-transparent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
        {category}
      </span>
    </div>
  );
};

export default Overlay;
