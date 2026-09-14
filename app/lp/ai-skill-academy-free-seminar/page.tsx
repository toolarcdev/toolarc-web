import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AffiliateImpression } from "@/components/affiliate/AffiliateImpression";
import { resolveAffiliateLink, buildAffiliateAnchorProps, isDirectAffiliateAllowed } from "@/lib/affiliate";
import { LpCta, StickyCta } from "./LpActions";
import styles from "./page.module.css";

const url = "https://www.toolarc.jp/lp/ai-skill-academy-free-seminar";
const title = "はじめてのAI、無料セミナーをのぞいてみませんか｜スマホから参加OK";
const description = "AIに興味はあるけれど、何ができるかはまだ分からない初心者の方へ。AIスキルアカデミーの無料オンラインセミナーで、説明や実演を通じて使い方を見てみませんか。参加無料・顔出し不要。使い道が決まっていなくても参加できます。無料で開催する理由や、開催時間・参加方法も紹介します。";
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },

  openGraph: {
    title, description, url, type: "website", locale: "ja_JP", siteName: "ToolArc",
    images: [{ url: "/images/lp/ai-skill-academy-free-seminar/IMG-02.png", width: 1536, height: 1024, alt: "文章の要約、画像生成、AIへの頼み方を描いた3つの活用例" }]
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/lp/ai-skill-academy-free-seminar/IMG-02.png"] },
};

export default function AiSkillAcademyFreeSeminarPage() {
  const resolved = isDirectAffiliateAllowed("ai-skill-academy-free-seminar", "ai-skill-academy")
    ? resolveAffiliateLink("ai-skill-academy", "text-main") : null;
  const props = resolved ? buildAffiliateAnchorProps(resolved) : null;
  const link = props ? { href: props.href, target: props.target, rel: props.rel + " sponsored", referrerPolicy: props.referrerPolicy } : null;
  return <div className={styles.page} data-lp="ai-skill-academy-free-seminar">
    <a className="skip" href="#main">本文へ</a>
    <header className="masthead wrap">
      <Link className="brand" href="https://www.toolarc.jp/">ToolArc</Link>
      <span className="ad">広告</span>
    </header>
    <main id="main">
      <section className="hero wrap">
        <div className="hero-copy">
          <div id="B01">
            <h1>AIのこと、<br />
              <span className="phrase">まだよく</span>
              <span className="phrase">分からなくても</span>
              <br />大丈夫。</h1>
          </div>
          <div id="B02">
            <div className="intro-copy">
              <p>
                <strong>AIスキルアカデミーの無料セミナーで、できることを見てみませんか。</strong>
              </p>
              <p>AIが便利だとは聞くけれど、何に使えるのか、何から調べればよいのか分からない。そんな段階から参加できます。</p>
              <p>AIスキルアカデミーの無料セミナーは、AIを初めて使う人にも向けたオンラインセミナーです。文章をまとめたり、画像を作ったり。「こんなこともできるんだ」と感じる使い方を、説明や実演で見てみましょう。使う目的や質問を、先に決めておく必要はありません。</p>
            </div>
            <div className="hero-visual">
              <Image className="hero-image" src="/images/lp/ai-skill-academy-free-seminar/IMG-01.png" alt="自宅で気軽にタブレットを眺める人物と、文章や画像の活用イメージ" width="1448" height="1086" fetchPriority="high" loading="eager" sizes="(max-width: 767px) 280px, (max-width: 1120px) 42vw, 460px" />
            </div>
            <p className="participation-note">
              <strong>参加無料・顔出し不要<br />スマホから、見るだけでも参加できます。</strong>
            </p>
          </div>
          <div id="B03">
            <div className="proof">
              <p className="operator">AIスキルアカデミーは、株式会社レストが運営しています。</p>同社主催セミナーの参加実績 <strong className="achievement">累計10万人</strong> 2026年4月時点｜AIスキルアカデミー公式案内より</div>
            <div className="participation-action">
              <p>
                <span className="schedule-days">週に5日程度・土日開催あり</span>
                <span className="schedule-time">10:00～12:30</span>
                <span className="school-note">セミナー内には有料スクールの紹介も含まれます。</span>
              </p>
              <LpCta id="cta-1" link={link} />
            </div>
          </div>
        </div>
      </section>
      <section className="section example-section">
        <div className="wrap">
          <div id="B04">
            <h2>「AIで何ができるの？」を、実際の例で見てみる</h2>
            <p>文章をまとめる、画像を作る、伝え方を工夫する。AIには、たとえばこんな使い方があります。</p>
            <div className="examples">
              <article className="example">
                <h3>長い文章を読む手間を減らせる？</h3>
                <div className="example-image slice-0" role="img" aria-label="長い文章から要点をまとめ、スライドのたたき台を作る">
                </div>
                <p>長い文章から要点をまとめ、スライドのたたき台を作る</p>
              </article>
              <article className="example">
                <h3>言葉から画像を作れる？</h3>
                <div className="example-image slice-1" role="img" aria-label="画像や動画、チラシ、4コマ漫画の生成例">
                </div>
                <p>画像や動画、チラシ、4コマ漫画の生成例</p>
              </article>
              <article className="example">
                <h3>AIにはどう頼めばいい？</h3>
                <div className="example-image slice-2" role="img" aria-label="目的や相手、AIに担当してほしい役割を整理して指示する考え方">
                </div>
                <p>目的や相手、AIに担当してほしい役割を整理して指示する考え方</p>
              </article>
            </div>
            <p>「趣味で使ってみたい」「日々の作業にも役立ちそう」。具体例を見てから、自分との接点を探しても構いません。ChatGPTで質問をしたことがある方も、ほかの使い方を知る機会になります。</p>
          </div>
        </div>
      </section>
      <section className="section reason">
        <div className="wrap">
          <div id="B05">
            <div className="reason-heading">
              <h2>なぜ無料で開催しているの？</h2>
              <p>このセミナーには、AIの活用例を紹介するとともに、AIスキルアカデミーの有料スクールを知ってもらう役割があります。そのため、参加費は無料で、セミナー内ではスクールの学習内容やサポート、料金も紹介されます。</p>
              <p>開催元のAIスキルアカデミーは、株式会社レストが提供するAI学習サービスです。無料セミナーでAIの使い方に触れ、もっと学ぶことに関心を持った人へ、有料スクールという選択肢を案内しています。</p>
            </div>
            <figure className="reason-image">
              <Image src="/images/lp/ai-skill-academy-free-seminar/IMG-03.png" width="1122" height="1402" loading="lazy" sizes="(max-width: 820px) calc(100vw - 40px), 780px" alt="無料セミナーで参加者はAIの活用例を見られ、企業は有料スクールを知ってもらえる。活用例・実演とスクール紹介を通じて双方の目的が成り立つ図" />
            </figure>
          </div>
          <div id="B06">
            <div className="reason-action">
              <p>まずは「AIで何ができるかを見てみたい」という関心から、参加を考えてみてください。</p>
              <LpCta id="cta-2" link={link} />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div id="B07">
            <h2>日程を選んだら、メールの案内から参加</h2>
            <div className="logistics-grid">
              <table>
                <thead>
                  <tr>
                    <th scope="col">項目</th>
                    <th scope="col">参加の案内</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">参加費</th>
                    <td>無料</td>
                  </tr>
                  <tr>
                    <th scope="row">開催日時</th>
                    <td>週に5日程度、10:00～12:30。土日開催あり</td>
                  </tr>
                  <tr>
                    <th scope="row">所要時間</th>
                    <td>約2.5時間。有料スクールの紹介を含みます</td>
                  </tr>
                  <tr>
                    <th scope="row">参加形式</th>
                    <td>オンライン・Zoom</td>
                  </tr>
                  <tr>
                    <th scope="row">顔出し</th>
                    <td>不要。視聴のみでも参加できます</td>
                  </tr>
                  <tr>
                    <th scope="row">端末</th>
                    <td>PC・スマートフォン・タブレット</td>
                  </tr>
                </tbody>
              </table>
              <ol className="steps">
                <li>
                  <strong>参加したい日程を選んで予約する</strong>
                  <br />   申込ページで開催日を選び、名前・メールアドレスなどの必要事項を入力します。</li>
                <li>
                  <strong>確認メールを確認する</strong>
                  <br />   参加方法が届くので、当日使う案内を手元に残しておきます。</li>
                <li>
                  <strong>開始時刻にZoomへ参加する</strong>
                  <br />   案内された参加リンクから入ります。顔を出して話す準備は必要ありません。</li>
              </ol>
            </div>
            <div className="details">
              <p>最新の日程と参加手順は、申込ページ・届いたメールから確認できます。</p>
            </div>
          </div>
          <div id="B08">
            <h3>特典を受け取りたい方へ</h3>
            <p>公式サイトでは、プロンプト集などの参加特典も紹介されています。過去の参加記録では、セミナー内の合言葉をLINEで送り、アンケートに回答して資料を受け取る流れが報告されています。受け取りたい方は当日の案内を確認してください。</p>
          </div>
          <div id="B09">
            <h3>申込み後の連絡について</h3>
            <p>予約後はメールで参加案内が届き、特典の受け取りにはLINEの案内があります。公式の個人情報の取り扱いには、サービスやキャンペーン等の案内メールへの利用も記載されています。<a href="https://lp.ai-skill.jp/privacy">プライバシーポリシー</a>
            </p>
          </div>
        </div>
      </section>
      <section className="section closing">
        <div className="narrow">
          <div id="B10">
            <h2>何に使うかは、見てから考えても大丈夫</h2>
            <p>「AIに興味はあるけれど、詳しいことはまだわからない」「実際に動かしているところを見てみたい」。参加のきっかけは、それだけで十分です。知識を身につけたり、使い道を決めたりするのは、説明や実演を見てからでも大丈夫。まずは気軽に、無料セミナーをのぞいてみませんか。</p>
            <LpCta id="cta-3" link={link} />
            <p>開催内容・特典は2026年9月確認の情報です。最新の案内は公式ページで確認できます。</p>
          </div>
        </div>
      </section>
    </main>
    <footer className="wrap">
      <Link className="brand" href="https://www.toolarc.jp/">ToolArc</Link>
      <Link href="/about">運営情報</Link>
      <Link href="/privacy">プライバシーポリシー</Link>
      <Link href="/affiliate-disclosure">広告・アフィリエイト表記</Link>
    </footer>
    <StickyCta link={link} />

    {resolved?.impressionUrl && <AffiliateImpression src={resolved.impressionUrl} />}
  </div>;
}
