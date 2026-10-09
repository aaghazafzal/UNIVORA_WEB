import AppsDesktopView from "../../components/desktop/AppsDesktopView";
import AppsMobileView from "../../components/mobile/AppsMobileView";
import Footer from "../../components/Footer";

export default function AppsPage() {
  return (
    <>
      <div className="block md:hidden">
        <AppsMobileView />
      </div>
      <div className="hidden md:block">
        <AppsDesktopView />
      </div>
      <Footer />
    </>
  );
}
