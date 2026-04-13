/**
 * 이미지 파일은 `public/images/` 에 두고, 아래처럼 **경로 문자열**만 바꾸면 됩니다.
 *
 * 지금 쓰는 곳
 * - `homeBanner` → 홈 메인 배너 (`components/home/hero-section.tsx`에서 참조)
 *
 * 나중에 섹션별로 넣고 싶을 때
 * - 여기에 키를 하나 추가하고 (예: `brandHero: "/images/xxx.jpg"`)
 * - 해당 페이지/컴포넌트에서 `HeroStoreBackdrop` 또는 `StorePhotoLayer`에 그 키를 넘기면 됩니다.
 * - 대략적인 위치: 브랜드 상단 `app/brand/page.tsx`, 가맹 `app/startup/page.tsx`,
 *   본문 블록은 `components/home/*.tsx`, `components/brand/*.tsx`
 */
export const siteImages = {
  homeBanner: "/images/KakaoTalk_20260413_004057003_03.jpg",
} as const
