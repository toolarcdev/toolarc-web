import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { AffiliateImpression } from "@/components/affiliate/AffiliateImpression";
import {
  buildAffiliateAnchorProps,
  isDirectAffiliateAllowed,
  resolveAffiliateLink,
} from "@/lib/affiliate";
import { LpCta } from "./LpActions";
import { LpPreviewControls } from "./LpPreviewControls";
import styles from "./page.module.css";

const pageUrl = "https://www.toolarc.jp/lp/ai-skill-academy-paid-school";
const pageTitle = "AIスキルアカデミー有料講座ガイド｜内容・料金・無料セミナー";
const pageDescription =
  "AIスキルアカデミーの生成AIビジネス実践講座を、ツール・業務での活用例・教材とサポート・受講料から紹介。無料オンラインセミナー参加後の割引価格と申込み前の確認点も整理しています。";

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
        url: "/images/lp/ai-skill-academy-paid-school/hero-h01.png",
        width: 1536,
        height: 1024,
        alt: "AIを使った経験のある人が、これからの学び方を考えるイメージ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/images/lp/ai-skill-academy-paid-school/hero-h01.png"],
  },
};

const links = {
  seminar: "https://lp.ai-skill.jp/",
  law: "https://lp.ai-skill.jp/law",
};

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
      <span className={styles.externalMark} aria-hidden="true">↗</span>
    </a>
  );
}

export default function AiSkillAcademyPaidSchoolPage() {
  const resolved = isDirectAffiliateAllowed(
    "ai-skill-academy-paid-school",
    "ai-skill-academy",
  )
    ? resolveAffiliateLink("ai-skill-academy", "text-main")
    : null;
  const anchorProps = resolved ? buildAffiliateAnchorProps(resolved) : null;
  const affiliateLink = anchorProps
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
      data-lp="ai-skill-academy-paid-school"
      data-block-labels="off"
      data-hidden-blocks=""
    >
      <a className={styles.skipLink} href="#main">本文へ</a>

      <header className={styles.masthead} data-block-id="B01" id="B01">
        <a className={styles.brand} href="https://www.toolarc.jp/" aria-label="ToolArc トップページ">
          ToolArc
        </a>
        <span className={styles.mastheadTitle}>AIスキルアカデミー 有料講座ガイド</span>
        <span className={styles.adLabel}>広告</span>
      </header>

      <main
        id="main"
        className={styles.main}
      >
        <section className={styles.hero} data-block-id="B02" id="B02">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>AIスキルアカデミー｜生成AIビジネス実践講座</p>
            <h1>
              複数の生成AIと、
              <span>実務での活用を学ぶ。</span>
            </h1>
<p className={styles.lead}>
  AIスキルアカデミーの有料講座について、講座の概要や学び方、サポート、受講料をまとめています。申込み前に確認したい情報を一通り把握できます。
</p>
<p className={styles.heroNote}>
  無料セミナー参加後24時間以内の割引条件や、受講前に確かめたい項目もまとめています。
</p>
          </div>
          <figure className={styles.heroFigure}>
            <Image
              src="/images/lp/ai-skill-academy-paid-school/hero-h01.png"
              alt="ノートを広げ、パソコンの前で学習方法を考える人物のイメージ"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1120px) 44vw, 500px"
            />
          </figure>
        </section>

        <section className={styles.factBand} data-block-id="B03" id="B03" aria-label="申込み前に押さえたい情報">
          <div className={styles.factHeading}>
            <p className={styles.eyebrow}>先に確認できること</p>
            <h2>学ぶ内容・サポート・受講料の概要</h2>
          </div>
          <div className={styles.facts}>
            <article className={styles.fact}>
              <span>学ぶ内容</span>
              <strong>複数の生成AI</strong>
              <p>ChatGPT・Claude・Midjourneyや、企画書・メールなどでの活用例。</p>
            </article>
            <article className={styles.fact}>
              <span>学習・質問方法</span>
              <strong>動画・週2回の講座</strong>
              <p>チャットでの質問対応や、毎週のAIニュース。</p>
            </article>
            <article className={styles.fact}>
              <span>通常の受講料</span>
              <strong>272,800円 <small>税込</small></strong>
              <p>セミナー参加後24時間以内に申し込むと217,800円（税込）。</p>
            </article>
          </div>
          <p className={styles.factSource}>
            価格条件は
            <SourceLink href={links.law}>特定商取引法に基づく表記</SourceLink>
            で確認できます。申込み前に最新の内容をご確認ください。
          </p>
        </section>

        <section className={styles.section} data-block-id="B04" id="B04">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>01 / 学ぶ内容</p>
            <h2>複数のツールと仕事での活用例を学ぶ</h2>
            <p>
              ChatGPT・Claude・Midjourneyなどを横断し、企画書・メール・マーケティングでの使い方まで扱います。
              <br />
              動画教材、週2回のオンラインセミナー、チャットでの質問にも対応しています。
            </p>
          </div>
          <div className={styles.learningLayout}>
            <ul className={styles.learningList}>
              <li>
                <span className={styles.listIndex}>A</span>
                <div><strong>複数の生成AIツール</strong><p>ChatGPT・Claude・Midjourneyなどを扱います</p></div>
              </li>
              <li>
                <span className={styles.listIndex}>B</span>
                <div><strong>業務タスクでの活用例</strong><p>企画書・メール返信・マーケティングでの使い方を学びます</p></div>
              </li>
              <li>
                <span className={styles.listIndex}>C</span>
                <div><strong>何度でも視聴できる動画教材</strong><p>自分のペースで繰り返し学べます</p></div>
              </li>
              <li>
                <span className={styles.listIndex}>D</span>
                <div><strong>週2回のオンラインセミナー</strong><p>毎週2回、オンラインセミナーに参加できます</p></div>
              </li>
              <li>
                <span className={styles.listIndex}>E</span>
                <div><strong>チャットでの質問とAIニュース</strong><p>質問を送れるほか、毎週AIニュースが届きます</p></div>
              </li>
            </ul>
            <figure className={styles.learningFigure}>
              <Image
                src="/images/lp/ai-skill-academy-paid-school/course-l01.png"
                alt="動画教材を見ながら、学んだ内容や質問をメモする学習イメージ"
                width={1536}
                height={1024}
                loading="lazy"
                sizes="(max-width: 760px) calc(100vw - 40px), 42vw"
              />
              <figcaption>学習イメージです。実際の教材画面ではありません。</figcaption>
            </figure>
          </div>
          <p className={styles.sourceNote}>
            カリキュラム全体や各ツールの演習範囲、オンラインセミナーの参加条件、動画の視聴期間、質問対応の回数・回答時間は、申込み前に確認してください。
          </p>
        </section>

        <section className={`${styles.section} ${styles.fitSection}`} data-block-id="B05" id="B05">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>02 / 自分に合うか考える</p>
            <h2>いまのAI活用経験と講座内容の重なりを確認する</h2>
            <p>
              すでに使っているツールや業務がある場合は、習得済みの内容と講座のツール・活用例・サポートを照らし合わせると、受講で得たいことを具体化できます。
            </p>
          </div>
          <dl className={styles.fitList}>
            <div><dt>いまの業務でもっと活用したい</dt><dd>企画書・メール・マーケティングなどの例と、自分のタスクを照合</dd></div>
            <div><dt>使える生成AIの範囲を広げたい</dt><dd>扱うツール名と、それぞれの演習・解説の深さを確認</dd></div>
            <div><dt>知識を整理して復習したい</dt><dd>動画の視聴条件、学習順、利用期間を確認</dd></div>
            <div><dt>質問できる環境を重視したい</dt><dd>チャットの質問範囲・回数・回答時間を確認</dd></div>
            <div><dt>継続的に情報を追いたい</dt><dd>毎週のAIニュースと、オンラインセミナーの内容・参加方法を確認</dd></div>
          </dl>
          <p className={styles.cautionLine}>
            すでに使える内容との重複を避けたい場合は、全目次や教材の難易度、演習の深さを申込み前に確認してください。
          </p>
        </section>

        <section className={`${styles.section} ${styles.priceSection}`} data-block-id="B06" id="B06">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>03 / 費用を確認する</p>
            <h2>通常価格とセミナー参加後の価格</h2>
            <p>
              通常価格とセミナー参加後の価格を、割引の期限や追加費用とあわせて比べられます。
            </p>
          </div>
          <div className={styles.priceLayout}>
            <div className={styles.priceTableWrap}>
              <table className={styles.priceTable}>
                <thead><tr><th scope="col">区分</th><th scope="col">受講料（税込）</th><th scope="col">適用条件</th></tr></thead>
                <tbody>
                  <tr><th scope="row">通常価格</th><td data-label="受講料（税込）">272,800円</td><td data-label="適用条件">割引適用前</td></tr>
                  <tr><th scope="row">セミナー参加後の価格</th><td data-label="受講料（税込）">217,800円</td><td data-label="適用条件">参加後24時間以内の申込み</td></tr>
                </tbody>
              </table>
              <p className={styles.difference}>価格差は55,000円です。割引の申込期限は、セミナー参加後24時間です。</p>
            </div>
            <figure className={styles.priceFigure}>
              <Image
                src="/images/lp/ai-skill-academy-paid-school/price-d03.png"
                alt="受講料や契約条件を並べ、申込み前に比較するイメージ"
                width={1536}
                height={1024}
                loading="lazy"
                sizes="(max-width: 760px) calc(100vw - 40px), 38vw"
              />
            </figure>
          </div>
          <div className={styles.extraCosts}>
            <details>
              <summary>支払い方法に応じて手数料がかかる場合</summary>
              <ul>
                <li>クレジットカードの分割払いで発生する手数料</li>
                <li>銀行振込の振込手数料</li>
              </ul>
            </details>
          </div>
          <p className={styles.cautionLine}>
            24時間の条件を理由に受講を急ぐ必要はありません。講座内容、追加費用、利用条件を確認してから判断してください。
          </p>
        </section>

        <section className={`${styles.section} ${styles.seminarSection}`} data-block-id="B07" id="B07">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>04 / 説明を聞く方法</p>
            <h2>無料オンラインセミナーを受講判断の材料に</h2>
            <p>
              有料講座の案内を聞いてから考えたい方は、無料オンラインセミナーも選択肢になります。
              <br />
              予約前に参加条件を確認し、当日の説明を聞いてから、受講するか検討できます。
            </p>
          </div>
          <div className={styles.seminarDetails}>
            <div className={styles.seminarInfo}>
              <dl>
                <div><dt>参加費</dt><dd>0円</dd></div>
                <div><dt>所要時間</dt><dd>約2.5時間</dd></div>
                <div><dt>参加端末</dt><dd>スマートフォン・タブレットから参加可能</dd></div>
                <div><dt>セミナー内の案内</dt><dd>有料コミュニティの紹介を含む</dd></div>
              </dl>
              <p>
                スマートフォンから参加できます。画面を見ながら操作する場面では、PCの方が参加しやすいことがあります。開催内容や参加条件も事前に確認してください。
              </p>
            </div>
            <figure className={styles.seminarFigure}>
              <Image
                src="/images/lp/ai-skill-academy-paid-school/seminar-b07-phone-v01.png"
                alt="自宅でスマートフォンからオンラインセミナーを視聴しながら、ノートにメモを取る人のイメージ"
                width={1536}
                height={1024}
                loading="lazy"
                sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1120px) 42vw, 480px"
              />
            </figure>
          </div>
          <div className={styles.ctaAfterDetails}>
            <LpCta id="cta-1" link={affiliateLink} />
          </div>
          <details className={styles.trustDisclosure}>
            <summary>販売事業者と契約条件を確認する</summary>
            <p>
              <SourceLink href={links.law}>特定商取引法に基づく表記</SourceLink>
              <span> — 事業者名、所在地、連絡先、料金、支払方法、返金条件</span>
            </p>
          </details>
        </section>

        <section className={`${styles.section} ${styles.checkSection}`} data-block-id="B08" id="B08">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>05 / 受講前に照合する</p>
            <h2>身につけたい実務スキルを申込み前に確認する</h2>
          </div>
          <ul className={styles.checkList}>
            <li>企画書・メール・マーケティングなど、AIを活用したい業務を具体化した。</li>
            <li>扱う生成AIツールと、自分がすでに使えるツールを照らし合わせた。</li>
            <li>希望する業務の演習がカリキュラムに含まれるか確認した。</li>
            <li>動画の視聴期間・オンラインセミナーの参加条件・質問対応の詳細を確認した。</li>
            <li>受講料・割引の適用条件・追加費用・契約条件を確認した。</li>
          </ul>
          <p className={styles.checkNote}>
            演習範囲やサポート条件に分からない点があれば、申込み前に確認してください。
          </p>
        </section>

        <section className={`${styles.section} ${styles.faqSection}`} data-block-id="B09" id="B09">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>よくある確認</p>
            <h2>受講を考えるときの質問</h2>
          </div>
          <div className={styles.faqList}>
            <details>
              <summary>AIを使ったことがある人にも向いていますか？</summary>
              <p>教材の難易度やカリキュラムを見て、すでに知っている内容と次に学びたい範囲を比べてください。無料オンラインセミナーでは、基本的な使い方やプロンプトの基礎も扱われます。</p>
            </details>
            <details>
              <summary>無料セミナーは個別相談ですか？</summary>
              <p>個別相談ではなく、講師の説明を聞くオンラインセミナーです。有料コミュニティの紹介と講師への質問時間があります。個別カウンセリングや、一人ひとりに合わせた回答を受けられるとは限りません。</p>
            </details>
            <details>
              <summary>このページのボタンから有料講座に申し込めますか？</summary>
              <p>このページのボタンから有料講座には申し込めません。無料オンラインセミナーの日程と参加条件を確認するためのボタンです。有料講座は、内容と契約条件を確認してから別途申し込む流れです。</p>
            </details>
            <details>
              <summary>受講すれば仕事や収入に成果が出ますか？</summary>
              <p>成果は個人の経験や活用状況によって異なります。このページでは、業務改善・収入・転職などの結果を保証しません。</p>
            </details>
          </div>
        </section>

        <section className={styles.finalSection} data-block-id="B10" id="B10">
          <p className={styles.eyebrow}>受講前に内容を照合する</p>
          <h2>講座の提供内容と自分の業務課題を照らし合わせる</h2>
          <p>
            複数の生成AI、業務での活用例、教材や質問対応が、次に身につけたい内容と合うか確認してください。
            <br />
            受講前に説明を聞きたい場合は、無料オンラインセミナーの内容と参加条件も確認できます。
          </p>
          <LpCta id="cta-2" link={affiliateLink} />
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.brand} href="https://www.toolarc.jp/">ToolArc</a>
        <nav aria-label="サイト情報">
          <a href="/about">運営情報</a>
          <a href="/privacy">プライバシーポリシー</a>
          <a href="/affiliate-disclosure">広告・アフィリエイト表記</a>
        </nav>
        <p className={styles.sourceNote}>
          掲載内容は、特定商取引法に基づく表記と無料オンラインセミナー案内をもとにしています。料金・講座内容・参加条件は変更される場合があります。申込み前に最新の内容と契約条件をご確認ください。
          <br />
          <SourceLink href={links.law}>特定商取引法に基づく表記</SourceLink>／<SourceLink href={links.seminar}>無料オンラインセミナー案内</SourceLink>
        </p>
      </footer>

      <LpPreviewControls />
      {process.env.NODE_ENV === "production" && resolved?.impressionUrl ? (
        <AffiliateImpression src={resolved.impressionUrl} />
      ) : null}
    </div>
  );
}
