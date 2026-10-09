import ReportDesktopView from "../../components/desktop/ReportDesktopView";
import ReportMobileView from "../../components/mobile/ReportMobileView";
import Footer from "../../components/Footer";

export default function ReportPage() {
  return (
    <>
      <div className="block md:hidden">
        <ReportMobileView />
      </div>
      <div className="hidden md:block">
        <ReportDesktopView />
      </div>
      <Footer />
    </>
  );
}
