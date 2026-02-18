import { MapPin, Navigation, Car, AlertTriangle } from "lucide-react"
import { Section } from "@/components/layout"
import { Container } from "@/components/layout"
import { SectionHeading } from "@/components/section-heading"

export function Access() {
  return (
    <Section id="access" className="bg-secondary py-16 md:py-24">
      <Container>
        <SectionHeading label="ACCESS" title="アクセス" />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Address and Map */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl bg-card p-6 shadow-sm md:p-8">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                所在地・ナビ設定
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {'〒311-2104 茨城県鉾田市根山2947'}
              </p>

              <div className="mt-5 rounded-lg bg-destructive/10 p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <div>
                    <p className="text-sm font-semibold text-destructive">{'重要：ナビ設定時のご注意'}</p>
                    <p className="mt-1 text-sm text-destructive/80">
                      住所検索を行うと、地図上のピンが実際の場所とズレて表示される場合がございます。
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-lg bg-primary/5 p-4">
                <Navigation className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">ナビの目的地設定</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    「セブンイレブン 鉾田梶山店」を目的地に設定してお越しください。当施設はすぐ隣です。
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="overflow-hidden rounded-xl bg-card shadow-sm">
              <div className="aspect-[4/3] bg-secondary">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.5!2d140.5!3d36.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDAwJzAwLjAiTiAxNDDCsDMwJzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1600000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KITAURA LAKESIDE RV park の地図"
                />
              </div>
            </div>
          </div>

          {/* Driving Time */}
          <div className="rounded-xl bg-card p-6 shadow-sm md:p-8">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Car className="h-5 w-5 text-primary" />
              お車での所要時間
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              最寄りのインターチェンジからの目安時間です。
            </p>

            <div className="flex flex-col gap-6">
              {/* East Kanto Expressway */}
              <div>
                <h4 className="mb-3 text-sm font-semibold tracking-wider text-primary">東関東自動車道をご利用の方</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-foreground">鉾田IC</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">約15分</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-foreground">潮来IC</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">約30分</span>
                  </div>
                </div>
              </div>

              {/* Joban Expressway */}
              <div>
                <h4 className="mb-3 text-sm font-semibold tracking-wider text-primary">常磐自動車道をご利用の方</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-foreground">土浦北IC</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">約50分</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
