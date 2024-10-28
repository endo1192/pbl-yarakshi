import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Bans1() {
  const router = useRouter();
  const { arrayn,answer } = router.query;


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

  let Kaito: string[] = ["d","d","d","d","d","d","d","d","d","d"]

  for(let i = 0;i<=9;i++){
    if(Canswer[i] == 0){
      Kaito[i] = "不正解です"
    }else if(Canswer[i] == 1){
      Kaito[i] = "正解です"
    }else{Kaito[i] = "error"}
  }

  let Kaisetsu: string[] = ["d","d","d","d","d","d","d","d","d","d"]

  for(let i = 0;i<=9;i++){
    switch(Carray[i]){
      case 1:
        if(Canswer[i] == 0){
          Kaisetsu[i] = "1F"
        }else if(Canswer[i] == 1){
          Kaisetsu[i] = "1T"
        }else{
          Kaisetsu[i] = "Error"
        }
        break;
      case 2:
        if(Canswer[i] == 0){
          Kaisetsu[i] = "2F"
        }else if(Canswer[i] == 1){
          Kaisetsu[i] = "2T"
        }else{
          Kaisetsu[i] = "Error"
        }
        break;
      case 3:
        if(Canswer[i] == 0){
          Kaisetsu[i] = "3F"
        }else if(Canswer[i] == 1){
          Kaisetsu[i] = "3T"
        }else{
          Kaisetsu[i] = "Error"
        }
        break;
      case 4:
        if(Canswer[i] == 0){
          Kaisetsu[i] = "4F"
        }else if(Canswer[i] == 1){
          Kaisetsu[i] = "4T"
        }else{
          Kaisetsu[i] = "Error"
        }
        break;
      case 5:
        if(Canswer[i] == 0){
          Kaisetsu[i] = "5F"
        }else if(Canswer[i] == 1){
          Kaisetsu[i] = "5T"
        }else{
          Kaisetsu[i] = "Error"
        }
        break;
      case 6:
        if(Canswer[i] == 0){
          Kaisetsu[i] = "6F"
        }else if(Canswer[i] == 1){
          Kaisetsu[i] = "6T"
        }else{
          Kaisetsu[i] = "Error"
        }
        break;
      case 7:
        if(Canswer[i] == 0){
          Kaisetsu[i] = "7F"
        }else if(Canswer[i] == 1){
          Kaisetsu[i] = "7T"
        }else{
          Kaisetsu[i] = "Error"
        }
        break;
      case 8:
        if(Canswer[i] == 0){
          Kaisetsu[i] = "8F"
        }else if(Canswer[i] == 1){
          Kaisetsu[i] = "8T"
        }else{
          Kaisetsu[i] = "Error"
        }
        break;
      case 9:
        if(Canswer[i] == 0){
          Kaisetsu[i] = "9F"
        }else if(Canswer[i] == 1){
          Kaisetsu[i] = "9T"
        }else{
          Kaisetsu[i] = "Error"
        }
        break;
      case 10:
        if(Canswer[i] == 0){
          Kaisetsu[i] = "10F"
        }else if(Canswer[i] == 1){
          Kaisetsu[i] = "10T"
        }else{
          Kaisetsu[i] = "Error"
        }
        break;
      default:
        Kaisetsu[i] = "2Error"
        break;
    }
  }


  

  return (
    <div>
        <Link href="/">はじめに戻る</Link><br /><br /><br />
      <h1>正解発表fin</h1>
      <p>選択された回答: </p><br /><br />
      <p>結果: {}</p>
      <p>{Canswer}</p>
      <p>{Carray}</p>
      <p>第1問:{Kaito[0]},{Kaisetsu[0]}</p><br /><br />
      <p>第2問:{Kaito[1]},{Kaisetsu[1]}</p><br /><br />
      <p>第3問:{Kaito[2]},{Kaisetsu[2]}</p><br /><br />
      <p>第4問:{Kaito[3]},{Kaisetsu[3]}</p><br /><br />
      <p>第5問:{Kaito[4]},{Kaisetsu[4]}</p><br /><br />
      <p>第6問:{Kaito[5]},{Kaisetsu[5]}</p><br /><br />
      <p>第7問:{Kaito[6]},{Kaisetsu[6]}</p><br /><br />
      <p>第8問:{Kaito[7]},{Kaisetsu[7]}</p><br /><br />
      <p>第9問:{Kaito[8]},{Kaisetsu[8]}</p><br /><br />
      <p>第10問:{Kaito[9]},{Kaisetsu[9]}</p><br /><br />
    </div>
  );
}
