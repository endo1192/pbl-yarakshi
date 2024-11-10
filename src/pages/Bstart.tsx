import Link from 'next/link';

const shuffleArray = (array: number[]) => {
  const cloneArray = [...array]

  for(let i = cloneArray.length - 1; i>=0; i--){
    const rand = Math.floor(Math.random() * (i+1))

    const tmpStorage = cloneArray[i]
    cloneArray[i] = cloneArray[rand]
    cloneArray[rand] = tmpStorage
  }

  return cloneArray
}

export default function Home() {
  //let array: number[];
  const array = [1,2,3,4,5,6,7,8,9,10]

  const arrayn = shuffleArray(array)

  const pagen = arrayn[0]

  //let answer: number[];
  const answer = [0,0,0,0,0,0,0,0,0,0]

  return (
    <>
      <Link href="/">はじめに戻る</Link>
      <br /><br /><br />
      <p>ビギナークラス・問題は10問</p><br /><br />
      <Link href={{ pathname: `/Bques${pagen}`, query: { arrayn: JSON.stringify(arrayn), count: 0, answer: JSON.stringify(answer) } }}><h1>start</h1></Link>
    </>
          
  );
}