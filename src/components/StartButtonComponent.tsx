interface StartButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  border?: "normal" | "rounded-full";
  fullWidth?: boolean;
}

const StartButton = ({
  onClick,
  children,
  border = "normal",
  fullWidth = false,
}: StartButtonProps) => {
  return (
    <div className={`flex flex-col gap-6 max-w-sm mx-auto relative z-10 font-[TTOctosquares] ${fullWidth ? 'w-full' : 'w-auto'}`}>
      <button
        onClick={onClick}
        className={`group relative px-10 py-3 backdrop-blur-xl border-2 border-cyan-500/30 bg-linear-to-br from-cyan-900/40 via-blue-900/60 to-blue/80 shadow-2xl hover:shadow-cyan-500/30 hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-cyan-400/60 overflow-hidden ${border === 'rounded-full' ? 'rounded-full' : 'rounded-lg'}`}
      >
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500/10 via-cyan-400/20 to-cyan-500/10 opacity-0  transition-opacity duration-500"></div>

        <div className="relative z-10 flex items-center gap-4 justify-center">
          <p className="uppercase text-cyan-50 font-bold text-2xl group-hover:text-white transition-colors duration-300 drop-shadow-sm">
            {children}
          </p>
        </div>
      </button>
    </div>
  );
};

export default StartButton;
