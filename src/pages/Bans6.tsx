import { useState } from 'react';
import Link from 'next/link';

interface Bans1Props {
  num: string;
  count: number;
  arrayn: number[];
  answer: number[];
}

export default function Bans1({ num, count, arrayn, answer }: Bans1Props) {
  const [showPopup, setShowPopup] = useState(false);

  const Cnumber = count;
  const Carray = arrayn;
  const Canswer = answer;

  let pagen = Carray[Cnumber];

  if (Cnumber > 9) {
    pagen = 11;
  }

  let answ = null;

  if (num === "1") {
    answ = "正解です！";
    Canswer[Cnumber - 1] = 1;
  } else if (num === "2") {
    answ = "残念、不正解です";
  } else if (num === "3") {
    answ = "残念、不正解です";
  } else if (num === "4") {
    answ = "残念、不正解です";
  } else {
    console.log("error");
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="answer">
      <Link href="/">はじめに戻る</Link>
      <br />
      <br />
      <br />
      <h1>{Cnumber}mon,正解発表,6</h1>
      <p>選択された回答: {num}</p>
      <br />
      <br />
      <p>結果: {answ}</p>
      <p>{JSON.stringify(Canswer)}</p>

      <button onClick={togglePopup}>解説を見る</button>

      <br />
      <br />
      <Link
        href={{
          pathname: `/Bques${pagen}`,
          query: {
            arrayn: JSON.stringify(Carray),
            count: Cnumber,
            answer: JSON.stringify(Canswer),
          },
        }}
      >
        <h1>次の問題に進む</h1>
      </Link>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={togglePopup}>閉じる</button>
            <img src="./images/signal.jpg" alt="ポップアップ画像" />
          </div>
        </div>
      )}

      <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        img {
          width: 50%;
          height: 50%;
        }
      `}</style>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({ req }: any) {
  // リクエストのURLからクエリパラメータを取得する
  const query = new URL(req.url || '', `http://${req.headers.host}`).searchParams;

  const num = query.get('num') || "0";
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
      num,
      count,
      arrayn: Carray,
      answer: Canswer,
    },
  };
}
