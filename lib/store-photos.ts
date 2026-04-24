/**
 * 실제 매장 사진 (`public/images`) — 전체 목록 + 페이지별 슬롯.
 * 교체: `ALL_STORE_PHOTOS` 순서/파일명 또는 아래 `storePhotoSlots`의 개별 키만 수정하세요.
 */

export const ALL_STORE_PHOTOS = [
  "/images/KakaoTalk_20260413_004057003.jpg",
  "/images/KakaoTalk_20260413_004057003_01.jpg",
  "/images/KakaoTalk_20260413_004057003_02.jpg",
  "/images/KakaoTalk_20260413_004057003_03.jpg",
  "/images/KakaoTalk_20260413_004057003_04.jpg",
  "/images/KakaoTalk_20260413_004057003_05.jpg",
  "/images/KakaoTalk_20260413_004057003_06.jpg",
  "/images/KakaoTalk_20260413_004057003_07.jpg",
  "/images/KakaoTalk_Photo_2026-04-14-12-30-11.jpeg",
] as const

/** 같은 이미지 연속 노출을 피하도록 섞어 둔 순서 (매장 갤러리 등) */
export const STORE_PHOTOS_GALLERY_ORDER: readonly string[] = [
  ALL_STORE_PHOTOS[7],
  ALL_STORE_PHOTOS[2],
  ALL_STORE_PHOTOS[0],
  ALL_STORE_PHOTOS[5],
  ALL_STORE_PHOTOS[1],
  ALL_STORE_PHOTOS[4],
  ALL_STORE_PHOTOS[6],
  ALL_STORE_PHOTOS[3],
]

/**
 * 슬롯 이름 → 사용처
 * - homeHero → `components/home/hero-section.tsx` (메인 배너 배경)
 * - storesOperatingCard, storesUpcomingCard → `app/stores/page.tsx` (+ 갤러리 `STORE_PHOTOS_GALLERY_ORDER`)
 */
export const storePhotoSlots = {
  homeHero: ALL_STORE_PHOTOS[3],

  storesOperatingCard: [ALL_STORE_PHOTOS[1], ALL_STORE_PHOTOS[4], ALL_STORE_PHOTOS[6]] as const,
  storesUpcomingCard: [ALL_STORE_PHOTOS[2], ALL_STORE_PHOTOS[3], ALL_STORE_PHOTOS[5]] as const,
} as const
