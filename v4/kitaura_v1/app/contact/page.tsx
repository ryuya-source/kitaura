import type { Metadata } from "next"
import { PageLayout } from "@/components/layout"
import { Container } from "@/components/layout"
import { Section } from "@/components/layout"
import { SectionHeading } from "@/components/section-heading"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "お問い合わせ | KITAURA LAKESIDE RV park",
  description: "KITAURA LAKESIDE RV parkへのご予約・お問い合わせはこちらから。",
}

export default function ContactPage() {
  return (
    <PageLayout headerOnlyHamburger mainClassName="pt-12">
      <Section className="bg-background py-16 md:py-24">
        <Container size="form">
          <SectionHeading label="CONTACT" title="お問い合わせ" />
          <ContactForm />
        </Container>
      </Section>
    </PageLayout>
  )
}
