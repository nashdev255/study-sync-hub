const Contents = () => {
  return (
    <>
      <div className="py-12 px-[10vw] space-y-8">
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
            <table className="table-fixed m-4 w-full">
              <thead>
                <tr>
                  <th className="border px-2 py-2">Domain</th>
                  <th className="border px-2 py-2">Technoloy Stack</th>
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
      </div>
    </>
  );
};

export default Contents;
