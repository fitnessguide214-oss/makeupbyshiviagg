import { Layout } from "./components/Layout";
import { AppointmentSection } from "./pages/AppointmentSection";
import { CTAPrimary, CTASecondary } from "./pages/CTASection";
import { CelebritySection } from "./pages/CelebritySection";
import { ContactSection } from "./pages/ContactSection";
import { FAQSection } from "./pages/FAQSection";
import { HeroSection } from "./pages/HeroSection";
import { PortfolioSection } from "./pages/PortfolioSection";
import { ReviewsSection } from "./pages/ReviewsSection";
import { ServicesSection } from "./pages/ServicesSection";
import { WhyUsSection } from "./pages/WhyUsSection";

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <CelebritySection />
      <WhyUsSection />
      <CTAPrimary />
      <ReviewsSection />
      <FAQSection />
      <CTASecondary />
      <AppointmentSection />
      <ContactSection />
    </Layout>
  );
}
