# Todo リスト作成チーム開発（第 7 期）

# HP／アプリ概要

Firebase を利用したログイン機能付きの Todo アプリ
チームメンバーで TODO を共有し、コメントできる

## 公開 URL

<!-- 仮URL -->

https://next-todo-7.vercel.app/

## 機能

新規登録・ログイン・ログアウト機能(Firebase Auth)
Todo のソート・絞り込み機能
ゴミ箱機能
コメント機能

## 開発メンバー

- 参加メンバー（担当）:
  - Komori Mariko (ユーザー認証機能実装、TODO 新規作成機能実装、TOP ページ DB 連携)
  - 香村 麻衣（TODO 新規作成ページ UI 作成、コメント投稿機能実装）
  - カジ（編集ページ UI 作成）
  - Takumi Kojo（TOP ページ UI 作成＆機能実装、ゴミ箱ページ機能実装）
  - 品川 敬昇（詳細ページ UI 作成、編集機能実装）
  - 雄大（ゴミ箱ページ UI 作成、ページネーション実装）
  - 高橋-t（404 ページ UI 作成）
- リーダー:品川敬昇（Issue 管理、MTG 進行、議事録作成） （編集済み）

## 使用技術

- React.js (https://github.com/facebook/react)
- Next.js (https://github.com/vercel/next.js)
- firebase
- typescript
- Recoil
- Chakra UI

## 推奨 VScode 拡張機能

- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph&ssr=false#qna) コミットの一覧 → 詳細を閲覧できる
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory) ファイルの履歴などを確認できる
- [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

※ おすすめしたいものがあれば適宜追加する

## バージョン情報

volta で管理、volta 以外をお使いの方は自身で以下のバージョンにあわせてください。
https://volta.sh/

```
"node": "16.17.0",
"yarn": "1.22.19"
```

## プロジェクトの概要

Todo リストの作成を通じて、React、Next.js の基礎、git,Github の使い方に慣れ、チーム開発を体験する。
チームメンバー同士でのコードレビュー、毎週 MTG での issue やデザインについての議論など個人開発では行えない内容をカバーしていきます。

## 環境構築手順

1. `git clone https://github.com/if-mentor/next_todo_7.git`
2. **github アカウントを 2 つ以上持っている方のみ、確認**
   - clone したリポジトリのディレクトリに移動
   - `git config --list`を実行する
   - vscode で github と連携をおこなっているユーザー名がプロジェクトに招待してもらっているユーザー名と同じになっているか確認
   - 同じになっていない場合は、ログインを変更する（※方法がわからない場合は、ジュンペイに連絡すること）
3. リポジトリのディレクトリへ移動
4. `yarn` // package の install
5. `yarn dev `

   上記を実行し、`http://localhost:3000/`
   以下の画像の画面が表示できるか確認をお願いします。

   ![image](https://user-images.githubusercontent.com/24813936/148723807-3b3e571b-6669-4d1c-a96f-d623f9650e09.png)

## 開発 Tips

### 1. プルリクエスト前の作業

プルリクエストを上げる前に必ず、自分が作業を行なっているブランチで`git pull origin main`を行うこと
もし、コンフリクトが発生したら、ローカル上で解決する、解決の仕方がわからない場合は、メンバーに相談すること

### 2. `git pull origin main`を行なった後の作業

remote に変更があった場合は、`git pull origin main`のコマンドを実行し、remote の変更を取り込む
package に更新がないか、確認するため、`yarn`コマンドを実行する
`success Already up-to-date.`と表示されれば OK。

### 3. プルリクのレビュー後のマージについて

プルリクエストを作成し、レビューが終わった後は、マージを github 上で行ってください。
もし、この際に github 上でコンフリクトが発生していることがわかった場合は、ローカル環境で
`git pull origin main`を行い、ローカル環境でコンフリクトを解消するようにしてください。

---

## 自主的な貢献を歓迎

チームにとっていいことを考え行動してくれる方を尊重します。
やりたいことや試してみたいことなどを自主的に提案していただき、どんどんチーム開発を盛り上げていきましょう！
基本的にはチームとして行いたいものを自由にやってもらうスタンスで進めていきます。

### Issue の作成

自主的な貢献の一環として、Issue の作成は各自で自由に作成して、構いません。
ルールとして、作成した Issue を必ず開発 MTG で提案し、いつ対応するのかをチームで決めましょう。
また、Issue とすべきか、曖昧な場合は、Discussion に内容を記述し、メンバーから意見をもらいましょう。

### git/gitHub

毎週 MTG の際にメンバーの中で翌週のプルリクに対して、レビュワーを 2 人以上決めて、順番に回していく。
レビュワーが足りない場合は、チームメンバー全員でレビューを行うようにする。
コードに対して、批評をするのではなく、自分がわからないコードや理解できないコードを質問するようにレビューを進めることで
実装者のレベルは関係なくレビューを行っていけるかと思います。
明らかに実装に問題がある場合は、指摘しましょう。

#### ブランチ命名規則

issue 番号を必ず含める

**＜具体例＞**
issue#３ Todo の作成画面の実装の場合

`git checkout -b #3-Todo-Page-Layout`

#### コミットメッセージ

#issue 番号 + プレフィックス + 日本語で端的に

- **プレフィックス**をつける
  - add: 機能追加
  - fix: バグ修正
  - config: 設定
  - refactor: リファクタリング
  - docs:ドキュメント
  - chore: その他環境構築など雑用

例）
`git commit -m '#3 refactor: Todo作成画面のレイアウト調整' `
