import Link from 'next/link';

interface Bques1Props {
  arrayn: number[];
  answer: number[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({ req }: any) {
  // リクエストのURLからクエリパラメータを取得する
  const query = new URL(req.url || '', `http://${req.headers.host}`).searchParams;


  
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
      arrayn: Carray,
      answer: Canswer,
    },
  };
}

export default function Bans1({ arrayn, answer }: Bques1Props) {
  


  const Carray = arrayn;
  const Canswer = answer;

  const Kaito: string[] = ["d","d","d","d","d","d","d","d","d","d"]

  for(let i = 0;i<=9;i++){
    if(Canswer[i] == 0){
      Kaito[i] = "不正解です"
    }else if(Canswer[i] == 1){
      Kaito[i] = "正解です"
    }else{Kaito[i] = "error"}
  }

  const Kaisetsu: string[] = ["d","d","d","d","d","d","d","d","d","d"]

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
