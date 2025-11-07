import ContainerComponent from "./ContainerComponent";
import { LuMenu   } from "react-icons/lu";

const MenuButton = ({ onClick }: { onClick: () => void }) => (
  <div className="fixed top-3 lg:top-6 right-3 lg:right-6 z-1000 pointer-events-auto aspect-square w-12 lg:w-15">
    <ContainerComponent>
      <button
        onClick={onClick}
        className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out p-0.5 lg:p-2"
      >
        <LuMenu  className="text-2xl lg:text-2xl" />
      </button>
    </ContainerComponent>
  </div>
);

export default MenuButton;
