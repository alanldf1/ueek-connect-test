'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import NumberSelector from "./numberSelector";

export default function Home() {
  // const [numbers, setNumbers] = useState([])

  // const getNumbers = async() => {
  //   const responseNumbers = await fetch('http://127.0.0.1:8000/api/getnumbers', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       },
  //   });
  //   const data = await responseNumbers.json();
  //   setNumbers(data);
  // }

  // useEffect(() => {
  //   getNumbers();
  //   }, []);

  return (
    <div className="mt-10">
      <div class="container">
        <div className="md:flex">
          <div className="md:flex flex-col justify-center">
            <p className="font-light">////CONNECT</p>
            <h1 className="text-4xl w-8/12">Ajude alunos a se formar</h1>
            <p className="font-light">Cada rifa que você adquire nos ajuda a chegar mais perto do nosso objetivo e proporciona aos nossos alunos uma celebração inesquecível.</p>
            <div className="flex space-x-4 mt-6 justify-center">
              <Button className="w-6/12">Comprar número</Button>
              <Button className="w-6/12" variant="outline">Sobre a rifa</Button>
            </div>
          </div>

          <div className="flex justify-center my-10">
            <Image src={"/home-image.png"} width={812} height={710} className="w-10/12" />
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl">
            Compre o seu número por apenas <span className="text-primary">R$5,00</span>
          </h2>
        </div>

        <NumberSelector />
      </div>
      <div className="my-14">
        <Image src={"/last-image.png"} width={812} height={710} className="w-full" />
      </div>
    </div>
  );
}
