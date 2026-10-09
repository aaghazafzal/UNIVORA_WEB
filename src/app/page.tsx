import DesktopHomeView from "../components/desktop/DesktopHomeView";
import MobileHomeView from "../components/mobile/MobileHomeView";

export default function HomePage() {
  return (
    <>
      <div className="block md:hidden">
        <MobileHomeView />
      </div>
      <div className="hidden md:block">
        <DesktopHomeView />
      </div>
    </>
  );
}
