const Contents = () => {
  return (
    <>
      <div className="space-y-12 px-[10vw] py-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">StudySyncHubの概要</h1>
          <p className="text-xl">
            StudySyncHubは勉強の効率化と管理、モチベーションの上昇に加え、
            勉強に関する記事を投稿できるコミュニティを提供するサービスです。
          </p>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">技術構成</h1>
          <div className="w-[75vw]">
            <table className="m-4 w-full table-fixed">
              <thead>
                <tr>
                  <th className="border p-2">Domain</th>
                  <th className="border p-2">Technoloy Stack</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Frontend</td>
                  <td className="border px-4 py-2">React, Next.js</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Backend</td>
                  <td className="border px-4 py-2">TypeScript</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Infrastructure</td>
                  <td className="border px-4 py-2">Vercel</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Database</td>
                  <td className="border px-4 py-2">
                    Supabase
                    <br />(PostgreSQL)
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">others</td>
                  <td className="border px-4 py-2">Git, GitHub</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">デザイン / 構成</h1>
          <p className="text-xl">
            StudySyncHubには主に次の5つの機能があります。
          </p>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Scheduling</h2>
            <p className="px-4 text-lg">
              勉強に関する予定を管理します。
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Progress</h2>
            <p className="px-4 text-lg">
              勉強の進捗報告を行います。
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Articles</h2>
            <p className="px-4 text-lg">
              勉強に関する記事を投稿することができます。
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">StudySync Books</h2>
            <p className="px-4 text-lg">
              勉強に関する本を投稿することができます。<br />
              投稿するユーザーは信頼度と人気度を高めることによって、<br />
              本を有料化することができるようになります。
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Recommends</h2>
            <p className="px-4 text-lg">
              ユーザーの進捗や傾向を分析し、
              ユーザーにあった書籍や記事、StudySync Booksを
              紹介します。
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">今後の展望</h1>
          <p className="text-xl">
            StudySyncHub Proというサブスクリプションを導入し、<br />
            StudySync Booksなどの機能をより快適に利用できるようにしようと考えています。<br />
            また、学生の就職に役立つ情報を提供するため、<br />
            ポートフォリオや資料請求機能なども考えています。
          </p>
        </div>
      </div>
    </>
  );
};

export default Contents;
