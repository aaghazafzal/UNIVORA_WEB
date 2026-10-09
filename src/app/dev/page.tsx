import DevDesktopView from "../../components/desktop/DevDesktopView";
import DevMobileView from "../../components/mobile/DevMobileView";
import Footer from "../../components/Footer";

export default function DevPage() {
  return (
    <>
      <div className="block md:hidden">
        <DevMobileView />
      </div>
      <div className="hidden md:block">
        <DevDesktopView />
      </div>
      <Footer />
    </>
  );
}
