import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Home() {
  
  const router = useRouter();
  let { count,arrayn,answer } = router.query;

  const Fnumber = count ? parseInt(count as string, 10) : 0;

  const Cnumber = Fnumber + 1

  


  //let Carray = Array.isArray(arrayn)
  //  ? arrayn.map(num => parseInt(num, 10))
  //  : [];

    // クエリパラメータarraynが文字列であればJSON.parseする
  let Carray: number[] = [];
  
  if (typeof arrayn === 'string') {
    try {
      Carray = JSON.parse(arrayn);  // JSON文字列をパース
    } catch (error) {
      console.error("Failed to parse arrayn:", error);
    }
  } else if (Array.isArray(arrayn)) {
    Carray = arrayn.map(num => parseInt(num, 10));  // string[]をnumber[]に変換
  }



  let Canswer: number[] = [];

  if (typeof answer === 'string') {
    try {
      Canswer = JSON.parse(answer);  // JSON文字列をパース
    } catch (error) {
      console.error("Failed to parse arrayn:", error);
    }
  } else if (Array.isArray(answer)) {
    Canswer = answer.map(num => parseInt(num, 10));  // string[]をnumber[]に変換
  }

  
  

  return ( 
    <>
      <Link href="/">はじめに戻る</Link><br /><br /><br />
      <p>第{Cnumber}問10、～</p><br /><br /><br />
      <p>{Carray}</p>
      <p>{Canswer}</p>
      <li>
      <Link href={{ pathname: '/Bans10', query: { num: 1, arrayn: JSON.stringify(Carray), count: Cnumber, answer: JSON.stringify(Canswer) } }}>選択肢1</Link></li><br />
      <li><Link href={{ pathname: '/Bans10', query: { num: 2, arrayn: JSON.stringify(Carray), count: Cnumber, answer: JSON.stringify(Canswer) } }}>選択肢2</Link></li><br />
      <li><Link href={{ pathname: '/Bans10', query: { num: 3, arrayn: JSON.stringify(Carray), count: Cnumber, answer: JSON.stringify(Canswer) } }}>選択肢3</Link></li><br />
      <li><Link href={{ pathname: '/Bans10', query: { num: 4, arrayn: JSON.stringify(Carray), count: Cnumber, answer: JSON.stringify(Canswer) } }}>選択肢4</Link>
      </li>
    </>
          
  );
}