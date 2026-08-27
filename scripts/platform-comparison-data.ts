export type PaymentModel = 'subscription' | 'package' | 'marketplace' | 'hybrid';
export type FixedTeacherMode = 'formal' | 'recurring' | 'rebook' | 'priority' | 'teacher-specific' | 'unknown';
export type RecordingMode = 'video' | 'audio' | 'board' | 'none' | 'unknown';

export interface PlatformComparisonItem {
  id: string;
  name: string;
  aliases?: string[];
  ageMin: number | null;
  ageMax: number | null;
  lessonMinutes: number[];
  priceTwdMinPerLesson: number | null;
  priceNote: string;
  paymentModel: PaymentModel;
  fixedTeacherMode: FixedTeacherMode;
  fixedTeacherLabel: string;
  cancelHours: number | null;
  cancelNote: string;
  recordingMode: RecordingMode;
  recordingLabel: string;
  zeroBeginner: boolean | null;
  bilingualTeacher: boolean | null;
  firstPaymentNote: string;
  sourceLevel: '官方' | '官方＋2026第三方' | '2026第三方';
  href?: string;
}

/**
 * 僅放入本聊天室已整理、足以支援 6 條件篩選的欄位。
 * null = 目前公開資料不足，前端不把它當成符合。
 */
export const platformComparisonData: PlatformComparisonItem[] = [
  {
    id: 'tutorabc-junior', name: 'TutorABC Junior／TutorJr', aliases: ['TutorJr'],
    ageMin: 4, ageMax: 18, lessonMinutes: [25, 45], priceTwdMinPerLesson: 300,
    priceNote: '官網公開約 NT$300／堂起；大型課包與 Oxford 方案另計。', paymentModel: 'package',
    fixedTeacherMode: 'priority', fixedTeacherLabel: '可選偏好老師優先配對，但不保證指定同一位',
    cancelHours: 4, cancelNote: '一般指定人數課約 4 小時前；大師講堂與 Oxford 部分課型另有規則。',
    recordingMode: 'video', recordingLabel: '課程錄影可回看；固定保存天數未公開',
    zeroBeginner: true, bilingualTeacher: true, firstPaymentNote: '以方案總額為主；2026既有方案紀錄可達 NT$8萬以上。',
    sourceLevel: '官方', href: '/blog/tutorjr-review-evergreen/'
  },
  {
    id: 'oikid', name: 'OiKID', ageMin: 3, ageMax: 15, lessonMinutes: [25], priceTwdMinPerLesson: 390,
    priceNote: '2026公開方案 NT$62,400 起；單堂需看付費堂數／贈課分母。', paymentModel: 'package',
    fixedTeacherMode: 'rebook', fixedTeacherLabel: '可自選老師並重約；非正式固定老師方案',
    cancelHours: 24, cancelNote: '公開規則約需提前 24 小時取消。',
    recordingMode: 'video', recordingLabel: '有課程回放；保存期限待核實',
    zeroBeginner: true, bilingualTeacher: true, firstPaymentNote: '方案總額 NT$62,400 起；可見 24 期分期。',
    sourceLevel: '官方＋2026第三方'
  },
  {
    id: '51talk', name: '51Talk', ageMin: 3, ageMax: 15, lessonMinutes: [25], priceTwdMinPerLesson: 236,
    priceNote: '2026第三方方案約 NT$44,616 起；不同分母可得約 NT$236～321／堂。', paymentModel: 'package',
    fixedTeacherMode: 'rebook', fixedTeacherLabel: '可收藏並重約喜歡的老師；非正式固定老師方案',
    cancelHours: null, cancelNote: '2026公開頁同時出現 30 與 60 分鐘兩種口徑，需依帳號／方案核對。',
    recordingMode: 'video', recordingLabel: '青少回放約 180 天，可下載；另有錄音',
    zeroBeginner: true, bilingualTeacher: null, firstPaymentNote: '公開方案約 NT$44,616 起。',
    sourceLevel: '官方＋2026第三方'
  },
  {
    id: '25hoon', name: '25Hoon', ageMin: null, ageMax: null, lessonMinutes: [25], priceTwdMinPerLesson: 155,
    priceNote: '2026第三方公開約 NT$155～370／堂，依自由／固定與頻率。', paymentModel: 'package',
    fixedTeacherMode: 'formal', fixedTeacherLabel: '有正式固定老師＋固定時段方案',
    cancelHours: 1, cancelNote: '自由方案約 1 小時前；固定方案需約 24 小時前請假。',
    recordingMode: 'video', recordingLabel: '30 天內不限次數回看',
    zeroBeginner: true, bilingualTeacher: null, firstPaymentNote: '最少約 48 堂；不同方案總額依堂數與頻率。',
    sourceLevel: '官方＋2026第三方'
  },
  {
    id: 'wuwow-junior', name: 'WUWOW Junior', ageMin: 4, ageMax: 15, lessonMinutes: [25], priceTwdMinPerLesson: 300,
    priceNote: '2026第三方公開約 NT$300～650／堂；官網未見統一價目。', paymentModel: 'package',
    fixedTeacherMode: 'rebook', fixedTeacherLabel: '可指定老師／固定時段，但兩者規則不同',
    cancelHours: 0.25, cancelNote: '一般非指定課第三方資料約 15 分鐘前；指定老師／自備教材約 24 小時。',
    recordingMode: 'video', recordingLabel: '有課程錄影複習；保存期限待核實',
    zeroBeginner: true, bilingualTeacher: true, firstPaymentNote: '2026公開統一最低購買總額未找到。',
    sourceLevel: '官方＋2026第三方'
  },
  {
    id: 'novakid', name: 'Novakid', ageMin: 4, ageMax: 12, lessonMinutes: [25,45], priceTwdMinPerLesson: 290,
    priceNote: '國際師 US$9／25 分鐘起；母語師 US$17 起（以匯率換算會變動）。', paymentModel: 'subscription',
    fixedTeacherMode: 'recurring', fixedTeacherLabel: '可建立一位或多位固定老師與固定課表',
    cancelHours: 8, cancelNote: '公開條款／試聽規則可見約 8 小時前取消／改期。',
    recordingMode: 'video', recordingLabel: '家長後台可看課程回放；固定保存天數未公開',
    zeroBeginner: true, bilingualTeacher: false, firstPaymentNote: '訂閱制；另有 3／6／12 個月方案。',
    sourceLevel: '官方'
  },
  {
    id: 'cambly-kids', name: 'Cambly Kids', ageMin: 4, ageMax: 15, lessonMinutes: [30], priceTwdMinPerLesson: 250,
    priceNote: '依月／季／年與每週堂數計；臺灣頁年繳曾低至約 US$7.96／堂。', paymentModel: 'subscription',
    fixedTeacherMode: 'recurring', fixedTeacherLabel: '上過一次後可建立每週固定老師課程',
    cancelHours: 12, cancelNote: '固定週課約需 12 小時前取消／改期；一般預約由老師設定提前通知時間。',
    recordingMode: 'video', recordingLabel: '有課程影片，可自行刪除；可申請停止錄製',
    zeroBeginner: true, bilingualTeacher: false, firstPaymentNote: '依訂閱週堂數與月／季／年方案。',
    sourceLevel: '官方'
  },
  {
    id: 'nativecamp', name: 'NativeCamp', ageMin: null, ageMax: null, lessonMinutes: [25], priceTwdMinPerLesson: null,
    priceNote: 'NT$2,199／月即時課吃到飽；指定老師需另外購買金幣。', paymentModel: 'subscription',
    fixedTeacherMode: 'rebook', fixedTeacherLabel: '可收藏並用金幣指定預約；非固定老師方案',
    cancelHours: 1, cancelNote: '預約課約 1 小時前取消可退金幣。',
    recordingMode: 'unknown', recordingLabel: '本輪資料未把課程回放作為可確認核心規格',
    zeroBeginner: true, bilingualTeacher: null, firstPaymentNote: '一般月費 NT$2,199；家庭方案約 NT$999／人。',
    sourceLevel: '官方'
  },
  {
    id: 'engoo', name: 'Engoo', ageMin: null, ageMax: null, lessonMinutes: [25], priceTwdMinPerLesson: null,
    priceNote: '臺灣官網約 NT$926／月起；依一般／雙享／Premium 與堂數不同。', paymentModel: 'subscription',
    fixedTeacherMode: 'rebook', fixedTeacherLabel: '可自行重約同一老師；非固定老師方案',
    cancelHours: 0.5, cancelNote: '約 30 分鐘前取消可退課堂額度。',
    recordingMode: 'audio', recordingLabel: '自動音訊錄音＋Lesson Notes，不是完整視訊回放',
    zeroBeginner: true, bilingualTeacher: true, firstPaymentNote: '月訂閱 NT$926 起；境外刷卡可能有約 1.5% 手續費。',
    sourceLevel: '官方'
  },
  {
    id: 'amazingtalker', name: 'AmazingTalker', ageMin: null, ageMax: null, lessonMinutes: [25,50], priceTwdMinPerLesson: 172,
    priceNote: '老師自行定價；50 分鐘公開即時報價可從 NT$172 到 NT$2,000+。', paymentModel: 'marketplace',
    fixedTeacherMode: 'teacher-specific', fixedTeacherLabel: '直接購買特定老師課程',
    cancelHours: null, cancelNote: '依平台與老師設定，不宜用單一數值概括。',
    recordingMode: 'unknown', recordingLabel: '依老師／平台當期功能',
    zeroBeginner: null, bilingualTeacher: true, firstPaymentNote: '可從單堂／小課包開始，實際依老師。',
    sourceLevel: '官方＋2026第三方'
  },
  {
    id: 'preply', name: 'Preply', ageMin: null, ageMax: null, lessonMinutes: [25,50], priceTwdMinPerLesson: null,
    priceNote: '老師自行定價；Trial 通常付費。', paymentModel: 'marketplace',
    fixedTeacherMode: 'teacher-specific', fixedTeacherLabel: '訂閱特定老師',
    cancelHours: 12, cancelNote: '約 12 小時前取消／改期可退回課時。',
    recordingMode: 'unknown', recordingLabel: '本輪資料未確認為全平台統一錄影規格',
    zeroBeginner: null, bilingualTeacher: true, firstPaymentNote: '依老師單價與訂閱堂數。',
    sourceLevel: '官方'
  },
  {
    id: 'hitutor', name: 'Hi家教／HiTutor／HiKid Talk', ageMin: 7, ageMax: 12, lessonMinutes: [25,50], priceTwdMinPerLesson: 285,
    priceNote: '菲師 NT$285／25 分鐘起；中師、歐美師另有不同價格。', paymentModel: 'package',
    fixedTeacherMode: 'rebook', fixedTeacherLabel: '可選不同師資與時段；非單一固定老師制度',
    cancelHours: 3, cancelNote: '一般課約 3 小時前取消；即時訂課成功後不可取消。',
    recordingMode: 'video', recordingLabel: '有課程錄影／學習紀錄與老師評語',
    zeroBeginner: true, bilingualTeacher: true, firstPaymentNote: '可按師資與課包購買；套裝總價依活動。',
    sourceLevel: '官方'
  },
  {
    id: 'yesonline', name: 'YesOnline 兒童英文', ageMin: null, ageMax: null, lessonMinutes: [50], priceTwdMinPerLesson: 320,
    priceNote: '官方兒童課約 NT$320～360／50 分鐘。', paymentModel: 'package',
    fixedTeacherMode: 'recurring', fixedTeacherLabel: '可持續預約同一老師與固定時段，但非保證固定方案',
    cancelHours: 5, cancelNote: '約課前 5 小時選課／取消。',
    recordingMode: 'board', recordingLabel: '可保存板書／課堂內容；完整錄影規格待核實',
    zeroBeginner: true, bilingualTeacher: null, firstPaymentNote: '第三方資料約 60 堂起；官方現行總方案價待核實。',
    sourceLevel: '官方＋2026第三方'
  },
  {
    id: 'bizetalk', name: 'BizeTalk 兒童互動英文 KD', ageMin: 8, ageMax: 12, lessonMinutes: [50], priceTwdMinPerLesson: 355,
    priceNote: '10 堂 NT$3,900；30 堂 NT$11,400；大課包含贈課後約 NT$355～390／堂。', paymentModel: 'package',
    fixedTeacherMode: 'formal', fixedTeacherLabel: '固定老師＋固定時段',
    cancelHours: 2, cancelNote: '約課前 2 小時可請假／協調調課。',
    recordingMode: 'unknown', recordingLabel: '本輪資料未確認統一錄影規格',
    zeroBeginner: false, bilingualTeacher: null, firstPaymentNote: '首購最低 10 堂，NT$3,900。',
    sourceLevel: '官方'
  },
  {
    id: 'oneclass', name: 'OneClass 真人 Live 家教', ageMin: 6, ageMax: 12, lessonMinutes: [25], priceTwdMinPerLesson: 600,
    priceNote: '24 堂＋贈 4 堂 NT$14,400；付費堂數基準 NT$600／堂。', paymentModel: 'package',
    fixedTeacherMode: 'unknown', fixedTeacherLabel: '依產品／排課機制',
    cancelHours: 24, cancelNote: '事假約需 24 小時前提出；病假另有證明規則。',
    recordingMode: 'unknown', recordingLabel: '本輪資料未確認統一錄影規格',
    zeroBeginner: true, bilingualTeacher: null, firstPaymentNote: '最低可見 24 堂，NT$14,400。',
    sourceLevel: '官方'
  },
  {
    id: 'italki', name: 'italki', ageMin: null, ageMax: null, lessonMinutes: [], priceTwdMinPerLesson: null,
    priceNote: '老師自行定價；第三方2026常見專業教師約 US$10～40／小時。', paymentModel: 'marketplace',
    fixedTeacherMode: 'teacher-specific', fixedTeacherLabel: '直接向特定老師購課',
    cancelHours: 24, cancelNote: '超過 24 小時可直接取消；24 小時內需和老師協調。',
    recordingMode: 'unknown', recordingLabel: '依老師／平台當期功能',
    zeroBeginner: null, bilingualTeacher: true, firstPaymentNote: '可逐堂買或買老師課包。',
    sourceLevel: '官方＋2026第三方'
  },
  {
    id: 'liveabc', name: 'LiveABC／LiveTalk', ageMin: null, ageMax: null, lessonMinutes: [], priceTwdMinPerLesson: null,
    priceNote: '分校／混成式產品，未找到全臺統一 LiveTalk 兒童單堂價。', paymentModel: 'hybrid',
    fixedTeacherMode: 'unknown', fixedTeacherLabel: '依分校／LiveTalk產品',
    cancelHours: null, cancelNote: '未找到全臺統一取消時限。',
    recordingMode: 'unknown', recordingLabel: '依產品',
    zeroBeginner: true, bilingualTeacher: true, firstPaymentNote: '需依分校／課程組合確認。',
    sourceLevel: '官方'
  }
];
