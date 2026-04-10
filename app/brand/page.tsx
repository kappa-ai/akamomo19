import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Heart, Sparkles, Users, Sun, Store, Smile } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-peach-lighter to-background overflow-hidden">
          <div className="absolute top-10 right-10 w-40 h-40 bg-blush/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-lavender/30 rounded-full blur-2xl" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-peach-light">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">브랜드 소개</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                <span className="text-primary">아카모모</span>를 소개합니다
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                부담 없이 경험하는 새로운 성인용품 라이프스타일,
                <br />
                아카모모만의 특별한 공간 철학을 만나보세요.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  자판기형 성인용품점과는<br />
                  <span className="text-primary">완전히 다릅니다</span>
                </h2>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    기존의 성인용품점은 어둡고 숨어있는 공간, 들어가기 부담스러운 곳이라는 
                    인식이 강했습니다. 자판기형 무인 매장은 물건을 사러 가는 곳일 뿐, 
                    경험이나 즐거움과는 거리가 멀었죠.
                  </p>
                  <p>
                    아카모모는 이런 고정관념을 완전히 바꾸고자 합니다. 
                    우리는 단순히 물건을 파는 공간이 아닌, 
                    누구나 편안하게 방문하고 새로운 경험을 즐길 수 있는 
                    라이프스타일 공간을 만들었습니다.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-peach-lighter to-blush/30 rounded-3xl p-8 md:p-12">
                <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed text-center">
                  &ldquo;판매만 하는 딱딱한 자판기형식의<br />
                  성인용품점은 이제 그만&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Philosophy */}
        <section className="py-20 bg-peach-lighter/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                아카모모의 <span className="text-primary">공간 철학</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                밝고 친근한 공간에서 누구나 편안하게 경험할 수 있도록
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-peach-light to-blush rounded-2xl flex items-center justify-center mb-6">
                  <Sun className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">밝고 친근한 공간</h3>
                <p className="text-muted-foreground">
                  아기자기하고 친근한 인테리어로 기존의 부담스러운 이미지를 낮추고, 
                  누구나 편안하게 들어올 수 있는 환경을 조성합니다.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-peach-light to-blush rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">부담 없는 경험</h3>
                <p className="text-muted-foreground">
                  처음 방문하는 고객도 자유롭게 둘러보고, 직접 보고 만지고 
                  선택할 수 있는 체험 중심의 공간을 제공합니다.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-peach-light to-blush rounded-2xl flex items-center justify-center mb-6">
                  <Smile className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">처음도 편안하게</h3>
                <p className="text-muted-foreground">
                  성인용품을 처음 접하는 분들도 쉽고 편안하게 둘러보고 
                  선택할 수 있는 배려된 환경을 만들어갑니다.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-peach-light to-blush rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">데이트 코스</h3>
                <p className="text-muted-foreground">
                  단순한 판매 공간이 아닌, 커플이 함께 방문해 즐길 수 있는 
                  특별한 데이트 코스로서의 가치를 제공합니다.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-peach-light to-blush rounded-2xl flex items-center justify-center mb-6">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">라이프스타일 매장</h3>
                <p className="text-muted-foreground">
                  성인용품을 라이프스타일의 일부로 자연스럽게 받아들일 수 있는 
                  세련된 공간을 지향합니다.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-peach-light to-blush rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">즐거운 경험</h3>
                <p className="text-muted-foreground">
                  공간 자체가 하나의 즐거움이 되는 경험을 선사합니다. 
                  방문 자체가 특별한 추억이 될 수 있도록 합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Values */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-peach-lighter via-cream to-lavender/20 rounded-3xl p-8 md:p-12 lg:p-16">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  아카모모가 추구하는 가치
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">친근함</div>
                    <p className="text-sm text-muted-foreground">Friendly</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">편안함</div>
                    <p className="text-sm text-muted-foreground">Comfortable</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">즐거움</div>
                    <p className="text-sm text-muted-foreground">Joyful</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">세련됨</div>
                    <p className="text-sm text-muted-foreground">Stylish</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  아카모모는 누구나 부담 없이 성인용품을 경험할 수 있도록 만든 라이프스타일 브랜드입니다.
                  아기자기하고 친근한 공간을 통해 기존의 부담스러운 이미지를 낮추고,
                  처음 방문하는 고객도 편안하게 둘러보고 선택할 수 있는 환경을 제공합니다.
                </p>

                <Button asChild className="rounded-full bg-primary hover:bg-coral text-white px-8">
                  <Link href="/startup">창업 안내 보기</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
