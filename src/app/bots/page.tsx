import BotsDesktopView from "../../components/desktop/BotsDesktopView";
import BotsMobileView from "../../components/mobile/BotsMobileView";
import Footer from "../../components/Footer";

export default function BotsPage() {
  return (
    <>
      <div className="block md:hidden">
        <BotsMobileView />
      </div>
      <div className="hidden md:block">
        <BotsDesktopView />
      </div>
      <Footer />
    </>
  );
}
