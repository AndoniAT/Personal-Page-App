'use client'

import { useState } from "react";
import { Content1, Content2, Content3 } from "./contents";
import { MyTooltip } from "../ui/components/tooltip";

export default function Home() {
  const [ content, setContent ] = useState<number>(3);

  /*if( content == 1 ) {
    setTimeout(() => {
      setContent( 2 );
    }, 3500 );
  }

  if( content == 2 ) {  
    setTimeout(() => {
      setContent( 3 );
    }, 3500 ) 
  }*/

  return (
    <main className="flex min-h-screen flex-col items-center justify-between 
    mt-5 md:mt-0
    lg:p-2
    ">
      {
        (content == 1)  ?
        <Content1/>
        :
        (content == 2)  ?
        <Content2/>
        : 
        <Content3/>
      }
    </main>
  );
}
