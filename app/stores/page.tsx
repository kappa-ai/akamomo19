import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { StorePhoto, StoreGalleryBand } from "@/components/store/store-media"
import { STORE_PHOTOS_GALLERY_ORDER, storePhotoSlots } from "@/lib/store-photos"
import { MapPin, Clock, Phone, Navigation, ChevronRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RevealSection } from "@/components/motion/reveal"

const stores = [
  {
    name: "아카모모 강남점",
    address: "서울특별시 강남구 강남대로 123",
    phone: "02-1234-5678",
    hours: "24시간 운영",
    status: "운영중"
  },
  {
    name: "아카모모 홍대점",
    address: "서울특별시 마포구 홍익로 45",
    phone: "02-2345-6789",
    hours: "24시간 운영",
    status: "운영중"
  },
  {
    name: "아카모모 부산점",
    address: "부산광역시 해운대구 해운대로 678",
    phone: "051-3456-7890",
    hours: "24시간 운영",
    status: "운영중"
  }
]

const upcomingStores = [
  {
    name: "아카모모 대구점",
    region: "대구광역시",
    status: "2024년 4월 오픈 예정"
  },
  {
    name: "아카모모 인천점",
    region: "인천광역시",
    status: "2024년 5월 오픈 예정"
  },
  {
    name: "아카모모 대전점",
    region: "대전광역시",
    status: "2024년 6월 오픈 예정"
  }
]

const regions = [
  { name: "서울/경기", count: 15, available: true },
  { name: "부산/경남", count: 5, available: true },
  { name: "대구/경북", count: 3, available: true },
  { name: "인천", count: 2, available: true },
  { name: "대전/충청", count: 4, available: true },
  { name: "광주/전라", count: 3, available: true },
  { name: "강원", count: 1, available: true },
  { name: "제주", count: 1, available: true }
]

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <RevealSection mode="enter" className="relative py-20 bg-gradient-to-b from-peach-lighter to-background overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blush/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-lavender/30 rounded-full blur-2xl" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-peach-light">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">매장 안내</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                <span className="text-primary">아카모모</span> 매장을<br />
                만나보세요
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                전국 각지에서 아카모모의 특별한 공간을 경험해 보세요.
                <br />
                밝고 친근한 분위기의 매장이 여러분을 기다리고 있습니다.
              </p>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="py-12 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl p-6 border border-border shadow-sm text-center h-full">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-sm text-muted-foreground">전국 매장</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-border shadow-sm text-center h-full">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">17개</div>
                <p className="text-sm text-muted-foreground">시도 진출</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-border shadow-sm text-center h-full">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24시간</div>
                <p className="text-sm text-muted-foreground">운영</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-border shadow-sm text-center h-full">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">확장중</div>
                <p className="text-sm text-muted-foreground">브랜드 성장</p>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="py-20 bg-peach-lighter/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                운영중인 <span className="text-primary">매장</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                가까운 아카모모 매장을 방문해 보세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map((store, index) => (
                <div key={index} className="bg-white rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-all h-full">
                  <StorePhoto
                    src={storePhotoSlots.storesOperatingCard[index]}
                    aspect="video"
                    className="mb-4"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">{store.name}</h3>
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                      {store.status}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{store.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{store.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{store.hours}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <button className="w-full flex items-center justify-center gap-2 text-primary font-medium hover:text-coral transition-colors">
                      <Navigation className="w-4 h-4" />
                      길찾기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                오픈 <span className="text-primary">예정 매장</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                새롭게 오픈할 아카모모 매장을 기대해 주세요
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {upcomingStores.map((store, index) => (
                <div key={index} className="bg-gradient-to-br from-peach-lighter to-cream rounded-3xl p-6 border border-border h-full">
                  <StorePhoto
                    src={storePhotoSlots.storesUpcomingCard[index]}
                    aspect="video"
                    className="mb-4 opacity-95"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                      오픈 예정
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{store.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{store.region}</p>
                  <p className="text-sm text-primary font-medium">{store.status}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="py-20 bg-peach-lighter/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                지역별 <span className="text-primary">확장 현황</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                아카모모는 전국으로 확장하고 있습니다
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {regions.map((region, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 border border-border text-center hover:shadow-md transition-all h-full">
                  <h3 className="font-semibold text-foreground mb-2">{region.name}</h3>
                  <p className="text-2xl font-bold text-primary">{region.count}개</p>
                  {region.available && (
                    <span className="inline-block mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      추가 모집중
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <StoreGalleryBand
          title="매장 갤러리"
          description="실제 공간 분위기를 한눈에 살펴보세요."
          images={STORE_PHOTOS_GALLERY_ORDER}
          columns={4}
          className="bg-background"
        />

        <RevealSection className="py-20 bg-gradient-to-br from-primary via-coral to-blush">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <TrendingUp className="w-12 h-12 mx-auto mb-6 opacity-80" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                아카모모와 함께<br />
                새로운 지역에서 시작하세요
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                아직 아카모모가 없는 지역에서 첫 번째 점주가 되어보세요.
                <br />
                본사의 체계적인 지원으로 성공적인 가맹을 도와드립니다.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-cream px-8 py-6 text-lg"
              >
                <Link href="/inquiry">
                  가맹 상담 신청하기
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </RevealSection>
      </main>
      <Footer />
    </div>
  )
}
