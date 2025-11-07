import ContainerComponent from "./ContainerComponent";

const TargetCountryDisplay = ({ countryName }: { countryName: string }) => (
  <div className="fixed top-3 lg:top-6 left-3 lg:left-[50%] lg:-translate-x-[50%] z-1000 pointer-events-none min-w-50 lg:min-w-100 w-auto">
    <ContainerComponent>
        <div className="text-xl lg:text-4xl text-cyan-50 px-4">
          {countryName}
        </div>
    </ContainerComponent>
  </div>
);

export default TargetCountryDisplay;
