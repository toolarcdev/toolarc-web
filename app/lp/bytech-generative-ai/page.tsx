import type { Metadata } from "next";
import type { HTMLAttributeReferrerPolicy, ReactNode } from "react";
import Image from "next/image";
import { AffiliateImpression } from "@/components/affiliate/AffiliateImpression";
import {
  buildAffiliateAnchorProps,
  isDirectAffiliateAllowed,
  resolveAffiliateLink,
} from "@/lib/affiliate";
import { LpCta } from "./LpActions";
import { LpDebugMode } from "./LpDebugMode";
import styles from "./page.module.css";

const pageSlug = "bytech-generative-ai";
const pageUrl = "https://www.toolarc.jp/lp/bytech-generative-ai";
const pageTitle = "バイテック生成AIの口コミ・評判は？料金・教材・受講事例を解説";
const pageDescription =
  "バイテック生成AIスクールの口コミ・評判が気になる方へ。公式受講事例、教材・コース、2・4・6か月プランの料金と支援期間を紹介します。DMM・SHIFT AIとの学習スタイルの違い、PC要件、無料カウンセリングの流れ、申込経路ごとの返金条件も確認できます。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    type: "website",
    locale: "ja_JP",
    siteName: "ToolArc",
    images: [
      {
        url: "/images/lp/bytech-generative-ai/T01_ワークショップ_05_サービス規模と受講者像.png",
        width: 1536,
        height: 1024,
        alt: "バイテック生成AIの学習サービス規模と受講者像",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/images/lp/bytech-generative-ai/T01_ワークショップ_05_サービス規模と受講者像.png"],
  },
};

type AffiliateAnchor = {
  href: string;
  target?: string;
  rel?: string;
  referrerPolicy?: HTMLAttributeReferrerPolicy;
} | null;

function DebugLabel({ children }: { children: ReactNode }) {
  return <span className={styles.debugLabel} aria-hidden="true">{children}</span>;
}

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}<span className={styles.externalMark} aria-hidden="true">↗</span>
    </a>
  );
}

function Figure({
  id,
  label,
  src,
  alt,
  caption,
  priority = false,
  imageOverlay,
}: {
  id: string;
  label: string;
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
  imageOverlay?: string;
}) {
  return (
    <figure className={styles.figure} data-debug-id={id}>
      <DebugLabel>{`${id} · ${label}`}</DebugLabel>
      <div className={styles.figureVisual}>
        <Image
          src={src}
          alt={alt}
          width={1536}
          height={1024}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 820px) calc(100vw - 36px), 780px"
        />
        {imageOverlay ? <span className={styles.figureImageOverlay} aria-hidden="true">{imageOverlay}</span> : null}
      </div>
      <figcaption className={styles.figureCaption}>{caption}</figcaption>
    </figure>
  );
}

function SectionStart({ id, label }: { id: string; label: string }) {
  return <DebugLabel>{`${id} · ${label}`}</DebugLabel>;
}

export default function BytechGenerativeAiLp() {
  const resolved = isDirectAffiliateAllowed(pageSlug, "bytech")
    ? resolveAffiliateLink("bytech", "text")
    : null;
  const anchorProps = resolved ? buildAffiliateAnchorProps(resolved) : null;
  const affiliateLink: AffiliateAnchor = anchorProps?.href
    ? {
        href: anchorProps.href,
        target: anchorProps.target,
        rel: `${anchorProps.rel} sponsored`,
        referrerPolicy: anchorProps.referrerPolicy,
      }
    : null;

  return (
    <div
      className={styles.page}
      data-lp={pageSlug}
      data-block-labels="off"
      data-hidden-blocks=""
    >
      <a className={styles.skipLink} href="#main">本文へ移動</a>

      <header className={styles.masthead} data-block-id="B01" id="B01">
        <SectionStart id="B01" label="ヘッダー" />
        <a className={styles.brand} href="https://www.toolarc.jp/" aria-label="ToolArc トップページ">
          ToolArc
        </a>
        <span className={styles.adLabel}>広告</span>
      </header>

      <main id="main" className={styles.main}>
        <section className={styles.hero} data-block-id="B02" id="B02">
          <SectionStart id="B02" label="タイトル・リード" />
          <p className={styles.kicker}>BYTECH GENERATIVE AI SCHOOL / COURSE GUIDE</p>
          <h1>バイテック生成AIを検討する方へ<span>料金・教材・受講事例を解説</span></h1>
          <p className={styles.lead}>
            バイテック生成AIスクールを検討しているものの、<strong className={styles.inlineEmphasis}>「口コミは本当？」</strong><strong className={styles.inlineEmphasis}>「料金に見合う？」</strong><strong className={styles.inlineEmphasis}>「AI未経験でも続けられる？」</strong>と迷っていませんか。
            教材、受講生の活用事例、プランごとの支援内容を見比べ、自分の仕事や副業の目標に合うか確認できます。
          </p>

          <details className={styles.conclusion} data-block-id="B03" id="B03" data-debug-id="ACC-01">
            <DebugLabel>B03 · 先に結論・相談先 / ACC-01</DebugLabel>
            <summary>
              <span>先に結論と無料カウンセリングを確認する</span>
              <span className={styles.summaryIcon} aria-hidden="true">＋</span>
            </summary>
            <div className={styles.conclusionBody}>
              <ul>
                <li>教材だけでなく、実践課題とメンター相談を仕事や制作の目標に結び付けて学べます。</li>
                <li>動画講座を含むカリキュラムは無期限で視聴でき、チャットと面談の支援期間は選んだプランの期間内です。</li>
                <li>一括料金は2か月148,000円、4か月228,000円、6か月298,000円（税込）です。</li>
                <li>2か月プランは面談が月2回、4・6か月プランは面談回数が無制限です。</li>
              </ul>
              <div className={styles.ctaRow}>
                <LpCta id="CTA1" label="結論内" link={affiliateLink}>無料カウンセリングを予約する</LpCta>
              </div>
            </div>
          </details>
        </section>

        <div className={styles.articleColumn}>
          <section className={styles.section} data-block-id="B05" id="B05">
            <SectionStart id="B05" label="教材・コース・受講者像" />
            <div className={styles.sectionHead}>
              <p className={styles.sectionNumber}>01 / LEARNING</p>
              <h2>バイテック生成AIでは何を学べる？</h2>
              <p>生成AIの基礎から、業務効率化やWeb制作、副業での制作まで。目的に近いコースと教材を探せます。</p>
            </div>
            <p>
              バイテック生成AIは、株式会社AI棒が運営するオンライン生成AIスクールです。教材カテゴリーには、生成AIツールの活用、職種別の業務、Webライティングや画像・動画制作、資格対策などがあります。
              <SourceLink href="https://bytech.jp/">公式サイト</SourceLink>
            </p>
            <p><strong className={styles.inlineEmphasis}>10コース・800以上のカリキュラム</strong>から、目的に近い学び方を選べます。</p>
            <Figure
              id="IMG-02"
              label="教材カテゴリー"
              src="/images/lp/bytech-generative-ai/T01_ワークショップ_02_教材カテゴリー.png"
              alt="AIツール、職種、制作、資格対策などの教材カテゴリーと利用目的の対応図"
              caption="AIツール、仕事、制作、資格対策から学ぶ目的に近い教材カテゴリーを探せます。"
            />
            <p>
              AIの利用経験がなくても、基礎操作から扱う教材を選べます。2026年4月時点で<strong className={styles.inlineEmphasis}>累計3,000人以上を支援</strong>し、受講者は会社員が多く、25〜40代が中心です。
              <SourceLink href="https://bytech.jp/blog/media-policy/">受講者数・受講者像の情報</SourceLink>
            </p>
            <Figure
              id="IMG-05"
              label="サービス規模・受講者像"
              src="/images/lp/bytech-generative-ai/T01_ワークショップ_05_サービス規模と受講者像.png"
              alt="受講者数、教材・課題・メンターの規模と主な受講者像をまとめた図"
              caption="2026年4月時点の受講者数、教材・課題・メンターの規模、受講者の主な属性です。"
            />
            <p className={styles.keyLine}>
              バイテック生成AIの良さは、教材を見るだけで終わらず、<strong>実践課題とメンター相談</strong>を<strong>仕事や制作の目標</strong>に結び付けて学べることです。
            </p>
          </section>

          <section className={styles.section} data-block-id="B06" id="B06">
            <SectionStart id="B06" label="受講生の活用事例" />
            <div className={styles.sectionHead}>
              <p className={styles.sectionNumber}>02 / CASES</p>
              <h2>口コミ・評判は？受講生の事例で見る仕事や副業への活用</h2>
              <p>受講後の使い道を、仕事での業務改善と副業制作の事例から見てみましょう。</p>
            </div>
            <div className={styles.caseIntro}>
              <p><strong>副業制作</strong>マーケティング経験を生かしてAIライターとして独立し、<span className={styles.caseMetric}>月収25万円</span>に至った受講生がいます。</p>
              <p><strong>社内業務</strong>IT企業の管理職として働く受講生は、議事録作成を<span className={styles.caseMetric}>30分から5分</span>に短縮し、社内のAI活用を広げました。</p>
            </div>
            <Figure
              id="IMG-06"
              label="受講事例の活用ルート"
              src="/images/lp/bytech-generative-ai/T01_ワークショップ_06_受講事例の活用ルート.png"
              alt="マーケターからAIライターとして独立した事例と、議事録作成を効率化した事例の活用ルート"
              caption="副業制作と社内業務改善という、受講生2人の個別事例です。"
            />
            <p className={styles.noteBox}>
              いずれも受講生個人の事例です。月収や作業時間の変化は受講者全体の平均値ではなく、同じ成果が得られることを示すものでもありません。
            </p>
            <div className={styles.ctaRow}>
              <LpCta id="CTA2" label="受講事例の後" link={affiliateLink}>無料カウンセリングを予約する</LpCta>
            </div>
            <p className={styles.sourceLine}><SourceLink href="https://bytech.jp/interview">受講生インタビュー</SourceLink></p>
          </section>

          <section className={styles.section} data-block-id="B07" id="B07">
            <SectionStart id="B07" label="料金・支援期間・b-Works" />
            <div className={styles.sectionHead}>
              <p className={styles.sectionNumber}>03 / PLANS</p>
              <h2>プランは2・4・6か月｜支援期間と目標で選ぶ</h2>
              <p>受講料だけでなく、サポート期間と学びたい内容を合わせて比べます。</p>
            </div>
            <p>
              一括料金（税込）は、2か月プランが148,000円、4か月プランが228,000円、6か月プランが298,000円です。分割払いを選ぶ場合は、支払回数に応じた総額と各回の金額も確認してください。
              <SourceLink href="https://bytech.jp/plan">料金プラン</SourceLink>
            </p>
            <div className={styles.tableWrap} data-debug-id="PRICE-01">
              <DebugLabel>PRICE-01 · 料金比較表</DebugLabel>
              <table className={styles.priceTable}>
                <caption>バイテック生成AIのプラン料金（税込）</caption>
                <thead><tr><th scope="col">プラン</th><th scope="col">一括料金</th><th scope="col">面談回数</th></tr></thead>
                <tbody>
                  <tr><th scope="row">2か月</th><td data-label="一括料金">148,000円</td><td data-label="面談回数">月2回</td></tr>
                  <tr><th scope="row">4か月</th><td data-label="一括料金">228,000円</td><td data-label="面談回数">無制限</td></tr>
                  <tr><th scope="row">6か月</th><td data-label="一括料金">298,000円</td><td data-label="面談回数">無制限</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              どのプランも<strong className={styles.inlineEmphasis}>動画講座を含む学習カリキュラムを無期限で視聴</strong>できます。<strong className={styles.inlineEmphasis}>チャットとマンツーマン面談のサポートは選んだプランの期間内</strong>です。4・6か月プランの面談回数は無制限です。
              <SourceLink href="https://bytech.jp/support">サポート内容</SourceLink>
            </p>
            <Figure
              id="IMG-08"
              label="プラン視聴・支援期間"
              src="/images/lp/bytech-generative-ai/T01_ワークショップ_08_プラン視聴と支援期間.png"
              alt="無期限の教材視聴と、2・4・6か月プランごとのチャット・面談支援期間のタイムライン"
              caption="教材の視聴は無期限、チャットと面談の支援は選んだプランの期間内です。"
            />
            <p>
              2か月は基礎や業務効率化の目標が絞れている人、4か月は副業制作や業務自動化も試したい人、6か月は余裕を持って継続的に実践したい人が比較しやすいプランです。
            </p>
            <Figure
              id="IMG-09"
              label="目的から選ぶプラン"
              src="/images/lp/bytech-generative-ai/T01_ワークショップ_09_目的から選ぶプラン.png"
              alt="仕事や副業の目的と学習時間から2・4・6か月プランを選ぶ比較図"
              caption="目標と確保できる学習時間を手掛かりに、相談するプラン候補を絞れます。"
            />
            <p>
              契約中は、より長い期間のプランへ変更できます。差額や手続きは個別案内です。短いプランへの変更や差額返金を前提にせず、目標と学習時間を整理して選びましょう。
            </p>
            <details className={styles.bworks} data-debug-id="ACC-02">
              <DebugLabel>ACC-02 · b-Worksの詳細</DebugLabel>
              <summary>
                <span>副業案件マッチング「b-Works」の条件を見る</span>
                <span className={styles.summaryIcon} aria-hidden="true">＋</span>
              </summary>
              <div className={styles.bworksBody}>
                <p>
                  b-Worksは、AIライティング、画像・動画制作、Difyを使った業務フロー作成などの案件に応募できるマッチングサービスです。未経験者の案件獲得成功率は90%です。案件ごとにテスト選考があり、合格した人がアサインされます。
                </p>
                <p>受講しただけで案件や報酬が決まるものではありません。応募したい仕事の種類、テスト内容、選考条件をカウンセリングで確認できます。</p>
                <SourceLink href="https://bytech.jp/">b-Works・公式サービス情報</SourceLink>
              </div>
            </details>
            <div className={styles.ctaRow}>
              <LpCta id="CTA3" label="プラン・案件説明の後" link={affiliateLink}>無料カウンセリングを予約する</LpCta>
            </div>
          </section>

          <section className={styles.section} data-block-id="B08" id="B08">
            <SectionStart id="B08" label="他社との違い・PC要件" />
            <div className={styles.sectionHead}>
              <p className={styles.sectionNumber}>04 / COMPARISON</p>
              <h2>DMM・SHIFT AIとの違いとPC要件</h2>
              <p>教材数だけでなく、課題への取り組み方や質問・相談の方法を比べます。</p>
            </div>
            <p>
              バイテックは<strong className={styles.inlineEmphasis}>個別課題と専任メンターへの相談</strong>を組み合わせます。DMM 生成AI CAMPは講座を受けて課題に取り組む形式、SHIFT AIは動画講座・ウェビナー・コミュニティを組み合わせる形式です。課題を個別に相談したいか、複数講座を継続して学びたいか、交流の機会を重視するかで選び方が変わります。
            </p>
            <Figure
              id="IMG-11"
              label="学習スタイル比較"
              src="/images/lp/bytech-generative-ai/T01_ワークショップ_11_学習スタイル比較.png"
              alt="バイテック、DMM生成AI CAMP、SHIFT AIの学習スタイルを比べる図"
              caption="個別課題と相談、講座と課題、動画・ウェビナー・交流という学び方の違いです。"
            />
            <p>
              ビジネスワーカーコースでは、営業・事務・企画・カスタマーサクセスなどのメール、議事録、調査、報告書、資料作成を扱います。
            </p>
            <p className={styles.environmentNote}>
              <span className={styles.environmentLabel}>受講環境</span>
              受講システムには<strong className={styles.inlineEmphasis}>PCまたはMacのデスクトップ・ノートPCが必要</strong>です。スマートフォンだけで課題作成や提出まで完結する前提にはせず、使えるPC環境を確認してください。
              <SourceLink href="https://bytech.jp/system-requirements">受講システムの要件</SourceLink>
            </p>
            <p className={styles.sourceLine}>
              <SourceLink href="https://genai.dmm.com/">DMM 生成AI CAMP</SourceLink>
              <span> ／ </span>
              <SourceLink href="https://shift-ai.co.jp/about/">SHIFT AI</SourceLink>
            </p>
          </section>

          <section className={styles.section} data-block-id="B09" id="B09">
            <SectionStart id="B09" label="カウンセリング・返金条件" />
            <div className={styles.sectionHead}>
              <p className={styles.sectionNumber}>05 / COUNSELING</p>
              <h2>無料カウンセリングの流れと申込別の返金条件</h2>
              <p>予約方法と申込経路ごとの条件を確認してから、相談へ進めます。</p>
            </div>
            <p>
              無料カウンセリングは毎日開催しています。Zoomによるオンライン相談で、所要時間は60〜90分です。予約画面に表示される空き日時を選び、目標や教材、プランについて相談できます。
            </p>
            <Figure
              id="IMG-13"
              label="無料カウンセリングの流れ"
              src="/images/lp/bytech-generative-ai/T01_ワークショップ_13_無料カウンセリングの流れ.png"
              alt="予約カレンダーで日時を選び、Zoomで60〜90分、目標・教材・プランを相談する3段階"
              caption="予約、Zoomでのオンライン相談、目標や教材・プランの確認までの流れです。"
              imageOverlay="オンライン・60〜90分"
            />
            <div className={styles.prepBox}>
              <h3>相談前に整理しておくこと</h3>
              <ul>
                <li>仕事や副業で試したいこと</li>
                <li>週に確保できる学習時間と、使えるPC環境</li>
                <li>b-Worksに関心がある場合は、応募したい案件やテスト選考</li>
              </ul>
              <p>Zoomで接続できる端末と通信環境を準備し、カメラ・マイクの条件は予約案内に従ってください。</p>
            </div>
            <p>
              <strong className={styles.inlineEmphasis}>説明会・個別相談を経て申し込む場合</strong>、独自の10日間返金保証の対象です。起算日は学習サイトのログイン情報が届いた翌日で、所定期間内の申出、申請フォームの提出、返金合意書への署名などの条件があります。<strong className={styles.inlineEmphasis}>公式LPから説明会を経ずに直接申し込む場合</strong>、この独自保証は適用されません。
              <SourceLink href="https://bytech.jp/refund-policy">返金ポリシー</SourceLink>
            </p>
            <Figure
              id="IMG-15"
              label="申込経路別の返金条件"
              src="/images/lp/bytech-generative-ai/T01_ワークショップ_15_申込経路別返金条件.png"
              alt="説明会や個別相談を経る申込みと、公式LPから直接申し込む場合の返金条件の違い"
              caption="申込経路によって独自返金保証の対象条件が異なります。"
            />
            <p className={styles.noteBox}>
              通信販売には特定商取引法上のクーリングオフ制度は適用されません。申込経路と返金条件を確認してください。
            </p>
            <div className={styles.ctaRow}>
              <LpCta id="CTA4" label="返金条件の後" link={affiliateLink}>無料カウンセリングを予約する</LpCta>
            </div>
          </section>

          <section className={styles.disclaimer} data-block-id="B10" id="B10">
            <SectionStart id="B10" label="免責・注記" />
            <p>
              本記事は2026年10月2日時点の情報に基づきます。料金、教材、支援内容、予約枠、返金条件は変更される場合があります。受講生インタビューは個人の経験・成果であり、同じ結果を得られることを示すものではありません。
            </p>
          </section>
        </div>
      </main>

      <LpDebugMode />
      {process.env.NODE_ENV === "production" && resolved?.impressionUrl ? (
        <AffiliateImpression src={resolved.impressionUrl} />
      ) : null}
    </div>
  );
}
