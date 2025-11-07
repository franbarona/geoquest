interface ContainerComponentProps {
  children: React.ReactNode;
}

const ContainerComponent = ({ children }: ContainerComponentProps) => {
  return (
    <div className="relative rounded-lg backdrop-blur-lg border-2 border-neutral-700 bg-linear-to-br from-neutral-800/50 via-[#A5715010] to-neutral-600/40 shadow-2xl overflow-hidden">
      <div className="flex justify-center items-center py-2">{children}</div>
    </div>
  );
};

export default ContainerComponent;
