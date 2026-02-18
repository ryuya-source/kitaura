import type { Metadata } from "next"
import { PageLayout } from "@/components/layout"
import { Container } from "@/components/layout"
import { Section } from "@/components/layout"
import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "お問い合わせ | KITAURA LAKESIDE RV park",
  description: "KITAURA LAKESIDE RV parkへのご予約・お問い合わせはこちらから。",
}

export default function ContactPage() {
  return (
    <PageLayout mainClassName="pt-16">
      <PageHero label="CONTACT" title="お問い合わせ" />

      <Section className="bg-background py-16 md:py-24">
        <Container size="form">
          <ContactForm />
        </Container>
      </Section>
    </PageLayout>
  )
}
