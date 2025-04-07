'use client'

import React, { useState, useEffect, useRef, JSX } from 'react';
import styles from './terminal.module.css';

export default function Terminal() {
  const asciiArtLogo = `
               ^<<<<<_
         >$H$$$$$$$$x                                 :<>2$8A<<
         8$$$$$$$$$$8O                -tt           <H$$$$$$$$8$~
         $$$H$*.  e8$$e               HHH;         %$$8%<_   H$$8
         $$$H/     $$$8               $$8I         !c?"    !d$$$H
         -o58t     $$$8              ^$$$T               <G8$$$$o<<>~
                   8$$8              H$$8"            ;f$$$$$$$$88$$8
                   H$$P              H$$$             k$H8o<<!  >H$$8
                  !$$$.             >8$$8                    "x8$$$$G
                 =$H8J              <$$$<                  <PH$$$$8)
                78$$f               >8$$                 <HH$$$$8)-
            .<t8$$8F                <$$$              <>$H$$$$8i
            H$$$$$8*<<!_            .8$$             -$$$$$$$v-
             <I8$$$$$$$$$$%>         !e7             ^oH8e><-
                !%$$$$$$$$$$o
                  -<tH$$$$$$8
  `;

  const asciiArtDetails = `
213@site
--------
Name: Niimi Syunya
Home: Nagoya
Born: 2003-06-17
Age: 21
Job: Student
  `;

  const [history, setHistory] = useState<(string | JSX.Element)[]>(["Welcome to my website! If you want to know how to use it, try 'help'"]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     setHistory((prev) => [...prev, <div>213@website:~$ {input}</div>]);

    let output: JSX.Element | string = ''; 
    const command = input.trim().toLowerCase();

    switch (command) {
      case 'help':
        output = (
          <>
          <p>Available commands: help, clear, fastfetch, ls, more</p>
          <p>If you want to see the profile, try 'more profile.md'</p>
          <p>If you want to see the resume, try 'more resume.md'</p>
          </>
        );
        break;
      case 'ls':
        output = 'profile.md resume.md';
        break;
      case 'more':
        output = 'more: bad usage';
        break;
      case 'fastfetch':
        output = (
          <>
          <div className='flex'>
            <pre className='text-green-500'>{asciiArtLogo}</pre>
            <pre className='p-8'>{asciiArtDetails}</pre>
          </div>
          </>
      );
        break;
      case 'clear':
        setHistory(['']);
        setInput('');
        return; 
      case '':
        return;   
      default:
        output = 'Command not found.';
    }

    if (command === 'long-command') {
      setHistory((prev) => [...prev, `user@website:~$ ${input}`]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      output = 'Long command finished!';
      setHistory((prev) => [...prev, output]);
      setInput('');
      return;
    }

    setHistory((prev) => [...prev, output]);
    setInput('');
  };


  return (
    <div className={styles.terminal}>
      {history.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <span className={styles.prompt}>213@website:~$ </span>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          autoFocus
          className={`${styles.input} w-4/5`}
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}