import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Bans1() {
  const router = useRouter();
  const { num,count,arrayn,answer } = router.query;

  const Cnumber = count ? parseInt(count as string, 10) : 0;



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

  /*let Carray = Array.isArray(arrayn)
    ? arrayn.map(num => parseInt(num, 10))
    : [];*/

  let pagen = Carray[Cnumber]

  if(Cnumber > 9){
    pagen = 11;
  }





  let answ = null;

  if(num == "1"){
    answ = "正解です！";
    Canswer[Cnumber - 1] = 1;
  }else if(num == "2"){
    answ = "残念、不正解です";
  }else if(num == "3"){
    answ = "残念、不正解です";
  }else if(num == "4"){
    answ = "残念、不正解です";
  }else{
    console.log("error")
  }

  return (
    <div>
        <Link href="/">はじめに戻る</Link><br /><br /><br />
      <h1>{Cnumber}mon,正解発表,2</h1>
      <p>選択された回答: {num}</p><br /><br />
      <p>結果: {answ}</p>
      <p>{Canswer}</p>
      <Link href={{ pathname: `/Bques${pagen}`, query: { arrayn: JSON.stringify(Carray), count: Cnumber, answer: JSON.stringify(Canswer) } }}><h1>next</h1></Link>
    </div>
  );
}
