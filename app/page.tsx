import SectionContainer from "@/lib/section-container";
import { HeroHeadingText } from "@/lib/typography";

export default function App() {
  return (
    <>
      <SectionContainer className="mt-8">
        <HeroHeadingText className="text-center">Next.js + Postgresql CRUD</HeroHeadingText>
      </SectionContainer>
    </>
  );
}