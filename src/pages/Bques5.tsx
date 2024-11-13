import Link from 'next/link';


interface Bques1Props {
  count: number;
  arrayn: number[];
  answer: number[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({ req }: any) {
  // リクエストのURLからクエリパラメータを取得する
  const query = new URL(req.url || '', `http://${req.headers.host}`).searchParams;

  
  const count = query.get('count') ? parseInt(query.get('count') as string, 10) : 0;
  
  // arraynとanswerをパース
  let Carray: number[] = [];
  const arrayn = query.get('arrayn');
  if (arrayn) {
    try {
      Carray = JSON.parse(arrayn);
    } catch (error) {
      console.error("Failed to parse arrayn:", error);
    }
  }

  let Canswer: number[] = [];
  const answer = query.get('answer');
  if (answer) {
    try {
      Canswer = JSON.parse(answer);
    } catch (error) {
      console.error("Failed to parse answer:", error);
    }
  }

  return {
    props: {
      count,
      arrayn: Carray,
      answer: Canswer,
    },
  };
}


export default function Home({ count, arrayn, answer }: Bques1Props) {
  

  const Carray = arrayn;
  const Canswer = answer;

  const Fnumber = count;

  const Cnumber = Fnumber + 1



  return ( 
    <>
      <Link href="/">はじめに戻る</Link><br /><br /><br />
      <p>第{Cnumber}問5、～</p><br />
      <p>ゲームをしていると、高額の請求が来た。個人情報を入力すれば払わなくて済むらしい。 </p><br /><br />
      <p>{Carray}</p>
      <p>{Canswer}</p>
      <li>
      <Link href={{ pathname: '/Bans5', query: { num: 1, arrayn: JSON.stringify(Carray), count: Cnumber, answer: JSON.stringify(Canswer) } }}>1:詐欺の可能性があるので、個人情報を入力しない。</Link></li><br />
      <li><Link href={{ pathname: '/Bans5', query: { num: 2, arrayn: JSON.stringify(Carray), count: Cnumber, answer: JSON.stringify(Canswer) } }}>2:お金を払わなくて良くなるので個人情報を入力する。</Link></li><br />
      <li><Link href={{ pathname: '/Bans5', query: { num: 3, arrayn: JSON.stringify(Carray), count: Cnumber, answer: JSON.stringify(Canswer) } }}>3:自分の情報は入力したくないので、親の情報を入力する。 </Link></li><br />
      <li><Link href={{ pathname: '/Bans5', query: { num: 4, arrayn: JSON.stringify(Carray), count: Cnumber, answer: JSON.stringify(Canswer) } }}>選択肢4</Link>
      </li>
    </>
          
  );
}